import {
    Grid,
    Snackbar,
    Alert,
    Table,
    Skeleton,
    CircularProgress,
    Button,
} from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Autocomplete } from '@mui/material'
import ip from '../DB/IP_Address'
import moment from 'moment'
import LoadingButton from '@mui/lab/LoadingButton'

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
    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [progress, setProgress] = React.useState(false)
    const [state, setState] = useState({})
    //
    const [LegalTypeList, setLegalTypeList] = React.useState([])
    const [RegTypeList, setRegTypeList] = React.useState([])
    const [DistrictList, setDistrictList] = React.useState([])
    //
    const [LegalType, setLegalType] = React.useState({
        LegalTypeID: '0',
        LegalTypeTitle: '',
    })
    const [RegType, setRegType] = React.useState({
        RegistrationTypeID: '0',
        RegistrationTypeTitle: '',
    })
    const [District, setDistrict] = React.useState({
        DistrictID: '0',
        DistrictTitle: '',
    })

    useEffect(() => {}, [])

    const styles = {
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

    const handleSubmit = (event) => {
        setloading(true)
        VENDOR_UPDATE()
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    React.useEffect(() => {
        GETALL_LEGAL_TYPE()
        GETALL_REGISTRATION_TYPE()
        GETALL_DISTRICT()
        GETALL_DETAILS_VENDOR()
        //
        setState({
            ...state,
            RegistrationDate: moment(new Date()).format('YYYY-MM-DD'),
        })
    }, [])

    const {
        BussinessName,
        NTN,
        STRN,
        Mobile,
        Country,
        Address,
        CNIC,
        sts,
        RegistrationDate,
    } = state

    const GETALL_LEGAL_TYPE = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_PRC_LEGAL_TYPE_GET',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setLegalTypeList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_REGISTRATION_TYPE = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_REGISTRATION_TYPE',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setRegTypeList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_DISTRICT = async (value) => {
        return await fetch(
            ip.Address + 'vpanel.asmx/LOAD_DISTRICT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'compID=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setDistrictList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_DETAILS_VENDOR = async (value) => {
        setProgress(true)
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
                // console.log(response)
                const v = response[0]
                setState({
                    ...state,
                    BussinessName: v.SupplierTitle,
                    NTN: v.NTN,
                    STRN: v.STRN,
                    Mobile: v.Phone,
                    Country: v.Country,
                    Address: v.Address,
                    CNIC: v.CNIC,
                    sts: v.STS,
                    RegistrationDate: moment(v.BusinessRegistrationDate).format(
                        'YYYY-MM-DD'
                    ),
                })
                setLegalType({
                    LegalTypeID: v.LegalTypeID,
                    LegalTypeTitle: v.LegalTypeTitle,
                })
                setRegType({
                    RegistrationTypeID: v.RegistrationTypeID,
                    RegistrationTypeTitle: v.RegistrationTypeTitle,
                })
                setDistrict({
                    DistrictID: v.DistrictID,
                    DistrictTitle: v.DistrictTitle,
                })
                setProgress(false)
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const VENDOR_UPDATE = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'vpanel.asmx/VENDOR_PROFILE_UPDATE',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    vendorData.SYSTEMID +
                    '&businessName=' +
                    BussinessName +
                    '&RegistrationType=' +
                    RegType.RegistrationTypeID +
                    '&LegalType=' +
                    LegalType.LegalTypeID +
                    '&cnic=' +
                    CNIC +
                    '&ntn=' +
                    NTN +
                    '&strn=' +
                    STRN +
                    '&sts=' +
                    sts +
                    '&phone=' +
                    Mobile +
                    '&country=' +
                    Country +
                    '&districtID=' +
                    District.DistrictID +
                    '&address=' +
                    Address +
                    '&RegistrationDate=' +
                    moment(RegistrationDate).format('MM/DD/YYYY'),
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setloading(false)
                setOpen(true)
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
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
                            { name: 'My Profile' },
                        ]}
                    />
                </div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <SimpleCard title={'Accounts Settings'}>
                        <Grid
                            container
                            justifyContent="flex-end"
                            style={{ marginTop: -45 }}
                        >
                            <Grid item>
                                {progress ? (
                                    <CircularProgress
                                        size="1.5rem"
                                        style={{ marginBottom: 20 }}
                                    />
                                ) : (
                                    <div style={{ marginBottom: 50 }}></div>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextValidator
                                    size="small"
                                    name="BussinessName"
                                    required
                                    fullWidth
                                    label="Business Legal Name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={BussinessName || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Autocomplete
                                    value={LegalType}
                                    options={LegalTypeList}
                                    getOptionLabel={(option) =>
                                        option.LegalTypeTitle
                                    }
                                    filterSelectedOptions
                                    onChange={(event, value) => {
                                        setLegalType(value)
                                        if (value === null) {
                                            setLegalType({
                                                LegalTypeID: '0',
                                                LegalTypeTitle: '',
                                            })
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="Business Legal Type"
                                            fullWidth
                                            size="small"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Autocomplete
                                    value={RegType}
                                    options={RegTypeList}
                                    getOptionLabel={(option) =>
                                        option.RegistrationTypeTitle
                                    }
                                    filterSelectedOptions
                                    onChange={(event, value) => {
                                        setRegType(value)
                                        if (value === null) {
                                            setRegType({
                                                RegistrationTypeID: '0',
                                                RegistrationTypeTitle: '',
                                            })
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="Registration Type"
                                            fullWidth
                                            size="small"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            {/*  */} <Grid item xs={12}></Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="Registration Date"
                                    name="RegistrationDate"
                                    onChange={handleChange}
                                    value={RegistrationDate || ''}
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="Mobile No"
                                    name="Mobile"
                                    onChange={handleChange}
                                    value={Mobile || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Autocomplete
                                    value={District}
                                    options={DistrictList}
                                    getOptionLabel={(option) =>
                                        option.DistrictTitle
                                    }
                                    filterSelectedOptions
                                    onChange={(event, value) => {
                                        setDistrict(value)
                                        if (value === null) {
                                            setDistrict({
                                                DistrictID: '0',
                                                DistrictTitle: '',
                                            })
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="District"
                                            fullWidth
                                            size="small"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="Country"
                                    name="Country"
                                    onChange={handleChange}
                                    value={Country || ''}
                                />
                            </Grid>
                            {/*  */} <Grid item xs={12}></Grid>
                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="Address"
                                    name="Address"
                                    onChange={handleChange}
                                    value={Address || ''}
                                />
                            </Grid>
                            {/*  */} <Grid item xs={12}></Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="NTN"
                                    name="NTN"
                                    onChange={handleChange}
                                    value={NTN || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="STRN"
                                    name="STRN"
                                    onChange={handleChange}
                                    value={STRN || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="CNIC"
                                    name="CNIC"
                                    onChange={handleChange}
                                    value={CNIC || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextValidator
                                    size="small"
                                    required
                                    fullWidth
                                    label="STS"
                                    name="sts"
                                    onChange={handleChange}
                                    value={sts || ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingIndicator="Loading…"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                UPDATE PROFILE
                            </LoadingButton>
                            <Grid item>
                                <Button
                                    onClick={() => GETALL_DETAILS_VENDOR()}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, ml: 1 }}
                                >
                                    CANCEL
                                </Button>
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
                        Record updated successfully.
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default SimpleForm
