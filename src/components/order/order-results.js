import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Divider, Avatar, Button } from "@mui/material";
import { border, flexbox } from '@mui/system';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const OrderResults = (props) => {
  const data = [
    {
      Id: '5ecb8a7f738cc572a9ce0277',
      Date: "AUG 9",
      OrderNumber: 101,
      Total: "$500.00",
      status: "Pending",
      Customer: {
        Name: 'Miron Vitold',
        Street: 'Street John Wick, no. 7',
        Country: 'San Diego'
      },
      PromotionCode: '',
      TotalAmount: '$500'
    },
    {
      Id: '6ert4f8a795e53f134013eba3b',
      Date: "AUG 12",
      OrderNumber: 102,
      Total: "$600.00",
      status: "Complete",
      Customer: {
        Name: 'Anthonio Jhon',
        Street: 'Street John Wick, no. 9',
        Country: 'Francisco'
      },
      PromotionCode: '',
      TotalAmount: '$400'
    },
    {
      Id: 'sdgjh345j23nmzs2323',
      Date: "AUG 13",
      OrderNumber: 103,
      Total: "$300.00",
      status: "Pending",
      Customer: {
        Name: 'Miron Vitold',
        Street: 'Street John Wick, no. 7',
        Country: 'San Diego'
      },
      PromotionCode: '',
      TotalAmount: '$600'
    },
    {
      Id: '75sdfgwe23qwer234',
      Date: "AUG 8",
      OrderNumber: 106,
      Total: "$600.00",
      status: "Canceled",
      Customer: {
        Name: 'Mara Max',
        Street: 'Street John Wick, no. 7',
        Country: 'Florida'
      },
      PromotionCode: '',
      TotalAmount: '$900'
    },
    {
      Id: '1234werqwe523e',
      Date: "AUG 9",
      OrderNumber: 105,
      Total: "$500.00",
      status: "Rejected",
      Customer: {
        Name: 'Sandrick Vitold',
        Street: 'Street John Wick, no. 7',
        Country: 'San Diego'
      },
      PromotionCode: '',
      TotalAmount: '$300'
    },
    {
      Id: '5ecb8a795e53f134013eba3b',
      Date: "AUG 8",
      OrderNumber: 102,
      Total: "$600.00",
      status: "Complete",
      Customer: {
        Name: 'someone',
        Street: 'Street John Wick, no. 7',
        Country: 'Francisco'
      },
      PromotionCode: '',
      TotalAmount: '$400'
    },
    {
      Id: '5ecb8a7f738cc572a9ce0277',
      Date: "AUG 9",
      OrderNumber: 101,
      Total: "$500.00",
      status: "Canceld",
      Customer: {
        Name: 'Miron Vitold',
        Street: 'Street John Wick, no. 7',
        Country: 'San Diego'
      },
      PromotionCode: '',
      TotalAmount: '$500'
    },
    {
      Id: '5ecb8a795e53f134013eba3b',
      Date: "AUG 8",
      OrderNumber: 102,
      Total: "$600.00",
      status: "Canceld",
      Customer: {
        Name: 'someone',
        Street: 'Street John Wick, no. 7',
        Country: 'Francisco'
      },
      PromotionCode: '',
      TotalAmount: '$400'
    },
    {
      Id: '5ecb8a7f738cc572a9ce0277',
      Date: "AUG 9",
      OrderNumber: 101,
      Total: "$500.00",
      status: "Pending",
      Customer: {
        Name: 'Miron Vitold',
        Street: 'Street John Wick, no. 7',
        Country: 'San Diego'
      },
      PromotionCode: '',
      TotalAmount: '$500'
    },
    {
      Id: '5ecb8a795e53f134013eba3b',
      Date: "AUG 8",
      OrderNumber: 102,
      Total: "$600.00",
      status: "Complete",
      Customer: {
        Name: 'someone',
        Street: 'Street John Wick, no. 7',
        Country: 'Francisco'
      },
      PromotionCode: '',
      TotalAmount: '$400'
    },

  ]

  const [status, setStatus] = useState('green');
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const orderOnClickHandler = (e, data)=>{
    console.log(e);
    props.setSelectedOrder(e);
    // console.log('spmwewrwer')
    props.setDrawer(true)
  }
  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Canceld" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
          <Tab label="Pending" {...a11yProps(3)} />
          <Tab label="Rejected" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className={`${props.drawer ? 'drawer-open' : 'drawer-close'}`} sx={{ mt: 3 }}>
          <Grid container >
            {data.map((e, i) => (

              <Grid onClick={()=>orderOnClickHandler(e)} item sx={{
                "&:hover": {
                  backgroundColor: 'rgba(55, 65, 81, 0.04)'
                }, display: "flex", alignItems: "center", height: "10vh", width: "100%", display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "rgb(229, 231, 235)"
              }} lg={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: "70%",
                      width: 56,
                      borderRadius: "15px",
                      backgroundColor: "rgb(229, 231, 235)",
                      padding: 1,
                      textAlign: "center"
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>{e.Date}</Typography>
                  </Box>
                  <Box sx={{ marginLeft: "20%" }}>
                    <Typography variant='h6'>{e.OrderNumber}</Typography>
                    <Typography variant='body1'>{e.Total}</Typography>
                  </Box>
                </Box>
                {

                }
                <Box className={e.status == 'Pending' ? 'pending-status' : (e.status == 'Complete' ? 'complete-status' : (e.status == 'Rejected' ? 'reject-status' : 'canceld-status'))} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "30px", color: 'white', width: 110, height: 30, marginLeft: "10%" }}>
                  <Typography sx={{ textAlign: "center" }}>{e.status}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) => (
              e.status == 'Canceld' ? (

                <Grid onClick={()=>orderOnClickHandler(e)} item sx={{
                  "&:hover": {
                    backgroundColor: 'rgba(55, 65, 81, 0.04)'
                  }, display: "flex", alignItems: "center", height: "10vh", width: "100%", display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "rgb(229, 231, 235)"
                }} lg={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center"
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.Date}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant='h6'>{e.OrderNumber}</Typography>
                      <Typography variant='body1'>{e.Total}</Typography>
                    </Box>
                  </Box>
                  {

                  }
                  <Box className={e.status == 'Pending' ? 'pending-status' : (e.status == 'Complete' ? 'complete-status' : (e.status == 'Rejected' ? 'reject-status' : 'canceld-status'))} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "30px", color: 'white', width: 110, height: "4vh", marginLeft: "10%" }}>
                    <Typography sx={{ textAlign: "center" }}>{e.status}</Typography>
                  </Box>
                </Grid>
              ) : null
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) => (
              e.status == 'Complete' ? (

                <Grid onClick={()=>orderOnClickHandler(e)} item sx={{
                  "&:hover": {
                    backgroundColor: 'rgba(55, 65, 81, 0.04)'
                  }, display: "flex", alignItems: "center", height: "10vh", width: "100%", display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "rgb(229, 231, 235)"
                }} lg={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center"
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.Date}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant='h6'>{e.OrderNumber}</Typography>
                      <Typography variant='body1'>{e.Total}</Typography>
                    </Box>
                  </Box>
                  {

                  }
                  <Box className={e.status == 'Pending' ? 'pending-status' : (e.status == 'Complete' ? 'complete-status' : (e.status == 'Rejected' ? 'reject-status' : 'canceld-status'))} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "30px", color: 'white', width: 110, height: "4vh", marginLeft: "10%" }}>
                    <Typography sx={{ textAlign: "center" }}>{e.status}</Typography>
                  </Box>
                </Grid>
              ) : null
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) => (
              e.status == 'Pending' ? (

                <Grid onClick={()=>orderOnClickHandler(e)} item sx={{
                  "&:hover": {
                    backgroundColor: 'rgba(55, 65, 81, 0.04)'
                  }, display: "flex", alignItems: "center", height: "10vh", width: "100%", display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "rgb(229, 231, 235)"
                }} lg={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center"
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.Date}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant='h6'>{e.OrderNumber}</Typography>
                      <Typography variant='body1'>{e.Total}</Typography>
                    </Box>
                  </Box>
                  {

                  }
                  <Box className={e.status == 'Pending' ? 'pending-status' : (e.status == 'Complete' ? 'complete-status' : (e.status == 'Rejected' ? 'reject-status' : 'canceld-status'))} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "30px", color: 'white', width: 110, height: "4vh", marginLeft: "10%" }}>
                    <Typography sx={{ textAlign: "center" }}>{e.status}</Typography>
                  </Box>
                </Grid>
              ) : null
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            {data.map((e, i) => (
              e.status == 'Rejected' ? (

                <Grid onClick={()=>orderOnClickHandler(e)} item sx={{
                  "&:hover": {
                    backgroundColor: 'rgba(55, 65, 81, 0.04)'
                  }, display: "flex", alignItems: "center", height: "10vh", width: "100%", display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "rgb(229, 231, 235)"
                }} lg={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: "70%",
                        width: 56,
                        borderRadius: "15px",
                        backgroundColor: "rgb(229, 231, 235)",
                        padding: 1,
                        textAlign: "center"
                      }}
                    >
                      <Typography sx={{ fontWeight: "500" }}>{e.Date}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: "20%" }}>
                      <Typography variant='h6'>{e.OrderNumber}</Typography>
                      <Typography variant='body1'>{e.Total}</Typography>
                    </Box>
                  </Box>
                  {

                  }
                  <Box className={e.status == 'Pending' ? 'pending-status' : (e.status == 'Complete' ? 'complete-status' : (e.status == 'Rejected' ? 'reject-status' : 'canceld-status'))} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "30px", color: 'white', width: 110, height: "4vh", marginLeft: "10%" }}>
                    <Typography sx={{ textAlign: "center" }}>{e.status}</Typography>
                  </Box>
                </Grid>
              ) : null
            ))}
          </Grid>
        </Box>
      </TabPanel>

    </Box>

  )
}