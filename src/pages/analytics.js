import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { Doughnut, Line, Bar, Scale, BubbleController, RadarController, TimeScale } from 'react-chartjs-2';
import {Area} from 'react-chartjs-2'
import { Pie } from "react-chartjs-2";
import { Participant } from "react-chartjs-2"
import { UserData } from '../__mocks__/Data';
import { Budget } from '../components/dashboard/budget';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { Sales } from '../components/dashboard/sales';
// import Grid from '@mui/material/Grid'; 
// import RichTextEditor from 'src/components/rich-text-editor.js/RichTextEditor';

const Analytics = () => {
  console.log('module ', Participant)

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "gray",
        borderWidth: 2,
      },
    ],
  });


  return (

    <>
      <Head>
        <title>
          Analytics | Material Kit
        </title>
      </Head>
      <Box>
        <Container maxWidth={false}>
          <Typography variant='h1'>Analytics</Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TasksProgress />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
            <Grid item xs={4}>
              <Doughnut data={userData} width="10" />
            </Grid>
            <Grid item xs={6}>
              <Bar data={userData} />
            </Grid>
            <Grid item xs={6}>
              <Line data={userData} width="10" height='5' />
            </Grid>
             {/* <Grid item xs={6}>
              <Line data={userData} />
            </Grid> */}
            {/* <Grid item xs={6}>
              <Area data={userData} width="10" />
            </Grid> */}
            {/*<Grid item xs={6}>
              <RadarController data={userData} />
            </Grid>
            <Grid item xs={8}>
              <TimeScale data={userData} />
            </Grid> */}
          </Grid>
          {/* <RichTextEditor /> */}
        </Container>
      </Box>
    </>
  )
}
Analytics.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Analytics;
