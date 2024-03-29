import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Router from "next/router";
import waxios from "../../../components/wareHouseAxios";
import { useSnackbar } from "notistack";
import CustomAlert from "../../../components/alert";
import Cookies from "js-cookie";

const RawMaterial = () => {
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState();
  const [item, setItem] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    { title: "Date", field: "mat_requestdate" },
    { title: "Name", field: "mat_requestname" },
    { title: "UOM", field: "mat_unit" },
    { title: "Quantity", field: "mat_quantity" },
    { title: "Material Code", field: "mat_materialcode" },
    { title: "Department", field: "mat_reqpersonid" },
    { title: "Status", field: "mat_status" },
  ];

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  useEffect(() => {
    waxios
      .get("/showStoreRequestion")
      .then((resp) => {
        const rawMaterial = resp.data.filter((raw) => raw.req_materialtype.includes("RAW"));
        const pending = rawMaterial.filter((pending) => pending.mat_status.includes("PENDING"));
        rawMaterial.map((eachData) => {
          eachData.mat_requestdate = convert(eachData.mat_requestdate);
          eachData.mat_quantity = parseFloat(eachData.mat_quantity).toLocaleString("en-US");
        });
        setData(rawMaterial);
      })
      .catch((error) => {
        console.log(error, "sdfgsdfgsdfgsdfg");
      });
    setUser(JSON.parse(Cookies.get("user")));
  }, []);
  const accept = (id) => {
    waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Accept",
      })
      .then(function (response) {
        if (response.data.message === "no_material") {
          setItem(response.data.materials[0].raw_name);
          setDialogOpen(true);
          console.log(response);
        } else {
          console.log(response);
          waxios
            .post("/sendNotification", {
              To: "warehouse",
              message: "New Raw Material Item Requestion Accepted",
            })
            .then((respo) => {
              enqueueSnackbar("Notification Sent", { variant: "success" });
            });
          Router.push("/warehouse/requesteditems/RawMaterial");
          enqueueSnackbar("Item Accepted", { variant: "success" });
        }
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Something went wrong", { variant: "error" });

        setDialogOpen(true);
      });
  };

  const decline = async (id) => {
    await waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Decline",
      })
      .then(function (response) {
        console.log(response, "scasdcasdc");
        setIsSuccess("info");
        setAlertMsg("Item Rejected");
        enqueueSnackbar("Item Rejected", { variant: "warning" });
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess("error");
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };
  return (
    <>
      <Head>
        <title>RawMaterial</title>
      </Head>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <h1>Item Unavailable</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="flex flex-row gap-1 items-end">
              <h1 className="font-bold text-lg text-black">Item Name: </h1>
              <p>{item && item}</p>
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
      {isSuccess != "" ? (
        <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
      ) : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          my: 12,
        }}
      >
        <Container maxWidth="ml">
          <Card maxWidth="lg">
            {user && user.role === "Super Admin" ? (
              <Table
                title="Raw Material requested"
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
              <Table title="Raw Material requested" data={data} columns={columns} />
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

RawMaterial.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RawMaterial;
