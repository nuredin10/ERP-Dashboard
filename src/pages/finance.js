import Head from "next/head";
import { Box, Container, Typography, Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { Sales } from "../components/finance/sales";
import { Cost } from "../components/finance/cost";
import { Profit } from "../components/finance/profit";
// import styles from '../styles/Home.module.css';

const Finance = () => {
  return (
    <>
      <Head>
        <title>Finance | Material Kit</title>
      </Head>
      <Box component="main"

      >
        <Container maxWidth={false}>
          <Typography variant="h1">Finance</Typography>
          <Box>
            <Container maxWidth={false}>
              <Grid container spacing={2}>
                <Grid item lg={4} sm={6} xs={12}>
                  <Sales />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Cost />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Profit/>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Finance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Finance;
