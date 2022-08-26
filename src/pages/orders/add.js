import Head from "next/head";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Container, Typography, Grid } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import AddForm from '../../components/order/AddForm'
// import styles from '../styles/Home.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';

const Add = () => {
  return (
    <>
      <Head>
        <title>Add Order| Material Kit</title>
      </Head>

      <Box
        sx={{ width: '100%', height: '100vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
                sx={{ width: '100%', height: '100vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}

        <AddForm />
      </Box>
    </>
  );
};

Add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Add;
