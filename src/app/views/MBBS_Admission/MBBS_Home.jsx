import { Card, styled, Box, Button } from '@mui/material'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import React from 'react'
import { Breadcrumb } from 'app/components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ip from '../DB/IP_Address'
//

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))
const styles = {
    box_border: {
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 30,
        paddingBottom: 10,
        borderTopWidth: 0,
        borderColor: '#9fa6b7',
    },
    box_border_grey: {
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 30,
        paddingBottom: 10,
        borderTopWidth: 0,
        borderColor: '#e2e2e2',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    box_bg: {
        backgroundColor: '#345c92',
        padding: 20,
        marginTop: 30,
    },
    box_bg_grey: {
        backgroundColor: '#f7f7f7',
        padding: 15,
        marginTop: 30,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
    },
    box_title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    box_title_grey: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBox_Margin: {
        marginBottom: 25,
    },
    box_li_title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
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

const ReqArr = [
    { Title: 'Transcript / Marks Certificate of 10th grade /O level.' },
    {
        Title: 'Equivalence certificate of 10th grade/ O level. (from IBCC, Islamabad).',
    },
    { Title: 'Transcript / Marks Certificate of 12th grade /A level.' },
    {
        Title: 'Equivalence certificate of 12th grade/ A level Pre-Medical. (from IBCC, Islamabad).',
    },
    { Title: 'NICOP of Candidate.' },
    { Title: 'NICOP of Father' },
    { Title: 'Passport of candidate.' },
    { Title: 'Passport of Father' },
    { Title: 'MDCAT-2023/SAT II score / MCAT / UCAT.' },
    { Title: 'Passport size photographs of candidate.' },
    {
        Title: 'Upload Receipt of wire/ online transfer of processing fee US $ 100/- (IBAN #: PK59UNIL0000000203454529 [Name of University: peoples university of medical & health sciences, Karachi])',
    },
]

const MBBS_APLForm = () => {
    const userData = useSelector((data) => data.loginReducer.FN_MBBS_Data)
    //
    const initialValues = {
        APPLICANT_NAME: '',
    }
    //
    const [checkDisabled, setcheckDisabled] = React.useState(false)
    useEffect(() => {
        SAVE_BASIC_INFO()
    }, [])

    const navigate = useNavigate()

    const SAVE_BASIC_INFO = () => {
        axios
            .get(
                ip.admission + 'mbbs_ADM_info/getOne_ForUpdate/' + userData._id
            )
            .then((res) => {
                if (res.data === undefined || res.data.length == 0) {
                    setcheckDisabled(false)
                } else {
                    setcheckDisabled(true)
                }
            })
            .catch(function (error) {
                alert('Error! Please Try again Later')
            })
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
                                name: 'HOME',
                                path: '/MBBS Admission/Home',
                            },
                            { name: 'Home' },
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
                                                    MAIN MENU
                                                </div>
                                            </div>

                                            <div style={styles.box_border}>
                                                <div
                                                    style={{
                                                        marginTop: -30,
                                                        marginTop: 0,
                                                    }}
                                                ></div>
                                                <StyledButton
                                                    disabled={checkDisabled}
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() =>
                                                        navigate(
                                                            '/MBBS_Admission/MBBS_APLForm'
                                                        )
                                                    }
                                                >
                                                    {checkDisabled
                                                        ? 'Application Successfully Applied'
                                                        : 'Application Form for MBBS'}
                                                </StyledButton>
                                                {/*  */}
                                                <div style={styles.box_bg_grey}>
                                                    <div
                                                        style={
                                                            styles.box_title_grey
                                                        }
                                                    >
                                                        ELIGIBILITY FOR FOREIGN
                                                        NATIONAL STUDENTS
                                                    </div>
                                                </div>
                                                <div
                                                    style={
                                                        styles.box_border_grey
                                                    }
                                                >
                                                    <ul>
                                                        <li
                                                            style={
                                                                styles.box_li_title
                                                            }
                                                        >
                                                            Candidates must have
                                                            passed with minimum
                                                            60% marks in HSSC,
                                                            F.Sc (Pre-Medical)
                                                            or equivalent
                                                            examination duly
                                                            certified by IBCC in
                                                            at least three
                                                            subjects i.e.
                                                            Biology, Chemistry
                                                            and either Physics
                                                            or Mathematics.(from
                                                            institution outside
                                                            Pakistan).
                                                        </li>
                                                        <li
                                                            style={
                                                                styles.box_li_title
                                                            }
                                                        >
                                                            The candidate must
                                                            have studied last
                                                            two years from
                                                            institution outside
                                                            Pakistan.
                                                        </li>
                                                        <li
                                                            style={
                                                                styles.box_li_title
                                                            }
                                                        >
                                                            As per PM&DC
                                                            regulations,
                                                            candidate must have
                                                            passed MDCAT 2023
                                                            with at least 55%
                                                            marks for admission
                                                            in MBBS and 50%
                                                            marks for admission
                                                            in BDS or qualified
                                                            SAT II with minimum
                                                            score of 550 in each
                                                            subject (Biology,
                                                            Chemistry and
                                                            Physics/ Maths) or a
                                                            foreign MCAT or UCAT
                                                            examination with
                                                            minimum 50% marks.
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/*  */}
                                                {/*  */}
                                                <div style={styles.box_bg_grey}>
                                                    <div
                                                        style={
                                                            styles.box_title_grey
                                                        }
                                                    >
                                                        REQUIRED DOCUMENTS
                                                    </div>
                                                </div>
                                                <div
                                                    style={
                                                        styles.box_border_grey
                                                    }
                                                >
                                                    <ul>
                                                        {ReqArr.map(
                                                            (item, index) => {
                                                                return (
                                                                    <li
                                                                        style={
                                                                            styles.box_li_title
                                                                        }
                                                                    >
                                                                        {
                                                                            item.Title
                                                                        }
                                                                    </li>
                                                                )
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                                {/*  */}
                                                {/*  */}
                                                <div
                                                    style={{ marginBottom: 30 }}
                                                ></div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default MBBS_APLForm
