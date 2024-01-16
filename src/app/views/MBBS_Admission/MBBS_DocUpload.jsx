import { useTheme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import {
    Card,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
    styled,
    Box,
    Button,
    Snackbar,
    Alert,
} from '@mui/material'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import React from 'react'
import moment from 'moment/moment'
import { Breadcrumb } from 'app/components'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import cancelImg from '../../components/MatxLogo/testDoc.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ip from '../DB/IP_Address'
//

const styles = {
    box_border: {
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 30,
        paddingBottom: 10,
        borderTopWidth: 0,
        borderColor: '#9fa6b7',
    },
    box_bg: {
        backgroundColor: '#345c92',
        padding: 20,
        marginTop: 30,
    },
    box_title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBox_Margin: {
        marginBottom: 25,
    },
}

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

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const MBBS_APLForm = () => {
    const navigate = useNavigate()
    const userData = useSelector((data) => data.loginReducer.FN_MBBS_Data)
    //
    const initialValues = {
        APPLICANT_NAME: '',
    }
    //
    useEffect(() => {}, [])

    const [imageHash, setimageHash] = React.useState(Date.now())
    const [open, setOpen] = useState(false)

    const sendFile = (val) => {
        console.log(val)
        const data = new FormData()
        const file = val.file
        data.append('image', file)

        axios({
            method: 'post',
            data: data,
            url:
                ip.admission +
                'applicantImg/upload?folder=' +
                val.folder +
                '&CNIC=' +
                userData.CNIC +
                '-' +
                val.name,
            headers: { 'content-type': 'multipart/form-data' },
        })
        // alert('Picture Successfully Uploaded')
        setOpen(true)
        setimageHash(Date.now())
    }

    const handleFormSubmit = (values) => {}

    const validationSchema = Yup.object().shape({
        APPLICANT_NAME: Yup.string().required(
            '[ APPLICANT NAME ] is required field.'
        ),
    })

    const docsArr = [
        { Title: 'Passport size photograph of Candidate' },
        {
            Title: 'Transcript / Marks Certificate of 10th grade /O level Equivalence certificate by IBCC',
        },
        {
            Title: 'Equivalence certificate of 10th grade/ O level. (from IBCC, Islamabad). Equivalence certificate by IBCC',
        },
        {
            Title: 'Transcript / Marks Certificate of 12th grade /A level. Equivalence certificate by IBCC',
        },
        {
            Title: 'Equivalence certificate of 12th grade/ A level Pre-Medical. (from IBCC, Islamabad). Equivalence certificate by IBCC',
        },
        { Title: 'NICOP of Candidate' },
        { Title: 'NICOP of Father' },
        { Title: 'Passport of candidate' },
        { Title: 'Passport of Father' },
        { Title: 'MDCAT-2023/SAT II score / MCAT / UCAT Score Certificate' },
        { Title: 'Upload Receipt of wire/ online transfer of processing fee' },
    ]

    return (
        <div>
            {/*  */}
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            {
                                name: 'APPLICATION FORM',
                                path: '/Admission/Choose Department',
                            },
                            { name: 'Application Form' },
                        ]}
                    />
                </div>
                <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                    <Box width="100%">
                        <div style={{ margin: 30, marginTop: 10 }}>
                            <div style={{ marginTop: 0 }}>
                                <Formik
                                    width="100%"
                                    onSubmit={handleFormSubmit}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div
                                                style={{
                                                    backgroundColor: '#345c92',
                                                    padding: 20,
                                                    marginBottom: 40,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 28,
                                                    }}
                                                >
                                                    APPLICATION FORM
                                                </div>
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 17,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    FOR ADMISSION IN MBBS COURSE
                                                    UNDER FOREIGN NATIONAL SELF
                                                    FINANCE CATEGORY FOR THE
                                                    ACADEMIC SESSION 2023-24 AT
                                                    PEOPLES UNIVERSITY OF
                                                    MEDICAL & HEALTH SCIENCES
                                                    FOR WOMEN SBA
                                                </div>
                                            </div>
                                            {/*  */}
                                            <div style={styles.box_bg}>
                                                <div style={styles.box_title}>
                                                    UPLOAD DOCUMENTS
                                                </div>
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        marginTop: 10,
                                                    }}
                                                >
                                                    - Upload picture of upto{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        500 KB
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    - Only{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        .jpg{' '}
                                                    </span>
                                                    files are allowed.
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                {' '}
                                                <StyledTable>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell
                                                                align="left"
                                                                sx={{
                                                                    width: '8%',
                                                                    paddingLeft: 1,
                                                                }}
                                                            >
                                                                S. No
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    width: '52%',
                                                                }}
                                                            >
                                                                Title
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    width: '20%',
                                                                }}
                                                            >
                                                                Select File
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    width: '20%',
                                                                }}
                                                            >
                                                                Preview
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {/* FIRST ROW */}

                                                        {docsArr.map(
                                                            (item, index) => {
                                                                return (
                                                                    <TableRow
                                                                        key={
                                                                            index
                                                                        }
                                                                        hover
                                                                    >
                                                                        <TableCell>
                                                                            {index +
                                                                                1}
                                                                            .
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            sx={{
                                                                                textTransform:
                                                                                    'capitalize',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.Title
                                                                            }{' '}
                                                                            <span
                                                                                style={{
                                                                                    color: 'red',
                                                                                }}
                                                                            >
                                                                                {' '}
                                                                                *
                                                                            </span>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            sx={{
                                                                                textTransform:
                                                                                    'capitalize',
                                                                            }}
                                                                        >
                                                                            <Button
                                                                                variant="contained"
                                                                                component="label"
                                                                                color="primary"
                                                                                onClick={() => {}}
                                                                            >
                                                                                SELECT
                                                                                PICTURE
                                                                                <form
                                                                                    method="POST"
                                                                                    action="/profile-upload-single"
                                                                                    encType="multipart/form-data"
                                                                                >
                                                                                    <input
                                                                                        hidden
                                                                                        accept="image/*"
                                                                                        type="file"
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            sendFile(
                                                                                                {
                                                                                                    folder: 'MBBS_ADM_Docs',
                                                                                                    file: e
                                                                                                        .target
                                                                                                        .files[0],
                                                                                                    name:
                                                                                                        index +
                                                                                                        1,
                                                                                                }
                                                                                            )
                                                                                            // setMatricPicture(
                                                                                            //     e.target.files[0]
                                                                                            // )
                                                                                            // setvisstate('visible')
                                                                                        }}
                                                                                    />
                                                                                </form>
                                                                            </Button>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            sx={{
                                                                                textTransform:
                                                                                    'capitalize',
                                                                            }}
                                                                        >
                                                                            <img
                                                                                src={`${
                                                                                    ip.admission +
                                                                                    'uploads/MBBS_ADM_Docs/' +
                                                                                    userData.CNIC +
                                                                                    '-' +
                                                                                    (index +
                                                                                        1) +
                                                                                    '.jpg'
                                                                                }?${imageHash}`}
                                                                                width="100px"
                                                                                height="100px"
                                                                            ></img>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            }
                                                        )}

                                                        {/* END ROW */}
                                                    </TableBody>
                                                </StyledTable>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                                <LoadingButton
                                    color="success"
                                    variant="contained"
                                    sx={{
                                        mb: 2,
                                        mt: 3,
                                        width: '100%',
                                    }}
                                    onClick={() => {
                                        navigate('/MBBS_Admission/MBBS_Home')
                                    }}
                                >
                                    {' << BACK TO HOME >> '}
                                </LoadingButton>
                            </div>
                        </div>
                    </Box>
                </Card>
            </Container>
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
                    Image Successfully Uploaded
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MBBS_APLForm
