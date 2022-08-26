import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import AddCustomer from "src/components/AddCustomer";

const Customers = () => {
  const [customerList, setCustomerList] = useState(customers);
  const [newCustomer, setNewCustomer] = useState(false);

  useEffect(() => {
    setCustomerList(customers);
  }, []);
  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false} >
          {newCustomer ? (
            <AddCustomer />
          ) : (
            <>
              <CustomerListToolbar
                setNewCustomer={setNewCustomer}
                setCustomerList={setCustomerList}
                customerList={customerList}
              />
              <Box sx={{ mt: 3 }}>
                <CustomerListResults customers={customerList} />
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
