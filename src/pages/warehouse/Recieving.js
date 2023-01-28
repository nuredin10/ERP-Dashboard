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
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import waxios from "../../components/wareHouseAxios";
import Router from "next/router";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const Recieving = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const { enqueueSnackbar } = useSnackbar();

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  const columns = [
    { title: "Date", field: "new_date" },
    { title: "Name", field: "new_name" },
    { title: "UOM", field: "new_materialunit" },
    { title: "Quantity", field: "new_quantity" },
    { title: "Material Code", field: "new_materialcode" },
    { title: "Description", field: "new_description" },
    { title: "COLOR", field: "new_color" },
    { title: "Person", field: "new_person" },
    { title: "Status", field: "new_status" },
  ];
  useEffect(() => {
    waxios.get("/shownewPurchased").then((resp) => {
      const newPurchased = resp.data.filter((res) => res.new_status.includes("NEW"));
      newPurchased.map((eachData) => {
        eachData.new_date = convert(eachData.new_date);
        eachData.new_quantity = parseFloat(eachData.new_quantity).toLocaleString("en-US");
      });
      setData(newPurchased);
    });

    setUser(JSON.parse(Cookies.get("user")));
  }, []);
  const accept = async (id) => {
    await waxios
      .post("/confirmPurchased", {
        id: id,
        status: "Accept",
      })
      .then(function (response) {
        enqueueSnackbar("Item Accepted", { variant: "success" });
        Router.reload(window.location.pathname);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };

  const decline = async (id) => {
    await waxios
      .post("/confirmPurchased", {
        id: id,
        status: "Decline",
      })
      .then(function (response) {
        enqueueSnackbar("Item Declined", { variant: "error" });
        Router.reload(window.location.pathname);
        console.log(response);
      })
      .catch(function (error) {
        enqueueSnackbar("Something went wrong", { variant: "error" });

        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Recieving</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Card maxWidth="lg">
            {user && user.role === "Super Admin" ? (
              <Table
                title="Recieving"
                data={data}
                columns={columns}
                actions={[
                  (rowData) => ({
                    icon: () => <DoneIcon />,
                    tooltip: "Accpet ",
                    onClick: () => accept(rowData.id),
                  }),
                  (rowData) => ({
                    icon: () => <CloseIcon />,
                    tooltip: "Reject ",
                    onClick: () => decline(rowData.id),
                  }),
                ]}
              />
            ) : (
              <Table title="Recieving" data={data} columns={columns} />
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Recieving.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Recieving;
