import * as React from "react";
import AppContext from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { Stack, Box, Typography } from "@mui/material";
import { markBoxStyle } from "../assets/styles/styles";

// 1 => 1st, 2 => 2nd....
function ordinalSuffixOf(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

function FloorMarks() {
  const { numOfFloors } = React.useContext(AppContext);

  const marksEl = new Array(numOfFloors).fill().map((_, index) => {
    const mark = index === 0 ? "Ground Floor" : ordinalSuffixOf(index);
    return (
      <Box
        key={uuidv4()}
        display="flex"
        alignItems="center"
        justifyContent="end"
        sx={markBoxStyle}
      >
        <Typography sx={{ paddingRight: 2, fontWeight: 600 }}>
          {mark}
        </Typography>
      </Box>
    );
  });

  return (
    <Stack
      direction="column-reverse"
      justifyContent="center"
      alignItems="center"
    >
      {marksEl}
    </Stack>
  );
}

export default FloorMarks;
