import { Grid, Snackbar, Alert, Typography } from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ip from '../DB/IP_Address'
import moment from 'moment'
import ImageIcon from '@mui/icons-material/Image'
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
    const vendorData = useSelector((data) => data.loginReducer.VendorData)
    //
    const [open, setOpen] = React.useState(false)
    const [Details, setDetails] = React.useState([])

    React.useEffect(() => {
        GETALL_DETAILS_VENDOR()
    }, [])

    const GETALL_DETAILS_VENDOR = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_VENDOR_INFO',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'systemID=' + vendorData.SYSTEMID,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setDetails(response[0])
            })

            .catch((error) => {
                console.log(error)
            })
    }

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
                            { name: 'Advanced Information' },
                        ]}
                    />
                </div>
                <ValidatorForm>
                    <SimpleCard>
                        <Typography
                            component="h1"
                            variant="h6"
                            style={{ marginTop: -15 }}
                        >
                            {vendorData.SupplierTitle}
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: '0px' }}>
                            {/*  */}
                            <Grid item xs={12} sm={3}>
                                <div>
                                    Registration Type:{' '}
                                    <b>{Details.RegistrationTypeTitle}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div>
                                    Legal Type: <b>{Details.LegalTypeTitle}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div>
                                    Email: <b>{Details.Email}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div>
                                    Registration Date:{' '}
                                    <b>
                                        {moment(
                                            Details.BusinessRegistrationDate
                                        ).format('DD/MM/YYYY')}
                                    </b>
                                </div>
                            </Grid>
                            {/*  */}
                            <Grid item xs={12} sm={2}>
                                <div>
                                    Phone: <b>{Details.Phone}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div>
                                    Cell No: <b>{Details.CellNo}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div>
                                    NTN: <b>{Details.NTN}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div>
                                    STRN: <b>{Details.STRN}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div>
                                    STS: <b>{Details.STS}</b>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div>
                                    CNIC: <b>{Details.CNIC}</b>
                                </div>
                            </Grid>
                            {/*  */}

                            <Grid item xs={12} sm={2}>
                                <div>
                                    District: <b>{Details.DistrictTitle}</b>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={10}>
                                <div>
                                    Address:{' '}
                                    <b>
                                        {Details.Address}, {Details.Country}
                                    </b>
                                </div>
                            </Grid>
                        </Grid>
                    </SimpleCard>
                    <br />
                    <SimpleCard title="Attached Documents">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <Link
                                    href={Details.NTNImage}
                                    target="_blank"
                                    variant="body2"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageIcon />
                                    <b
                                        style={{
                                            paddingLeft: 2,
                                            paddingTop: 0,
                                        }}
                                    >
                                        NTN Attachment
                                    </b>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link
                                    href={Details.STRNImage}
                                    target="_blank"
                                    variant="body2"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageIcon />
                                    <b
                                        style={{
                                            paddingLeft: 2,
                                            paddingTop: 0,
                                        }}
                                    >
                                        STRN Attachment
                                    </b>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link
                                    href={Details.STSImage}
                                    target="_blank"
                                    variant="body2"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageIcon />
                                    <b
                                        style={{
                                            paddingLeft: 2,
                                            paddingTop: 0,
                                        }}
                                    >
                                        STS Attachment
                                    </b>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link
                                    href={Details.CNICImage}
                                    target="_blank"
                                    variant="body2"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageIcon />
                                    <b
                                        style={{
                                            paddingLeft: 2,
                                            paddingTop: 0,
                                        }}
                                    >
                                        CNIC Attachment
                                    </b>
                                </Link>
                            </Grid>
                        </Grid>
                    </SimpleCard>
                </ValidatorForm>
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
                        Well Done!.. Basic info saved successfully.
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default SimpleForm
