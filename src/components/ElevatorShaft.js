import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../context/AppContext";
import { Stack, Box } from "@mui/material";
import Elevator from "./Elevator";
import { floorBoxStyle } from "../assets/styles/styles";

function ElevatorShaft({ elevator, setElevators, setButtonStatus }) {
  const { numOfFloors } = React.useContext(AppContext);

  const floorElements = new Array(numOfFloors).fill().map((_, index) =>
    index === elevator.currentFloor ? (
      <Box
        key={uuidv4()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={floorBoxStyle}
      >
        <Elevator
          elevator={elevator}
          setElevators={setElevators}
          setButtonStatus={setButtonStatus}
        />
      </Box>
    ) : (
      <Box key={uuidv4()} sx={floorBoxStyle} />
    )
  );

  return (
    <Stack
      direction="column-reverse"
      justifyContent="center"
      alignItems="center"
    >
      {floorElements}
    </Stack>
  );
}

export default ElevatorShaft;
