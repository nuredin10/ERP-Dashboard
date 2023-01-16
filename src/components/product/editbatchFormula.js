import React, { useState, useEffect } from "react";
import { Modal, Paper } from "@material-ui/core";
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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "../productionWxios";

const OrderInformation = ({ setOrderInfo, handleClose }) => {
  const [inputFields, setInputFields] = useState([
    { mat_requestname: "", mat_materialcode: "", mat_unit: "", mat_quantity: "" },
  ]);
  // const [rawmaterial, setRawmaterial] = React.useState();

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { mat_requestname: "", mat_materialcode: "", mat_unit: "", mat_quantity: "" };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const setRawmaterial = (data) => {
    console.log("Amazing", data);
  };

  const submitHandler = () => {
    setOrderInfo(inputFields);
    handleClose();
  };
  useEffect(() => {
    axios
      .get("/rawmaterialsforBatch")
      .then((res) => {
        const transformedData = res.data.map((item) => {
          const {
            raw_name: mat_requestname,
            raw_materialcode: mat_materialcode,
            raw_materialunit: mat_unit,
            ...rest
          } = item;
          return { mat_requestname, mat_materialcode, mat_unit, ...rest };
        });
        setInputFields(transformedData);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={
        {
          // width: "100%",
          // p: 0.1,
          // position: 'absolute',
          // border: '2px solid #000',
          // height: '80%',
          // overflow: 'scroll'
        }
      }
    >
      <div>
        {" "}
        <h2 className="text-3xl text-[#61482A] font-bold mb-10">Edit Batch Formula</h2>
      </div>
      <Grid container spacing={0.5}>
        {inputFields.map((input, index) => {
          return (
            <>
              <Grid item xs={12} lg={3} sm={6} md={6}>
                <TextField
                  required
                  size="small"
                  variant="standard"
                  name="mat_requestname"
                  value={input.mat_requestname}
                  // onChange={(event) => handleFormChange(index, event)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} lg={3} sm={6} md={6}>
                <TextField
                  required
                  name="mat_materialcode"
                  size="small"
                  variant="standard"
                  type="text"
                  value={input.mat_materialcode}
                  // onChange={(event) => handleFormChange(index, event)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={11} lg={2} sm={5} md={5}>
                <TextField
                  required
                  name="mat_unit"
                  label="UOM"
                  size="small"
                  type="text"
                  value={input.mat_unit}
                  onChange={(event) => handleFormChange(index, event)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={11} lg={2} sm={5} md={5}>
                <TextField
                  required
                  name="mat_quantity"
                  size="small"
                  label="Quantity"
                  type="text"
                  // defaultvalue={"-"}
                  value={input.mat_quantity}
                  onChange={(event) => handleFormChange(index, event)}
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={1} lg={1} sm={1} md={1}>
                <IconButton onClick={() => removeFields(index)}>
                  <RemoveIcon />
                </IconButton>
              </Grid> */}
            </>
          );
        })}
        {/* <Grid item lg={12} md={12} sm={12}>
          <IconButton type="submit" onClick={addFields} size="large">
            <AddIcon />
          </IconButton>
        </Grid> */}

        <Grid item lg={12} md={12} sm={12}>
          <Button
            className="w-40 bg-[#61482A]  text-white font-bold text-md hover:shadow-lg hover:bg-[#EBE5D8] hover:text-[#61482A]"
            type="submit"
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderInformation;
