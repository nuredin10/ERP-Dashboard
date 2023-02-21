import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Sales = (props) => {
  const theme = useTheme();

  const [thisYear, setthisYear] = useState([]);
  const [lastYear, setlastYear] = useState([]);

  function fetchforGraph() {
    axios
      .get("https://report.proplast.et/salesTotalYearly")
      .then((res) => {
        console.log(res.data);
        var localthisYear = [];
        var locallastYear = [];

        for (let singleAr of res.data) {
          localthisYear.push(singleAr[0].current_year_month_total_cost);
          locallastYear.push(singleAr[0].last_year_month_total_cost);
        }
        setthisYear(localthisYear);
        setlastYear(locallastYear);

        console.log(thisYear);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchforGraph();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 50.5,
        data: thisYear,
        label: "This year",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#EEEEEE",
        barPercentage: 50.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: lastYear,
        label: "Last year",
        maxBarThickness: 10,
      },
    ],
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          // beginAtZero: true,
          // min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
            
          </Button>
        }
        title="Yearly Sales Total"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box>
    </Card>
  );
};
