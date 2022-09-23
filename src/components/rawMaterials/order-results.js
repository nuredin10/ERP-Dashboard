import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Divider, Avatar, Button } from "@mui/material";
import { border, flexbox } from "@mui/system";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const OrderResults = (props) => {
  const data = props.data;

  const [status, setStatus] = useState("green");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const orderOnClickHandler = (e, data) => {
  
    axios
      .post("http://localhost:59000/showSummeryByID", {
        id: e.id,
        materialType: "RAW",
      })
      .then(function (response) {
        props.setSummery(response.data);
      });

    props.setSelectedOrder(e);
    props.setDrawer(true);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Add catagories" {...a11yProps(0)} />

        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) => (
              <Grid
                onClick={() => orderOnClickHandler(e)}
                item
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(55, 65, 81, 0.04)",
                  },
                  display: "flex",
                  alignItems: "center",
                  height: "10vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderColor: "rgb(229, 231, 235)",
                }}
                lg={12}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: "70%",
                      width: 56,
                      borderRadius: "15px",
                      backgroundColor: "rgb(229, 231, 235)",
                      padding: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                  </Box>
                  <Box sx={{ marginLeft: "20%" }}>
                    <Typography variant="h6">{e.raw_name}</Typography>
                    <Typography variant="body1">{e.raw_spec}</Typography>
                  </Box>
                </Box>
                {}
                <Box
                  className={"pending-status"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "30px",
                    color: "white",
                    width: 110,
                    height: 30,
                    marginLeft: "10%",
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel
        value={value}
        index={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) =>
              e.raw_name == "PVC" ? (
                <Grid
                  onClick={() => orderOnClickHandler(e)}
                  item
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(55, 65, 81, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "rgb(229, 231, 235)",
                  }}
                  lg={12}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant="h6">{e.raw_name}</Typography>
                      <Typography variant="body1">{e.raw_spec}</Typography>
                    </Box>
                  </Box>
                  {}
                  <Box
                    className={"pending-status"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      color: "white",
                      width: 110,
                      height: 30,
                      marginLeft: "10%",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel
        value={value}
        index={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) =>
              e.raw_name == "PPR" ? (
                <Grid
                  onClick={() => orderOnClickHandler(e)}
                  item
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(55, 65, 81, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "rgb(229, 231, 235)",
                  }}
                  lg={12}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant="h6">{e.raw_name}</Typography>
                      <Typography variant="body1">{e.raw_spec}</Typography>
                    </Box>
                  </Box>
                  {}
                  <Box
                    className={"pending-status"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      color: "white",
                      width: 110,
                      height: 30,
                      marginLeft: "10%",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel
        value={value}
        index={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) =>
              e.raw_name == "Fitting" ? (
                <Grid
                  onClick={() => orderOnClickHandler(e)}
                  item
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(55, 65, 81, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "rgb(229, 231, 235)",
                  }}
                  lg={12}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant="h6">{e.raw_name}</Typography>
                      <Typography variant="body1">{e.raw_spec}</Typography>
                    </Box>
                  </Box>
                  {}
                  <Box
                    className={"pending-status"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      color: "white",
                      width: 110,
                      height: 30,
                      marginLeft: "10%",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel
        value={value}
        index={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) =>
              e.raw_name == "PVC" ? (
                <Grid
                  onClick={() => orderOnClickHandler(e)}
                  item
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(55, 65, 81, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "rgb(229, 231, 235)",
                  }}
                  lg={12}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant="h6">{e.raw_name}</Typography>
                      <Typography variant="body1">{e.raw_spec}</Typography>
                    </Box>
                  </Box>
                  {}
                  <Box
                    className={"pending-status"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      color: "white",
                      width: 110,
                      height: 30,
                      marginLeft: "10%",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel
        value={value}
        index={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          color: "white",
          width: 110,
          height: "4vh",
          marginLeft: "10%",
        }}
      >
        <Box className={`${props.drawer ? "drawer-open" : "drawer-close"}`} sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) =>
              e.raw_name == "Condute" ? (
                <Grid
                  onClick={() => orderOnClickHandler(e)}
                  item
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(55, 65, 81, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    height: "10vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "rgb(229, 231, 235)",
                  }}
                  lg={12}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.id}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant="h6">{e.raw_name}</Typography>
                      <Typography variant="body1">{e.raw_spec}</Typography>
                    </Box>
                  </Box>
                  {}
                  <Box
                    className={"pending-status"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      color: "white",
                      width: 110,
                      height: 30,
                      marginLeft: "10%",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{e.raw_materialcode}</Typography>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};
