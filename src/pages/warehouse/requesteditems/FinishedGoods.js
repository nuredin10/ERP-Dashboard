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

const FinishedGoods = () => {
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    { title: "Name", field: "mat_requestname" },
    { title: "Date", field: "mat_requestdate" },
    { title: "Department", field: "mat_requestdept" },
    { title: "Person Id", field: "mat_reqpersonid" },
    { title: "Description", field: "mat_description" },
    { title: "Quantity", field: "mat_quantity" },
    { title: "Status", field: "mat_status" },
  ];

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
        console.log(response);
        if (response.data.message === "no_material") {
          setItem(response.data.materials[0].accs_name);
          setDialogOpen(true);
        } else {
          console.log(response);
          // Router.push("/warehouse/requesteditems/FinishedGoods");
          // setIsSuccess('success');
          // setAlertMsg('Item Accepted')
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
