import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Container, Typography, Grid, Divider, Button } from "@mui/material";
import { ButtonGroup } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import MaterialTable from "material-table";

const RightDrawer = (props) => {
  // const [issued, setIssued] = useState([]);
  // const [recived, setRecived] = useState([]);

  
  var summerydata = {
    summery_date: "2020-10-89",
    stockat_hand: "67",
    stock_recieved: "8",
    stockat_end: "75",
  };

  const ReceviedColumns = [
    { title: "Date", field: "summery_date" },
    { title: "Begining balance", field: "stockat_hand" },
    { title: "Stock recived", field: "stock_recieved" },
    { title: "Ending balance", field: "stockat_end" },
  ];
  const IssuedColumns = [
    { title: "Date", field: "summery_date" },
    { title: "Department", field: "department_issued" },
    { title: "Begining balance", field: "stockat_hand" },
    { title: "Stock recived", field: "stock_issued" },
    { title: "Ending balance", field: "stockat_end" },
  ];
  return (
    <Box>
      {/* <h1>asdc</h1> */}
      <Drawer
        variant={"persistent"}
        open={props.drawer}
        onClose={() => props.setDrawer(false)}
        anchor={"right"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "25vw",
            minHeight: "93vh",
            height: "auto",
            marginTop: "7vh",
            border: 1,
            borderColor: "rgb(243, 244, 246)",
          }}
        >
          <Box
            className="header"
            sx={{
              paddingLeft: "5%",
              paddingRight: "5%",
              width: "100%",
              height: "8vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgb(80, 72, 229)",
            }}
          >
            <Typography variant="h5" color="white">
              {props.selectedOrder.raw_name}
            </Typography>
            <Button onClick={() => props.setDrawer(() => false)} sx={{ color: "white" }}>
              <CloseIcon />
            </Button>
          </Box>

          <Box
            className="action"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "90%",
              height: "8vh",
              marginTop: "8%",
              backgroundColor: "rgb(243, 244, 246)",
              borderRadius: "10px",
            }}
          >
            <Typography variant="subtitle2">Summery</Typography>
            <Box sx={{ width: "60%", display: "flex", justifyContent: "space-evenly" }}>
              <Button size="small" variant="outlined">
                Monthly
              </Button>
              <Button size="small" variant="outlined">
                Yearly
              </Button>
              <Button size="small">All</Button>
            </Box>
          </Box>

          <Box sx={{ width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
            <Typography variant="h6" sx={{ marginTop: "5%" }}>
              Details
            </Typography>
            <Box
              sx={{
                paddingTop: "7%",
                borderBottom: 1,
                borderColor: "rgb(230, 232, 240)",
                paddingBottom: "5%",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Material Code:
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_materialcode}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Stock at hand:
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_quantity} {props.selectedOrder.raw_materialunit}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Stock recived
                </Typography>
                <Box sx={{ width: "70%" }}>
                  <Typography variant="subtitle2" color="primary">
                    {props.selectedOrder.raw_date}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  specification
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_spec}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Describtion:
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Value
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_value}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <Typography variant="subtitle1" sx={{ width: "35%" }}>
                  Remark
                </Typography>
                <Typography variant="subtitle2" sx={{ width: "70%" }}>
                  {props.selectedOrder.raw_remark}
                </Typography>
              </Box>
            </Box>
            { }
            {/* <Box sx={{ ml: -2 }}>
              <MaterialTable
                title="Daily stock recived"
                data={recived}
                columns={ReceviedColumns}
                options={{
                  search: false,
                  paging: false,
                }}
              />
            </Box>

            <Box sx={{ ml: -2 }}>
              <MaterialTable
                title="Daily stock issued"
                data={issued}
                columns={IssuedColumns}
                options={{
                  search: false,
                  paging: false,
                }}
              />
            </Box> */}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default RightDrawer;
