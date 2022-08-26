import React from "react";
import { Container, Box, Grid, Card, Typography, InputLabel, Input,FormHelperText } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';

function AddCustomer() {
  return (
    <Box
      sx={{
        width: 800,
        height: 700,
        backgroundColor: "",
        margin: "auto",
      }}
    >
      <Box>
        <Typography variant="h3">Add New Data</Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

export default AddCustomer;
