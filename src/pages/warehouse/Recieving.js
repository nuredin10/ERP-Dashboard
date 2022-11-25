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

const Recieving = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  const columns = [
    { title: "Name", field: "new_name" },
    { title: "Quantity", field: "new_quantity" },
    { title: "Description", field: "new_description" },
    { title: "Material Code", field: "new_materialcode" },
    { title: "Material Type", field: "new_materialtype" },
    { title: "Material unit", field: "new_materialunit" },
    { title: "refernce Number", field: "new_referncenum" },
    { title: "Specification", field: "new_spec" },
    { title: "Value", field: "new_value" },
  ];
  useEffect(() => {
    waxios.get("/shownewPurchased").then((resp) => {
      const newPurchased = resp.data.filter((res) => res.new_status.includes("NEW"));
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
        Router.reload(window.location.pathname);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const decline = async (id) => {
    await waxios
      .post("/confirmPurchased", {
        id: id,
        status: "Decline",
      })
      .then(function (response) {
        Router.reload(window.location.pathname);
        console.log(response);
      })
      .catch(function (error) {
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
