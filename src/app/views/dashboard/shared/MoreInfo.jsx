import React, { useEffect, useState } from 'react'
import {
    Grid,
    styled,
    Stack,
    Snackbar,
    Alert,
    Autocomplete,
    TextField,
} from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { SimpleCard } from 'app/components'
import { Box } from '@mui/system'
import axios from 'axios'

import InputMask from 'react-input-mask'
//
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
//
import Button from '@mui/material/Button'

import { TextInputBox, Container } from '../../Components/Component'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//
export const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
//
export default function Stage1() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({
        type: 'success',
        title: 'Record Saved Successfully',
    })
    //
    const Div = styled('div')(() => ({
        flexDirection: 'row',
        display: 'flex',
        borderColor: 'black',
        borderWidth: '1px',
        borderStyle: 'solid',
        paddingLeft: 10,
        // borderBottomWidth: '0px',
        marginBottom: 15,
        borderColor: '#ccc',
        borderRadius: 5,
        //
    }))
    const P = styled('a')(() => ({
        width: '50%',
        fontWeight: 'normal',
        // fontFamily: 'Glory-Bold',
        paddingTop: 5,
        paddingBottom: 5,
    }))
    //
    const userData = useSelector((data) => data.loginReducer.LoginData)
    //
    const navigate = useNavigate()
    // STATES
    const { state } = useLocation()
    console.log(state, 'state')

    useEffect(() => {
        GET_EDUCATION()
    }, [])
    //
    const [ProgramDetails, setProgramDetails] = useState([])
    // console.log(ProgramDetails)
    const [Refresh, runRefresh] = useState(false)

    const [dbData, setdbData] = useState({
        Income: '',
        Ailment: '',
        Allergy: '',
        Contact: '',
        Relation: '',
        ParentCNIC: '',
        NeedForLearn:"",
    })

    const [ChallanImage, setChallanImage] = useState('')
    console.log(ChallanImage)

    //
    const GET_EDUCATION = () => {
        axios
            .get('http://13.90.206.49/aror_bl/ApplicantEdu/' + userData._id)
            .then((response) => {
                let modify = response.data.ApplicantEdu.map((v) => {
                    return {
                        ...v,
                        subjects: '',
                    }
                })
                setProgramDetails(modify)
                console.log(modify)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const UPDATE_INFO = () => {
        const value = {
            income: dbData.Income,
            Ailment: dbData.Ailment,
            Allergy: dbData.Allergy,
            Contact: dbData.Contact,
            Relation: dbData.Relation,
            ParentCNIC: dbData.ParentCNIC,
            NeedForLearn: dbData.NeedForLearn,
        }

        axios
            .post(
                'http://13.90.206.49/aror_bl/Applicant/moreInfo/' + userData._id,
                value
            )
            .then((response) => {
                UPDATE_INFO_EDU()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const UPDATE_INFO_EDU = () => {
        const value = {
            array: ProgramDetails,
        }

        axios
            .post(
                'http://13.90.206.49/aror_bl/ApplicantEdu/moreInfo_EDU/' +
                    userData._id,
                value
            )
            .then((response) => {
                // alert("RUN")
                setMessage({
                    type: 'success',
                    title: 'Record Saved Successfully',
                })
                setOpen(true)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    async function modifyPdf() {
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const existingPdfBytes = await fetch(url).then((res) =>
            ChallanImage.arrayBuffer()
        )
        console.log(existingPdfBytes)

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        firstPage.drawText('SYED BASIT ALI', {
            x: 325,
            y: 550,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('SYED ASIF ALI', {
            x: 325,
            y: 520,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('30-09-2000', {
            x: 325,
            y: 490,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('03422650489', {
            x: 325,
            y: 460,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 430,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 400,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 372,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 315,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 255,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 225,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 460,
            size: 12,
            font: helveticaFont,
        })
        firstPage.drawText('Val', {
            x: 325,
            y: 460,
            size: 12,
            font: helveticaFont,
        })

        const pdfBytes = await pdfDoc.save()
        //
        var blob = new Blob([pdfBytes], { type: 'application/pdf' })
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'myFileName.pdf'
        link.click()
    }

    // const createPDF =  async  () => {
    //   const document = await PDFDocument.load(readFileSync("./IDRequestFormAror.pdf"));

    //   const courierBoldFont = await document.embedFont(StandardFonts.Courier);
    //   const firstPage = document.getPage(0);

    //   firstPage.moveTo(72, 570);
    //   firstPage.drawText(new Date().toUTCString(), {
    //     font: courierBoldFont,
    //     size: 12,
    //   });

    //   firstPage.moveTo(105, 530);
    //   firstPage.drawText("Ms. Jane,", {
    //     font: courierBoldFont,
    //     size: 12,
    //   });

    //   firstPage.moveTo(72, 330);
    //   firstPage.drawText("John Doe \nSr. Vice President Engineering \nLogRocket", {
    //     font: courierBoldFont,
    //     size: 12,
    //     lineHeight: 10,
    //   });

    //   writeFileSync("jane-doe.pdf", await document.save());
    // }

    const DOWN_PDF = () => {
        axios
            .get('http://13.90.206.49/CLEARING/Aror.pdf', {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/pdf',
                    Accept: 'application/pdf',
                },
            })
            .then((response) => {
                console.log(response.data)
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'file.pdf') //or any other extension
                document.body.appendChild(link)
                link.click()
            })
            .catch((error) => console.log(error))
    }

    //
    const ExecuteFunction_01 = () => {
        const arr = [
            { state: dbData.Income, value: '', name: 'Income' },
            { state: dbData.Ailment, value: '', name: 'Ailment' },
            { state: dbData.Allergy, value: '', name: 'Allergy' },
            { state: dbData.Contact, value: '', name: 'Contact' },
            { state: dbData.Relation, value: '', name: 'Relation' },
            { state: dbData.ParentCNIC, value: '', name: 'Parent CNIC' },
            { state: dbData.NeedForLearn, value: '', name: 'Special Need for learning' },
        ]
        var found = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].state == arr[i].value) {
                setMessage({
                    type: 'error',
                    title:
                        'Alert ! ' + [arr[i].name] + ' should not be empty...!',
                })
                setOpen(true)
                found = true
                break
            }
        }
        if (!found) {
            // UPDATE_INFO()
            // modifyPdf()
            // DOWN_PDF()
            // UPDATE_INFO()
            ExecuteFunction_02()
        }
    }

    const ExecuteFunction_02 = () => {
        var found = false
        for (let i = 0; i < ProgramDetails.length; i++) {
            if (ProgramDetails[i].subjects === '') {
                setMessage({
                    type: 'error',
                    title: 'Alert ! Major Subjects should not be empty...!',
                })
                setOpen(true)
                found = true
                break
            }
        }
        if (!found) {
            UPDATE_INFO()
            setMessage({
              type: 'error',
              title:
                  'Alert ! Record has been saved',
          })
          setOpen(true)
            navigate('/')
        }
    }
    //
    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }
    //
    return (
        <div>
            <Container>
                <br />
                <Stack spacing={4}>
                    <Box>
                        <SimpleCard title="MORE INFORMATION">
                            <ValidatorForm
                                onError={() => null}
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.Income}
                                            label={'Enter Monthly Income'}
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    Income: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/*  */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.Ailment}
                                            label={
                                                'Enter Medical Ailment (Fits/Seizures/Alzheimer)'
                                            }
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    Ailment: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.Allergy}
                                            label={'Enter Allergy (If Any)'}
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    Allergy: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/*  */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.Contact}
                                            label={'Emergency Contact No'}
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    Contact: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.Relation}
                                            label={
                                                'Emergency Contact Name & Relationship'
                                            }
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    Relation: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/*  */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <InputMask
                                            mask="99999-9999999-9"
                                            value={dbData.ParentCNIC}
                                            onChange={(event) => {
                                                setdbData({
                                                    ...dbData,
                                                    ParentCNIC: event.target.value,
                                                })
                                            }}
                                        >
                                            {() => (
                                                <TextValidator
                                                    sx={{
                                                        mb: 3,
                                                        width: '100%',
                                                    }}
                                                    size="large"
                                                    type="text"
                                                    autoComplete="off"
                                                    label="Parent/Guardian’s CNIC'"
                                                />
                                            )}
                                        </InputMask>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <TextInputBox
                                            value={dbData.NeedForLearn}
                                            label={
                                                'Special Need for learning (if any):'
                                            }
                                            onChangeValue={(value) => {
                                                setdbData({
                                                    ...dbData,
                                                    NeedForLearn: value,
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/*  */}
                                <h4>
                                    EDUCATION INFORMATION{' '}
                                    <small style={{ color: 'red' }}>
                                        {' '}
                                        (Place comma (,) after write subject)
                                    </small>
                                </h4>
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        {ProgramDetails?.map(
                                            (product, index) => (
                                                <div>
                                                    <Div key={index}>
                                                        <p
                                                            style={{
                                                                width: '30%',
                                                            }}
                                                        >
                                                            {product.board}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: '20%',
                                                            }}
                                                        >
                                                            {product.Obtained}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: '15%',
                                                            }}
                                                        >
                                                            {product.Total}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: '15%',
                                                            }}
                                                        >
                                                            {product.per}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: '15%',
                                                            }}
                                                        >
                                                            {product.year}
                                                        </p>
                                                        <p
                                                            style={{
                                                                width: '15%',
                                                            }}
                                                        >
                                                            {product.school}
                                                        </p>
                                                    </Div>

                                                    <TextField
                                                        size="small"
                                                        type="text"
                                                        style={{
                                                            width: '100%',
                                                            marginBottom: 15,
                                                        }}
                                                        autoComplete="off"
                                                        onBlur={(value) => {
                                                            for (
                                                                let i = 0;
                                                                i <
                                                                ProgramDetails.length;
                                                                i++
                                                            ) {
                                                                if (
                                                                    ProgramDetails[
                                                                        i
                                                                    ].year ==
                                                                    product.year
                                                                ) {
                                                                    ProgramDetails[
                                                                        i
                                                                    ].subjects =
                                                                        value.target.value
                                                                }
                                                                runRefresh()
                                                            }
                                                        }}
                                                        label={
                                                            'Enter ' +
                                                            product.degree +
                                                            ' Major Subject'
                                                        }
                                                    />
                                                </div>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 0 }}
                                    >
                                        <Button
                                            sx={{ ml: 0 }}
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={() => ExecuteFunction_01()}
                                        >
                                            Save Information
                                        </Button>
                                    </Grid>
                                   
                                </Grid>
                            </ValidatorForm>
                        </SimpleCard>
                    </Box>
                </Stack>
                {/* POPUP MESSAGE */}

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
