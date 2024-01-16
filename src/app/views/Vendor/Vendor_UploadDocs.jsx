import { Button, Grid, Snackbar, Alert, Table } from '@mui/material'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import React, { useState, useEffect, useRef } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
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

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: 'grey',
    fontSize: 14,
    marginTop: -20,
    textAlign: 'center',
}))

const Space = styled('div')(({ theme }) => ({
    marginTop: 10,
}))

const SimpleForm = () => {
    const ref = useRef()
    //
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const [loading, setloading] = useState(false)
    const [OpenModel, setOpenModel] = useState(false)
    const [Picture, setPicture] = useState('')
    const [open, setOpen] = React.useState(false)
    //
    const [state, setState] = useState({})
    const [DocumentArray, setDocumentArray] = useState([])

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    useEffect(() => {
        setState({
            ...state,
            // ADM_RegistraionID: userData._id,
        })
    }, [])

    const handleSubmit = (event) => {
        navigate('/Admission/EMP_Dashboard')

        //
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const { ADM_RegistraionID, DocTitle, DocString } = state

    const ADD_RESEARCH_RECORD = () => {
        setDocumentArray((oldArray) => [
            ...oldArray,
            {
                id: DocumentArray.length,
                DocTitle: DocTitle,
                DocString: DocString,
            },
        ])
        setState({
            ...state,
            DocTitle: '',
            DocString: '',
        })
        ref.current.value = ''
    }

    const removeItemResearch = (item) => {
        setDocumentArray((current) =>
            current.filter((product) => {
                // 👇️ remove object that has id equal to 2
                return product.id !== item
            })
        )
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
                            { name: 'Upload Documents' },
                        ]}
                    />
                </div>
                <ValidatorForm>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{ mt: 2 }}
                        >
                            <SimpleCard title="Attached Documents">
                                <Alert severity="info">
                                    Upload scan copies of original NTN, STRN,
                                    Incorporation/ registration No., PEC
                                    registration and other available,
                                    certificates if applicable.
                                </Alert>
                                <Space />
                                <Grid container>
                                    <Grid lg={5} md={5} sm={12} xs={12}>
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                }}
                                            >
                                                Document Name
                                            </span>
                                            <TextField
                                                style={{ marginTop: 3 }}
                                                size={'small'}
                                                type="text"
                                                name="DocTitle"
                                                onChange={handleChange}
                                                value={DocTitle}
                                                // validators={['required']}
                                                // errorMessages={[
                                                //     'This field is required',
                                                // ]}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={5} md={5} sm={12} xs={12}>
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                }}
                                            >
                                                Upload Image (Image Size should
                                                be less than 1 MB)
                                            </span>

                                            <div
                                                style={{
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    padding: 7,
                                                    marginTop: 2.5,
                                                    borderRadius: 5,
                                                    borderColor: '#c9c9c9',
                                                }}
                                            >
                                                <form
                                                    method="POST"
                                                    action="/profile-upload-single"
                                                    encType="multipart/form-data"
                                                >
                                                    <input
                                                        ref={ref}
                                                        accept="image/*"
                                                        type="file"
                                                        onChange={(e) => {
                                                            setState({
                                                                ...state,
                                                                DocString:
                                                                    e.target
                                                                        .files[0],
                                                            })
                                                        }}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid lg={0.2} md={0.2}></Grid>

                                    <Grid lg={1.6} md={1.6} sm={12} xs={12}>
                                        <LoadingButton
                                            onClick={() =>
                                                ADD_RESEARCH_RECORD()
                                            }
                                            color="success"
                                            variant="contained"
                                            style={{
                                                width: '100%',
                                                marginTop: 23,
                                            }}
                                        >
                                            ADD RECORD
                                        </LoadingButton>
                                    </Grid>
                                </Grid>

                                {/* EDUCATION RECORD LIST */}
                                {DocumentArray.map((item) => {
                                    return (
                                        <Grid
                                            container
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                                paddingTop: '8px',
                                                paddingBottom: '5px',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                paddingLeft: '15px',
                                                borderRadius: 5,
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <Grid lg={5} md={5} sm={12} xs={12}>
                                                <span>
                                                    {item.id + 1 + '. '}
                                                    {item.DocTitle}
                                                </span>
                                            </Grid>

                                            <Grid lg={0.2} md={0.2}></Grid>

                                            <Grid lg={5} md={5} sm={12} xs={12}>
                                                <Button
                                                    onClick={() => {
                                                        setPicture(
                                                            item.DocString
                                                        )
                                                        setOpenModel(true)
                                                    }}
                                                >
                                                    Preview Image
                                                </Button>
                                            </Grid>

                                            <Grid lg={0.2} md={0.2}></Grid>

                                            <Grid
                                                lg={1.6}
                                                md={1.6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <CloseIcon
                                                    onClick={() =>
                                                        removeItemResearch(
                                                            item.id
                                                        )
                                                    }
                                                    style={{
                                                        color: 'red',
                                                        width: '100%',
                                                        marginLeft: 'auto',
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    )
                                })}

                                <Space />
                                <Space />

                                <LoadingButton
                                    type="submit"
                                    onClick={handleSubmit}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="contained"
                                >
                                    Save and Next
                                </LoadingButton>

                                <LoadingButton
                                    onClick={() => setloading(false)}
                                    color="secondary"
                                    variant="contained"
                                    style={{ marginLeft: 10 }}
                                >
                                    Cancel
                                </LoadingButton>
                            </SimpleCard>
                        </Grid>
                    </Grid>
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
                        Well Done!.. Document saved successfully.
                    </Alert>
                </Snackbar>

                <Dialog
                    open={OpenModel}
                    onClose={() => setOpenModel(false)}
                    scroll={'paper'}
                >
                    <DialogTitle id="scroll-dialog-title">
                        Preview Image
                    </DialogTitle>
                    <DialogContent dividers={'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <img
                                style={{ height: '100%', width: '100%' }}
                                src={
                                    Picture == ''
                                        ? null
                                        : URL.createObjectURL(Picture)
                                }
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModel(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    )
}

export default SimpleForm
