import 'bootstrap/dist/css/bootstrap.min.css'
import { Grid, Snackbar, Alert, Box, Button } from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect, useRef } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useNavigate } from 'react-router-dom'
import ReactDatatable from '../../components/DataTable/index'
import ip from '../DB/IP_Address'
import { useDispatch, useSelector } from 'react-redux'
import { config, extraButtons } from '../Components/Component'
import moment from 'moment'
import Link from '@mui/material/Link'
import Resizer from 'react-image-file-resizer'
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
    const ref = useRef()
    const dispatch = useDispatch()
    //
    const empData = useSelector((data) => data.loginReducer.EmpData)
    //
    const [txtJournal, settxtJournal] = React.useState('')
    const [txtYear, settxtYear] = React.useState(
        moment(new Date()).format('YYYY')
    )
    const [txtWork, settxtWork] = React.useState('')
    const [Image, setImage] = React.useState('')
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
        settxtJournal('')
        settxtYear(moment(new Date()).format('YYYY'))
        settxtWork('')
        ref.current.value = ''
    }

    const handleSubmit = (event) => {
        // navigate('/Admission/EMP_UploadDocs')
        //
        UPDATE_PROFILE()
    }

    const [dtData, setdtData] = React.useState([])

    const compressImageFunction = (event, stateName) => {
        try {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'PNG',
                50,
                0,
                (uri) => {
                    // console.log(uri)
                    var strImage = uri.replace(
                        /^data:image\/[a-z]+;base64,/,
                        ''
                    )
                    setImage(strImage)
                },
                'base64',
                200,
                200
            )
        } catch (err) {
            console.log(err)
        }
    }

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
            ip.Address + 'erec.asmx/REC_FILE_INSERT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    empData.T_EMP_ID +
                    '&FILE_TITLE=' +
                    txtWork +
                    '&imageData=' +
                    Image,
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
            ip.Address + 'erec.asmx/REC_FILE_LIST',

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
            key: 'FILE_TITLE',
            text: 'File Title',
            className: 'district',
            sortable: true,
            searchable: true,
            width: '50%',
        },
        {
            key: 'FILE_NAME',
            text: 'Preview File',
            className: 'district',
            sortable: true,
            width: '50%',
            searchable: true,
            cell: (record) => {
                return (
                    <div>
                        <Link
                            target={'_blank'}
                            // color="inherit"
                            href={record.FILE_NAME}
                        >
                            Preview Image
                        </Link>
                    </div>
                )
            },
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
                                { name: 'Upload Documents' },
                            ]}
                        />
                    </div>
                    <SimpleCard title="Add Documents">
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <TextValidator
                                    onChange={(event) => {
                                        settxtWork(event.target.value)
                                    }}
                                    value={txtWork || ''}
                                    required
                                    fullWidth
                                    label="File Title"
                                    size="small"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <TextValidator
                                    onChange={(event) => {
                                        settxtJournal(event.target.value)
                                    }}
                                    value={txtJournal || ''}
                                    required
                                    fullWidth
                                    // label="Journal Publish"
                                    size="small"
                                    type="file"
                                /> */}
                                <input
                                    required
                                    ref={ref}
                                    type="file"
                                    accept="image/*"
                                    class="form-control"
                                    onChange={(e) =>
                                        compressImageFunction(e, 'setImage')
                                    }
                                ></input>
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
                                    ADD FILE
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

                    <SimpleCard title="Documents List">
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

export default SimpleForm
