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
  Divider,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import OrdersToolBar from "../../../components/rawMaterials/order-toolbar";
import { OrderResults } from "../../../components/rawMaterials/order-results";
import RightDrawer from "../../../components/rawMaterials/RightDrawer";
import Router from "next/router";
const FinishedGoods = () => {
  const [drawer, setDrawer] = useState(false);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [summery, setSummery] = useState([]);
  var width;
  // const size = useWindowSize();
  if (typeof window != "undefined") {
    console.log("You are on the browser");
    console.log(window.innerWidth);
    width = window.innerWidth;
  } else {
    console.log("You are on the server");
  }
  const columns = [
    { title: "Date", field: "finished_date" },
    { title: "Description", field: "finished_diameter" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Color", field: "color" },
    { title: "Stock At Hand", field: "finished_quantity" },
    { title: "Finished Mass", field: "finished_mass" },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  useEffect(() => {
    waxios
      .post("/finishedMaterialbyCat", {
        Cat: "Conduit",
      })
      .then((response) => {
        response.data.map((eachData) => {
          eachData.finished_date = convert(eachData.finished_date);
          eachData.finished_quantity =
            eachData.finished_quantity !== ""
              ? parseFloat(eachData.finished_quantity).toLocaleString("en-US")
              : "";
        });
        console.log(response.data, "ZSdc");
        setData(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Finished Goods | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          maxWidth="ml"
        >
          <Typography className="text-[#61482A] mb-5" variant="h5">
            Finished Good CONDUITS
          </Typography>
          <Card maxWidth="lg">
            <Table
              title="CONDUITS"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <SummarizeIcon size="small" />,
                  tooltip: "Summary",
                  onClick: () => {
                    // console.log(rowData)
                    Router.push({
                      pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
                      query: { id: rowData.id, products: rowData.finished_diameter },
                    });
                  },
                }),
              ]}
              localization={{
                header: {
                  actions: "SUMMARY",
                },
              }}

              editable={{
                // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                // isEditHidden: rowData => rowData.name === 'x',
                // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                // isDeleteHidden: rowData => rowData.name === 'y',

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        console.log(newData);
                          waxios
                              .put("/updateFinishgoods", {
                                  id: newData.id,
                                  data: newData,
                              })
                              .then((res) => {
                                  setData([...dataUpdate]);
                                  console.log(res);
                                  resolve();
                              })
                              .catch((err) => {
                                  reject();
                                  console.log(err);
                              });
                      }, 1000);
                    }),
                // onRowDelete: (oldData) =>
                    // new Promise((resolve, reject) => {
                    //   setTimeout(() => {
                    //     const dataDelete = [...data];
                    //     const index = oldData.tableData.id;
                    //     dataDelete.splice(index, 1);
                    //     console.log(oldData);
                    //     waxios
                    //         .post("/deleteFinishedSummery", {
                    //           summery: oldData,
                    //           matId: router2.query.id,
                    //         })
                    //         .then((res) => {
                    //           setData([...dataDelete]);
                    //           console.log(res);
                    //           resolve();
                    //         })
                    //         .catch((err) => {
                    //           reject();
                    //           console.log(err);
                    //         });
                    //   }, 1000);
                    // }),
              }}
            />
          </Card>
        </Container>
        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        >
          <Box>
            <OrdersToolBar drawer={drawer}></OrdersToolBar>
            <OrderResults
              drawer={drawer}
              setDrawer={setDrawer}
              setSelectedOrder={setSelectedOrder}
              setSummery={setSummery}
              data={data}
              width={width}
            />
            <Box>
              <RightDrawer
                drawer={drawer}
                setDrawer={setDrawer}
                selectedOrder={selectedOrder}
                summery={summery}
              />
            </Box>
            <Divider sx={{ borderColor: "gray", mt: 3 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
