import * as React from "react";
import { ReactComponent as ElevatorIcon } from "../assets/images/icons8-elevator.svg";
import sound from "../assets/sounds/elevator_ping.mp3";
import { makeElevatorStyle } from "../assets/styles/styles";

function Elevator({ elevator, setElevators, setButtonStatus }) {
  const { currentFloor, state, dest } = elevator;

  const [distanceFromFloor, setDistanceFromFloor] = React.useState(0);

  function playBellSound() {
    new Audio(sound).play();
  }

  function handleArrival(elevator) {
    // calcaute time past in milliseconds
    const time = Date.now() - elevator.startTime;
    const totalSeconds = Math.floor(time / 1000);
    // Minutes calculation
    const minutes = Math.floor(totalSeconds / 60);
    // Seconds calculation
    const seconds = totalSeconds % 60;
    // update the state of the arrived elevator to free and set its floor to the destination floor
    const dest = elevator.dest;
    console.log(
      `Elevator took ${minutes} minutes and ${seconds} seconds to get to floor ${dest}`
    );

    // Update elevator that it has reached the desired floor
    setElevators((oldElevators) => {
      const newElevators = [...oldElevators];
      const index = newElevators.indexOf(elevator);
      newElevators[index] = {
        ...elevator,
        state: "arrived",
        currentFloor: dest,
      };
      return newElevators;
    });
    // Update button that elevator has reached the floor
    setButtonStatus(dest, "Arrived");
    playBellSound();
  }

  React.useEffect(() => {
    // if occupied and arrived to destination
    if (state === "busy" && currentFloor === dest) {
      handleArrival(elevator);
      // if occupied and didn't arrive to destination
    } else if (state === "busy" && currentFloor !== dest) {
      // go up or down one floor if elavtor did not react destination floor
      const direction = currentFloor < dest ? 1 : -1;
      // move in smooth movment using interval
      const interval = setInterval(() => {
        if (Math.abs(Math.round(distanceFromFloor)) === 60) {
          clearInterval(interval);
          setDistanceFromFloor(0);
          setElevators((oldElevators) => {
            const newElevators = [...oldElevators];
            const index = newElevators.indexOf(elevator);
            newElevators[index] = {
              ...elevator,
              currentFloor: currentFloor + direction,
            };
            return newElevators;
          });
        }
        // update the distance from floor
        setDistanceFromFloor((prev) => {
          if (Math.abs(prev) < 60) return prev + direction / 2;
          else return prev;
        });
      }, 10);
      return () => clearInterval(interval);
    } else if (state === "arrived") {
      // wait 2 second before freeing the elevator
      const duration = 2 * 1000; // 2 seconds
      setTimeout(() => {
        setElevators((oldElevators) => {
          const newElevators = [...oldElevators];
          const index = newElevators.indexOf(elevator);
          newElevators[index] = {
            ...elevator,
            state: "free",
            currentFloor: elevator.dest,
          };
          return newElevators;
        });
      }, duration);
    }
  });

  return <ElevatorIcon style={makeElevatorStyle(state, distanceFromFloor)} />;
}

export default Elevator;
