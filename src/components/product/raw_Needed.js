import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  Box,
  Button,
  Card,
  InputLabel,
  ButtonBox,
  Container,
  Typography,
  Grid,
  DatePicker,
  IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const OrderInformation = ({ setOrderInfo, handleClose }) => {

  const [inputFields, setInputFields] = useState([
    { mat_requestname: '', mat_spec: '', mat_description: '', mat_quantity: '' }
  ])

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = { mat_requestname: '', mat_spec: '', mat_description: '', mat_quantity: '' }

    setInputFields([...inputFields, newfield])
  }

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  const submitHandler = () => {
    setOrderInfo(inputFields)
    handleClose();
  }

  return (
    <Box sx={{
      width: '100%',
      p: 5
    }}>
      <Grid container spacing={3}>
        {
          inputFields.map((input, index) => {
            return (
              <>
                <Grid item xs={12} lg={3} sm={6} md={6}>
                  <TextField
                    required
                    name="mat_requestname"
                    label="Raw material Name "
                    type="text"
                    value={input.mat_requestname}
                    onChange={event => handleFormChange(index, event)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} lg={3} sm={6} md={6}>
                  <TextField
                    required
                    name="mat_spec"
                    label="Speification"
                    type="text"
                    value={input.mat_spec}
                    onChange={event => handleFormChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={3} sm={6} md={6}>
                  <TextField
                    required
                    name="mat_description"
                    label="Description"
                    type="text"
                    value={input.mat_description}
                    onChange={event => handleFormChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={11} lg={2} sm={5} md={5}>
                  <TextField
                    required
                    name="mat_quantity"
                    label="Quantity"
                    type="text"
                    value={input.mat_quantity}
                    onChange={event => handleFormChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={11} lg={2} sm={5} md={5}>
                  <TextField
                    required
                    name="mat_unit"
                    label="Measuring Unit"
                    type="text"
                    value={input.mat_unit}
                    onChange={event => handleFormChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} lg={1} sm={1} md={1}>
                  <IconButton onClick={() => removeFields(index)}><RemoveIcon /></IconButton>
                </Grid>
              </>
            )
          })
        }
        <Grid item lg={12} md={12} sm={12}>
          <IconButton type='submit' onClick={addFields} size="large"><AddIcon /></IconButton>
        </Grid>

        <Grid item lg={12} md={12} sm={12}>
          <Button type='submit' variant="contained" onClick={submitHandler}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderInformation