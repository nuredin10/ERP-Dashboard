import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "../Table";
import { Card } from "@mui/material";

export const CustomerListResults = ({ customers, ...rest }) => {
  // const columns = [
  //   {
  //     title: "Name",
  //     field: "name",
  //   },
  //   {
  //     title: "Company",
  //     field: "company",
  //   },
  //   {
  //     title: "City",
  //     field: "city",
  //   },
  //   {
  //     title: "State",
  //     field: "state",
  //   },
  // ];

  // const data = [
  //   { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  //   { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  //   { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  //   { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
  // ];

  const [data, setData] = useState([]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);

  // var data = {
  //   "VERSION": "2006-10-27.a",
  //   "JOBNAME": "EXEC_",
  //   "JOBHOST": "Test",
  //   "LSFQUEUE": "45",
  //   "LSFLIMIT": "2006-10-27",
  //   "NEWUSER": "3",
  //   "NEWGROUP": "2",
  //   "NEWMODUS": "640"
  // };

  // const [col, setCol] = useState([]);
  // useEffect(()=>{

    data.map((item)=>{
      console.log(item);
    })
    

  // Object.keys(data).forEach(function (key) {
  // });

  return (
    <Card {...rest}>
      <Table data={data} columns={columns}></Table>
      {/* <MaterialTable icons={tableIcons} data={data} columns={columns} /> */}
      {/* <MUIDataTable title={"Employee List"} data={customers} columns={columns} options={options} 
        components={{
                  Details: Details,
                }} /> */}
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
