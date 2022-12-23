import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme,Grid } from '@mui/material';
import React, { useState, useEffect } from "react";
import axios from "axios";

export const TrafficByDevice = (props) => {
  const theme = useTheme();

  const [listtotal, setListTotal] = useState([]);
  useEffect(() => {
    axios
      .get("https://report.proplast.et/donutgraph")
      .then((res) => {
        console.log("Donut", res.data)
        setListTotal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    datasets: [
      {
        data: listtotal,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['UPVC', 'PPR', 'HDPE', 'UPVC fittings', 'PPR Fitting', 'Condutes']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'UPVC',
      value: listtotal[0],
      color: '#3F51B5'
    },
    {
      title: 'PPR',
      value: listtotal[1], 
      color: '#E53935'
    },
    {
      title: 'HDPE',
      value: listtotal[2],
      color: '#FB8C00'
    },
    {
      title: 'UPVC fittings',
      value: listtotal[3],
      color: '#FB8C00'
    },
    {
      title: 'PPR Fitting',
      value: listtotal[4],
      color: '#EBE5D8'
    },
    {
      title: 'Condutes',
      value: listtotal[5],
      color: '#61482A'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Product Sales" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Grid container>

          {devices.map(({
            color,
               title,
            value
          }) => (
            <Grid
              item
              lg={4}
              sm={4}
              xs={4}
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}
            >
              
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h5"
              >
                {value}
                %
              </Typography>
            </Grid>
          ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
