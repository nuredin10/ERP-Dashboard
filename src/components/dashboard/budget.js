import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SettingsBrightness } from "@material-ui/icons";

export const Budget = (props) => {
  const [total, setTotal] = useState();
  const [sign, setSign] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  });

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

  useEffect(() => {
    axios
      .get("http://localhost:11000/getProfit")
      .then((res) => {
        var totalProfit = 0.0;
        console.log(res.data);
        res.data.forEach((sing) => {
          
          totalProfit += parseFloat(sing.profit);
        });
        if(totalProfit > 0){
          setTotal(nFormatter(323456, 2));
        }else{
          setSign("-");
         const withoutSign = parseFloat(totalProfit) * -1
          setTotal(nFormatter(withoutSign, 2));
        }
        console.log(totalProfit)
        // setTotal(nFormatter(totalProfit, 2));

        console.log(total);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {sign} {total} ETB
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          
        </Box>
      </CardContent>
    </Card>
  );
};
