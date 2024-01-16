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
import { useNavigate } from 'react-router-dom'
import imgLink from '../DB/IP_Address'

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
    const vendorData = useSelector((data) => data.loginReducer.VendorData)
    const [open, setOpen] = React.useState(false)
    const [OpenModel, setOpenModel] = React.useState(false)
    const [loading_dt, setloading_dt] = React.useState(true)
    //
    useEffect(() => {
        GETALL_NIT_LIST()
    }, [])

    const [dtData, setdtData] = React.useState([])
    const [dtDetails, setdtDetails] = React.useState([])
    const [dtItems, setdtItems] = React.useState([])
    const [Details, setDetails] = React.useState([])

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
    }

    const GETALL_NIT_LIST = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_APPLIED_NIT_LIST',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'SupplierID=' + vendorData.SupplierID,
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
        setOpenModel(true)
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
                console.log(response)
                setdtDetails(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_ITEM_DETAIL = async (value) => {
        setOpenModel(true)
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

    const columns = [
        {
            key: 'WORK_TITLE',
            text: 'Work Title',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '50%',
        },
        {
            key: 'WORK_TYPE',
            text: 'Type',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '10%',
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
                    <div>{moment(record.CREATE_DATE).format('DD/MM/YYYY')}</div>
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
                                        state: {
                                            QTID: record.QTID,
                                            Details: record,
                                        },
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
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Admission/ADM_Dashboard',
                            },
                            { name: 'Active NIT' },
                        ]}
                    />
                </div>
                <SimpleCard title="Active NIT List">
                    <Box width="100%">
                        <ReactDatatable
                            className="table table-bordered table-striped custom-class"
                            config={config('ApplicantID', 'Academic List')}
                            records={dtData}
                            columns={columns}
                            extraButtons={extraButtons}
                            loading={loading_dt}
                        />
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
                                        {moment(Details.CREATE_DATE).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Tender Fee:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {Details.TENDER_FEE}
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
                                        {Details.BID_SECURITY}%
                                    </span>
                                </b>
                            </Grid>
                            <Grid item xs={4} sx={{ pt: 1 }}>
                                <b style={{ fontSize: 13, color: '#1e4620' }}>
                                    Performance Security:{' '}
                                    <span style={{ fontWeight: 'normal' }}>
                                        {Details.PERFORMANCE_SECURITY}%
                                    </span>
                                </b>
                            </Grid>
                        </Grid>

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

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {/* <LoadingButton
                                    onClick={() =>
                                        navigate(
                                            '/Vendor/Vendor_Apply_Tender',
                                            {
                                                state: {
                                                    Details: Details,
                                                    dtItems: dtItems,
                                                    dtDetails: dtDetails,
                                                },
                                            }
                                        )
                                    }
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    APPLY TENDER
                                </LoadingButton> */}
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
