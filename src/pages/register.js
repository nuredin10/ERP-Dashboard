import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import authAxois from "../components/authAxios";
import axios from "axios";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MenuItem, Select } from "@material-ui/core";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useSnackbar } from "notistack";
import CButton from '../components/Button'
const Register = () => {
  const router = useRouter();
  const [oroles, setOroles] = useState();
  const [role, setRole] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      personId: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      // oroles: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      personId: Yup.string().max(255).required("Person Id is required"),
      userName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().max(255).required("Confirm Password is required"),
    }),

    onSubmit: () => {
      const data = {
        alldata: {
          ...formik.values,
          oroles: role,
        },
      };
      authAxois
        .post("/signup", data)
        .then((res) => {
          console.log(res);
          if (res.data.message === "signedup") {
            enqueueSnackbar("User created successfully", { variant: "success" });
          } else if (res.data.message === "email already exist") {
            enqueueSnackbar("Email Already Exist", { variant: "error" });
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Error creating user", { variant: "error" });
        });
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.personId && formik.errors.personId)}
              fullWidth
              helperText={formik.touched.personId && formik.errors.personId}
              label="Person Id"
              margin="normal"
              name="personId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.personId}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="User Name"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              fullWidth
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              label="Confirm Password"
              margin="normal"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
              variant="outlined"
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="Super Admin">Super Admin</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
              <MenuItem value="Ware House">Ware House</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Procument">Procument</MenuItem>
            </Select>
            <Box sx={{ py: 2 }}>
              <CButton
                // color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                // size="large"
                // type="submit"
                // variant="contained"
                
              >
                Sign Up Now
              </CButton>
            </Box>
            {/* <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography> */}
          </form>
        </Container>
      </Box>
    </>
  );
};
Register.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Register;