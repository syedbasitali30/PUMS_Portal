import React, { useRef, useState, useEffect } from 'react'
import { Card, Chip, styled, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ip from '../DB/IP_Address'
import {
    Box,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Dialog, DialogContent } from '@mui/material'
import { LoadingButton } from '@mui/lab'

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

const Small = styled('small')(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: '#34314c',
    fontSize: 20,
}))

const StatCards2 = () => {
    const navigate = useNavigate()
    //
    const empData = useSelector((data) => data.loginReducer.EmpData)
    //
    const [dtList, setdtList] = useState([])
    const [dtApplyList, setdtApplyList] = useState([])
    const [OpenModel, setOpenModel] = useState(false)
    const [JobDetail, setJobDetail] = useState({})
    const [loading, setloading] = useState(false)
    const [JobApplied, setJobApplied] = useState(false)
    //

    useEffect(() => {
        APPLY_JOBS_LIST()
    }, [])

    const OPEN_JOBS_LIST = async (value) => {
        return await fetch(
            ip.Address + 'erec.asmx/GET_JOB_OPENING',

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
                // console.log(response)
                let result = response.filter(
                    (o1) => !value.some((o2) => o1.JOB_ID === o2.JOB_ID)
                )
                //
                setdtList(result)
                setdtApplyList(value)
            })
            .catch((error) => {
                console.log(error)
                setJobApplied(false)
            })
    }

    const APPLY_JOBS_LIST = async (value) => {
        return await fetch(
            ip.Address + 'erec.asmx/REC_JOB_APPLY_LIST_BY_EMP',

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
                OPEN_JOBS_LIST(response)
                setJobApplied(true)
            })
            .catch((error) => {
                console.log(error)
                OPEN_JOBS_LIST([])
                setJobApplied(false)
            })
    }

    const APPLY_JOB = async (value) => {
        setloading(true)
        return await fetch(
            ip.Address + 'erec.asmx/REC_JOB_APPLY_INSERT',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:
                    'systemID=' +
                    empData.T_EMP_ID +
                    '&jobID=' +
                    JobDetail.JOB_ID,
            }
        )
            .then((res) => res.json())
            .then((response) => {
                // OPEN_JOBS_LIST(response)
                setloading(false)
                APPLY_JOBS_LIST()
                setOpenModel(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const styles = {
        statusButton: {
            color: 'white',
            borderRadius: 5,
            height: 25,
            paddingTop: 1,
            marginTop: -5,
            marginBottom: -5,
        },
    }

    return (
        <div style={{ margin: 20 }}>
            {/*  */}

            <Grid item lg={8} md={8} sm={12} xs={12} sx={{ pl: '20px' }}>
                <H4>Welcome {empData.NAME}</H4>
            </Grid>
            {empData.DOB !== '' ||
            empData.IsEducation !== 0 ||
            empData.IsExperience !== 0 ||
            empData.IsResearchWork !== 0 ||
            empData.IsFiles !== 0 ? (
                <>
                    {JobApplied ? (
                        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                            <CardHeader>
                                <Title>Job Applied</Title>
                            </CardHeader>

                            <Box width="100%">
                                <ProductTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    width: '2%',
                                                }}
                                            ></TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '10%',
                                                }}
                                            >
                                                S. No
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '20%',
                                                }}
                                            >
                                                Job Title
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '20%',
                                                }}
                                            >
                                                Department
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '20%',
                                                }}
                                            >
                                                Designation
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '15%',
                                                }}
                                            >
                                                Applied Date
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '13%',
                                                }}
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {dtApplyList.map((item, i) => {
                                            return (
                                                <TableRow hover key={i}>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    ></TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        0{i + 1}
                                                    </TableCell>

                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {item.JOB_TITLE}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {item.DeptTitle}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {item.DesTitle}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {item.CREATEDATE}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Chip
                                                            disabled
                                                            onClick={() =>
                                                                navigate(
                                                                    '/Admission/EMP_BasicInfo'
                                                                )
                                                            }
                                                            color="success"
                                                            label="VOUCHER"
                                                            style={
                                                                styles.statusButton
                                                            }
                                                        ></Chip>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </ProductTable>
                            </Box>
                        </Card>
                    ) : null}
                    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                        <CardHeader>
                            <Title>Open Jobs List</Title>
                        </CardHeader>

                        <Box width="100%">
                            <ProductTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: '2%',
                                            }}
                                        ></TableCell>
                                        <TableCell
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                            S. No
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '20%',
                                            }}
                                        >
                                            Job Title
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '20%',
                                            }}
                                        >
                                            Department
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '20%',
                                            }}
                                        >
                                            Designation
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '7.5%',
                                            }}
                                        >
                                            Fee
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '7.5%',
                                            }}
                                        >
                                            Close Date
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '13%',
                                            }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {dtList.map((item, i) => {
                                        return (
                                            <TableRow hover key={i}>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                ></TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    0{i + 1}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.JOB_TITLE}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.DeptTitle}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.DesTitle}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {item.VOUCHER_AMOUNT}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {moment(
                                                        item.END_DATE
                                                    ).format('DD/MM/YYYY')}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        onClick={() => {
                                                            setJobDetail(item)
                                                            setOpenModel(true)
                                                        }}
                                                        color="primary"
                                                        label="APPLY"
                                                        style={
                                                            styles.statusButton
                                                        }
                                                    ></Chip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </ProductTable>
                        </Box>
                    </Card>
                </>
            ) : null}

            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <CardHeader>
                    <Title>Complete Initial Process</Title>
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
                                        width: '10%',
                                    }}
                                >
                                    S. No
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '73%',
                                    }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '13.2%',
                                    }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow hover>
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
                                    01
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Complete your Basic Information
                                </TableCell>
                                <TableCell align="left">
                                    {empData.DOB == '' ? (
                                        <Chip
                                            onClick={() =>
                                                navigate(
                                                    '/Admission/EMP_BasicInfo'
                                                )
                                            }
                                            color="primary"
                                            label="FULL INFO"
                                            style={styles.statusButton}
                                        ></Chip>
                                    ) : (
                                        <Chip
                                            color="success"
                                            label="COMPLETED"
                                            style={styles.statusButton}
                                        ></Chip>
                                    )}
                                </TableCell>
                            </TableRow>

                            {/*  */}
                            {/*  */}
                            <TableRow hover>
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
                                    02
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Complete your Education Information
                                </TableCell>
                                <TableCell align="left">
                                    {empData.IsEducation == 0 ? (
                                        <Chip
                                            onClick={() =>
                                                navigate(
                                                    '/Admission/EMP_Education'
                                                )
                                            }
                                            color="primary"
                                            label="FULL INFO"
                                            style={styles.statusButton}
                                        ></Chip>
                                    ) : (
                                        <Chip
                                            color="success"
                                            label="COMPLETED"
                                            style={styles.statusButton}
                                        ></Chip>
                                    )}
                                </TableCell>
                            </TableRow>
                            {/*  */}
                            {/*  */}
                            <TableRow hover>
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
                                    03
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Complete your Job Experience
                                </TableCell>
                                <TableCell align="left">
                                    {empData.IsExperience == 0 ? (
                                        <Chip
                                            onClick={() =>
                                                navigate(
                                                    '/Admission/EMP_JobInfo'
                                                )
                                            }
                                            color="primary"
                                            label="FULL INFO"
                                            style={styles.statusButton}
                                        ></Chip>
                                    ) : (
                                        <Chip
                                            color="success"
                                            label="COMPLETED"
                                            style={styles.statusButton}
                                        ></Chip>
                                    )}
                                </TableCell>
                            </TableRow>
                            {/*  */}
                            {/*  */}
                            <TableRow hover>
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
                                    04
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Complete your Research Work
                                </TableCell>
                                <TableCell align="left">
                                    {empData.IsResearchWork == 0 ? (
                                        <Chip
                                            onClick={() =>
                                                navigate(
                                                    '/Admission/EMP_Research'
                                                )
                                            }
                                            color="primary"
                                            label="FULL INFO"
                                            style={styles.statusButton}
                                        ></Chip>
                                    ) : (
                                        <Chip
                                            color="success"
                                            label="COMPLETED"
                                            style={styles.statusButton}
                                        ></Chip>
                                    )}
                                </TableCell>
                            </TableRow>
                            {/*  */}
                            {/*  */}
                            <TableRow hover>
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
                                    05
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Complete your Documents
                                </TableCell>
                                <TableCell align="left">
                                    {empData.IsFiles == 0 ? (
                                        <Chip
                                            onClick={() =>
                                                navigate(
                                                    '/Admission/EMP_UploadDocs'
                                                )
                                            }
                                            color="primary"
                                            label="FULL INFO"
                                            style={styles.statusButton}
                                        ></Chip>
                                    ) : (
                                        <Chip
                                            color="success"
                                            label="COMPLETED"
                                            style={styles.statusButton}
                                        ></Chip>
                                    )}
                                </TableCell>
                            </TableRow>
                            {/*  */}
                            {/*  */}
                        </TableBody>
                    </ProductTable>
                </Box>
            </Card>
            {/*  */}
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={OpenModel}
                onClose={() => setOpenModel(false)}
            >
                <DialogContent>
                    <div
                        style={{
                            fontWeight: 'bold',
                            color: '#2e7d32',
                            fontSize: 18,
                        }}
                    >
                        Job Details
                    </div>
                    {/*  */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    color: 'grey',
                                    fontSize: 12,
                                }}
                            >
                                Start Date
                            </div>
                            <div style={{ fontWeight: 'bold', paddingTop: 5 }}>
                                {moment(JobDetail.START_DATE).format(
                                    'DD MMMM YYYY'
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    color: 'grey',
                                    fontSize: 12,
                                }}
                            >
                                Close Date
                            </div>
                            <div style={{ fontWeight: 'bold', paddingTop: 5 }}>
                                {moment(JobDetail.END_DATE).format(
                                    'DD MMMM YYYY'
                                )}
                            </div>
                        </Grid>
                    </Grid>
                    {/*  */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mt: 2,
                            backgroundColor: '#f8f8f8',
                            paddingBottom: '15px',
                            borderRadius: '10px',
                        }}
                    >
                        <Grid item xs={3}>
                            <div
                                style={{
                                    color: '#454243',
                                }}
                            >
                                Department:
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                Designation:
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                Grade / BPS:
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                Processing Fee:
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                Description:
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <div
                                style={{
                                    color: '#454243',
                                }}
                            >
                                {JobDetail.DeptTitle}
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                {JobDetail.DesTitle}
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                {JobDetail.BPS_ID}
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                {JobDetail.VOUCHER_AMOUNT}
                            </div>
                            <div
                                style={{
                                    color: '#454243',
                                    paddingTop: 5,
                                }}
                            >
                                {JobDetail.DESCRIPTION}
                            </div>
                        </Grid>
                    </Grid>
                    {/*  */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LoadingButton
                                onClick={() => {
                                    APPLY_JOB()
                                }}
                                loading={loading}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                APPLY FOR JOB
                            </LoadingButton>
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
        </div>
    )
}

export default StatCards2
