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
  Modal,
  Grid,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";
import { useSnackbar } from "notistack";
import CButton from "../../components/Button";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
const cartlist = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { reason } = router.query;
  console.log(reason);

  const AcceptButton = styled(Button)({
    backgroundColor: "#4caf50",
    color: "#fff",
    margin: "16px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#357a38",
    },
  });

  const DeclineButton = styled(Button)({
    backgroundColor: "#f44336",
    color: "#fff",
    margin: "16px",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  });
  //    const parsedReason = JSON.parse(reason);

  // Sample list of products
  //   const productList = [
  //     {
  //       name: "Product A",
  //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       color: "Red",
  //       quantity: 2,
  //       uom: "pcs",
  //       materialCode: "12345",
  //       unitPrice: 10.0,
  //       totalPrice: 20.0,
  //     },
  //     {
  //       name: "Product B",
  //       description: "Pellentesque euismod nunc at mauris bibendum rhoncus.",
  //       color: "Blue",
  //       quantity: 1,
  //       uom: "m",
  //       materialCode: "67890",
  //       unitPrice: 5.0,
  //       totalPrice: 5.0,
  //     },
  //     {
  //       name: "Product B",
  //       description: "Pellentesque euismod nunc at mauris bibendum rhoncus.",
  //       color: "Blue",
  //       quantity: 1,
  //       uom: "m",
  //       materialCode: "67890",
  //       unitPrice: 5.0,
  //       totalPrice: 5.0,
  //     },
  //     {
  //       name: "Product B",
  //       description: "Pellentesque euismod nunc at mauris bibendum rhoncus.",
  //       color: "Blue",
  //       quantity: 1,
  //       uom: "m",
  //       materialCode: "67890",
  //       unitPrice: 5.0,
  //       totalPrice: 5.0,
  //     },
  //     // Add more products here...
  //   ];

  // State variables for order acceptance
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [orderDeclined, setOrderDeclined] = useState(false);
  const [productList, setproductList] = useState([]);
  // Function to handle order acceptance
  const handleAcceptOrder = async () => {
    setOrderAccepted(true);
    try {
      const response = await FAxios.post("/acceptBulkSalesOrder", {
        ID: reason,
      });
      const reason2 = response.data;
      enqueueSnackbar("Sales Order Created", { variant: "success" });
      FAxios
      .post("/sendNotification", {
        To: "sales",
        message: "Sales Order Accepted",
      })
      .then((respo) => {
        enqueueSnackbar("Notification Sent", { variant: "success" });
      });
      Router.push("/sales/salesorderlist");
      setOrderAccepted(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle order rejection
  const handleDeclineOrder = async () => {
    setOrderDeclined(true);
    try {
      const response = await FAxios.post("/DeleteSales", {
        ID: reason,
      });
      const reason2 = response.data;
      enqueueSnackbar("Sales Order Deleted", { variant: "success" });
      Router.push("/sales/salesorderlist");
      setOrderAccepted(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    if (reason) {
      try {
        const response = await FAxios.post("/showCartbyId", {
          ID: reason,
        });
        const reason2 = response.data;

        setproductList(reason2);
      } catch (err) {
        console.log(err);
      }
    }
  }, [reason]);

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Cart List</title>
        <meta name="description" content="List of selected items in cart" />
      </Head>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        Product List
      </Typography>
      <Grid container spacing={3}>
        {productList.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 4, boxShadow: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {product.item_name}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Material Code:</span>{" "}
                <span style={{ fontSize: "16px" }}>{product.item_description}</span>
              </Typography>
              <Typography variant="body2">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Color:</span>{" "}
                <span style={{ fontSize: "16px" }}>{product.item_color}</span>
              </Typography>
              <Typography variant="body2">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Quantity:</span>{" "}
                <span style={{ fontSize: "16px" }}>
                  {product.item_quantity} {product.measuring_unit}
                </span>
              </Typography>
              <Typography variant="body2">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Diameter(OD):</span>{" "}
                <span style={{ fontSize: "16px" }}>{product.item_diameter}</span>
              </Typography>

              <Typography variant="body2">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Unit Price::</span>{" "}
                <span style={{ fontSize: "16px" }}>
                  {parseFloat(product.unit_price).toFixed(2)}ETB
                </span>
              </Typography>
              <Typography variant="body2">
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>Total Price:</span>{" "}
                <span style={{ fontSize: "16px" }}>
                  {parseFloat(product.total_price).toFixed(2)}ETB
                </span>
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", gap: 5 }}>
        <CButton color="primary" onClick={handleAcceptOrder}>
          Accept Order
        </CButton>
        <CButton color="error" onClick={handleDeclineOrder}>
          Decline Order
        </CButton>
      </Box>
      <Modal open={orderAccepted || orderDeclined}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {orderAccepted && (
            <>
              <Typography variant="h4" component="h2" gutterBottom>
                Order Accepted
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Thank you for your order. We will process it soon.
              </Typography>
              <Button onClick={() => setOrderAccepted(false)}>Close</Button>
            </>
          )}
          {orderDeclined && (
            <>
              <Typography variant="h4" component="h2" gutterBottom>
                Order Declined
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We are sorry that we couldn't fulfill your order this time.
              </Typography>
              <Button onClick={() => setOrderDeclined(false)}>Close</Button>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

cartlist.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default cartlist;
