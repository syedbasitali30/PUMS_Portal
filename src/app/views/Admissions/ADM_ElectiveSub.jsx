import React, { useState, useEffect } from 'react'
import { Alert, Card, Snackbar, styled, useTheme } from '@mui/material'
import { Breadcrumb } from 'app/components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Box,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import ip from '../DB/IP_Address'
import axios from 'axios'
import { loadError, loadProgress, authLogin } from 'app/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//
const styles = {
    textBox_Margin: {
        marginBottom: -2,
    },
    span_font: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    div_space_5: {
        marginBottom: 8,
    },
}

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
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

const StatCards2 = () => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const SAVE_ELECTIVE_SUB = () => {
        const dataTosend = {
            ADM_RegistraionID: userData._id,
            First_Year: {
                F_Phy_Theory: F_Phy_Theory,
                F_Phy_Prac: F_Phy_Prac,
                F_Che_Theory: F_Che_Theory,
                F_Che_Prac: F_Che_Prac,
                F_Bio_Theory: F_Bio_Theory,
                F_Bio_Prac: F_Bio_Prac,
            },
            Second_Year: {
                S_Phy_Theory: S_Phy_Theory,
                S_Phy_Prac: S_Phy_Prac,
                S_Che_Theory: S_Che_Theory,
                S_Che_Prac: S_Che_Prac,
                S_Bio_Theory: S_Bio_Theory,
                S_Bio_Prac: S_Bio_Prac,
            },
            Total: Total,
        }
        axios
            .post(ip.admission + 'ADM_ElectiveSub/post/', dataTosend)
            .then((res) => {
                //
                UPDATE_ELECTIVE_USER()
            })
            .catch(function (error) {
                dispatch(loadError(true))
                setTimeout(() => {
                    dispatch(loadError(false))
                    setloading(false)
                }, 3000)
                console.log(error)
            })
    }

    const UPDATE_ELECTIVE_USER = () => {
        axios
            .get(
                ip.admission +
                    'ADM_Registration/updateElectiveSub/' +
                    userData._id
            )
            .then((res) => {
                dispatch(authLogin(res.data))
                localStorage.setItem('authData', JSON.stringify(res.data))
                //
                dispatch(loadProgress(false))
                setOpen(true)

                setTimeout(() => {
                    navigate('/Admission/ADM_ChooseDept')
                    setloading(false)
                }, 2000)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({
        type: 'success',
        title: 'Record Saved Successfully',
    })
    //
    const [state, setState] = useState({
        M_ResultDate: new Date(),
        I_ResultDate: new Date(),
    })

    useEffect(() => {}, [])

    const handleSubmit = (event) => {
        dispatch(loadProgress(true))
        setloading(true)
        SAVE_ELECTIVE_SUB()
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
            // Total: parseInt(F_Phy_Theory) + parseInt(F_Phy_Prac),
        })
    }

    const {
        F_Phy_Theory,
        F_Phy_Prac,
        F_Che_Theory,
        F_Che_Prac,
        F_Bio_Theory,
        F_Bio_Prac,
        //
        S_Phy_Theory,
        S_Phy_Prac,
        S_Che_Theory,
        S_Che_Prac,
        S_Bio_Theory,
        S_Bio_Prac,
        //
        Total,
    } = state

    return (
        <div>
            {/*  */}

            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Admission/ADM_Dashboard',
                            },
                            { name: 'Education' },
                        ]}
                    />
                </div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                        <CardHeader>
                            <Title>Add Educational Info</Title>
                        </CardHeader>

                        <Box width="100%">
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
                                                width: '29%',
                                            }}
                                        >
                                            First Year
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '2%',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            sx={{
                                                width: '29%',
                                            }}
                                        >
                                            Second Year
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '2%',
                                            }}
                                        ></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {/* FIRST ROW */}

                                    <TableRow>
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
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Physics-I
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Phy_Theory"
                                                    value={F_Phy_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Phy_Prac"
                                                    value={F_Phy_Prac || ''}
                                                />
                                            </div>
                                            {/*  */}
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Chemistry-I
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Che_Theory"
                                                    value={F_Che_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Che_Prac"
                                                    value={F_Che_Prac || ''}
                                                />
                                            </div>
                                            {/*  */}
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Biology-I
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Bio_Theory"
                                                    value={F_Bio_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="F_Bio_Prac"
                                                    value={F_Bio_Prac || ''}
                                                />
                                            </div>
                                        </TableCell>
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
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Physics-II
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Phy_Theory"
                                                    value={S_Phy_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Phy_Prac"
                                                    value={S_Phy_Prac || ''}
                                                />
                                            </div>
                                            {/*  */}
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Chemistry-II
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Che_Theory"
                                                    value={S_Che_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Che_Prac"
                                                    value={S_Che_Prac || ''}
                                                />
                                            </div>
                                            {/*  */}
                                            <div>
                                                <div style={styles.div_space_5}>
                                                    <span
                                                        style={styles.span_font}
                                                    >
                                                        Biology-II
                                                    </span>
                                                </div>
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Theory…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Bio_Theory"
                                                    value={S_Bio_Theory || ''}
                                                />
                                                <TextField
                                                    size={'small'}
                                                    placeholder="Practical…"
                                                    onChange={handleChange}
                                                    type="number"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                    name="S_Bio_Prac"
                                                    value={S_Bio_Prac || ''}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        ></TableCell>
                                    </TableRow>
                                    {/* END ROW */}
                                </TableBody>
                            </ProductTable>
                            {/*  */}
                            <div style={{ marginLeft: 45, marginRight: 40 }}>
                                <span style={styles.span_font}>Total</span>
                                <div style={{ marginBottom: 8 }}></div>

                                <TextField
                                    size={'small'}
                                    placeholder="Practical…"
                                    onChange={handleChange}
                                    type="number"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    name="Total"
                                    value={Total || ''}
                                />
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    borderTop: '1px solid #e0e0e0 ',
                                    marginTop: 2,
                                }}
                            ></div>

                            <div
                                style={{
                                    padding: 30,
                                }}
                            >
                                <LoadingButton
                                    type="submit"
                                    // onClick={() => setloading(true)}
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
                            </div>
                        </Box>
                    </Card>
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
                        severity={message.type}
                        variant="filled"
                    >
                        {message.title}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default StatCards2
