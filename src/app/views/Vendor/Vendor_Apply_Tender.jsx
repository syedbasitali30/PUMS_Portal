import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Snackbar,
    Alert,
    Button,
    Grid,
    Dialog,
    DialogContent,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import moment from 'moment/moment'
import { LoadingButton } from '@mui/lab'
import { useLocation, useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
//
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import axios from 'axios'

import warningImg from '../../components/MatxLogo/warning.png'
import checkImg from '../../components/MatxLogo/check.png'
import cancelImg from '../../components/MatxLogo/cancel.png'

const steps = [
    'Upload Required Documents',
    'Financial Costing',
    'Upload Technical Proposal',
]

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const SimpleForm = () => {
    //

    const navigate = useNavigate()
    //
    //
    const { state } = useLocation()
    //
    const vendorData = useSelector((data) => data.loginReducer.VendorData)
    const [open, setOpen] = React.useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const [Refresh, setRefresh] = React.useState(false)
    const [InitialdtDetails, setInitialdtDetails] = React.useState([])
    const [QouteAttach, setQouteAttach] = React.useState('')
    const [done, setDone] = React.useState(false)
    const [ItemSrt, setItemSrt] = React.useState([])
    const [message, setMessage] = React.useState({
        messageTitle: 'Alert!',
        message: 'Are you sure you want to continue?',
        image: warningImg,
        button: 'yes, continue',
        task: 1,
    })

    const [dtDetails, setdtDetails] = React.useState(state.dtDetails)
    const [dtItems, setdtItems] = React.useState(state.dtItems)
    const [Details] = React.useState(state.Details)

    const updateItemText = (itemId, newText) => {
        // Create a new array with the updated item
        const updatedData = dtDetails.map((item) => {
            if (item.RID === itemId) {
                return { ...item, Attach: newText }
            }
            return item
        })

        // Set the state with the updated array
        setdtDetails(updatedData)
    }

    const updateFileById = (category, id, newFile) => {
        // Check if a file is selected
        if (newFile) {
            // Check if the file size is less than 1 MB (1 MB = 1024 * 1024 bytes)
            if (newFile.size < 1024 * 1024) {
                setdtDetails((prevData) => ({
                    ...prevData,
                    [category]: prevData[category].map((item) => {
                        if (item.RID === id) {
                            return { ...item, Attach: newFile }
                        }
                        return item
                    }),
                }))
            } else {
                alert('Please upload file less than 1 MB')
            }
        }
        //
    }

    const updateItems = (itemId, newText, ele) => {
        // Create a new array with the updated item
        const updatedData = dtItems.map((item) => {
            if (item.DID === itemId) {
                return { ...item, [ele]: newText }
            }
            return item
        })

        // Set the state with the updated array
        setdtItems(updatedData)
    }

    const updateItemsAmt = (itemId, newText, qty) => {
        // Create a new array with the updated item
        const updatedData = dtItems.map((item) => {
            if (item.DID === itemId) {
                return { ...item, Amount: newText, TotalAmount: newText * qty }
            }
            return item
        })

        // Set the state with the updated array
        setdtItems(updatedData)
    }
    //
    let temp = ''
    useEffect(() => {
        if (done) {
            dtItems.map((ele, i) => {
                var spes = (temp +=
                    '' +
                    ele.ITEMID +
                    '^' +
                    ele.UNITID +
                    '^' +
                    parseFloat(ele.QTY) +
                    '^' +
                    parseFloat(ele.Amount) +
                    '^' +
                    parseFloat(ele.TotalAmount) +
                    '^' +
                    (ele.Features ? ele.Features : 'N/A') +
                    '`')
            })
            setItemSrt(temp)
            setDone(false)
        }
    }, [done])
    //
    const CHECK_TENDER_APPLY = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/PRC_CHECK_TENDER_APPLY',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'WorkID=' +
                    Details.WORK_ID +
                    '&SupplierID=' +
                    vendorData.SupplierID,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                // console.log(response[0])
                const result = response[0]
                if (result.MSG == 'EXIST') {
                    setMessage({
                        messageTitle: 'Error!',
                        message: 'This tender has already been applied',
                        image: cancelImg,
                        button: 'Applied Tender List',
                        task: 0,
                    })
                    setOpen(true)
                } else {
                    setMessage({
                        messageTitle: 'Warning',
                        message: 'Are you sure? you want to continue?',
                        image: warningImg,
                        button: 'Yes, Continue',
                        task: 1,
                    })
                    setOpen(true)
                    // sendFile()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //
    const sendFile = () => {
        //
        const changeArr = Object.entries(dtDetails).flatMap(
            ([category, items]) => {
                return items.map((item) => ({ ...item, category }))
            }
        )
        //
        const data = new FormData()
        data.append('WO_ID', Details.WORK_ID)
        data.append('SUPPLIER_ID', vendorData.SupplierID)
        data.append('STR', ItemSrt.slice(0, -1))
        // data.append('CC', changeArr.length)
        if (QouteAttach != '') {
            data.append('file', QouteAttach)
        } else {
            data.append('file', '0')
        }
        //
        let fileID = ''
        let countFile = 0
        for (let i = 0; i < changeArr.length; i++) {
            if (changeArr[i].Attach != '') {
                data.append(changeArr[i].RID, changeArr[i].Attach)
                fileID += changeArr[i].RID + '^'
                countFile += 1
            }
        }
        data.append('FilesArr', fileID.slice(0, -1))
        data.append('CC', countFile)
        //
        // console.log(Details.WORK_ID, 'WORK_ID')
        // console.log(vendorData.SupplierID, 'SupplierID')
        // console.log(fileID, 'fileID')
        // console.log(ItemSrt, 'ItemSrt')
        // console.log(changeArr.length, 'Length', countFile)
        // return false

        axios({
            method: 'POST',
            data: data,
            url: ip.Address + 'vpanel.asmx/QUOTATION_INSERT',
            headers: { 'content-type': 'multipart/form-data' },
        })
            .then((res) => {
                // alert('SAVED')
                setMessage({
                    messageTitle: 'Success!',
                    message: 'Everything went well, Congratulations!',
                    image: checkImg,
                    button: 'Applied Tender List',
                    task: 0,
                })
                setOpen(true)
            })
            .catch(function (error) {
                console.log(error, 'error')
            })
    }
    //
    useEffect(() => {
        for (var e = 0; e < dtItems.length; e++) {
            const ID = dtItems[e].DID
            setInitialdtDetails((prevState) => {
                return {
                    ...prevState,
                    ['Other' + ID]: '',
                    ['Amt' + ID]: '0',
                    ['TotAmt' + ID]: '0',
                }
            })
        }
    }, [])
    //
    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const styles = {
        grid_border_1: {
            display: 'flex',
            // justifyContent: 'center',
            borderWidth: 2,
            borderRightWidth: 0,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#3f6db7',
            borderBottomWidth: 0,
        },
        grid_border_2: {
            display: 'flex',
            // justifyContent: 'center',
            borderWidth: 2,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#3f6db7',
            borderBottomWidth: 0,
        },
        grid_border_3: {
            borderWidth: 2,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#e9e9e9',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        grid_border_3_: {
            borderWidth: 2,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#e9e9e9',
            width: '100%',
            // display: 'flex',
            // justifyContent: 'center',
        },
        grid_border_4: {
            borderWidth: 2,
            borderRightWidth: 0,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#e9e9e9',
            borderBottomWidth: 0,
        },
        grid_border_5: {
            borderWidth: 2,
            borderStyle: 'solid',
            padding: 8,
            borderColor: '#e9e9e9',
            borderBottomWidth: 0,
        },
        grid_border_6: {
            borderBottomWidth: 2,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderStyle: 'solid',
            borderBottomColor: '#e9e9e9',
        },
        model_button: {
            color: '#1976d2',
            borderWidth: 3,
            borderStyle: 'solid',
            width: '50%',
            borderRadius: 50,
            marginTop: 25,
            marginBottom: 10,
        },

        txtAttach: {
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: -10,
            paddingBottom: 3,
            paddingLeft: 2,
            color: 'grey',
        },
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <div style={styles.grid_border_6}>
                            <div>
                                {Object.keys(dtDetails).map(
                                    (category, index) => (
                                        <div key={index}>
                                            <u>
                                                <h6
                                                    style={{
                                                        fontSize: 14,
                                                        paddingTop: 15,
                                                        paddingBottom: 5,
                                                        color: 'black',
                                                    }}
                                                >
                                                    {category}
                                                </h6>
                                            </u>
                                            <Grid
                                                container
                                                style={{
                                                    backgroundColor: '#4679cc',
                                                }}
                                            >
                                                <Grid
                                                    item
                                                    xs={0.6}
                                                    style={styles.grid_border_1}
                                                >
                                                    <b
                                                        style={{
                                                            fontSize: 13,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        S.No
                                                    </b>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={0.6}
                                                    style={styles.grid_border_1}
                                                >
                                                    <b
                                                        style={{
                                                            fontSize: 13,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Doc.No
                                                    </b>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6.8}
                                                    style={styles.grid_border_1}
                                                >
                                                    <b
                                                        style={{
                                                            fontSize: 13,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Documents
                                                    </b>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={4}
                                                    style={styles.grid_border_2}
                                                >
                                                    <b
                                                        style={{
                                                            fontSize: 13,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Attachment
                                                    </b>
                                                </Grid>
                                            </Grid>
                                            {dtDetails[category].map(
                                                (item, itemIndex) => (
                                                    <Grid
                                                        key={itemIndex}
                                                        container
                                                    >
                                                        <Grid
                                                            style={
                                                                styles.grid_border_3
                                                            }
                                                            item
                                                            xs={0.6}
                                                        >
                                                            <div
                                                                style={{
                                                                    paddingLeft: 3,
                                                                    fontSize: 13,
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {(
                                                                    '0' +
                                                                    (itemIndex +
                                                                        1)
                                                                ).slice(-2)}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            style={
                                                                styles.grid_border_3
                                                            }
                                                            item
                                                            xs={0.6}
                                                        >
                                                            <b
                                                                style={{
                                                                    paddingLeft: 3,
                                                                    fontSize: 13,
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {item.DOC_NO}
                                                            </b>
                                                        </Grid>
                                                        <Grid
                                                            style={
                                                                styles.grid_border_3_
                                                            }
                                                            item
                                                            xs={6.8}
                                                        >
                                                            <div
                                                                style={{
                                                                    paddingLeft: 3,
                                                                    fontSize: 13,
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {
                                                                    item.REQ_DOC_TITLE
                                                                }
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            style={
                                                                styles.grid_border_5
                                                            }
                                                            item
                                                            xs={4}
                                                        >
                                                            <div
                                                                style={{
                                                                    paddingLeft: 3,
                                                                    fontSize: 13,
                                                                    color: 'black',
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <Button
                                                                    variant="contained"
                                                                    component="label"
                                                                >
                                                                    Upload
                                                                    <input
                                                                        type={
                                                                            'file'
                                                                        }
                                                                        hidden
                                                                        onChange={(
                                                                            event
                                                                        ) => {
                                                                            // updateItemText(
                                                                            //     item.RID,
                                                                            //     event
                                                                            //         .target
                                                                            //         .files[0]
                                                                            // )
                                                                            updateFileById(
                                                                                category,
                                                                                item.RID,
                                                                                event
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }}
                                                                    />
                                                                </Button>
                                                                <div
                                                                    style={{
                                                                        width: '90%',
                                                                        paddingLeft: 10,
                                                                    }}
                                                                >
                                                                    {item.Attach ==
                                                                    '' ? (
                                                                        <span
                                                                            style={{
                                                                                color: '#969595',
                                                                            }}
                                                                        >
                                                                            Choose
                                                                            File
                                                                            (PDF,
                                                                            DOCX,
                                                                            TXT,
                                                                            JPG,
                                                                            PNG).
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            {
                                                                                item
                                                                                    .Attach
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <h6
                            style={{
                                marginTop: -10,
                                paddingBottom: 10,

                                fontSize: 17,
                            }}
                        >
                            Required Items
                        </h6>

                        <div style={styles.grid_border_6}>
                            <Grid
                                container
                                style={{ backgroundColor: '#4679cc' }}
                            >
                                <Grid
                                    item
                                    xs={0.6}
                                    style={styles.grid_border_1}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        S.No
                                    </b>
                                </Grid>
                                <Grid item xs={4} style={styles.grid_border_1}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Item Name
                                    </b>
                                </Grid>
                                {/* <Grid item xs={2} style={styles.grid_border_1}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Specs
                                    </b>
                                </Grid> */}
                                <Grid
                                    item
                                    xs={3.6}
                                    style={styles.grid_border_1}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Other Features
                                    </b>
                                </Grid>
                                <Grid item xs={1} style={styles.grid_border_1}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Qty
                                    </b>
                                </Grid>
                                <Grid
                                    item
                                    xs={1.2}
                                    style={styles.grid_border_1}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Price
                                    </b>
                                </Grid>
                                <Grid
                                    item
                                    xs={1.6}
                                    style={styles.grid_border_2}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Total
                                    </b>
                                </Grid>
                            </Grid>
                            {dtItems.map((item, index) => {
                                return (
                                    <Grid key={index} container>
                                        <Grid
                                            style={styles.grid_border_3}
                                            item
                                            xs={0.6}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                {('0' + (index + 1)).slice(-2)}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={4}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                {item.ITEMTitle}
                                            </div>
                                        </Grid>
                                        {/* <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={2}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                <Link href="#" variant="body2">
                                                    View Specs
                                                </Link>
                                            </div>
                                        </Grid> */}
                                        <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={3.6}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                <textarea
                                                    style={{ height: 10 }}
                                                    placeholder="Enter features here"
                                                    className="form-control"
                                                    onChange={(text) => {
                                                        setInitialdtDetails(
                                                            (prevState) => {
                                                                return {
                                                                    ...prevState,
                                                                    ['Other' +
                                                                    item.DID]:
                                                                        text
                                                                            .target
                                                                            .value,
                                                                }
                                                            }
                                                        )
                                                    }}
                                                    value={
                                                        InitialdtDetails[
                                                            'Other' + item.DID
                                                        ]
                                                    }
                                                    //
                                                    onBlur={(text) => {
                                                        updateItems(
                                                            item.DID,
                                                            text.target.value,
                                                            'Features'
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={1}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                {item.QTY}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={1.2}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                <input
                                                    placeholder="Amount"
                                                    className="form-control"
                                                    onChange={(text) => {
                                                        setInitialdtDetails(
                                                            (prevState) => {
                                                                return {
                                                                    ...prevState,
                                                                    ['Amt' +
                                                                    item.DID]:
                                                                        text
                                                                            .target
                                                                            .value,
                                                                    ['TotAmt' +
                                                                    item.DID]:
                                                                        text
                                                                            .target
                                                                            .value *
                                                                        item.QTY,
                                                                }
                                                            }
                                                        )
                                                    }}
                                                    value={
                                                        InitialdtDetails[
                                                            'Amt' + item.DID
                                                        ]
                                                    }
                                                    //
                                                    onBlur={(text) => {
                                                        updateItemsAmt(
                                                            item.DID,
                                                            text.target.value,
                                                            item.QTY
                                                        )
                                                        // updateItems(
                                                        //     item.DID,
                                                        //     text.target.value *
                                                        //         item.QTY,
                                                        //     'TotalAmount'
                                                        // )
                                                    }}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={1.6}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 3,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                <input
                                                    placeholder="Total Amount"
                                                    disabled
                                                    className="form-control"
                                                    value={
                                                        InitialdtDetails[
                                                            'TotAmt' + item.DID
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                            {/* <Button variant="contained" onClick={handleSubmit}>
                                Check
                            </Button> */}
                            {/* <input type="submit" value="Login" /> */}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div className="mb-3">
                            <label for="formFile" className="form-label">
                                Select Attatchment
                            </label>
                            {/* <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(event) =>
                                    setQouteAttach(event.target.files[0])
                                }
                            /> */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Button variant="contained" component="label">
                                    Upload Attatchment
                                    <input
                                        type={'file'}
                                        hidden
                                        onChange={(event) =>
                                            setQouteAttach(
                                                event.target.files[0]
                                            )
                                        }
                                    />
                                </Button>
                                <div style={{ paddingLeft: 10 }}>
                                    {QouteAttach == '' ? (
                                        <span
                                            style={{
                                                color: '#969595',
                                            }}
                                        >
                                            Choose File (PDF, DOCX, TXT, JPG,
                                            PNG).
                                        </span>
                                    ) : (
                                        <span>{QouteAttach.name}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <Button onClick={() => sendFile()}>SAVE</Button> */}
                    </div>
                )

            default:
                return ``
        }
    }

    return (
        <div>
            <Container>
                {/* <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Admission/ADM_Dashboard',
                            },
                            { name: 'Apply Tender' },
                        ]}
                    />
                </div> */}
                <SimpleCard>
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Grid
                                Grid
                                container
                                sx={{
                                    pb: 1,
                                    backgroundColor: '#edf7ed',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                    paddingLeft: '15px',
                                    mt: 3,
                                    mb: 2,
                                }}
                            >
                                <Grid item xs={12}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Work Title:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {Details.WORK_TITLE}
                                        </span>
                                    </b>
                                </Grid>
                                {/*  */}
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Posting Date:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(Details.CREATE_DATE).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Tender Fee:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {parseInt(
                                                Details.TENDER_FEE
                                            ).toLocaleString()}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Doc End Date:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(
                                                Details.DOC_END_DATE
                                            ).format('DD/MM/YYYY')}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        BID Submission Date:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(
                                                Details.BID_SUBMISSION_DATE
                                            ).format('DD/MM/YYYY')}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Technical Date:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(
                                                Details.TECHNICAL_DATE
                                            ).format('DD/MM/YYYY')}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Financial Date:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(
                                                Details.FINANCIAL_DATE
                                            ).format('DD/MM/YYYY')}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        BID Validity:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(
                                                Details.BID_VALIDITY
                                            ).format('DD/MM/YYYY')}
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        BID Security:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {Details.BID_SECURITY}%
                                        </span>
                                    </b>
                                </Grid>
                                <Grid item xs={4} sx={{ pt: 1 }}>
                                    <b
                                        style={{
                                            fontSize: 13,
                                            color: '#1e4620',
                                        }}
                                    >
                                        Performance Security:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {Details.PERFORMANCE_SECURITY}%
                                        </span>
                                    </b>
                                </Grid>
                            </Grid>

                            <Box mt={4}>
                                {activeStep === 2 ? (
                                    <Box>
                                        <Typography>
                                            {getStepContent(activeStep)}
                                        </Typography>

                                        <Box pt={3}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                sx={{ ml: 2 }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    CHECK_TENDER_APPLY()
                                                }
                                            >
                                                Finish
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography>
                                            {getStepContent(activeStep)}
                                        </Typography>

                                        <Box pt={3}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                sx={{ ml: 2 }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    setActiveStep(
                                                        (prevActiveStep) =>
                                                            prevActiveStep + 1
                                                    )
                                                    if (activeStep == 1) {
                                                        setDone(true)
                                                    }
                                                }}
                                            >
                                                Next
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    onClick={() => setOpenModel(false)}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, mr: 1 }}
                                >
                                    CLOSE
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    // loading={loading}
                                    // loadingIndicator="Loading…"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    APPLY TENDER
                                </LoadingButton>
                            </Grid>
                        </Grid> */}
                    </div>
                </SimpleCard>
                {/*  */}
                <Dialog
                    fullWidth
                    maxWidth={'xs'}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogContent>
                        <div>
                            <div
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    paddingTop: 30,
                                    paddingBottom: 10,
                                }}
                            >
                                <img src={message.image} width="90px"></img>
                            </div>
                            <Typography
                                variant="h5"
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingTop: 25,
                                    paddingBottom: 10,
                                }}
                            >
                                {message.messageTitle}
                            </Typography>
                            <Typography
                                style={{
                                    color: 'grey',
                                    textAlign: 'center',
                                    fontSize: 18,
                                }}
                            >
                                {message.message}
                            </Typography>
                            <div
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        if (message.task == 1) {
                                            setOpen(false)
                                            sendFile()
                                        } else {
                                            navigate(
                                                '/Vendor/Vendor_Applied_Active_NIT'
                                            )
                                        }
                                    }}
                                    style={styles.model_button}
                                    color="primary"
                                >
                                    {message.button}
                                </Button>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Button
                                    onClick={() => setOpen(false)}
                                    style={{
                                        color: '#1976d2',
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/*  */}
                {/* <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={() => setOpen(false)}
                >
                    <Alert
                        onClose={() => setOpen(false)}
                        sx={{ width: '100%' }}
                        severity={'success'}
                        variant="filled"
                    >
                        Well Done!.. Job info saved successfully.
                    </Alert>
                </Snackbar> */}
                {/*  */}
            </Container>
        </div>
    )
}

export default SimpleForm
