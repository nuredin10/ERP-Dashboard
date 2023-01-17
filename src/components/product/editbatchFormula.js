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

const OrderInformation = ({ setOrderInfo, handleClose, setRawmaterial }) => {
  const [inputFields, setInputFields] = useState([
    { mat_requestname: "", mat_materialcode: "", mat_unit: "", mat_quantity: "" },
  ]);
  const [batchMaterial, setbatchMaterial] = useState();

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
  // const setRawmaterial = (data) => {
  //   setbatchMaterial(data);
  //   console.log("Amazing", data);
  // };

  // Incomming data {
  //   fin_product: 'UPVC PIPE',
  //   finished_materialcode: 'PN4',
  //   finished_diameter: '50*1.5',
  //   fin_quan: '900',
  //   final_measureunit: 'PC',   this
  //   final_color: 'GRAY',
  //   FS_NUMBER: 'sf27',
  //   raw_needed: '[{"mat_requestname":"PVC Resin","mat_materialcode":"URM-1A","mat_unit":"KG","mat_quantity":"90"},{"mat_requestname":"CACO3","mat_materialcode":"URM-2","mat_unit":"KG","mat_quantity":"99"},{"mat_requestname":"Stabilizer","mat_materialcode":"URM-3","mat_unit":"KG","mat_quantity":"13"},{"mat_requestname":"CPE 135","mat_materialcode":"URM-4","mat_unit":"KG","mat_quantity":"25"},{"mat_requestname":"Lubricant 1801 SA","mat_materialcode":"URM-5","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Lubricant PE WAX","mat_materialcode":"URM-7","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Processing Aid TIO2 ","mat_materialcode":"URM-8","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Carbon Black","mat_materialcode":"URM-9","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"PVC Granule","mat_materialcode":"GRM-1","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Polypropylene(PPR)","mat_materialcode":"PRM-1","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Green Master Bach","mat_materialcode":"PRM-2","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"White Master Bach","mat_materialcode":"PRM-3","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Black Master Bach","mat_materialcode":"PRM-4","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Light Red Master Bach","mat_materialcode":"PRM-5","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"Blue Master Bach","mat_materialcode":"PRM-6","mat_unit":"KG","mat_quantity":"-"},{"mat_requestname":"PVC Resin","mat_materialcode":"URM-1","mat_unit":"KG","mat_quantity":"-"}]',
  //   custom_regular: 'custom',
  //   start_dateTime: 'aN/aN/NaN',
  //   end_dateTime: 'aN/aN/NaN',
  //   status: 'New',
  //   salesID: '',
  //   GMID: 27
  // }

  //   batchID
  // :
  // "lcuj58ey9q1jxvou8i9"
  // fin_product
  // :
  // "UPVC PIPE"
  // fin_quan
  // :
  // "854"
  // final_color
  // :
  // "GRAY"
  // finished_diameter
  // :
  // "50*1.5"
  // finished_materialcode
  // :
  // "PN4"
  // id
  // :
  // 61
  // mesuring_unit
  // :
  // "PC"
  // rowMaterialNeeded
  // :
  // (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // status
  // :
  // "STARTED"

  const submitHandler = () => {
    setRawmaterial.rowMaterialNeeded = inputFields;
    setRawmaterial.rowMaterialNeeded = inputFields;
    setRawmaterial.status = "New";
    const newForm = {
      ...setRawmaterial,
      final_measureunit: setRawmaterial.mesuring_unit,
      raw_needed: JSON.stringify(setRawmaterial.rowMaterialNeeded),
      custom_regular: "custom",
      start_dateTime: "aN/aN/NaN",
      end_dateTime: "aN/aN/NaN",
      salesID: "",
      GMID: setRawmaterial.GmID,
      FS_NUMBER: " ",
    };

    axios
      .post("/addProductionOrder", newForm)
      .then(async (res) => {
        console.log(res);
        await axios.post("/editBatch", newForm),
          then((respo) => {
            console.log(respo);
          }).catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess("error");
        setAlertMsg("Error Occured");
      });
  };
  useEffect(() => {
    setbatchMaterial(setRawmaterial);
    setInputFields(setRawmaterial.rowMaterialNeeded);
    console.log("YES", setRawmaterial);
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
