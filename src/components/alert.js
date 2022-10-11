import React,{useState, useEffect} from 'react'
import {Alert } from '@mui/material'

const CustomAlert = ({ type, message, setIsSuccess }) => {
  const [show, setShow] = useState(true)

  const alertStyle = {
    postion: "absolute",
    top: '20vh',
    left: '10%',
    ml: "20%",
    mt: 3,
    height: '10%',
    width: '20%',
    color: 'white'
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    setIsSuccess('')
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert sx={alertStyle} variant="filled" severity={type}>{message}</Alert>
  )
}

export default CustomAlert