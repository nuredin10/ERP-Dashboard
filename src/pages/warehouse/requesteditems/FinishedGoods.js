import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import waxios from "../../../components/wareHouseAxios";
import CustomAlert from "../../../components/alert";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import Router from "next/router";

const FinishedGoods = () => {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState();
  const [item, setItem] = useState();
  const [lowInStock, setLowInStock] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    { title: "Date", field: "mat_requestdate" },
    { title: "Name", field: "mat_requestname" },
    { title: "Quantity", field: "mat_quantity" },
    { title: "Description", field: "mat_description" },
    { title: "Color", field: "finished_Color" },
    { title: "Person Id", field: "mat_reqpersonid" },
    { title: "Status", field: "mat_status" },
  ];
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    waxios
      .get("/showStoreRequestion")
      .then((resp) => {
        console.log(resp.data);
        const finishedData = resp.data.filter((finish) => finish.req_materialtype.includes("FIN"));
        finishedData.map((eachData) => {
          eachData.mat_requestdate = convert(eachData.mat_requestdate);
        });
        setData(finishedData);
      })
      .catch((error) => {
        console.log(error, "sdfgsdfgsdfgsdfg");
      });

    setUser(JSON.parse(Cookies.get("user")));

    // fetch("https://versavvy.com/ERP_backend/wareHouse/showStoreRequestion")
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     console.log(resp)
    //     // const finishedData = resp.filter((finish) => finish.req_materialtype.includes("FIN"));
    //     // const pending = finishedData.filter((pending) => pending.mat_status.includes("PENDING"));
    //     // setData(pending);
    //   });
  }, []);

  const accept = (id) => {
    waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Accept",
      })
      .then(function (response) {
        if (response.data.message === "no_material") {
          setItem(response.data.materials[0].fin_name);
          setDialogOpen(true);
        } else if (response.data.message === "Low in stock") {
          setLowInStock(true);
          setDialogOpen(true);
          // setItem(response.data.materials[0].fin_name);
          console.log("lowwwww");
        } else {
          console.log(response);
          // Router.push("/warehouse/requesteditems/FinishedGoods");
          // setIsSuccess('success');
          // setAlertMsg('Item Accepted')
          enqueueSnackbar("Item Accepted", { variant: "success" });
        }
        console.log(response.data.materials[0].fin_name);
      })
      .catch(function (error) {
        console.log("eeeerrrrrrrrrrrrrr", error);
        enqueueSnackbar("Something went wrong", { variant: "error" });

        // setDialogOpen(true);
      });
  };

  const decline = async (id) => {
    await waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Decline",
      })
      .then(function (response) {
        console.log(response);
        setIsSuccess("info");
        setAlertMsg("Item Rejected");
        enqueueSnackBar("Item Rejected", { variant: "warning" });
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };
  // const [finished, setFinished] = useState([]);

  // useEffect(()=>{
  //   const finishedData = data.filter( (finish) => finish.req_materialtype.includes("ACCS"))
  //   setFinished(finishedData)
  // },[])
  return (
    <>
      <Head>
        <title>Finished Goods</title>
      </Head>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {lowInStock ? <h1>Item Unavailable</h1> : <h1>Item Low In Stock</h1>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="flex flex-row gap-1 items-end">
              {lowInStock ? (
                <h1 className="font-bold text-lg text-black">Add more item to the stock</h1>
              ) : (
                <>
                  <h1 className="font-bold text-lg text-black">Item Name: </h1>
                  <p>{item && item}</p>
                </>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "purple",
            }}
            onClick={() => Router.push("/warehouse/PurchaseOrder")}
          >
            Purchase
          </Button>
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* {isSuccess != "" ? (
        <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
      ) : null} */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          my: 12,
        }}
      >
        <Container maxWidth="ml">
          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
            {user && user.role === "Super Admin" ? (
              <Table
                title="Finished Goods"
                data={data}
                columns={columns}
                actions={[
                  (rowData) => ({
                    icon: () => <DoneIcon sx={{ color: "green" }} />,
                    tooltip: "Accpet ",
                    onClick: () => accept(rowData.id),
                  }),
                  (rowData) => ({
                    icon: () => <CloseIcon sx={{ color: "red" }} />,
                    tooltip: "Reject ",
                    onClick: () => decline(rowData.id),
                  }),
                ]}
              />
            ) : (
              <Table title="Finished Goods" data={data} columns={columns} />
            )}

            {/* <Typography sx={{ mb: 3 }} variant="h4">
          Supplier
        </Typography> */}
          </Card>
        </Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
