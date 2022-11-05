import React, { useState, useEffect } from 'react'
import { Alert,Box } from '@mui/material'

const CustomAlert = ({ type, message, setIsSuccess }) => {
  const [show, setShow] = useState(true)


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
    <Box sx={{mt: 2, width: '15%', position: 'absolute', right: '2%'}}>
      <Alert sx={{color: 'white'}}  variant="filled" severity={type}>{message}</Alert>
    </Box>
  )
}

export default CustomAlert