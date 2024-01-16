import 'bootstrap/dist/css/bootstrap.min.css'
import { Grid, Snackbar, Alert, Box, Autocomplete, Button } from '@mui/material'
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
    const dispatch = useDispatch()
    //
    const [txtGrade, settxtGrade] = React.useState('')
    const [txtBoard, settxtBoard] = React.useState('')
    const [txtPassingYear, settxtPassingYear] = React.useState(
        moment(new Date()).format('YYYY')
    )
    const [txtDegree, settxtDegree] = React.useState({
        DegreeID: '0',
        DegreeTitle: '',
    })
    const [ddlDegreeList, setddlDegreeList] = React.useState([])
    const [txtSubject, settxtSubject] = React.useState('')
    //

    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [loading_dt, setloading_dt] = useState(true)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        GETALL_EDUCATION_LIST()
        GETALL_RELIGION()
    }, [])

    const clear = () => {
        settxtGrade('')
        settxtBoard('')
        settxtPassingYear(moment(new Date()).format('YYYY'))
        settxtDegree({
            DegreeID: '0',
            DegreeTitle: '',
        })
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
            ip.Address + 'erec.asmx/REC_EDUCATION_INSERT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    empData.T_EMP_ID +
                    '&degreeID=' +
                    txtDegree.DegreeID +
                    '&subject=' +
                    txtSubject +
                    '&board=' +
                    txtBoard +
                    '&passYear=' +
                    txtPassingYear +
                    '&gradeDivision=' +
                    txtGrade,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                // console.log(response)
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
            ip.Address + 'erec.asmx/REC_EDUCATION_LIST',

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

    const GETALL_RELIGION = async (value) => {
        return await fetch(
            ip.Address + 'erec.asmx/loadDEGREE',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'comp=0',
            }
        )
            .then((res) => res.json())
            .then((response) => {
                setddlDegreeList(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        {
            key: 'DegreeTitle',
            text: 'Degree',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'SUBJECT',
            text: 'Subject',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'NAME_OF_BOARD',
            text: 'Name of Board',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'YEAR_PASSING',
            text: 'Passing Year',
            className: 'district',
            sortable: true,
            searchable: true,
        },
        {
            key: 'GRADE_DIVISION',
            text: 'Grade / Division',
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
                                { name: 'Education Information' },
                            ]}
                        />
                    </div>
                    <SimpleCard title="Add Education Information">
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={2.4}>
                                <Autocomplete
                                    value={txtDegree}
                                    options={ddlDegreeList}
                                    getOptionLabel={(option) =>
                                        option.DegreeTitle
                                    }
                                    onChange={(event, value) => {
                                        settxtDegree(value)
                                    }}
                                    renderInput={(params) => (
                                        <TextValidator
                                            {...params}
                                            variant="outlined"
                                            label="Select Degree"
                                            fullWidth
                                            size="small"
                                            required
                                            autoFocus
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtSubject(event.target.value)
                                    }}
                                    value={txtSubject || ''}
                                    required
                                    fullWidth
                                    label="Subject"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtBoard(event.target.value)
                                    }}
                                    value={txtBoard || ''}
                                    required
                                    fullWidth
                                    label="Board"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        maxDate={new Date()}
                                        views={['year']}
                                        inputFormat="yyyy"
                                        value={txtPassingYear || ''}
                                        onChange={(date) => {
                                            settxtPassingYear(
                                                moment(date).format('YYYY')
                                            )
                                        }}
                                        renderInput={(props) => (
                                            <TextValidator
                                                {...props}
                                                size="small"
                                                required
                                                label="Passing Year"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={2.4}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtGrade(event.target.value)
                                    }}
                                    value={txtGrade || ''}
                                    required
                                    fullWidth
                                    label="Grade / Division"
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
                                    ADD EDUCATION
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

                    <SimpleCard title="Education List">
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
                            Record saved successfully.
                        </Alert>
                    </Snackbar>
                </ValidatorForm>
            </Container>
        </div>
    )
}

const GradeArr = [
    { id: 0, title: '1st Division' },
    { id: 1, title: '2st Division' },
    { id: 2, title: 'A+ Grade' },
    { id: 3, title: 'A Grade' },
    { id: 4, title: 'B Grade' },
    { id: 5, title: 'C Grade' },
    { id: 6, title: 'D Grade' },
]

export default SimpleForm
