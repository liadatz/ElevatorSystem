import * as React from "react";
import { Box, Stack } from "@mui/material";
import ElevatorController from "./ElevatorController";
import FloorMarks from "./FloorMarks";

function Building() {
  return (
    <Box
      sx={{
        margin: "100px auto",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <FloorMarks />
        <ElevatorController />
      </Stack>
    </Box>
  );
}

export default Building;
