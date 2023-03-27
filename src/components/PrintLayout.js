import {
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    MenuItem,
    FormGroup,
    Checkbox,
    Box,
    Button,
    Card,
    InputLabel,
    ButtonBox,
    Container,
    Typography,
    Grid,
} from "@mui/material";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {useState, useEffect, useRef} from "react";
import Image from "next/image";


const PrintLayout = ({children, isPrinting, documentNo}) => {

    return (
        <div className="print-layout">
            {
                isPrinting ? (
                <div>
                    <div className='flex justify-center gap-5 border-[1px] border-black'>
                        <div className='w-[15%] flex justify-center flex-col items-center py-10'>
                            {/*<h1>Revision No</h1>*/}
                            <Image src="/fav.svg" height="100" width="200"></Image>
                        </div>
                        <div
                            className='w-[70%] py-5 border-x-[1px] border-black flex flex-col justify-center items-start px-5 gap-5'>
                            <h1>Company name</h1>
                            <h1 className='text-2xl font-semibold'>RAHMENT MAHMUD PLASTIC PRODUCTION FACTORY PROPLAST
                                PIPE $ FITTING MANUFACTURING </h1>
                            <h1>Documnet title</h1>
                        </div>
                        <div className='w-[15%] flex flex-col justify-center items-start px-5 gap-5'>
                            <h1>Document no.</h1>
                            <h1 className='text-2xl font-semibold '>{documentNo}</h1>
                            <div>
                                <h1>Page No.</h1>
                                <h1>Page 1 of 1</h1>
                            </div>
                        </div>
                    </div>
                    {children}

                    <div className='flex flex-col items-center'>
                        <div className='h-32'>

                        </div>
                        <div className='w-[90%]  border-t-[6px] border-red-900'></div>
                        <h1>Address: Gonder, Ethiopia</h1>
                        <h1>Tel: +251912648010, +251910456568</h1>
                        <h1>Email: imranmuktar352@gmail.com</h1>
                    </div>
                </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )
            }
        </div>
    );
}

export default PrintLayout;