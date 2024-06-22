// importing necessary utilities
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
// for setting the dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// THE SIGN In function
function Signin() {
  const navigate = useNavigate();
  //defining state to track errorMessage
  const [errorMessage, setErrorMessage] = useState();
  // defining state for the form data
  const [formData, setFormData] = useState({
    name: "", //state for name of user
    email: "", // state for email of user
    age: "", // state for age of user
    attendingWithGuest: false, // state to check whether attending with guests or not
    guestName: "", //state for the guestname
  });
  //defining state for handling the errors
  const [errors, setErrors] = useState({});
  // defining touched state for giving error if the form field is touched
  const [touched, setTouched] = useState({
    name: false, //state for name of user
    email: false, // state for email of user
    age: false, // state for age of user
    guestName: false, //state for the guestname
  });

  //function to track whether a field is touched or not before
  const handleTouchedState = (event) => {
    var vartouched = event.target.name;
    setTouched((prevTouch) => ({
      ...prevTouch,
      [vartouched]: true,
    }));
  };
  //function to validate field and get errors
  const validateField = (name, value) => {
    let error = ""; // if there are no errors then it will set errors for that case as this
    switch (name) {
      case "name":
        if (!value && touched.name === true) error = "Name is required";
        break;
      case "email":
        if ((!value || !/\S+@\S+\.\S+/.test(value)) && touched.email === true)
          error = "A valid email is required";
        break;
      case "age":
        if ((!value || isNaN(value) || value <= 0) && touched.age === true)
          error = "A valid age greater than 0 is required";
        break;
      case "guestName":
        if (formData.attendingWithGuest && !value && touched.guestName === true)
          error = "Guest name is required if you are attending with a guest";
        break;
      default:
        break;
    }
    //function to set the errors accordingly
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  //useEfffect to handle effects related to the change in state
  useEffect(() => {
    // iterating to the through the object form data and calling the validate function for each key value pair
    Object.keys(formData).forEach((key) => {
      value = formData[key];
      validateField(key, value);
    });
  }, [
    formData.name,
    formData.email,
    formData.age,
    formData.guestName,
    formData.attendingWithGuest,
    touched.name,
    touched.age,
    touched.email,
    touched.guestName,
  ]);
  // function to handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // to access name,value,type and checked attribute of the target event
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  //function to handle submit functionality
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behaviour on form submission
    var hasError = false; // setting this to false for final check before submission
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasError = true;
      }
    });

    if (hasError === true) {
      //if error is true then the error message is shown
      setErrorMessage("Form has errors. Please fix them before submitting.");
    } else {
      // Navigate to success page and pass formData as state
      navigate("/success", { replace: true, state: { formData: formData } });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {" "}
      {/* to have a dark theme */}
      {/* to make sure cross -browser uniform styling */}
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/*  code for conditionally rendering the alert message */}
        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              position: "fixed",
              top: 0,
              zIndex: 9999, // Ensure it's on top of other content
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        {/* to render the card */}
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* NAME textfield */}
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
                onBlur={handleTouchedState}
              />
              {/* Email textfield */}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email}
                onBlur={handleTouchedState}
              />
              {/* AGE textfield */}
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                required
                error={!!errors.age}
                helperText={errors.age}
                onBlur={handleTouchedState}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="attendingWithGuest"
                      checked={formData.attendingWithGuest}
                      onChange={handleChange}
                    />
                  }
                  label="Are you attending with a guest?"
                />
              </FormGroup>
              {/* GUESTNAME textfield */}
              {formData.attendingWithGuest && (
                <TextField
                  label="Guest Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  required={formData.attendingWithGuest}
                  error={!!errors.guestName}
                  helperText={errors.guestName}
                  onBlur={handleTouchedState}
                />
              )}
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="large" type="submit" variant="outlined">
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default Signin;
