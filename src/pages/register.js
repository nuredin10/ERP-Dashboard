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
      // router.push('/');
      console.log("formik");
      var data = formik.values;
      authAxois.post('/signup', { data, roles: oroles }).then(function (response) {
        if (response.data.message == 'success') {
          console.log('Sign Up Success');
          enqueueSnackbar('Signup Success', { variant: 'success' });

          router.push('/');
        } else if (response.data.message == 'fail') {
          console.log('Signig in Failed');
          enqueueSnackbar('Signup Fialed', { variant: 'error' });

        }
      });
      // console.log(formik.values);
    },
  });
  const roles = [
    { label: "Super Admin" },
    { label: "Sales" },
    { label: "Production" },
    { label: "Ware House" },
    { label: "Finance" }
  ]
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
            {/* <SelectfullWidth
              variant="outlined"
              value={formik.values.role}
              label="Role"
              name="role"
              onChange={formik.handleChange}
              placeholder=''
            >
              <MenuItem value="Super Admin">Super Admin</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
              <MenuItem values="Ware House">Ware House</MenuItem>
              <MenuItem values="Ware House">Finance</MenuItem>
            </Select> */}
{/* 
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
            </Select> */}

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                // color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
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