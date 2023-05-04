import * as React from "react";
import { Button } from "@mui/material";
import { getButtonVariant, makeButtonStyle } from "../assets/styles/styles";

function ElevatorButton({
  floorNumber,
  status,
  setButtonStatus,
  callElevator,
}) {
  function handleClick(floorNumber) {
    if (status === "Wating" || status === "Arrived") return;
    setButtonStatus(floorNumber, "Wating");
    callElevator({ date: Date.now(), floorNumber: floorNumber });
  }

  React.useEffect(() => {
    if (status === "Arrived") {
      // Wait 2 seconds before freeing the button
      const duration = 1000 * 2; // 2 Second
      setTimeout(() => {
        setButtonStatus(floorNumber, "Call");
      }, duration);
    }
  }, [floorNumber, setButtonStatus, status]);

  return (
    <Button
      variant={getButtonVariant(status)}
      style={makeButtonStyle(status)}
      onClick={() => handleClick(floorNumber)}
    >
      {status}
    </Button>
  );
}

export default ElevatorButton;
