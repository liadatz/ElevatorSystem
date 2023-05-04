import * as React from "react";
import AppContext from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { Stack, Box } from "@mui/material";
import ElevatorButton from "./ElevetorButton";
import { buttonBoxStyle } from "../assets/styles/styles";

function ButtonPanel({
  buttons,
  setButtonStatus,
  enqueueRequest,
  callElevator,
}) {
  const { numOfFloors } = React.useContext(AppContext);

  const buttonsEl = new Array(numOfFloors).fill().map((_, index) => (
    <Box
      key={uuidv4()}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={buttonBoxStyle}
    >
      <ElevatorButton
        floorNumber={index}
        status={buttons[index].status}
        setButtonStatus={setButtonStatus}
        enqueueRequest={enqueueRequest}
        callElevator={callElevator}
      />
    </Box>
  ));

  return (
    <Stack
      direction="column-reverse"
      justifyContent="center"
      alignItems="center"
    >
      {buttonsEl}
    </Stack>
  );
}

export default ButtonPanel;
