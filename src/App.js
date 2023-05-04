import * as React from "react";
import { Box } from "@mui/material";
import Building from "./components/Building";
import InitModal from "./components/InitModal";

export default function App() {
  const [show, setShow] = React.useState(false);

  return (
    <React.Fragment>
      {show && (
        <Box display="flex">
          <Building />
        </Box>
      )}
      <InitModal setShow={setShow} />
    </React.Fragment>
  );
}
