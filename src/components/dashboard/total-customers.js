import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const TotalCustomers = (props) => {
  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  const [total, setTotal] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:12000/getuncollectedMoney")
      .then((res) => {
        const formatedCash = nFormatter(res.data.Total);
        setTotal(formatedCash);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL UNCOLLECTED
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {total} ETB
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        ></Box>
      </CardContent>
    </Card>
  );
};
