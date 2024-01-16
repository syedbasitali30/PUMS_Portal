import 'bootstrap/dist/css/bootstrap.min.css'
import { Grid, Snackbar, Alert, Box, Button } from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useNavigate } from 'react-router-dom'
import ReactDatatable from '../../components/DataTable/index'
import ip from '../DB/IP_Address'
import { useDispatch, useSelector } from 'react-redux'
import { config, extraButtons } from '../Components/Component'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import moment from 'moment'
import { UpdateEmpInfo } from './EMP_UpdateStatus'

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
    const empData = useSelector((data) => data.loginReducer.EmpData)
    //
    const dispatch = useDispatch()

    const [txtReason, settxtReason] = React.useState('')
    const [txtBPS, settxtBPS] = React.useState('')
    const [txtStartDate, settxtStartDate] = React.useState(
        moment(new Date()).format('YYYY-MM-DD')
    )
    const [txtEndDate, settxtEndDate] = React.useState(
        moment(new Date()).format('YYYY-MM-DD')
    )
    const [txtDepartment, settxtDepartment] = React.useState('')
    //

    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [loading_dt, setloading_dt] = useState(true)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        GETALL_EDUCATION_LIST()
    }, [])

    const clear = () => {
        settxtReason('')
        settxtBPS('')
        settxtStartDate(moment(new Date()).format('YYYY-MM-DD'))
        settxtEndDate(moment(new Date()).format('YYYY-MM-DD'))
        settxtDepartment('')
    }

    const handleSubmit = (event) => {
        // navigate('/Admission/EMP_UploadDocs')
        //
        UPDATE_PROFILE()
    }

    const [dtData, setdtData] = React.useState([])

    const CHECK_RECORD = (value) => {
        const res = value[0]
        if (res.MSG == 'SUCCESS') {
            setdtData(value)
        } else {
            setdtData([])
        }
    }

    const UPDATE_PROFILE = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'erec.asmx/REC_EXPERIENCE_INSERT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    empData.T_EMP_ID +
                    '&deptOrganization=' +
                    txtDepartment +
                    '&desBPS=' +
                    txtBPS +
                    '&startDate=' +
                    moment(txtStartDate).format('MM/DD/YYYY') +
                    '&endDate=' +
                    moment(txtEndDate).format('MM/DD/YYYY') +
                    '&reason=' +
                    txtReason,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setOpen(true)
                GETALL_EDUCATION_LIST()
                clear()
                setloading(false)
                //
                dispatch(UpdateEmpInfo(empData.T_EMP_ID))
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
            })
    }

    const GETALL_EDUCATION_LIST = async (value) => {
        return await fetch(
            ip.Address + 'erec.asmx/REC_EXPERIENCE_LIST',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'systemID=' + empData.T_EMP_ID,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                // console.log(response)
                CHECK_RECORD(response)
                setloading_dt(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        {
            key: 'DEPT_ORG',
            text: 'Organization',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'DESIGNATION_BPS',
            text: 'Designation BPS',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'START_DATE',
            text: 'Start Date',
            className: 'district',
            sortable: true,
            searchable: true,
            cell: (record) => {
                return (
                    <div>{moment(record.START_DATE).format('DD/MM/YYYY')}</div>
                )
            },
        },
        {
            key: 'END_DATE',
            text: 'End Date',
            className: 'district',
            sortable: true,
            searchable: true,
            cell: (record) => {
                return <div>{moment(record.END_DATE).format('DD/MM/YYYY')}</div>
            },
        },
        {
            key: 'REASON_LEAVING',
            text: 'Reason of Leaving',
            className: 'district',
            sortable: true,
            searchable: true,
        },
    ]

    return (
        <div>
            <Container>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                {
                                    name: 'Dashboard',
                                    path: '/Admission/ADM_Dashboard',
                                },
                                { name: 'Job Info' },
                            ]}
                        />
                    </div>
                    <SimpleCard title="Add Job Info'">
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtDepartment(event.target.value)
                                    }}
                                    value={txtDepartment || ''}
                                    required
                                    fullWidth
                                    label="Organization"
                                    size="small"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtBPS(event.target.value)
                                    }}
                                    value={txtBPS || ''}
                                    required
                                    fullWidth
                                    label="Designation BPS"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        maxDate={new Date()}
                                        inputFormat="dd/MM/yyyy"
                                        value={txtStartDate || ''}
                                        onChange={(date) => {
                                            settxtStartDate(
                                                moment(date).format(
                                                    'YYYY-MM-DD'
                                                )
                                            )
                                        }}
                                        renderInput={(props) => (
                                            <TextValidator
                                                {...props}
                                                size="small"
                                                required
                                                label="Start Date"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2.4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        maxDate={new Date()}
                                        inputFormat="dd/MM/yyyy"
                                        value={txtEndDate || ''}
                                        onChange={(date) => {
                                            settxtEndDate(
                                                moment(date).format(
                                                    'YYYY-MM-DD'
                                                )
                                            )
                                        }}
                                        renderInput={(props) => (
                                            <TextValidator
                                                {...props}
                                                size="small"
                                                required
                                                label="End Date"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtReason(event.target.value)
                                    }}
                                    value={txtReason || ''}
                                    required
                                    fullWidth
                                    label="Reason of Leaving"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <LoadingButton
                                    type="submit"
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ADD EXPERIENCE
                                </LoadingButton>
                                <Button
                                    onClick={() => clear()}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, ml: 1 }}
                                >
                                    CANCEL
                                </Button>
                            </Grid>
                        </Grid>
                    </SimpleCard>

                    <Grid container sx={{ mt: 4 }}></Grid>

                    <SimpleCard title="Job List">
                        <Box width="100%">
                            <ReactDatatable
                                className="table table-bordered table-striped custom-class"
                                config={config('ApplicantID', 'Job List')}
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
                            Record saved successfully.
                        </Alert>
                    </Snackbar>
                </ValidatorForm>
            </Container>
        </div>
    )
}

export default SimpleForm
