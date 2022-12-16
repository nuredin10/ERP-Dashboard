import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import OrderList from "src/components/sales/salesProductList/orderdProductList";
import saxios from '../../components/salesAxios';

const SalesOrderList = () => {
  const [data, setData] = useState([]);
  const [selectedData, setselectedData] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const columns = [
    { title: "Company Name", field: "company_name" },
    { title: "Date", field: "order_date" },
    { title: "Customer Name", field: "customer_name" },
    { title: "bussiness Name", field: "cus_bussinessName" },
    { title: "customer phoneNum", field: "cus_phoneNum" },
    { title: "email", field: "cus_email" },
    { title: "ship contactName", field: "ship_contactName" },
    { title: "Address1", field: "ship_address1" },
    { title: "Address2", field: "ship_address2" },
    { title: "TinNumber", field: "cust_tinNumber" },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "70%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    height: "80%",
    bgcolor: "background.paper",
    borderRadius: '10px',
    overflowY: 'scroll',
    boxShadow: 24,
    p: 4,
  };

  const cartViwer = (rowData) => {
    // console.log(rowData);
    setselectedData(rowData);
    handleOpen();
  };

  useEffect(() => {
    saxios.get("/showSalesOrder")
    .then((resp)=>{
      // console.log(resp)
      setData(resp.data)
    })

    // fetch("http://localhost:4000/showSalesOrder")
    //   .then((resp) => resp.json())
    //   .then((resp) => setData(resp));
  }, []);
  return (
    <Box sx={{
      width: '100%',
      p: 5
    }}>
      <Head>
        <title>Sales Order List</title>
      </Head>
        <Container maxWidth="ml">
        
          {/* <Card maxWidth="lg"> */}
            <Table
              title="Sales Order List"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <ShoppingCartIcon></ShoppingCartIcon>,
                  tooltip: "Edit ",
                  onClick: () => cartViwer(rowData),
                }),
              ]}
            />

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {
                  selectedData ? (

                    <OrderList OrderdId= {selectedData.unique_id}  handleClose={handleClose} />
                  ) : null
                }
              </Box>
            </Modal>

            {/* <Typography sx={{ mb: 3 }} variant="h4">
          Supplier
        </Typography> */}
          {/* </Card> */}
        </Container>
      
    </Box>
  );
};

SalesOrderList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesOrderList;
