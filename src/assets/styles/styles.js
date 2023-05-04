const makeElevatorStyle = (state, distanceFromFloor) => {
  return {
    position: "relative",
    bottom: distanceFromFloor,
    width: 30,
    filter:
      state === "free"
        ? "invert(0%) sepia(1%) saturate(3%) hue-rotate(326deg) brightness(97%) contrast(104%)"
        : state === "busy"
        ? "invert(83%) sepia(60%) saturate(2174%) hue-rotate(299deg) brightness(100%) contrast(91%)"
        : "invert(96%) sepia(78%) saturate(705%) hue-rotate(65deg) brightness(87%) contrast(88%)",
  };
};

const markBoxStyle = {
  width: 200,
  height: 60,
  border: "1px solid #eeeeee",
};

const buttonBoxStyle = {
  width: 120,
  height: 60,
  border: "1px solid #eeeeee",
};

const floorBoxStyle = {
  width: 110,
  height: 60,
  backgroundColor: "white",
  border: "1px solid #dddddd",
};

const getButtonVariant = (status) =>
  status === "Call"
    ? "contained"
    : status === "Wating"
    ? "contained"
    : "outlined";

const makeButtonStyle = (status) =>
  status === "Call"
    ? { backgroundColor: "#5bcd88", padding: "6px 24px", textTransform: "none" }
    : status === "Wating"
    ? { backgroundColor: "#ed484d", padding: "6px 24px", textTransform: "none" }
    : {
        color: "#5bcd88",
        borderColor: "#5bcd88",
        padding: "6px 24px",
        textTransform: "none",
      };

export {
  makeElevatorStyle,
  markBoxStyle,
  floorBoxStyle,
  buttonBoxStyle,
  getButtonVariant,
  makeButtonStyle,
};
