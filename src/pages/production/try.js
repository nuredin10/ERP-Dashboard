import React, { useState, useEffect } from "react";
import { Button, Modal, Paper } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import axios from "../../components/productionWxios";
// import axios from "axios";
import AddBatchFormula from "src/components/product/addbatchFormula";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
// import paxios from '../../'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "65%",
    top: "10%",
    left: "20%",

    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "75%", // fixed height
    overflow: "scroll", // scrollable
  },
}));
const ProductionOrder = () => {
  const [open, setOpen] = React.useState(false);

  const [customOrRegular, setCustomOrRegular] = React.useState("custom");
  const [indata, setIndata] = useState();
  const router = useRouter();
  const { id } = router.query;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orderInfo, setOrderInfo] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/showbatchformula")
      .then((res) => {
        setRegular(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log("Id", id);
  }, []);

  // console.log(selectedRegualr, "yooooooooo");

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  var newForm;
  const newRequest = (data) => {
    if (customOrRegular === "regular") {
      newForm = {
        ...data,
        batch_id: selectedRegualr,
        custom_regular: customOrRegular,
        status: "New",
        start_dateTime: convert(startDate),
        end_dateTime: convert(endDate),
        salesID: indata.salesID,
        GMID: indata.id,
      };
    } else {
      newForm = {
        ...data,
        raw_needed: JSON.stringify(orderInfo),
        custom_regular: customOrRegular,
        start_dateTime: convert(startDate),
        end_dateTime: convert(endDate),
        status: "New",
        salesID: indata.salesID,
        GMID: indata.id,
      };
    }

    axios
      .post("/addProductionOrder", newForm)
      .then((res) => {
        console.log(res);
        setIsSuccess("success");
        setAlertMsg("Production Order Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess("error");
        setAlertMsg("Error Occured");
      });
    console.log(newForm);
  };

  return (
    <>
      <>
        <Button
          className="w-40 bg-[#61482A]  text-white font-bold text-md hover:shadow-lg hover:bg-[#EBE5D8] hover:text-[#61482A]"
          onClick={handleOpen}
        >
          Add
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="scrollable-modal-title"
          aria-describedby="scrollable-modal-description"
        >
          <Paper className={classes.paper}>
            <AddBatchFormula setOrderInfo={setOrderInfo} handleClose={handleClose} />
          </Paper>
        </Modal>
      </>
    </>
  );
};

ProductionOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrder;
