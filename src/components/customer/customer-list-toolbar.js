import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { width } from '@mui/system';


export const CustomerListToolbar = (props) => {
  const [searchedInput, setSearchedInput] = useState('')
  const [beforeSearch, setBeforeSearch] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [sortBy, setSortBy] = useState('')

  const addOnClickHandler = () =>{
    props.setNewCustomer(true);
  }

  let result = [];

  const inputOnchangeHandler = (e) => {

    setSearchedInput(e.target.value.toLowerCase())

  }

  useEffect(() => {
    setBeforeSearch(props.customerList);
  }, [])


  useEffect(() => {

    result = props.customerList.filter((data) => {
      return data.name.toLowerCase().search(searchedInput) != -1 || data.phone.toLowerCase().search(searchedInput) != -1 || data.email.toLowerCase().search(searchedInput) != -1;
    });

    if (searchedInput.length === 0) {
      props.setCustomerList(beforeSearch)
    } else {
      props.setCustomerList(result);
    }


  }, [searchedInput])

  let sort = []
  const dropdownHandleChange = (event) => {
    setSortBy(event.target.value)

     // setSearchType(event.target.value.toString());
  };

  useEffect(()=>{
    const sortArray = type => {
      const types = {
        name: 'name',
        phone: 'phone',
        email: 'email',
      };
      const sortProperty = types[type];
      const sorted = [...props.customerList].sort((a, b) => b.name - a.name);
      props.setCustomerList(sorted);
      console.log(sorted)
    };
    sortArray(sortBy);
  },[sortBy])

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Customers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={addOnClickHandler}
          >
            Add Customers
          </Button>
        </Box>
      </Box>
      {/* <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={inputOnchangeHandler}
                value={searchedInput}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{width: '10%', height: '90%'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort"
              onChange={dropdownHandleChange}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </Box> */}
    </Box>
  )
};
