import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Snackbar,
    Alert,
    Box,
    Chip,
    Button,
    Dialog,
    DialogContent,
    Grid,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import ReactDatatable from '../../components/DataTable/index'
import { config, extraButtons } from '../Components/Component'
import moment from 'moment/moment'
import { LoadingButton } from '@mui/lab'
import { useLocation, useNavigate } from 'react-router-dom'
import imgLink from '../DB/IP_Address'
import { border } from '@mui/system'
import Link from '@mui/material/Link'

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
    const { state } = useLocation()
    console.log(state)
    //
    const navigate = useNavigate()
    //
    const vendorData = useSelector((data) => data.loginReducer.VendorData)
    const [open, setOpen] = React.useState(false)
    const [OpenModel, setOpenModel] = React.useState(false)
    const [loading_dt, setloading_dt] = React.useState(true)
    const [aData, setaData] = React.useState([])
    //
    useEffect(() => {
        GETALL_NIT_LIST()
    }, [])

    const [dtData, setdtData] = React.useState([])
    const [dtDetails, setdtDetails] = React.useState([])
    const [dtItems, setdtItems] = React.useState([])
    const [Details, setDetails] = React.useState(state.Details)

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
        border_table_sno: {
            backgroundColor: '#e0e8f6',
            padding: 2,
            borderRadius: 100,
            textAlign: 'center',
            width: 30,
            height: 30,
            borderColor: '#4679d4',
            borderStyle: 'solid',
            borderWidth: 2,
            color: '#4679d4',
        },
    }

    const GETALL_NIT_LIST = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_APPLIED_NIT_LIST',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'WorkType=NIT' + '&SupplierID=' + vendorData.SupplierID,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setdtData(response)
                setloading_dt(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_NIT_DETAIL = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_APPLIED_NIT_DOC_LIST',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'QID=' + value,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setdtDetails(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_ITEM_DETAIL = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_APPLIED_NIT_ITEM_LIST',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'QID=' + value,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setdtItems(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //
    const LoadAttachmentList = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LoadAttachmentList',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'ID=' + value,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                const data = response[0]
                setaData(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //
    useEffect(() => {
        GETALL_NIT_DETAIL(state.QTID)
        GETALL_ITEM_DETAIL(state.QTID)
        LoadAttachmentList(Details.ReqID)
    }, [])

    const columns = [
        {
            key: 'WORK_TITLE',
            text: 'Work Title',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '60%',
        },
        {
            key: 'POSTING_DATE',
            text: 'Posting Date',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '15%',
            cell: (record) => {
                return (
                    <div>
                        {moment(record.POSTING_DATE).format('DD/MM/YYYY')}
                    </div>
                )
            },
        },
        {
            key: 'TENDER_FEE',
            text: 'Tender Fee',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '10%',
        },
        {
            key: 'BID_SUBMISSION_DATE',
            text: 'Action',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '15%',
            cell: (record) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Chip
                            style={{
                                backgroundColor: 'green',
                                color: 'white',
                                borderRadius: 5,
                            }}
                            label="View Details"
                            // onClick={() => {
                            //     GETALL_NIT_DETAIL(record.QTID)
                            //     GETALL_ITEM_DETAIL(record.QTID)
                            //     setDetails(record)
                            // }}
                            onClick={() =>
                                navigate(
                                    '/vendor/Vendor_Applied_Tender_Detail',
                                    {
                                        state: { QTID: record.QTID },
                                    }
                                )
                            }
                        ></Chip>
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <Container>
                <SimpleCard title={Details.WORK_TITLE}>
                    <Box width="100%">
                        <div>
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
                                            {moment(
                                                Details.POSTING_DATE
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
                                        Tender Fee:{' '}
                                        <span style={{ fontWeight: 'normal' }}>
                                            {moment(Details.TENDER_FEE).format(
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
                                            {Details.BID_SECURITY}
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
                                            {Details.PERFORMANCE_SECURITY}
                                        </span>
                                    </b>
                                </Grid>
                            </Grid>
                            <div style={{ display: 'none' }}>
                                <h6
                                    style={{
                                        fontSize: 17,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    }}
                                >
                                    Required Documents
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
                                            xs={11.4}
                                            style={styles.grid_border_2}
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
                                    </Grid>
                                    {dtDetails.map((item, index) => {
                                        return (
                                            <Grid container>
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
                                                        {(
                                                            '0' +
                                                            (index + 1)
                                                        ).slice(-2)}
                                                        {/* 0{index + 1} */}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_5}
                                                    item
                                                    xs={6.4}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                            fontSize: 13,
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {item.REQ_DOC_TITLE}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_5}
                                                    item
                                                    xs={5}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                            fontSize: 13,
                                                            color: 'black',
                                                        }}
                                                    >
                                                        <a
                                                            href={
                                                                imgLink.Address +
                                                                'PROCUREMENT/TENDER_FILES/' +
                                                                Details.ReqID +
                                                                '/QUOTATIONS/' +
                                                                item.FPath
                                                            }
                                                        >
                                                            View Attatchment
                                                        </a>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                </div>

                                <h6
                                    style={{
                                        fontSize: 17,
                                        paddingTop: 10,
                                        paddingBottom: 5,
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
                                            xs={2}
                                            style={styles.grid_border_1}
                                        >
                                            <b
                                                style={{
                                                    fontSize: 13,
                                                    color: 'white',
                                                }}
                                            >
                                                Item Name
                                            </b>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4.4}
                                            style={styles.grid_border_1}
                                        >
                                            <b
                                                style={{
                                                    fontSize: 13,
                                                    color: 'white',
                                                }}
                                            >
                                                Other Features
                                            </b>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1}
                                            style={styles.grid_border_2}
                                        >
                                            <b
                                                style={{
                                                    fontSize: 13,
                                                    color: 'white',
                                                }}
                                            >
                                                Qty
                                            </b>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={2}
                                            style={styles.grid_border_2}
                                        >
                                            <b
                                                style={{
                                                    fontSize: 13,
                                                    color: 'white',
                                                }}
                                            >
                                                Unit Price
                                            </b>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={2}
                                            style={styles.grid_border_2}
                                        >
                                            <b
                                                style={{
                                                    fontSize: 13,
                                                    color: 'white',
                                                }}
                                            >
                                                Total Price
                                            </b>
                                        </Grid>
                                    </Grid>
                                    {dtItems.map((item, index) => {
                                        return (
                                            <Grid container>
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
                                                        {(
                                                            '0' +
                                                            (index + 1)
                                                        ).slice(-2)}
                                                    </div>
                                                </Grid>
                                                <Grid
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
                                                        {item.ITEMTitle}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_4}
                                                    item
                                                    xs={4.4}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {item.SPECS}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_5}
                                                    item
                                                    xs={1}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {item.Qty}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_5}
                                                    item
                                                    xs={2}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {item.UnitPrice}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    style={styles.grid_border_5}
                                                    item
                                                    xs={2}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {item.TotalPrice}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    fontWeight: 'bold',
                                }}
                            >
                                Tender Activities
                            </div>

                            {/*  */}
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr
                                        style={{
                                            backgroundColor: '#4679cc',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: '#3f6db7',
                                        }}
                                    >
                                        <th
                                            style={{
                                                width: '5%',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                borderRightWidth: 1,
                                                borderRightColor: '#3f6db7',
                                                borderLeftColor: '#3f6db7',
                                                borderLeftWidth: 1,
                                                borderStyle: 'solid',
                                                fontSize: 13,
                                                color: 'white',
                                            }}
                                        >
                                            Steps
                                        </th>
                                        <th
                                            style={{
                                                width: '80%',
                                                paddingTop: 10,
                                                fontSize: 13,
                                                color: 'white',
                                            }}
                                        >
                                            Documents
                                        </th>
                                        <th
                                            style={{
                                                width: '15%',
                                                paddingTop: 10,
                                                borderRightWidth: 1,
                                                borderLeftWidth: 1,
                                                borderStyle: 'solid',
                                                fontSize: 13,
                                                color: 'white',
                                                borderRightColor: '#3f6db7',
                                                borderLeftColor: '#3f6db7',
                                            }}
                                        >
                                            Attatchments
                                        </th>
                                    </tr>

                                    <tr
                                        style={
                                            aData.ADVERTISEMENT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td>
                                            <div>
                                                <div
                                                    style={
                                                        styles.border_table_sno
                                                    }
                                                >
                                                    0
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            style={{
                                                width: '40%',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            My Tender Details
                                        </td>
                                        <td>
                                            <a
                                                // href={
                                                //     imgLink.Address +
                                                //     'PROCUREMENT/TENDER_FILES/' +
                                                //     Details.ReqID +
                                                //     '/ATTATCHMENTS/' +
                                                //     aData.ADVERTISEMENT
                                                // }
                                                // target={'_blank'}
                                                className="btn btn-sm btn-success"
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: 'green',
                                                }}
                                                onClick={() =>
                                                    setOpenModel(true)
                                                }
                                            >
                                                View Details
                                            </a>
                                        </td>
                                    </tr>

                                    <tr
                                        style={
                                            aData.ADVERTISEMENT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td>
                                            <div>
                                                <div
                                                    style={
                                                        styles.border_table_sno
                                                    }
                                                >
                                                    1
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            style={{
                                                width: '40%',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            Attach Advertisement
                                        </td>
                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.ADVERTISEMENT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>

                                    <tr
                                        style={
                                            aData.CPC_LETTER_PRE_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={3}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                2
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Letter to CPC for Pre Bid Opening
                                            Meeting
                                        </td>
                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_LETTER_PRE_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_PRE_ATTEND_SHEET == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Attendance Sheet of CPC for Pre Bid
                                            Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_PRE_ATTEND_SHEET
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.MINUTES_PRE_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Minutes of Pre Bid Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.MINUTES_PRE_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_LETTER_TECH_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={3}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                3
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Letter to CPC for Technical Bid
                                            Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_LETTER_TECH_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_TECH_ATTEND_SHEET == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Attendance Sheet of CPC for
                                            Technical Bid Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_TECH_ATTEND_SHEET
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.MINUTES_TECH_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Minutes of Technical Bid Opening
                                            Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.MINUTES_TECH_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    {/*---------------------------------*/}
                                    <tr
                                        style={
                                            aData.TECH_EVALUATION == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td>
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                4
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Attach Technical Evaluation
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.TECH_EVALUATION
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_TECH_EVALUATION == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={3}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                5
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Letter to CPC/TC for Technical
                                            Evaluation Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_TECH_EVALUATION
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_TECH_EVALUATION_ATTEND_SHEET ==
                                            0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Attendance Sheet of CPC/TC for
                                            Technical Evaluation Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_TECH_EVALUATION_ATTEND_SHEET
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.MINUTES_TECH_EVALUATION == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Minutes of Technical Evaluation
                                            Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.MINUTES_TECH_EVALUATION
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_LETTER_FIN_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={5}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                6
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Letter to CPC for Financial Bid
                                            Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_LETTER_FIN_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CPC_FIN_ATTEND_SHEET == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Attendance Sheet of CPC for
                                            Financial Bid Opening Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CPC_FIN_ATTEND_SHEET
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.MINUTES_FIN_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Minutes of Financial Bid Opening
                                            Meeting
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.MINUTES_FIN_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.COMPARATIVE_STATEMENT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Comparative Statement
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.COMPARATIVE_STATEMENT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.BID_EVALUATION_RPT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Bid Evaluation Report (B.E.R.)
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.BID_EVALUATION_RPT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    {/*---------------------------------*/}
                                    <tr
                                        style={
                                            aData.FINANCIAL_APPROVAL == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td>
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                7
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Financial Approval
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.FINANCIAL_APPROVAL
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.ACCEPTANCE_LETTER == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={4}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                8
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Acceptance letter to all Successfull
                                            Bidder/s
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.ACCEPTANCE_LETTER
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.PAYORDER == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Pay Order for Performance Security
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.PAYORDER
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CONTRACT_AGREEMENT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Contract Agreement
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CONTRACT_AGREEMENT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.INTIGRITY_PACT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Intigrity Pact
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.INTIGRITY_PACT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>

                                    <tr
                                        style={
                                            aData.FINANCIAL_BID == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td
                                            rowSpan={3}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div
                                                style={styles.border_table_sno}
                                            >
                                                9
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Finanal Bid pages of all Successfull
                                            Bidder/s
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.FINANCIAL_BID
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.PERF_SEC_LETTER == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Perf Sec Letter with deposit slip of
                                            all successfull bidder/s.
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.PERF_SEC_LETTER
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                    <tr
                                        style={
                                            aData.CONTRACT_EVALUAION_RPT == 0
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            Contract Evaluaion Report SIgned by
                                            Chairman, CPC
                                        </td>

                                        <td>
                                            <a
                                                href={
                                                    imgLink.Address +
                                                    'PROCUREMENT/TENDER_FILES/' +
                                                    Details.ReqID +
                                                    '/ATTATCHMENTS/' +
                                                    aData.CONTRACT_EVALUAION_RPT
                                                }
                                                target={'_blank'}
                                                className="btn btn-sm btn-primary"
                                                style={{ width: '100%' }}
                                            >
                                                View Attachment
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/*  */}
                        </div>
                    </Box>
                </SimpleCard>

                {/*  */}
                <Snackbar
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
                </Snackbar>
                {/*  */}
                <Dialog
                    fullWidth
                    maxWidth={'lg'}
                    open={OpenModel}
                    onClose={() => setOpenModel(false)}
                >
                    <DialogContent>
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
                            }}
                        >
                            <Grid item xs={12}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Work Title:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {Details.WORK_TITLE}
                                    </span>
                                </b>
                            </Grid>
                            {/*  */}
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Posting Date:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.POSTING_DATE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Tender Fee:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.TENDER_FEE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Doc End Date:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.DOC_END_DATE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    BID Submission Date:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(
                                            Details.BID_SUBMISSION_DATE
                                        ).format('DD/MM/YYYY')}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Technical Date:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.TECHNICAL_DATE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Financial Date:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.FINANCIAL_DATE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    BID Validity:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {moment(Details.BID_VALIDITY).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    BID Security:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {Details.BID_SECURITY}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Performance Security:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {Details.PERFORMANCE_SECURITY}
                                    </span>
                                </b>
                            </Grid>
                        </Grid>

                        <h6
                            style={{
                                fontSize: 16,
                                paddingTop: 5,
                                paddingBottom: 5,
                            }}
                        >
                            Required Documents
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
                                <Grid
                                    item
                                    xs={11.4}
                                    style={styles.grid_border_2}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Documents
                                    </b>
                                </Grid>
                            </Grid>
                            {dtDetails.map((item, index) => {
                                return (
                                    <Grid container>
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
                                                {/* 0{index + 1} */}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={6.4}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 5,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                {item.REQ_DOC_TITLE}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={5}
                                        >
                                            <div
                                                style={{
                                                    paddingLeft: 5,
                                                    fontSize: 13,
                                                    color: 'black',
                                                }}
                                            >
                                                <a
                                                    href={
                                                        imgLink.Address +
                                                        'PROCUREMENT/TENDER_FILES/' +
                                                        Details.ReqID +
                                                        '/QUOTATIONS/' +
                                                        item.FPath
                                                    }
                                                >
                                                    View Attatchment
                                                </a>
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </div>

                        <h6
                            style={{
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 5,
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
                                <Grid item xs={2} style={styles.grid_border_1}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Item Name
                                    </b>
                                </Grid>
                                <Grid
                                    item
                                    xs={4.4}
                                    style={styles.grid_border_1}
                                >
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Other Features
                                    </b>
                                </Grid>
                                <Grid item xs={1} style={styles.grid_border_2}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Qty
                                    </b>
                                </Grid>
                                <Grid item xs={2} style={styles.grid_border_2}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Unit Price
                                    </b>
                                </Grid>
                                <Grid item xs={2} style={styles.grid_border_2}>
                                    <b style={{ fontSize: 13, color: 'white' }}>
                                        Total Price
                                    </b>
                                </Grid>
                            </Grid>
                            {dtItems.map((item, index) => {
                                return (
                                    <Grid container>
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
                                            xs={2}
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
                                        <Grid
                                            style={styles.grid_border_4}
                                            item
                                            xs={4.4}
                                        >
                                            <div style={{ paddingLeft: 5 }}>
                                                {item.SPECS}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={1}
                                        >
                                            <div style={{ paddingLeft: 5 }}>
                                                {item.Qty}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={2}
                                        >
                                            <div style={{ paddingLeft: 5 }}>
                                                {item.UnitPrice}
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={styles.grid_border_5}
                                            item
                                            xs={2}
                                        >
                                            <div style={{ paddingLeft: 5 }}>
                                                {item.TotalPrice}
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </div>

                        <h6
                            style={{
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 5,
                            }}
                        >
                            Technical Proposal
                        </h6>

                        <a
                            href={
                                imgLink.Address +
                                'PROCUREMENT/TENDER_FILES/' +
                                Details.ReqID +
                                '/QUOTATIONS/' +
                                Details.TechFile
                            }
                            target="_blank"
                            className="btn btn-sm btn-primary"
                            style={{
                                backgroundColor: 'green',
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'green',
                            }}
                        >
                            Download Technical Proposal
                        </a>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    onClick={() => setOpenModel(false)}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, ml: 1 }}
                                >
                                    CLOSE
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    )
}

export default SimpleForm
