import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { Card, styled, useTheme, Icon } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import {
    Box,
    TableBody,
    IconButton,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Tooltip,
    Snackbar,
    Alert,
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { saveSession, checkUserAPL } from 'app/redux/action'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import moment from 'moment'

const styles = {
    textBox_Margin: {
        marginBottom: -2,
    },
    disable_box: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#c4c4c4',
        padding: 8,
        borderRadius: 5,
        paddingLeft: 15,
        // backgroundColor: '#f0f0f0',
        paddingTop: 9,
        width: '100%',
    },
    disable_box_font: {
        fontWeight: 500,
    },
}

const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 1000,
    whiteSpace: 'pre',
    '& small': {
        width: 50,
        height: 15,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': { borderBottom: 'none' },
    '& td:first-of-type': { paddingLeft: '16px !important' },
}))

const Small = styled('small')(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: '#34314c',
    fontSize: 20,
}))
//

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const StatCards2 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef()
    const { palette } = useTheme()
    const theme = useTheme()
    //
    const bgPrimary = palette.primary.main
    const bgSuccess = palette.success.main
    const bgDander = palette.error.main
    //
    const userData = useSelector((data) => data.loginReducer.LoginData)
    //

    useEffect(() => {
        // GETALL_SESSION()
        GETALL_PROGRAM_APPLY()
        CHECK_APPLICATION_APPLY()
    }, [])

    const [state, setState] = useState({
        VOU_DATE: moment(new Date()).format('YYYY-MM-DD'),
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const [dtData, setdtData] = useState([])
    const [dtProgramApply, setdtProgramApply] = useState([])
    // console.log(dtProgramApply)
    const [VouArr, setVouArr] = useState({ Fees: 0, APL_ID: '0', Vou_ID: '0' })
    const [ChkInvt, setChkInvt] = useState(false)
    const [isVissible, setisVissible] = useState(false)
    const [VoucherPicture, setVoucherPicture] = useState('')
    const [errorText, seterrorText] = useState('')
    const [SuccessAlert, setSuccessAlert] = useState(false)
    const [ChallanAlert, setChallanAlert] = useState(false)
    const [StatusMessage, setStatusMessage] = useState(1)

    const [open, setOpen] = React.useState(false)
    const [StatusModal, setStatusModal] = React.useState(false)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    const CheckSelect = (e, id) => {
        if (e == 'Print Challan') {
            window.open(
                ip.print +
                    'admission-print/VoucherPrintTech.html?Vou=' +
                    id.ADM_SessionID +
                    '&Info=' +
                    userData._id,
                'popUpWindow',
                'height = 700, width = 700, left = 10, top = 10,, scrollbars = yes, menubar = no'
            )
            return false
        } else if (e == 'Print Form') {
            window.open(
                ip.print +
                    'admission-print/FormPrintTech.html?Vou=' +
                    id.ADM_SessionID +
                    '&Info=' +
                    userData._id,
                'popUpWindow',
                'height = 700, width = 700, left = 10, top = 10,, scrollbars = yes, menubar = no'
            )
            return false
        } else if (e == 'Upload Challan') {
            setVouArr({
                Fees: id.Fees.replace(',', ''),
                APL_ID: id._id,
                Vou_ID: id.APL_ID,
            })
            handleClickOpen()
            return false
        } else if (e == 'Admit Card') {
            window.open(
                ip.print +
                    'admission-print/SlipPrint.html?Vou=' +
                    id.ADM_SessionID +
                    '&Info=' +
                    userData._id,
                'popUpWindow',
                'height = 700, width = 700, left = 10, top = 10,, scrollbars = yes, menubar = no'
            )
            return false
        } else if (e == 'Instructions') {
            window.open(
                ip.print +
                    'admission-print/SlipInst.html?Vou=' +
                    id.ADM_SessionID,
                'popUpWindow',
                'height = 700, width = 700, left = 10, top = 10,, scrollbars = yes, menubar = no'
            )
            return false
        }
    }

    const GETALL_SESSION = (value) => {
        axios
            .get(ip.admission + 'ADM_Session/getAll_Typ/Tech')
            .then((res) => {
                let result = res.data.filter(
                    (o1) => !value.some((o2) => o1._id === o2.ADM_SessionID)
                )
                //
                setdtData(result)
                if (result === undefined || result.length == 0) {
                    setChkInvt(true)
                } else {
                    setChkInvt(false)
                }
                console.log(userData.Education, ChkInvt)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_PROGRAM_APPLY = () => {
        const dataTosend = { id: userData._id, typ: 'Tech' }
        axios
            .post(ip.admission + 'ADM_PROGRAMAPPLIED/getAll', dataTosend)
            .then((res) => {
                if (res.data === undefined || res.data.length == 0) {
                    setisVissible(false)
                    GETALL_SESSION(res.data)
                } else {
                    setisVissible(true)
                    setdtProgramApply(res.data)
                    GETALL_SESSION(res.data)
                }
            })
            .catch(function (error) {
                setisVissible(false)
            })
    }

    const CHECK_APPLICATION_APPLY = () => {
        const dataTosend = { id: userData._id, typ: 'Tech' }
        axios
            .post(
                ip.admission + 'ADM_PROGRAMAPPLIED/checkUserProgram',
                dataTosend
            )
            .then((res) => {
                if (res.data === undefined || res.data.length == 0) {
                    localStorage.setItem('checkUserAPL', JSON.stringify([]))
                } else {
                    // alert('APPLIED')
                    dispatch(checkUserAPL(res.data[0]))
                    localStorage.setItem(
                        'checkUserAPL',
                        JSON.stringify(res.data)
                    )
                }
            })
            .catch(function (error) {
                setisVissible(false)
            })
    }

    const SAVE_VOU_INFO = () => {
        if (state.Bank == '') {
            seterrorText('Enter Branch Name')
            setTimeout(() => {
                seterrorText('')
            }, 3000)
            return false
        } else if (VoucherPicture == '') {
            seterrorText('Enter Select Challan Image')
            setTimeout(() => {
                seterrorText('')
            }, 3000)
            return false
        }

        const dataToSend = {
            VOU_ID: VouArr.APL_ID,
            VouDate: state.VOU_DATE,
            Bank: state.Bank,
            Amount: parseFloat(VouArr.Fees),
        }
        // return false
        axios
            .post(
                ip.admission + 'ADM_ProgramApplied/updateVoucherInfo/',
                dataToSend
            )
            .then((res) => {
                setSuccessAlert(true)
                setOpen(false)
                sendFile({ folder: 'ADM_Challan', file: VoucherPicture })
                GETALL_PROGRAM_APPLY()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const sendFile = (val) => {
        const data = new FormData()
        const file = val.file
        data.append('image', file)

        axios({
            method: 'post',
            data: data,
            url:
                ip.admission +
                'applicantImg/upload?folder=' +
                val.folder +
                '&CNIC=' +
                VouArr.Vou_ID,
            headers: { 'content-type': 'multipart/form-data' },
        })
    }

    const SAVE_SESSION_FUNCTION = (value) => {
        dispatch(saveSession(value))

        localStorage.setItem('Session', JSON.stringify(value))
    }

    return (
        <div style={{ margin: 20 }}>
            {/*  */}

            <Grid item lg={8} md={8} sm={12} xs={12} sx={{ pl: '20px' }}>
                <H4>Welcome {userData.CANDIDATE_NAME}</H4>
            </Grid>
            {/*  */}
            {/*  */}

            {isVissible ? (
                <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                    <CardHeader>
                        <Title>Program Applied</Title>
                    </CardHeader>

                    <Box width="100%">
                        <div style={{ overflowX: 'auto' }}>
                            <ProductTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: '2.8%',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                            Application #
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '38%',
                                            }}
                                        >
                                            Title
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                            Session
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                            Processing Fee
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '15%',
                                            }}
                                        >
                                            Applied Date
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '13.2%',
                                            }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {dtProgramApply.map((item, i) => {
                                        return (
                                            <TableRow hover key={i}>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                ></TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    <b> {item.APL_ID}</b>
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.Title}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.Year}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.Fees}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {moment(
                                                        item.ENTRY_DATE
                                                    ).format(
                                                        'DD/MM/YYYY hh:mm:ss'
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    style={{
                                                        flexDirection: 'row',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    {item.VOU_PAID == 0 ? (
                                                        <div>
                                                            {item
                                                                .SessionDetails[0]
                                                                .isOpen == 1 ? (
                                                                <IconButton
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        CheckSelect(
                                                                            'Print Challan',
                                                                            item
                                                                        )
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#54adf1',
                                                                        padding:
                                                                            '8px',
                                                                        borderRadius:
                                                                            '100px',
                                                                        marginRight:
                                                                            '10px',
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        title={
                                                                            'Print Challan'
                                                                        }
                                                                        fontSize="large"
                                                                    >
                                                                        <Icon
                                                                            style={{
                                                                                color: 'white',
                                                                            }}
                                                                        >
                                                                            print
                                                                        </Icon>
                                                                    </Tooltip>
                                                                </IconButton>
                                                            ) : (
                                                                <IconButton
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setChallanAlert(
                                                                            true
                                                                        )
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#cccccc',
                                                                        padding:
                                                                            '8px',
                                                                        borderRadius:
                                                                            '100px',
                                                                        marginRight:
                                                                            '10px',
                                                                    }}
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: '#868686',
                                                                        }}
                                                                    >
                                                                        print
                                                                    </Icon>
                                                                </IconButton>
                                                            )}
                                                            <IconButton
                                                                onClick={(e) =>
                                                                    CheckSelect(
                                                                        'Upload Challan',
                                                                        item
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        '#0381c6',
                                                                    padding:
                                                                        '8px',
                                                                    borderRadius:
                                                                        '100px',
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    title={
                                                                        'Upload Challan'
                                                                    }
                                                                    fontSize="large"
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: 'white',
                                                                        }}
                                                                    >
                                                                        cloud_upload
                                                                    </Icon>
                                                                </Tooltip>
                                                            </IconButton>
                                                        </div>
                                                    ) : null}

                                                    {item.VOU_PAID == 1 &&
                                                    item.STATUS == 0 ? (
                                                        <div>
                                                            <IconButton
                                                                onClick={(e) =>
                                                                    CheckSelect(
                                                                        'Print Form',
                                                                        item
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        '#3a579f',
                                                                    padding:
                                                                        '8px',
                                                                    borderRadius:
                                                                        '100px',
                                                                    marginRight:
                                                                        '10px',
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    title={
                                                                        'Print Form'
                                                                    }
                                                                    fontSize="large"
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: 'white',
                                                                        }}
                                                                        size="small"
                                                                    >
                                                                        subject
                                                                    </Icon>
                                                                </Tooltip>
                                                            </IconButton>

                                                            <IconButton
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    window
                                                                        .open(
                                                                            ip.admission +
                                                                                'uploads/ADM_Challan/' +
                                                                                item.APL_ID +
                                                                                '.jpg',
                                                                            '_blank'
                                                                        )
                                                                        .focus()
                                                                }}
                                                                style={{
                                                                    backgroundColor:
                                                                        '#0c87b6',
                                                                    padding:
                                                                        '8px',
                                                                    borderRadius:
                                                                        '100px',
                                                                    marginRight:
                                                                        '10px',
                                                                    paddingTop:
                                                                        '9px',
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    title={
                                                                        'View Challan'
                                                                    }
                                                                    fontSize="large"
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: 'white',
                                                                        }}
                                                                        size="small"
                                                                    >
                                                                        wallpaper
                                                                    </Icon>
                                                                </Tooltip>
                                                            </IconButton>
                                                        </div>
                                                    ) : null}

                                                    {item.VOU_PAID == 1 &&
                                                    item.STATUS == 1 ? (
                                                        <Small
                                                            onClick={() => {
                                                                setStatusMessage(
                                                                    1
                                                                )
                                                                setStatusModal(
                                                                    true
                                                                )
                                                            }}
                                                            bgcolor={bgSuccess}
                                                            style={{
                                                                cursor: 'pointer',
                                                                borderRadius:
                                                                    '5px',
                                                                fontSize:
                                                                    '13px',
                                                                width: 85,
                                                                height: 25,
                                                                textTransform:
                                                                    'uppercase',
                                                            }}
                                                        >
                                                            APPROVED
                                                        </Small>
                                                    ) : null}

                                                    {item.VOU_PAID == 1 &&
                                                    item.STATUS == 9 ? (
                                                        <Small
                                                            onClick={() => {
                                                                setStatusMessage(
                                                                    9
                                                                )
                                                                setStatusModal(
                                                                    true
                                                                )
                                                            }}
                                                            bgcolor={bgDander}
                                                            style={{
                                                                cursor: 'pointer',
                                                                borderRadius:
                                                                    '5px',
                                                                fontSize:
                                                                    '13px',
                                                                width: 80,
                                                                height: 25,
                                                                textTransform:
                                                                    'uppercase',
                                                            }}
                                                        >
                                                            REJECTED
                                                        </Small>
                                                    ) : null}

                                                    {item.STATUS == 2 ? (
                                                        <div>
                                                            <IconButton
                                                                onClick={(e) =>
                                                                    CheckSelect(
                                                                        'Admit Card',
                                                                        item
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        '#3a5999',
                                                                    padding:
                                                                        '8px',
                                                                    borderRadius:
                                                                        '100px',
                                                                    marginRight:
                                                                        '10px',
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    title={
                                                                        'Download Admit Card'
                                                                    }
                                                                    fontSize="large"
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: 'white',
                                                                        }}
                                                                        size="small"
                                                                    >
                                                                        web
                                                                    </Icon>
                                                                </Tooltip>
                                                            </IconButton>

                                                            <IconButton
                                                                onClick={(e) =>
                                                                    CheckSelect(
                                                                        'Instructions',
                                                                        item
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        '#0274bb',
                                                                    padding:
                                                                        '8px',
                                                                    borderRadius:
                                                                        '100px',
                                                                    marginRight:
                                                                        '10px',
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    title={
                                                                        'Test Instructions'
                                                                    }
                                                                    fontSize="large"
                                                                >
                                                                    <Icon
                                                                        style={{
                                                                            color: 'white',
                                                                        }}
                                                                        size="small"
                                                                    >
                                                                        format_list_bulleted
                                                                    </Icon>
                                                                </Tooltip>
                                                            </IconButton>
                                                        </div>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </ProductTable>
                        </div>
                    </Box>
                </Card>
            ) : null}

            {/*  */}
            {/*  */}

            {!ChkInvt ? (
                <div>
                    {userData.Education != 0 ? (
                        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                            <CardHeader>
                                <Title>Application Invited</Title>
                            </CardHeader>

                            <Box width="100%">
                                <div style={{ overflowX: 'auto' }}>
                                    <ProductTable>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    sx={{
                                                        width: '2.8%',
                                                    }}
                                                ></TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '10%',
                                                    }}
                                                >
                                                    S. No
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '33%',
                                                    }}
                                                >
                                                    Title
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '10%',
                                                    }}
                                                >
                                                    Session
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '10%',
                                                    }}
                                                >
                                                    Fee
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '10%',
                                                    }}
                                                >
                                                    From
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '10%',
                                                    }}
                                                >
                                                    Last Date
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: '13.2%',
                                                    }}
                                                >
                                                    Action
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {dtData.map((item, i) => {
                                                // for (
                                                //     let e = 0;
                                                //     e < dtProgramApply.length;
                                                //     e++
                                                // ) {
                                                //     if (
                                                //         dtProgramApply[e].ADM_SessionID ===
                                                //         item._id
                                                //     ) {
                                                //         console.log('true')
                                                //         // break
                                                //     } else {
                                                //         console.log(
                                                //             'false',
                                                //             dtProgramApply[e]
                                                //                 .ADM_SessionID +
                                                //                 ' | ' +
                                                //                 item._id
                                                //         )
                                                //         break
                                                //     }
                                                // }
                                                return (
                                                    <TableRow hover key={i}>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        ></TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            0{i + 1}
                                                        </TableCell>

                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item.Title}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item.Year}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item.Fees}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item.Start}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {item.End}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {item.isOpen ==
                                                            1 ? (
                                                                <Small
                                                                    onClick={() => {
                                                                        {
                                                                            item.Elective ===
                                                                            'Yes'
                                                                                ? navigate(
                                                                                      '/Tech/Tech_ElectiveSub'
                                                                                  )
                                                                                : navigate(
                                                                                      '/Tech/Tech_ChooseDept'
                                                                                  )
                                                                        }
                                                                        SAVE_SESSION_FUNCTION(
                                                                            item
                                                                        )
                                                                    }}
                                                                    bgcolor={
                                                                        bgPrimary
                                                                    }
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        borderRadius:
                                                                            '5px',
                                                                        fontSize:
                                                                            '13px',
                                                                        width: '100%',
                                                                        textTransform:
                                                                            'uppercase',
                                                                    }}
                                                                >
                                                                    APPLY
                                                                </Small>
                                                            ) : (
                                                                <Small
                                                                    bgcolor={
                                                                        bgDander
                                                                    }
                                                                    style={{
                                                                        cursor: 'not-allowed',
                                                                        borderRadius:
                                                                            '5px',
                                                                        fontSize:
                                                                            '13px',
                                                                        width: '100%',
                                                                        textTransform:
                                                                            'uppercase',
                                                                    }}
                                                                >
                                                                    CLOSED
                                                                </Small>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </ProductTable>
                                </div>
                            </Box>
                        </Card>
                    ) : null}
                </div>
            ) : null}
            {/*  */}
            {/*  */}

            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <CardHeader>
                    <Title>Complete Initial Process</Title>
                </CardHeader>

                <Box width="100%">
                    <div style={{ overflowX: 'auto' }}>
                        <ProductTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            width: '2.8%',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        sx={{
                                            width: '10%',
                                        }}
                                    >
                                        S. No
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '73%',
                                        }}
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '13.2%',
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow hover>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        01
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Complete your Basic Information
                                    </TableCell>
                                    <TableCell align="left">
                                        <Small
                                            onClick={() => {
                                                userData.BasicInfo === 0
                                                    ? navigate(
                                                          '/Tech/Tech_BasicInfo'
                                                      )
                                                    : navigate(
                                                          '/Tech/Tech_Dashboard'
                                                      )
                                            }}
                                            bgcolor={
                                                userData.BasicInfo === 0
                                                    ? bgPrimary
                                                    : bgSuccess
                                            }
                                            style={
                                                userData.BasicInfo === 0
                                                    ? {
                                                          cursor: 'pointer',
                                                          borderRadius: '5px',
                                                          fontSize: '13px',
                                                          width: '100%',
                                                          textTransform:
                                                              'uppercase',
                                                      }
                                                    : {
                                                          cursor: 'not-allowed',
                                                          borderRadius: '5px',
                                                          fontSize: '13px',
                                                          width: '100%',
                                                          textTransform:
                                                              'uppercase',
                                                      }
                                            }
                                        >
                                            {userData.BasicInfo === 0
                                                ? 'Pending'
                                                : 'Completed'}
                                        </Small>
                                    </TableCell>
                                </TableRow>

                                {/*  */}
                                {/*  */}

                                <TableRow hover>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        02
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Complete your Educational Information
                                    </TableCell>
                                    <TableCell align="left">
                                        <Small
                                            onClick={() => {
                                                userData.Education === 0
                                                    ? navigate(
                                                          '/Tech/Tech_Education'
                                                      )
                                                    : navigate(
                                                          '/Tech/Tech_Dashboard'
                                                      )
                                            }}
                                            bgcolor={
                                                userData.Education === 0
                                                    ? bgPrimary
                                                    : bgSuccess
                                            }
                                            style={
                                                userData.Education === 0
                                                    ? {
                                                          cursor: 'pointer',
                                                          borderRadius: '5px',
                                                          fontSize: '13px',
                                                          width: '100%',
                                                          textTransform:
                                                              'uppercase',
                                                      }
                                                    : {
                                                          cursor: 'not-allowed',
                                                          borderRadius: '5px',
                                                          fontSize: '13px',
                                                          width: '100%',
                                                          textTransform:
                                                              'uppercase',
                                                      }
                                            }
                                        >
                                            {userData.Education === 0
                                                ? 'Pending'
                                                : 'Completed'}
                                        </Small>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </ProductTable>
                    </div>
                </Box>
            </Card>
            {/*  */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Upload Challan & Bank Informations
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We need your fee payment confirmation
                        <b> (Paid fee challan) </b>
                        and <b> Bank details </b> to process your application.
                        Once uploaded, you will receive your
                        <b> Application form.</b>
                    </DialogContentText>
                    <div style={{ marginTop: 20 }}></div>
                    <TextField
                        style={{ width: '100%' }}
                        size={'small'}
                        type="date"
                        name="VouDate"
                        id="standard-basic"
                        onChange={handleChange}
                        value={state.VOU_DATE || ''}
                        validators={['required']}
                        label="Challan Paid Date *"
                        errorMessages={['This field is required']}
                    />
                    {/*  */} <div style={{ marginTop: 12 }}></div>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Enter Branch Name"
                        type="text"
                        size="small"
                        fullWidth
                        name="Bank"
                        onChange={handleChange}
                    />
                    {/*  */} <div style={{ marginTop: 10 }}></div>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Voucher Amount"
                        type="number"
                        size="small"
                        fullWidth
                        disabled
                        value={VouArr.Fees || ''}
                        style={{
                            backgroundColor: '#f0f0f0',
                        }}
                    />
                    {/*  */} <div style={{ marginTop: 15 }}></div>
                    <form
                        method="POST"
                        action="/profile-upload-single"
                        encType="multipart/form-data"
                    >
                        <input
                            style={styles.disable_box}
                            // hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                                setVoucherPicture(e.target.files[0])
                            }}
                        />
                    </form>
                    {errorText == '' ? null : (
                        <div
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: '#ea5a4f',
                                fontWeight: 500,
                            }}
                        >
                            Please {errorText}
                        </div>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => SAVE_VOU_INFO()}
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {/*  */}
            <Dialog
                open={StatusModal}
                onClose={() => setStatusModal(false)}
                aria-labelledby="form-dialog-title"
            >
                {StatusMessage == 1 ? (
                    <DialogTitle id="form-dialog-title">
                        Congratulations! Your application has been approved!
                    </DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">
                        Update on Your Application
                    </DialogTitle>
                )}

                <DialogContent>
                    {StatusMessage == 1 ? (
                        <DialogContentText style={{ color: '#48494B' }}>
                            Your entry test admit cards will be issued within
                            the next few days. You can access your admit card
                            directly through your portal. It's important to
                            check your portal daily to ensure you don't miss it.{' '}
                            <br />
                            <br />
                            <b>Note:</b> Once you have your admit card,
                            carefully review the test date, time, and location.
                            Mark your calendar and start preparing for your
                            entry test!
                        </DialogContentText>
                    ) : (
                        <DialogContentText style={{ color: '#48494B' }}>
                            Thank you for your interest. We carefully reviewed
                            your application and appreciate you taking the time
                            to submit it. <br /> After thorough consideration,
                            we regret to inform you that your application was
                            not selected for this term. <br /> While we cannot
                            offer you admission at this time, we encourage you
                            to contact the admissions department for further
                            details and to understand the specific reasons for
                            this decision.
                        </DialogContentText>
                    )}

                    <div style={{ marginTop: 20 }}></div>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setStatusModal(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/*  */}
            <Snackbar
                open={SuccessAlert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setSuccessAlert(false)}
            >
                <Alert
                    onClose={() => setSuccessAlert(false)}
                    sx={{ width: '100%' }}
                    severity={'success'}
                    variant="filled"
                >
                    Challan successfully uploaded
                </Alert>
            </Snackbar>

            {/*  */}
            <Snackbar
                open={ChallanAlert}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setChallanAlert(false)}
            >
                <Alert
                    onClose={() => setChallanAlert(false)}
                    sx={{ width: '100%' }}
                    severity={'error'}
                    variant="filled"
                >
                    Admissions closed: can't download challan yet
                </Alert>
            </Snackbar>
        </div>
    )
}

export default StatCards2
