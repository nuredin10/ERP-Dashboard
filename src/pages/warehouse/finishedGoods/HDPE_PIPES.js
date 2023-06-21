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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Router from "next/router";
import AddIcon from "@mui/icons-material/Add";

const Summary = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("RAW");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  var columns;

  columns = [
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
  const req = {
    Cat: "HDPE PIPES",
    Spec: type,
  };
  const [col, setCol] = useState([]);
  useEffect(() => {
    waxios
      .post("/diameterSelect", { Cat: "HDPE PIPES" })
      .then((result) => {
        // try2 = result.data;
        setCol(result.data);
        // setOd(result.data);
        console.log("NOW", result.data );
      })
      .catch((error) => {
        console.log(error);
      });
    waxios
      .post("/finishedMaterialbyCat", req)
      .then((response) => {
        response.data.map((eachData) => {
          eachData.finished_date = convert(eachData.finished_date);
          eachData.finished_quantity =
          eachData.finished_quantity !== ""
            ? parseFloat(eachData.finished_quantity).toLocaleString("en-US")
            : "";
        });
        setData(response.data);
        console.log(response.data,"my response");
      })
      .catch((response) => {
        console.log(response);
      });
  }, [type]);
  return (
    <>
      <Head>
        <title>Finished Good</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Typography className="text-[#61482A] mb-10" variant="h5">
            Finished Good HCPE PIPES
          </Typography>
          <Grid container spacing={3}>
            <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Select Type
              </Typography>
              <FormControl className="w-40">
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="type"
                  onChange={handleChange}
                >
                  {col && console.log("TRY 2", col)}
                  {col &&
                    col.map((od) => (
                      <MenuItem value={od.finished_description}>{od.finished_description}</MenuItem>
                    ))}
                  {/* <MenuItem value={"50mm"}>OD 20mm</MenuItem>
                  <MenuItem value={"25mm"}>OD 25mm</MenuItem>
                  <MenuItem value={"32mm"}>OD 32mm</MenuItem>
                  <MenuItem value={"40mm"}>OD 40mm</MenuItem>
                  <MenuItem value={"50mm"}>OD 50mm</MenuItem>
                  <MenuItem value={"63mm"}>OD 63mm</MenuItem>
                  <MenuItem value={"75mm"}>OD 75mm</MenuItem>
                  <MenuItem value={"90mm"}>OD 90mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 110mm</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table
                  title="HDPE PIPES"
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
                          query: { id: rowData.idm, products: rowData.finished_diameter },
                        });
                      },
                    }),
                  ]}

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
                    //     new Promise((resolve, reject) => {
                    //       setTimeout(() => {
                    //         const dataDelete = [...data];
                    //         const index = oldData.tableData.id;
                    //         dataDelete.splice(index, 1);
                    //         console.log(oldData);
                    //         waxios
                    //             .post("/deleteFinishedSummery", {
                    //               summery: oldData,
                    //               matId: router2.query.id,
                    //             })
                    //             .then((res) => {
                    //               setData([...dataDelete]);
                    //               console.log(res);
                    //               resolve();
                    //             })
                    //             .catch((err) => {
                    //               reject();
                    //               console.log(err);
                    //             });
                    //       }, 1000);
                    //     }),
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Summary.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Summary;
