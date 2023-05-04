import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import AppContext from "../context/AppContext";

function InitModal({ setShow }) {
  const { setNumOfFloors, setNumOfElevators } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    numOfElevators: 5,
    numOfFloors: 10,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (isNaN(value)) {
      setShowError(true);
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setShow(true);
  };

  const [showError, setShowError] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleInit(e) {
    e.preventDefault();
    setNumOfFloors(parseInt(formData.numOfFloors));
    setNumOfElevators(parseInt(formData.numOfElevators));
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography align="center" variant="h6" component="h2">
          Select number of elevators and floors
        </Typography>
        <Box
          display="flex"
          component="form"
          onSubmit={handleInit}
          noValidate
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              required
              error={showError}
              size="small"
              label="Number of elevators"
              variant="outlined"
              name="numOfElevators"
              value={formData.numOfElevators}
              helperText={showError ? "Only numbers allowed" : ""}
              onChange={handleChange}
            />
            <TextField
              required
              error={showError}
              size="small"
              label="Number of floors"
              variant="outlined"
              name="numOfFloors"
              value={formData.numOfFloors}
              helperText={showError ? "Only numbers allowed" : ""}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, marginLeft: "auto" }}
            >
              Initiate Elevators
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

export default InitModal;
