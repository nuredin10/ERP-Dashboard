import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Autocomplete,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import axios from "../../components/axios";
import CustomAlert from "../../components/alert";
import ConfirmDialog from "src/components/confirmDialog ";

const Addpurchasedmaterial = () => {
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [inputFields, setInputFields] = useState([
    {
      new_name: "",
      new_quantity: "",
      new_materialunit: "",
      new_materialcode: "",
      new_spec: "",
      new_description: "",
      new_value: "",
      new_referncenum: "",
      new_materialtype: "",
      new_remark: "",
      new_status: "NEW",
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      new_name: "",
      new_quantity: "",
      new_materialunit: "",
      new_materialcode: "",
      new_spec: "",
      new_description: "",
      new_value: "",
      new_referncenum: "",
      new_materialtype: "",
      new_remark: "",
      new_status: "NEW",
    };
    setIsSuccess("info");
    setInputFields([...inputFields, newfield]);
    setIsSuccess("info");
    setAlertMsg("item added");
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
    setIsSuccess("info");
    setAlertMsg("item removed");
  };

  const submitHandler = () => {
    console.log(inputFields)
    handleClose();
    axios
      .post("/wareHouse/addnewPurchased", inputFields)
      .then((res) => {
        console.log(res);
        setIsSuccess("success");
        setAlertMsg("Saved Successfully");
      })
      .catch((res) => {
        console.log(res);
        setIsSuccess("error");
        setAlertMsg("Something went wrong");
      });
  };

  const clearAllHandler = () => {
    setInputFields([]);
    // setIsSuccess('success');
    // setAlertMsg('Saved Successfully')
  };

  const alertStyle = {
    postion: "absolute",
    top: "20vh",
    left: "10%",
    ml: "20%",
    mt: 3,
    height: "10%",
    width: "20%",
  };

  const autocompleteData = {
    "Name" : 
      [
        { label: 'The Shawshank Redemption'},
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        {
          label: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
      ],
     
      
    "Quantitty" : [
      { label: 'Amadeus', year: 1984 },
      { label: 'To Kill a Mockingbird', year: 1962 },
      { label: 'Toy Story 3', year: 2010 },
      { label: 'Logan', year: 2017 },
      { label: 'Full Metal Jacket', year: 1987 },
      { label: 'Dangal', year: 2016 },
      { label: 'The Sting', year: 1973 },
      { label: '2001: A Space Odyssey', year: 1968 },
      { label: "Singin' in the Rain", year: 1952 },
      { label: 'Toy Story', year: 1995 },
      { label: 'Bicycle Thieves', year: 1948 },
      { label: 'The Kid', year: 1921 },
      { label: 'Inglourious Basterds', year: 2009 },
      { label: 'Snatch', year: 2000 },
      { label: '3 Idiots', year: 2009 },
      { label: 'Monty Python and the Holy Grail', year: 1975 },
    ]
  }

  return (
    <>
      <Head>
        <title>Sales Summery</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <ConfirmDialog
          dialogOpen={dialogOpen}
          handleClose={handleClose}
          confirmAction={submitHandler}
          title="Are you sure?"
          message="Do you want to save this item?"
        />

        <Grid container>
          <Grid item lg={6} md={12} sm={12} sx={{ m: 5 }}>
            <Typography variant="h3">Add new Purchased Material</Typography>
          </Grid>

          {isSuccess != "" ? (
            <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
          ) : null}
          <Grid item lg={12} sm={12} md={12} sx={{ p: 5, mt: -3 }}>
            <Grid container spacing={4}>
              {inputFields.map((input, index) => {
                return (
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      ml: 3,
                      mt: 3,
                      backgroundColor: "white",
                      pb: 2,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        name="new_name"
                        label="Name"
                        type="text"
                        value={input.new_name}
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                      {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={autocompleteData.Name}
                        // sx={{ width: 300 }}
                        onChange={(event) => handleFormChange(index, event)}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                      /> */}
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_quantity"
                        label="Quantity"
                        type="text"
                        value={input.new_quantity}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                       {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={autocompleteData.Quantitty}
                        // sx={{ width: 300 }}
                        
                        
                        
                        renderInput={(params) => <TextField {...params} name="new_quantity" label="Quantity" onChange={(event) => handleFormChange(index, event)} value={input.new_quantity}/>}
                      /> */}
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_materialunit"
                        label="Material Unit"
                        type="text"
                        value={input.new_materialunit}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_materialcode"
                        label="MaterialCode"
                        type="text"
                        value={input.new_materialcode}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_spec"
                        label="Specification"
                        type="text"
                        value={input.new_spec}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        name="new_description"
                        label="Description"
                        type="text"
                        value={input.new_description}
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_value"
                        label="Value"
                        type="text"
                        value={input.new_value}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_referncenum"
                        label="Reference Number"
                        type="text"
                        value={input.new_referncenum}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_materialtype"
                        label="Material Type"
                        type="text"
                        value={input.new_materialtype}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={2}>
                      <TextField
                        required
                        name="new_remark"
                        label="Remark"
                        type="text"
                        value={input.new_remark}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item xs={1} lg={1} sm={1} md={1} sx={{ mt: "-2%" }}>
                      <IconButton onClick={() => removeFields(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
              <Grid item lg={12} md={12} sm={12}>
                <IconButton type="submit" onClick={addFields} size="large">
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item lg={8}>
                <Button
                  type="submit"
                  sx={{ marginRight: "2rem" }}
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Clear All
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Addpurchasedmaterial.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Addpurchasedmaterial;
