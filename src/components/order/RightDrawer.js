import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, Container, Typography, Grid, Divider, Button } from "@mui/material";
import { ButtonGroup } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const RightDrawer = (props) => {

  return (
    <Box>
      {/* <h1>asdc</h1> */}
      <Drawer variant={"persistent"} open={props.drawer} onClose={() => props.setDrawer(false)} anchor={'right'}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25vw', minHeight: '93vh', height: 'auto', marginTop: '7vh', border: 1, borderColor: "rgb(243, 244, 246)" }}>
          <Box className='header' sx={{ paddingLeft: '5%', paddingRight: '5%', width: '100%', height: '8vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgb(80, 72, 229)' }}>
            <Typography variant='h5' color="white">101</Typography>
            <Button onClick={() => props.setDrawer(() => (false))} sx={{ color: 'white' }}><CloseIcon/></Button>
          </Box>


          <Box className='action' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%', height: '8vh', marginTop: '8%', backgroundColor: 'rgb(243, 244, 246)', borderRadius: '10px' }}>
            <Typography variant="subtitle2" >ACTION</Typography>
            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-evenly' }}>
              <Button size='small' variant='contained'>Approve</Button>
              <Button size='small' variant="outlined">Reject</Button>
              <Button size='small'><EditIcon />Edit</Button>
            </Box>
          </Box>

          <Box sx={{ width: '100%', paddingLeft: '5%',paddingRight: '5%',}}>
            <Typography variant="h6" sx={{ marginTop: '5%'}}>Details</Typography>
            <Box sx={{  paddingTop: '7%', borderBottom: 1, borderColor: "rgb(230, 232, 240)", paddingBottom: '5%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>ID</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.Id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%"}}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>Number</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.OrderNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%" }}>
                <Typography variant='subtitle1' sx={{ width: "35%", }}>Customer</Typography>
                <Box sx={{ width: "70%" }}>
                  <Typography variant='subtitle2' color="primary" >{ props.selectedOrder.Customer && props.selectedOrder.Customer.Name}</Typography>
                  <Typography variant='subtitle2' >{props.selectedOrder.Customer && props.selectedOrder.Customer.Street}</Typography>
                  <Typography variant='subtitle2' >{props.selectedOrder.Customer && props.selectedOrder.Customer.Country}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%" }}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>Date</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.Date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%" }}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>Promotion Code</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.PromotionCode}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%" }}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>Total Amount</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.TotalAmount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "5%" }}>
                <Typography variant='subtitle1' sx={{ width: "35%" }}>Status</Typography>
                <Typography variant='subtitle2' sx={{ width: "70%" }}>{props.selectedOrder.status}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default RightDrawer