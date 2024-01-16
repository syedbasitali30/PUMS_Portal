import * as React from 'react'
import {
    Card,
    Fab,
    Grid,
    Icon,
    lighten,
    styled,
    useTheme,
    Button,
} from '@mui/material'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}))

const FabIcon = styled(Fab)(() => ({
    width: '44px !important',
    height: '44px !important',
    boxShadow: 'none !important',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const H3 = styled('h3')(({ textcolor }) => ({
    margin: 0,
    color: textcolor,
    fontWeight: '500',
    marginLeft: '12px',
}))

const H1 = styled('h1')(({ theme }) => ({
    margin: 0,
    flexGrow: 1,
    color: theme.palette.text.secondary,
}))

const Span = styled('span')(({ textcolor }) => ({
    fontSize: '13px',
    color: textcolor,
    marginLeft: '4px',
}))

const IconBox = styled('div')(() => ({
    width: 16,
    height: 16,
    color: '#fff',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '300px ',
    justifyContent: 'center',
    '& .icon': { fontSize: '14px' },
}))
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    //   innerHeight:'200'
}
const StatCards2 = () => {
    useEffect(() => {
        runInfoAdmission()
    }, [])
    //

    const [infoData, setinfoData] = React.useState({
        APPLY_ONLINE: '',
    })
    const [applyvis, setapplyvis] = React.useState('visible')

    const runInfoAdmission = () => {
        axios
            .get('http://121.52.155.34:5000/UniAdmission/getAll')
            .then((response) => {
                // console.log(response.data[0])
                const a = response.data[0]
                if (a.APPLY_ONLINE === 'CLOSED') {
                    setapplyvis('hidden')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const navigate = useNavigate()
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const { palette } = useTheme()
    const textError = palette.error.main
    const bgError = lighten(palette.error.main, 0.85)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    useEffect(() => {
        // GETALL_DEG();
        GETALL_DASHBOARD()
    }, [])

    const GETALL_DASHBOARD = () => {
        // console.log(userData)
        // console.log(userData.ApplicantID)
        axios
            .get('http://121.52.155.34:5000/Applicant/adm/' + userData._id)
            .then((response) => {
                if (response.data[0]) {
                    setapplyvis('hidden') /// disable for one time application
                }
                // setVoucher(response.data[0])
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ p: 2 }}>
                        {/* <H3 textcolor={'rgba(52, 49, 76, 0.54)'} style={{ marginLeft: 5 }}>
                      Picture  Instructions
                    </H3> */}

                        <ContentBox>
                            <StyledButton
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    letterSpacing: '8px',
                                }}
                                variant="contained"
                                color="primary"
                                // onClick={() => navigate('/Admission/Apply')}
                                onClick={() =>
                                    navigate('/dashboard/shared/Instructions')
                                }
                            >
                                INSTRUCTIONS
                            </StyledButton>
                        </ContentBox>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ p: 2 }}>
                        {/* <H3 textcolor={'rgba(52, 49, 76, 0.54)'} style={{ marginLeft: 5 }}>
                        How to Apply
                    </H3> */}

                        <ContentBox>
                            <StyledButton
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    letterSpacing: '8px',
                                }}
                                variant="contained"
                                color="warning"
                                // onClick={() => navigate('/Admission/Apply')}
                                // onClick={() => navigate('/dashboard/shared/Instructions')}
                                onClick={handleOpen}
                            >
                                HOW TO APPLY
                            </StyledButton>
                        </ContentBox>
                    </Card>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                    // sx={{ visibility: applyvis }}
                >
                    <Card elevation={3} sx={{ p: 2 }}>
                        <ContentBox>
                            <StyledButton
                                disabled={applyvis === 'visible' ? false : true}
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    letterSpacing: '8px',
                                }}
                                variant="contained"
                                color="success"
                                onClick={() => navigate('/Admission/ADM_Apply')}
                            >
                                APPLY ONLINE
                            </StyledButton>
                        </ContentBox>
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
  How to Apply
  </Typography> */}
                    <Typography id="modal-modal-description">
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            mt={2}
                            ml={5}
                            sx={{ textAlign: 'left' }}
                        >
                            <h1>How To Apply</h1>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                1. Sign Up at{' '}
                                <b>applyPUMSuniversitysindh.edu.pk</b>
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                2. Verify your email, Sign In and Complete your
                                application process
                            </p>
                            {/* <p style={{fontSize:'15px', fontWeight:'bolder'}}>3.	Fill the mandatory fields marked with (*)</p> */}
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                3. Download your challan form once application
                                is completed
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                4. Deposit challan fees <b>“PKR – 1,200/= “</b>
                                any branch of Allied Bank Limited
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                5. Upload a scan copy of a paid challan on
                                admission portal.
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                6. Download and print your application form and
                                send it to university by courier.
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                7. Form submission will be accepted only through
                                courier
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                8. No candidate will be allowed to sit in entry
                                test without printed admitted card.
                            </p>
                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default StatCards2
