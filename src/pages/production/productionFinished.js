// const { DashboardLayout } = require("src/components/dashboard-layout");
import { useState, useEffect } from "react";
import * as React from "react";
import Table from "../../components/Table";
import productionWxios from "../../components/productionWxios";
import Head from "next/head";
import ToolBar from "../../components/ToolBar";
import { DashboardLayout } from "../../components/dashboard-layout";
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

const ProductionFinished = () => {
  const [data, setData] = useState([]);
  const columuns = [
    { title: "Time", field: "finished_time" },
    { title: "Material Name", field: "finished_name" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Description", field: "finished_description" },
    { title: "UOM", field: "finished_materialunit" },
    { title: "Quantity", field: "finished_qty" },
    { title: "Scrap in Kg", field: "waste_quantity" },
    { title: "Person Id", field: "personID" },
    { title: "Remark", field: "finished_remark" },
  ];
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  useEffect(() => {
    productionWxios.get("/showFinishedProduction").then(function (response) {
      response.data.map((eachData) => {
        eachData.finished_time = convert(eachData.finished_time);
      });
      setData(response.data);
    });
  }, []);
  console.log(data);
  return (
    <>
      <Head>
        <title>Finished Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          {/* <ToolBar title="customer" href="" /> */}
          <Card maxWidth="lg">
            <Table
              title="Finished Products"
              data={data}
              columns={columuns}
              options={{
                actionsColumnIndex: -1,
                selection: true,
              }}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
ProductionFinished.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionFinished;
