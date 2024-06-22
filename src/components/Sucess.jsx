import React from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function Success() {
  const location = useLocation();
  if (location.state) {
    const formData = location.state.formData;
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Welcome {formData.name}!
        </Typography>
        <Typography variant="h6" component="h2">
          Your Name: {formData.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Your email: {formData.email}
        </Typography>
        <Typography variant="h6" component="h2">
          Your age: {formData.age}
        </Typography>
        <Typography variant="h6" component="h2">
          Accompanied by guest: {formData.attendingWithGuest ? "Yes" : "No"}
        </Typography>
        {formData.attendingWithGuest ? (
          <Typography variant="h6" component="h2">
            Guest Name: {formData.guestName}
          </Typography>
        ) : null}
      </ThemeProvider>
    );
  } else {
    return <div></div>;
  }
}
export default Success;
