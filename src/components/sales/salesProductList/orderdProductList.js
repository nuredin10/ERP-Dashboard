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
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Table from "../../../components/Table";
import axios from "../../../components/axios";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";


const OrderListInformation = ({ OrderdId, handleClose }) => {
  const [data, setData] = useState([]);

  const columns = [
    { title: "Item Name", field: "item_name" },
    { title: "Specification", field: "item_spec" },
    { title: "Description", field: "item_description" },
    { title: "Quantity", field: "item_quantity" },
    { title: "Material Id", field: "material_id" },
  ];

  const submitHandler = () => {
    setOrderInfo(inputFields);
    handleClose();
  };
  useEffect(() => {
    axios
      .post("/salesModule/showSalesOrderById", {
        ID: OrderdId.unique_id,
      })
      .then((resp) => setData(resp.data));
  }, []);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Head>
        <title>{}</title>
      </Head>

      <IconButton sx={{ float: 'right', ml: 5, color: 'red' }} onClick={handleClose}><CloseIcon /></IconButton>
      <Container maxWidth="ml" >
        <Card maxWidth="lg">
          <Table title="Ordered Materials" data={data} columns={columns} />
        </Card>
      </Container>
    </Box>
  );
};

export default OrderListInformation;
