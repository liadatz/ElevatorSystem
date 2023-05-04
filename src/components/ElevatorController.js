import * as React from "react";
import AppContext from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { Stack } from "@mui/material";
import ElevatorShaft from "./ElevatorShaft";
import FloorButtons from "./ButtonPanel";

function ElevatorController() {
  const { numOfFloors, numOfElevators } = React.useContext(AppContext);
  const [elevators, setElevators] = React.useState(
    new Array(numOfElevators).fill().map(() => ({
      currentFloor: 0,
      state: "free",
      dest: 0,
    }))
  );

  const [buttons, setButtons] = React.useState(
    new Array(numOfFloors).fill().map((_, index) => ({
      floorNumber: index,
      status: "Call",
    }))
  );

  const setButtonStatus = (floorNumber, status) =>
    setButtons((prevButtons) => {
      const newButtons = [...prevButtons];
      newButtons[floorNumber] = { floorNumber: floorNumber, status: status };
      return newButtons;
    });

  const ElevatorShaftElements = new Array(numOfElevators)
    .fill()
    .map((_, index) => (
      <ElevatorShaft
        key={uuidv4()}
        elevator={elevators[index]}
        setElevators={setElevators}
        setButtonStatus={setButtonStatus}
      />
    ));

  function callElevator(request) {
    const { date, floorNumber } = request;
    // Find Closest elevator and set his new destination and state to busy
    const freeElevators = elevators.filter(
      (elevator) => elevator.state === "free"
    );
    if (freeElevators.length === 0) {
      // if no free elevator avilable set the status of the floor button back to call
      setButtonStatus(floorNumber, "Call");
      return;
    } else {
      const distances = freeElevators.map((elevator) =>
        Math.abs(elevator.currentFloor - floorNumber)
      );
      const nearestElevator =
        freeElevators[distances.indexOf(Math.min(...distances))];

      setElevators((oldElevators) => {
        const newElevators = [...oldElevators];
        const index = newElevators.indexOf(nearestElevator);
        newElevators[index] = {
          ...nearestElevator,
          state: "busy",
          dest: floorNumber,
          startTime: date,
        };
        return newElevators;
      });
    }
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      {ElevatorShaftElements}
      <FloorButtons
        buttons={buttons}
        setButtonStatus={setButtonStatus}
        callElevator={callElevator}
      />
    </Stack>
  );
}

export default ElevatorController;
