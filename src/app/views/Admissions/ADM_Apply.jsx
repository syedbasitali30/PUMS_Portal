import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    Divider,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    styled,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import { Autocomplete, Icon } from '@mui/material'
import {
    Snackbar,
    Alert,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHead,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import moment from 'moment'

//
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    TextInputBox,
    DropdownListBox,
    StyledButton,
    TextInputBoxNumber,
} from '../Components/Component'
import Stepper from '@mui/material/Stepper'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { Select, InputLabel, FormControl, MenuItem } from '@mui/material'
import { H4, Container } from '../Components/Component'
import { Country, State, City } from 'country-state-city'
import { number } from 'prop-types'
import companyLogo from '../../components/MatxLogo/logo.png'
import successimg from '../../components/MatxLogo/successimg.png'

import Modal from '@mui/material/Modal'
import { join } from 'lodash'
import InputMask from 'react-input-mask'
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleForm = () => {
    const navigate = useNavigate()
    // STATES

    ////// COUNTRY STATE CITY START
    ////// COUNTRY STATE CITY START

    useEffect(() => {
        GetCountry()
    }, [])
    const [CountryList, setCountryList] = useState([])
    const [CountrySelected, setCountrySelected] = useState([])
    const [CountryName, setCountryName] = useState({ cname: '' })
    const [ProvinceName, setProvinceName] = useState([])

    const [NationalityList, setNationalityList] = useState([])
    const [NationalitySelected, setNationalitySelected] = useState([])
    const [StateList, setStateList] = useState([])
    const [StateSelected, setStateSelected] = useState([])
    const [CityList, setCityList] = useState([])
    const [CitySelected, setCitySelected] = useState([])
    const [showdisablity, setshowdisablity] = useState('hidden')

    const [GenderSelected, setGenderSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [MaritalSelected, setMaritalSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [BloodSelected, setBloodSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [ReligionSelected, setReligionSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [DisabilitySelected, setDisabilitySelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [QuotaSelected, setQuotaSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [TestSelected, setTestSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [ResultSelected, setResultSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [PassingYearSelected, setPassingYearSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [DegreeSelected, setDegreeSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [BoardSelected, setBoardSelected] = useState({
        _id: '0',
        TITLE: '',
    })
    const [proImage, setproImage] = useState('')
    const [cnicImage, setcnicImage] = useState('')
    const [matricImage, setmatricImage] = useState('')
    const [interImage, setinterImage] = useState('')
    const [DomecileImage, setDomecileImage] = useState('')

    // alert(CitySelected)
    const [OpenNew, setOpenNew] = React.useState(false)
    const handleCloseNew = () => setOpenNew(false)
    const handleOpenNew = () => setOpenNew(true)
    const GetCountry = () => {
        setCountryList(Country.getAllCountries())
        setNationalityList(Country.getAllCountries())
        // console.log(Country.getAllCountries())
    }

    const GetState = (e) => {
        setStateList(State.getStatesOfCountry(e))
        // console.log(State.getStatesOfCountry(e))
    }
    const GetCity = (e) => {
        let a = CountrySelected
        let d = a.split('~')
        setCityList(City.getCitiesOfState(d[0], e))
    }

    const handlestatechange = (event) => {
        setStateSelected(event.target.value)
        // console.log(event.target.value)
        let a = event.target.value
        let d = a.split('~')
        GetCity(d[0])
        setProvinceName(d[1])
    }
    const handlecountrychange = (event) => {
        let a = event.target.value
        let d = a.split('~')
        setCountrySelected(event.target.value)
        setCountryName(d[1])
        //   setdbData({
        //     ...dbData,
        //     Nationality: d[1]
        // })

        GetState(d[0])
        // console.log(dbData)
    }
    const handlenationalitychange = (event) => {
        // console.log(event)
        setNationalitySelected(event.target.value)
    }

    function handleCloseCompletion() {
        setopenCompletion(false)
        navigate('/')
    }
    const handlecitychange = (event) => {
        setCitySelected(event.target.value)
        setdbData({
            ...dbData,
            Country: CountryName,
            Province: ProvinceName,
            Nationality: NationalitySelected,
            City: event.target.value,
        })
    }

    ////// COUNTRY STATE CITY END
    ////// COUNTRY STATE CITY END

    const [open, setOpen] = useState(false)
    const [openCompletion, setopenCompletion] = useState(false)

    const [M_MarksNew, setM_MarksNew] = useState('')
    const [M_SchoolNew, setM_SchoolNew] = useState('')

    const [message, setMessage] = useState({
        type: 'success',
        title: 'Record Saved Successfully',
    })
    const userData = useSelector((data) => data.loginReducer.LoginData)
    // console.log(userData)
    //
    // const navigate = useNavigate()
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />
    })
    // const [message, setMessage] = useState({
    //   type: 'success',
    //   title: 'Record Saved Successfully',
    // })
    // const [open, setOpen] = useState(false)
    const [open_Modal, setOpen_Modal] = React.useState(false)
    const [open_Alert, setOpen_Alert] = React.useState(false)
    const [EduArray, setEduArray] = useState([])

    const [isBoard, setisBoard] = useState(true)
    const styleNew = {
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

    //
    const numbers = [
        { Type: 'Bank' },
        { Type: 'Bank Copy by Student' },
        { Type: 'Student Copy' },
        { Type: 'University Copy' },
    ]
    const removeItem = (item) => {
        // alert(item)
        // alert(item.degree)
        setEduArray((current) =>
            current.filter((product) => {
                // 👇️ remove object that has id equal to 2
                return product.degree !== item.degree
            })
        )
        //   console.log(ArrayList)
    }

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

    //

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

    const ExecuteFunction_4 = () => {
        const interPer = EduArray[1].per
        console.log(interPer)

        const team = dbData.SelectProgram

        const highestMaxScore = Math.max(
            ...team.map((Programs) => Programs.CRITERIA)
        )

        console.log(highestMaxScore)

        if (interPer >= highestMaxScore) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    //
    const ExecuteFunction_01 = () => {
        const arr = [
            { state: dbData.S_name, value: '', name: 'Student Name' },
            { state: dbData.DOB, value: '', name: 'Date of Birth' },
            { state: dbData.DOB, value: null, name: 'Date of Birth' },
            { state: dbData.DOB, value: 'Invalid Date', name: 'Date of Birth' },
            { state: dbData.Domicile, value: '', name: 'Domicile' },
            { state: dbData.S_Contact, value: '', name: 'Contact' },
            { state: GenderSelected._id, value: '0', name: 'Gender' },
            {
                state: MaritalSelected._id,
                value: '0',
                name: 'Marital Status',
            },
            {
                state: BloodSelected._id,
                value: '0',
                name: 'Blood Group',
            },
            { state: ReligionSelected._id, value: '0', name: 'Religion' },
            { state: NationalitySelected, value: '', name: 'Nationality' },
            { state: CountrySelected, value: '', name: 'Country' },
            { state: StateSelected, value: '', name: 'Province' },
            { state: CitySelected, value: '', name: 'City' },

            { state: dbData.CNIC, value: '', name: 'CNIC' },
            { state: dbData.C_Address, value: '', name: 'Current Address' },
            { state: dbData.PerAddress, value: '', name: 'Permanent Address' },
            { state: dbData.F_Name, value: '', name: 'Father Name' },
            { state: dbData.F_Contact, value: '', name: 'Father Contact' },
            { state: dbData.F_OCC, value: '', name: 'Father Occupation' },
            {
                state: DisabilitySelected._id,
                value: '0',
                name: 'Disability',
            },
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
            // console.log(dbData)

            setdbData((state) => {
                return {
                    ...state,

                    Blood_Group: BloodSelected.TITLE,
                    MaritalStatus: MaritalSelected.TITLE,
                    Gender: GenderSelected.TITLE,
                    Religion: ReligionSelected.TITLE,
                    Disability: DisabilitySelected.TITLE,
                }
            })

            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    const ExecuteFunction_02 = () => {
        // console.log(dbData.SelectProgram)
        // console.log(dbData.SelectProgram)
        // console.log(count)
        // console.log(QuotaSelected,"quota")
        // console.log(TestSelected,"test")
        const arr = [
            { state: QuotaSelected._id, value: '0', name: 'Qouta' },
            {
                state: TestSelected._id,
                value: '0',
                name: 'Test Center',
            },
        ]
        var found = false
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            // alert(arr[i].value)
            // alert(arr[i].state)
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
            if (dbData.SelectProgram === undefined) {
                setMessage({
                    type: 'error',
                    title: 'Alert ! Plese select atleast 1 Program...!',
                })
                setOpen(true)
                found = true
            }
        }
        if (!found) {
            if (dbData.SelectProgram !== undefined) {
                const count2 = dbData.SelectProgram.length
                if (Number(count2) > 3) {
                    setMessage({
                        type: 'error',
                        title: 'Alert ! More than 3 programs are not allowed. ',
                    })
                    setOpen(true)
                    found = true
                }
            }
        }

        if (!found) {
            // alert("a")
            const a = { Programs: dbData.SelectProgram }
            setdbData((state) => {
                return {
                    ...state,

                    Qouta: QuotaSelected.TITLE,
                    TestCenter: TestSelected.TITLE,
                }
            })
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }

        console.log()

        // console.log(dbData)
    }

    const ExecuteFunction_Image = () => {
        var found = false
        const arr = [
            { state: DomecileImage, value: '', name: 'DOMICILE' },
            { state: cnicImage, value: '', name: 'CNIC B-FORM' },
            { state: proImage, value: '', name: 'PROFILE PICTURE' },
            { state: matricImage, value: '', name: 'MATRICULATION MARKSHEET' },
            { state: interImage, value: '', name: 'INTERMEDIATE MARKSHEET' },
        ]

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].state == arr[i].value) {
                setMessage({
                    type: 'error',
                    title:
                        'Alert ! Please upload ' +
                        [arr[i].name] +
                        '. Image Size should be less than 1 MB.',
                })
                setOpen(true)
                found = true
                break
            }
        }
        if (!found) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    const ExecuteFunction_Degree = () => {
        var found = false
        // console.log(EduArray.length)
        if (EduArray == '' || EduArray.length === 1) {
            setMessage({
                type: 'warning',
                title: 'Alert ! Invalid Education List. Minimum Two (2) Records Required (Matriculation and Intermediate)!',
            })
            setOpen(true)
            found = true
        }

        if (!found) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            // const interPer = EduArray[1].per
            // console.log(interPer)

            //   const team = dbData.SelectProgram

            //   const highestMaxScore = Math.max(
            //       ...team.map((Programs) => Programs.CRITERIA)
            //   )

            //   console.log(highestMaxScore)

            //   if (interPer >= highestMaxScore) {

            //     setActiveStep((prevActiveStep) => prevActiveStep + 1)
            //   }else{setMessage({
            //     type: 'error',
            //     title:
            //         'Alert ! Invalid Percentage Criteria',
            // })
            // setOpen(true)}
        }
    }

    const ExecuteFunction_03 = () => {
        // alert(dbData.SelectM_Degree)
        // alert(dbData.M_School)

        const arr = [
            // { state: dbData.SelectM_Degree, TITLE: '', name: 'Degree' },
            // { state: dbData.SelectM_Board, TITLE: '', name: 'Board Name' },
            // { state: dbData.SelectM_Year, TITLE: '', name: 'Passing Year' },
            { state: DegreeSelected._id, value: '0', name: 'Degree' },
            { state: BoardSelected._id, value: '0', name: 'Board Name' },
            {
                state: PassingYearSelected._id,
                value: '0',
                name: 'Passing Year',
            },
            {
                state: dbData.M_School,
                value: '',
                name: 'School / College Name',
            },
            // { state: M_SchoolNew, value: '', name: 'School / College' },
            // { state: dbData.SelectM_Result, TITLE: '', name: 'Result' },

            { state: ResultSelected._id, value: '0', name: 'Result' },
            { state: M_Total, value: '', name: 'Total Marks' },
            { state: M_MarksNew, value: '', name: 'Obtained Marks' },
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
        // console.log(EduArray)
        if (!found) {
            // navigate('/Admission/ApplyStage_04')
            //       console.log(dbData)
            // console.log(EduArray)
            setEduArray((oldArray) => [
                ...oldArray,
                {
                    // degree: dbData.SelectM_Degree,
                    // board: dbData.SelectM_Board,
                    // year: dbData.SelectM_Year,
                    degree: DegreeSelected.TITLE,
                    board: BoardSelected.TITLE,
                    year: PassingYearSelected.TITLE,
                    school: dbData.M_School,
                    // result: dbData.SelectM_Result,
                    result: ResultSelected.TITLE,
                    Total: M_Total,
                    Obtained: M_MarksNew,
                    per: dbData.M_Percentage,
                },
            ])
            // console.log(EduArray)
            // console.log(JSON.stringify(...EduArray))
            setdbData((state) => {
                return {
                    ...state,
                    // SelectM_Degree: {
                    //     _id: '0',
                    //     TITLE: '',
                    // },
                    // SelectM_Board: {
                    //     _id: '0',
                    //     TITLE: '',
                    // },
                    // SelectM_Year: {
                    //     _id: '0',
                    //     TITLE: '',
                    // },
                    //    SelectM_Result: '',
                    M_School: '',
                    // SelectM_Result: {
                    //     _id: '0',
                    //     TITLE: '',
                    // },
                    M_Percentage: '',
                }
            })
            setM_Total('')
            setM_MarksNew('')
            setisBoard(false)
            // setdbData({...dbData, Education:EduArray})

            // setdbData({SelectM_Degree : '0'})

            // dbData.SelectM_Degree, value: '0', name: 'Degree' },
            // dbData.SelectM_Board, value: '0', name: 'Board Name' },
            // dbData.SelectM_Year, value: '0', name: 'Year' },
            // dbData.M_School, value: '', name: 'school Name' },
            // dbData.SelectM_Result, value: '0', name: 'Result' },
            // M_Total, value: '', name: 'Total Marks' },
            // M_MarksNew, value: '', name: 'Obtained Marks' },

            //  console.log(EduArray)

            // next time capital or small ka khayal rakhna...
            // alert(dbData.M_Percentage)
        }
    }
    //
    const [M_Total, setM_Total] = useState('')
    const [I_Total, setI_Total] = useState('')

    //
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [saveProfile, setsaveProfile] = useState({})
    // console.log(saveProfile)
    const onChangePicture = (val) => {
        if (val.e[0]) {
            // console.log('picture: ', val.e)
            setPicture(val.e[0])
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setdbData({ ...dbData, [val.state]: reader.result })
            })
            reader.readAsDataURL(val.e[0])
        }
    }

    const [state, setState] = useState({ date: new Date() })
    const [FirstProgram, setFirstProgram] = useState('')

    useEffect(() => {
        GETALL_DEG()
        GETALL_PRO()
        GETALL_DROP()
    }, [])

    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const runSave = () => {
        axios
            .get(
                'http://121.52.155.34:5000/Applicant/postChk/' +
                    userData._id +
                    ''
            )
            .then((res) => {
                // console.log(userData._id)
                // console.log(res)
                const msg = res.data.message
                if (msg === 'notfound') {
                    POST_DB_DATA()

                    setOpen_Alert(false)
                    setMessage({
                        type: 'success',
                        title: 'success ! Application Submitted Successfully.',
                    })
                    setOpen(true)
                    setopenCompletion(true)
                } else {
                    setMessage({
                        type: 'info',
                        title: 'Alert ! Application already exist. For modification kindly contact to Administrator.',
                    })
                    setOpen(true)
                }
            })
            .catch(function (error) {
                // console.log(userData._id)
                console.log(error)
            })
    }

    const sendFile = (val) => {
        const data = new FormData()
        const file = val.file
        data.append('image', file)

        axios({
            method: 'post',
            data: data,
            url:
                'http://121.52.155.34:5000/applicantImg/upload?folder=' +
                val.folder +
                '&CNIC=' +
                userData.CNIC,
            headers: { 'content-type': 'multipart/form-data' },
        })
    }

    const VoucherPrint = () => {
        // setOpen_Modal(true)
    }

    const suggestions = [
        { title: 'Afghanistan' },
        { title: 'Aland Islands' },
        { title: 'Albania' },
        { title: 'Algeria' },
        { title: 'American Samoa' },
    ]

    const handleDateChange = (date) => setdbData({ ...dbData, DOB: date })
    // const handleDateChange_ = (date) =>
    //     setdbData({ ...dbData, SelectM_Year: date })

    const { gender, date } = state

    const H4 = styled('h3')(({ textcolor }) => ({
        margin: 0,
        color: textcolor,
        fontWeight: '500',
        marginLeft: '12px',
    }))

    function getSteps() {
        return [
            ' PERSONAL INFORMATION',
            'PROGRAMS',
            'EDUCATION RECORD',
            'DOCUMENTS',
        ]
    }

    // ==================== CALLING API's START ==================== //
    // STATES
    const [dbData, setdbData] = useState({
        ApplicantID: userData._id,
        S_name: '',
        DOB: '',
        Domicile: '',
        S_Contact: '',
        Country: '',
        Province: '',
        City: '',
        CNIC: '',
        C_Address: '',
        PerAddress: '',
        F_Name: '',
        F_Contact: '',
        F_OCC: '',
        Gender: '',
        MaritalStatus: '',
        Blood_Group: '',
        Religion: '',
        Nationality: '',
        District: '',
        Disability: '',
        DisabilityRemarks: '',
        Qouta: '',
        TestCenter: '',
        Status: 'true',
        IsUpdate: 'true',
        isActive: 'true',
        FeeStatus: 'PENDING',
        M_School: '',
    })

    const [ddl, setddl] = useState({ DistrictData: [{}] })

    const POST_DB_DATA = () => {
        sendFile({ folder: 'Domicile', file: DomecileImage })
        sendFile({ folder: 'Cnic', file: cnicImage })
        sendFile({ folder: 'Profile', file: proImage })
        sendFile({ folder: 'Matric', file: matricImage })
        sendFile({ folder: 'Inter', file: interImage })

        // console.log(dbData, 'final post')
        POST_EDUCATION()

        axios
            .post('http://121.52.155.34:5000/Applicant/post/', dbData)
            .then((res) => {})
            .catch(function (error) {
                console.log(error)
            })
    }

    const POST_EDUCATION = () => {
        const val = {
            ApplicantID: userData._id,
            ApplicantEdu: EduArray,
            SelectProgram: dbData.SelectProgram,
        }
        console.log(val)
        axios
            .post('http://121.52.155.34:5000/ApplicantEdu/post/', val)
            .then((res) => {})
            .catch(function (error) {
                console.log(error)
            })
    }

    // const sendFile = (e) => {
    //     console.log(e.target.files[0])
    //     const data = new FormData()
    //     const file = e.target.files[0]
    //     data.append('image', file) // <-- use "avatar" instead of "file" here
    //     axios({
    //         method: 'post',
    //         data: data,
    //         config: { headers: { 'Content-Type': 'multipart/form-data' } },
    //     })
    // }

    // const POST_PROFILE = () => {
    //     const data = new FormData();
    //     const file = saveProfile ;
    //     data.append("imafe", file); // <-- use "avatar" instead of "file" here
    //     axios
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }

    const GETALL_DROP = () => {
        axios
            .get('http://121.52.155.34:5000/AllDrop/getAll')
            .then((response) => {
                setddl(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const GETALL_DEG = () => {
        axios
            .get('http://121.52.155.34:5000/Degree/getAll')
            .then((response) => {
                setdbData((state) => {
                    return { ...state, ddlDegree: response.data }
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const GETALL_PRO = () => {
        axios
            .get('http://121.52.155.34:5000/program/getAll')
            .then((response) => {
                setdbData((state) => {
                    return { ...state, ddlProgram: response.data }
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const handleSubmit = (event) => {}

    // ==================== CALLING API's END ==================== //

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <SimpleCard title="PERSONAL INFORMATION">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
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
                                        value={dbData.S_name}
                                        label={'Name as per matric marksheet *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                S_name: value,
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
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            value={dbData.DOB}
                                            onChange={handleDateChange}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Date of Birth *"
                                                    id="mui-pickers-date"
                                                    sx={{
                                                        mb: 2,
                                                        width: '100%',
                                                    }}
                                                    size="large"
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.Domicile}
                                        label={'Domicile *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                Domicile: value,
                                            })
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.S_Contact}
                                        label={'Contact *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                S_Contact: value,
                                            })
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Male' },
                                            { _id: 2, TITLE: 'Female' },
                                            { _id: 3, TITLE: 'Others' },
                                        ]}
                                        value={GenderSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Select Gender *'}
                                        onSelectValue={(value) => {
                                            // console.log(value)
                                            setGenderSelected(value)
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         Gender: value,
                                            //     }
                                            // })
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Single' },
                                            { _id: 2, TITLE: 'Married' },
                                            { _id: 3, TITLE: 'Divorced' },
                                            { _id: 4, TITLE: 'Widowed' },
                                            { _id: 5, TITLE: 'Separated' },
                                            // { _id: 6, TITLE: 'Others' },
                                        ]}
                                        value={MaritalSelected}
                                        label={'TITLE'}
                                        placeholder={
                                            '-- Select Marital Status *'
                                        }
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         MaritalStatus: value,
                                            //     }
                                            // })
                                            setMaritalSelected(value)
                                            // console.log(dbData.SelectGender)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            {
                                                _id: 9,
                                                TITLE: 'A Positive (A+)',
                                            },
                                            {
                                                _id: 1,
                                                TITLE: 'A Negative (A-)',
                                            },
                                            {
                                                _id: 2,
                                                TITLE: 'B Positive (B+)',
                                            },
                                            {
                                                _id: 3,
                                                TITLE: 'B Negative (B-)',
                                            },
                                            {
                                                _id: 4,
                                                TITLE: 'AB Positive (AB+)',
                                            },
                                            {
                                                _id: 5,
                                                TITLE: 'AB Negative (AB-)',
                                            },
                                            {
                                                _id: 6,
                                                TITLE: 'O Positive (O+)',
                                            },
                                            {
                                                _id: 7,
                                                TITLE: 'O Negative (O-)',
                                            },
                                        ]}
                                        value={BloodSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Blood Group'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         Blood_Group: value,
                                            //     }
                                            // })
                                            setBloodSelected(value)
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 5, TITLE: 'Islam' },
                                            { _id: 1, TITLE: 'Hinduism' },
                                            {
                                                _id: 2,
                                                TITLE: 'Christianity',
                                            },
                                            { _id: 3, TITLE: 'Sikhism' },
                                            { _id: 4, TITLE: 'Ahmadis' },
                                            { _id: 6, TITLE: 'Other' },
                                        ]}
                                        value={ReligionSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Religion *'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         Religion: value,
                                            //     }
                                            // })
                                            setReligionSelected(value)
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Select Nationality
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={NationalitySelected}
                                            label="Select Nationality *"
                                            onChange={handlenationalitychange}
                                        >
                                            {CountryList.map((value) => {
                                                return (
                                                    <MenuItem
                                                        key={value.isoCode}
                                                        value={value.name}
                                                    >
                                                        {value.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    {/* <DropdownListBox
                    ddlArray={[
                      { _id: 1, TITLE: 'Pakistani' },
                    ]}
                    value={dbData.SelectNationality}
                    label={'TITLE'}
                    placeholder={'-- Nationality *'}
                    onSelectValue={(value) => {
                      setdbData((state) => {
                        return {
                          ...state,
                          SelectNationality:
                            value,
                        }
                      })
                    }}
                  /> */}
                                </Grid>

                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Select Country
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={CountrySelected}
                                            label="Select Country *"
                                            onChange={handlecountrychange}
                                            // name={CountryISO}
                                        >
                                            {CountryList.map((value) => {
                                                return (
                                                    <MenuItem
                                                        key={value.isoCode}
                                                        value={
                                                            value.isoCode +
                                                            '~' +
                                                            value.name
                                                        }
                                                    >
                                                        {value.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Select Province
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Select Province *"
                                            onChange={handlestatechange}
                                            value={StateSelected}
                                        >
                                            {StateList.map((value) => {
                                                return (
                                                    <MenuItem
                                                        key={value.isoCode}
                                                        // value={value.name}
                                                        value={
                                                            value.isoCode +
                                                            '~' +
                                                            value.name
                                                        }
                                                    >
                                                        {value.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Select City
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Select City *"
                                            onChange={handlecitychange}
                                            value={CitySelected}
                                        >
                                            {CityList.map((value) => {
                                                return (
                                                    <MenuItem
                                                        key={value.isoCode}
                                                        value={value.name}
                                                    >
                                                        {value.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

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
                                        value={dbData.CNIC}
                                        onChange={(event) => {
                                            setdbData({
                                                ...dbData,
                                                CNIC: event.target.value,
                                            })
                                        }}
                                    >
                                        {() => (
                                            <TextValidator
                                                sx={{ mb: 3, width: '100%' }}
                                                size="large"
                                                type="text"
                                                autoComplete="off"
                                                label="CNIC / Form B No. *"
                                            />
                                        )}
                                    </InputMask>
                                    {/* <TextInputBox
                                        value={dbData.CNIC}
                                        label={'CNIC / Form B No. *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                CNIC: value,
                                            })
                                        }}
                                    /> */}
                                </Grid>
                                {/* <Grid
                  item
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ mt: 2 }}
                >
                  <TextInputBox
                    value={dbData.Province}
                    label={'Province *'}
                    onChangeValue={(value) => {
                      setdbData({
                        ...dbData,
                        Province: value,
                      })
                    }}
                  />
                </Grid> */}
                            </Grid>
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
                                        value={dbData.C_Address}
                                        label={
                                            'Correspondence Address (Current) *'
                                        }
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                C_Address: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.PerAddress}
                                        label={'Permanent Address *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                PerAddress: value,
                                            })
                                        }}
                                    />
                                    <FormControlLabel
                                        style={{ marginTop: -15 }}
                                        control={
                                            <Checkbox
                                                // checked={state.checkedA}
                                                onChange={() => {
                                                    setdbData({
                                                        ...dbData,
                                                        PerAddress:
                                                            dbData.C_Address,
                                                    })
                                                }}
                                                value="checkedA"
                                            />
                                        }
                                        label="Same as Correspondence Address *"
                                    />
                                </Grid>
                            </Grid>
                            <H4 textcolor={'#000'} style={{ marginLeft: 5 }}>
                                Family Information
                            </H4>

                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.F_Name}
                                        label={'Fathers Name *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                F_Name: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.F_Contact}
                                        label={'Contact No *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                F_Contact: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.F_OCC}
                                        label={'Occupation of Father *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                F_OCC: value,
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                            <H4 textcolor={'#000'} style={{ marginLeft: 5 }}>
                                Medical Info
                            </H4>
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Yes' },
                                            { _id: 2, TITLE: 'No' },
                                        ]}
                                        value={DisabilitySelected}
                                        label={'TITLE'}
                                        placeholder={'-- Any Disability *'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         Disability: value,
                                            //     }
                                            // })
                                            // console.log(value)
                                            setDisabilitySelected(value)
                                            if (value !== null) {
                                                if (value.TITLE === 'Yes') {
                                                    setshowdisablity('visible')
                                                } else {
                                                    setshowdisablity('hidden')
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    lg={8}
                                    md={8}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2, visibility: showdisablity }}
                                >
                                    <TextInputBox
                                        value={dbData.DisabilityRemarks}
                                        label={'Disability Remarks'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                DisabilityRemarks: value,
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 0 }}
                                >
                                    {/* <Button
                    sx={{ ml: 0 }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => ExecuteFunction()}
                  >
                    Save and Next
                  </Button> */}
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </SimpleCard>
                )
            case 1:
                return (
                    <SimpleCard title="PROGRAM">
                        <ValidatorForm>
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={dbData.ddlProgram}
                                        getOptionLabel={
                                            (option) =>
                                                option.PROGRAM_TITLE
                                                    ? option.PROGRAM_TITLE
                                                    : ''

                                            /// ? option.PROGRAM_TITLE : "" added afer question marks
                                        }
                                        // getOptionLabel={(option) => {
                                        //     if (option['PROGRAM_TITLE'])
                                        //          return option['PROGRAM_TITLE']
                                        //     if (typeof option === 'string')
                                        //         return option
                                        //     return ''
                                        //  }}
                                        // renderOption={(props, option) => {
                                        //     return (
                                        //         <li {...props} key={option._id}>
                                        //             {option.PROGRAM_TITLE}
                                        //         </li>
                                        //     )
                                        // }}
                                        // defaultValue={[top100Films[13]]}
                                        filterSelectedOptions
                                        onChange={(
                                            event: any,
                                            newValue: any | null
                                        ) => {
                                            setFirstProgram(
                                                newValue[0].PROGRAM_TITLE
                                            )

                                            setdbData((state) => {
                                                return {
                                                    ...state,
                                                    SelectProgram: newValue,
                                                }
                                            })
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Select Program"
                                                placeholder="Programs"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
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
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Open Merit' },
                                            {
                                                _id: 2,
                                                TITLE: 'PUMS University Employee',
                                            },
                                            { _id: 3, TITLE: 'GHQ Nominee' },
                                            { _id: 4, TITLE: 'Hafiz-E-Quran' },
                                            { _id: 5, TITLE: 'Sports' },
                                            {
                                                _id: 6,
                                                TITLE: 'Disabled Candidate',
                                            },
                                            { _id: 7, TITLE: 'Self Finance' },
                                        ]}
                                        value={QuotaSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Select Quota'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         Qouta: value,
                                            //     }
                                            // })
                                            setQuotaSelected(value)
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
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Karachi' },
                                            { _id: 2, TITLE: 'Sukkur' },
                                        ]}
                                        value={TestSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Select Test Center'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         TestCenter: value,
                                            //     }
                                            // })
                                            setTestSelected(value)
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* <Grid container spacing={6}>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                  <Button sx={{ ml: 0 }} variant="contained" color="primary" size='large' onClick={() => ExecuteFunction_02()}>
                    Save and Next
                  </Button>
                </Grid>
              </Grid> */}
                        </ValidatorForm>
                    </SimpleCard>
                )
            case 2:
                return (
                    <SimpleCard title="EDUCATION RECORD">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
                            {/* METRIC */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={
                                            !isBoard
                                                ? [
                                                      {
                                                          _id: 1,
                                                          TITLE: 'Intermediate Pre-Engineering',
                                                      },
                                                      {
                                                          _id: 2,
                                                          TITLE: 'Intermediate Pre- Medical',
                                                      },
                                                      {
                                                          _id: 3,
                                                          TITLE: 'Intermediate Arts',
                                                      },
                                                      {
                                                          _id: 4,
                                                          TITLE: 'Intermediate Commerce',
                                                      },
                                                      {
                                                          _id: 5,
                                                          TITLE: 'A level',
                                                      },
                                                      {
                                                          _id: 6,
                                                          TITLE: 'D.A.E',
                                                      },
                                                      // {
                                                      //     _id: 6,
                                                      //     TITLE: 'Others',
                                                      // },
                                                  ]
                                                : [
                                                      {
                                                          _id: 7,
                                                          TITLE: 'Matriculation / O Level',
                                                      },
                                                  ]
                                        }
                                        // value={dbData.SelectM_Degree}
                                        value={DegreeSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Degree Type'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         SelectM_Degree: value.TITLE,
                                            //     }
                                            // })
                                            setDegreeSelected(value)
                                        }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={
                                            isBoard
                                                ? [
                                                      {
                                                          _id: 1,
                                                          TITLE: 'Board of Secondary Education, Sukkur',
                                                      },
                                                      {
                                                          _id: 2,
                                                          TITLE: 'Board of Secondary Education, Hyderabad',
                                                      },
                                                      {
                                                          _id: 3,
                                                          TITLE: 'Board of Secondary Education, Karachi',
                                                      },
                                                      {
                                                          _id: 4,
                                                          TITLE: 'Board of Secondary Education, Larkana',
                                                      },
                                                      {
                                                          _id: 5,
                                                          TITLE: 'Board of Secondary Education, Mirpur Khas',
                                                      },
                                                      {
                                                          _id: 6,
                                                          TITLE: 'Sindh Board of Technical Education',
                                                      },
                                                      {
                                                          _id: 7,
                                                          TITLE: 'Federal Board of Intermediate and Secondary Education Islamabad',
                                                      },
                                                      {
                                                          _id: 8,
                                                          TITLE: 'The Ziauddin University Examination Board',
                                                      },
                                                      {
                                                          _id: 9,
                                                          TITLE: 'Agha Khan University Examination Board',
                                                      },

                                                      {
                                                          _id: 10,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE) Lahore',
                                                      },
                                                      {
                                                          _id: 11,
                                                          TITLE: 'Punjab Board of Technical Education Lahore, Punjab',
                                                      },
                                                      {
                                                          _id: 12,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Faisalabad',
                                                      },
                                                      {
                                                          _id: 13,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Gujranwala',
                                                      },
                                                      {
                                                          _id: 14,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Multan',
                                                      },
                                                      {
                                                          _id: 15,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), DG Khan',
                                                      },
                                                      {
                                                          _id: 16,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Rawalpindi',
                                                      },
                                                      {
                                                          _id: 17,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Sargodha',
                                                      },
                                                      {
                                                          _id: 18,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Bahawalpur',
                                                      },
                                                      {
                                                          _id: 19,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Sahiwal',
                                                      },
                                                      {
                                                          _id: 20,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Peshawar',
                                                      },
                                                      {
                                                          _id: 21,
                                                          TITLE: 'Khyber Pakhtunkhwa Board of Technical Education (KPBTE), Peshawar',
                                                      },
                                                      {
                                                          _id: 22,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Kohat',
                                                      },
                                                      {
                                                          _id: 23,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE) Abbottabad',
                                                      },
                                                      {
                                                          _id: 24,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Swat',
                                                      },
                                                      {
                                                          _id: 25,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Malakand',
                                                      },
                                                      {
                                                          _id: 26,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Mardan',
                                                      },
                                                      {
                                                          _id: 27,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Bannu',
                                                      },
                                                      {
                                                          _id: 28,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Dera Ismail Khan',
                                                      },

                                                      {
                                                          _id: 29,
                                                          TITLE: 'Board of Intermediate and Secondary Education, Quetta',
                                                      },
                                                      {
                                                          _id: 30,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Turbat',
                                                      },
                                                      {
                                                          _id: 31,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Zhob',
                                                      },
                                                      {
                                                          _id: 32,
                                                          TITLE: 'AJK Board of Intermediate and Secondary Education, Mirpur, Azad Jammu & Kashmir',
                                                      },
                                                  ]
                                                : [
                                                      {
                                                          _id: 1,
                                                          TITLE: 'Board of Intermediate Education, Sukkur',
                                                      },
                                                      {
                                                          _id: 2,
                                                          TITLE: 'Board of Intermediate Education, Hyderabad',
                                                      },
                                                      {
                                                          _id: 3,
                                                          TITLE: 'Board of Intermediate Education, Karachi',
                                                      },
                                                      {
                                                          _id: 4,
                                                          TITLE: 'Board of Intermediate Education, Larkana',
                                                      },

                                                      {
                                                          _id: 6,
                                                          TITLE: 'Board of Intermediate Education, Mirpur Khas',
                                                      },

                                                      {
                                                          _id: 7,
                                                          TITLE: 'Sindh Board of Technical Education',
                                                      },
                                                      {
                                                          _id: 8,
                                                          TITLE: 'Federal Board of Intermediate and Secondary Education Islamabad',
                                                      },
                                                      {
                                                          _id: 9,
                                                          TITLE: 'The Ziauddin University Examination Board',
                                                      },
                                                      {
                                                          _id: 10,
                                                          TITLE: 'Agha Khan University Examination Board',
                                                      },

                                                      {
                                                          _id: 11,
                                                          TITLE: 'Punjab Board of Technical Education Lahore, Punjab',
                                                      },
                                                      {
                                                          _id: 12,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Faisalabad',
                                                      },
                                                      {
                                                          _id: 13,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Gujranwala',
                                                      },
                                                      {
                                                          _id: 14,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), Multan',
                                                      },
                                                      {
                                                          _id: 15,
                                                          TITLE: 'Board of Intermediate & Secondary Education (BISE), DG Khan',
                                                      },
                                                      {
                                                          _id: 16,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Rawalpindi',
                                                      },
                                                      {
                                                          _id: 17,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Sargodha',
                                                      },
                                                      {
                                                          _id: 18,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Bahawalpur',
                                                      },
                                                      {
                                                          _id: 19,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Sahiwal',
                                                      },
                                                      {
                                                          _id: 20,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Peshawar',
                                                      },
                                                      {
                                                          _id: 21,
                                                          TITLE: 'Khyber Pakhtunkhwa Board of Technical Education (KPBTE), Peshawar',
                                                      },
                                                      {
                                                          _id: 22,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Kohat',
                                                      },
                                                      {
                                                          _id: 23,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE) Abbottabad',
                                                      },
                                                      {
                                                          _id: 24,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Swat',
                                                      },
                                                      {
                                                          _id: 25,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Malakand',
                                                      },
                                                      {
                                                          _id: 26,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Mardan',
                                                      },
                                                      {
                                                          _id: 27,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Bannu',
                                                      },
                                                      {
                                                          _id: 28,
                                                          TITLE: 'Board of Intermediate & Secondary Education, Dera Ismail Khan',
                                                      },

                                                      {
                                                          _id: 29,
                                                          TITLE: 'Board of Intermediate and Secondary Education, Quetta',
                                                      },
                                                      {
                                                          _id: 30,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Turbat',
                                                      },
                                                      {
                                                          _id: 31,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE), Zhob',
                                                      },
                                                      {
                                                          _id: 32,
                                                          TITLE: 'AJK Board of Intermediate and Secondary Education, Mirpur, Azad Jammu & Kashmir',
                                                      },
                                                      {
                                                          _id: 33,
                                                          TITLE: 'Board of Intermediate and Secondary Education (BISE) Lahore',
                                                      },
                                                      //   {
                                                      //     _id: 7,
                                                      //     TITLE: 'D.A.E',
                                                      // },
                                                  ]
                                        }
                                        // value={dbData.SelectM_Board}
                                        value={BoardSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Board Name'}
                                        onSelectValue={(value) => {
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         SelectM_Board: value.TITLE,
                                            //     }
                                            // })
                                            setBoardSelected(value)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: '2001' },
                                            { _id: 2, TITLE: '2002' },
                                            { _id: 3, TITLE: '2003' },
                                            { _id: 4, TITLE: '2004' },
                                            { _id: 5, TITLE: '2005' },
                                            { _id: 6, TITLE: '2006' },
                                            { _id: 7, TITLE: '2007' },
                                            { _id: 8, TITLE: '2008' },
                                            { _id: 9, TITLE: '2009' },
                                            { _id: 10, TITLE: '2010' },
                                            { _id: 11, TITLE: '2011' },
                                            { _id: 12, TITLE: '2012' },
                                            { _id: 13, TITLE: '2013' },
                                            { _id: 14, TITLE: '2014' },
                                            { _id: 15, TITLE: '2015' },
                                            { _id: 16, TITLE: '2016' },
                                            { _id: 17, TITLE: '2017' },
                                            { _id: 18, TITLE: '2018' },
                                            { _id: 19, TITLE: '2019' },
                                            { _id: 20, TITLE: '2020' },
                                            { _id: 21, TITLE: '2021' },
                                            { _id: 22, TITLE: '2022' },
                                        ]}
                                        // value={dbData.SelectM_Year}
                                        value={PassingYearSelected}
                                        label={'TITLE'}
                                        placeholder={'-- Passing Year'}
                                        onSelectValue={(value) => {
                                            //                                             alert(value.TITLE)
                                            // console.log(value)
                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         SelectM_Year: value.TITLE,
                                            //     }
                                            // })
                                            setPassingYearSelected(value)
                                        }}
                                    />
                                    {/* <DropdownListBox
                    ddlArray={[{ _id: 2, TITLE: '2018' }, { _id: 3, TITLE: '2019' }, { _id: 4, TITLE: '2020' }, { _id: 5, TITLE: '2022' }]}
                    value={dbData.SelectM_Year}
                    label={'TITLE'}
                    placeholder={'-- Passing Year'}
                    onSelectValue={(value) => {
                      setdbData((state) => {
                        return { ...state, SelectM_Year: value };
                      });
                    }}
                  /> */}
                                    {/* <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            views={['year']}
                                            value={dbData.SelectM_Year.TITLE}
                                            onChange={handleDateChange_}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="-- Passing Year *"
                                                    id="mui-pickers-date"
                                                    sx={{
                                                        mb: 2,
                                                        width: '100%',
                                                    }}
                                                    size="large"
                                                />
                                            )}
                                        />
                                    </LocalizationProvider> */}
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.M_School}
                                        // value={M_SchoolNew}
                                        label={'College / School Name'}
                                        onChangeValue={(value) => {
                                            // alert(value)
                                            setdbData({
                                                ...dbData,
                                                M_School: value,
                                            })
                                        }}

                                        //   onChangeValue={(value) => {
                                        //     setM_SchoolNew(value)
                                        // }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <DropdownListBox
                                        ddlArray={[
                                            { _id: 1, TITLE: 'Passed' },
                                            { _id: 2, TITLE: 'Awaiting' },
                                        ]}
                                        // value={dbData.SelectM_Result}
                                        value={ResultSelected}
                                        // ResultSelected
                                        label={'TITLE'}
                                        placeholder={'-- Result Status'}
                                        onSelectValue={(value) => {
                                            // console.log(value)
                                            // alert(value.TITLE)
                                            if (value !== null) {
                                                if (
                                                    value.TITLE === 'Awaiting'
                                                ) {
                                                    setOpenNew(true)
                                                }
                                            }

                                            setResultSelected(value)

                                            // setdbData((state) => {
                                            //     return {
                                            //         ...state,
                                            //         SelectM_Result: value.TITLE,
                                            //     }
                                            // })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBoxNumber
                                        type={number}
                                        value={M_Total}
                                        label={'Total Marks'}
                                        onChangeValue={(value) => {
                                            setM_Total(value)
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    {/* <TextInputBox
                  value={dbData.M_Marks}
                  label={'Obtained Marks'}
                  onChangeValue={(value) => {
                    setdbData({ ...dbData, M_Marks: value });
                    setdbData({ ...dbData, M_Percentage: ((M_Total) / 100) * 100 });
                  }}
                /> */}
                                    <TextInputBoxNumber
                                        value={M_MarksNew}
                                        label={'Obtained Marks'}
                                        onChangeValue={(value) => {
                                            // alert(M_Total)
                                            if (
                                                Number(value) > Number(M_Total)
                                            ) {
                                                setMessage({
                                                    type: 'error',
                                                    title: 'Alert ! Obtained Marks should not be greater than Total Marks.',
                                                })
                                                setOpen(true)
                                            } else {
                                                setM_MarksNew(value)

                                                setdbData({
                                                    ...dbData,
                                                    M_Percentage: (
                                                        (value / M_Total) *
                                                        100
                                                    ).toFixed(2),
                                                })
                                            }

                                            // console.log(dbData)
                                            // ((value) / M_Total) * 100
                                        }}
                                    />
                                    {/* <TextField
                  size="large"
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    // setdbData({ ...dbData, M_Marks: event.target.value });
                    setM_MarksNew(event.target.value);
                  }}
                  value={M_MarksNew}
                  label={"Obtained Marks"}
                // onBlur={(event) => {
                //   setdbData({ ...dbData, M_Percentage: ((event.target.value) / M_Total) * 100 });
                // }}
                /> */}
                                </Grid>
                                {/*  */}
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextField
                                        disabled
                                        size="large"
                                        type="text"
                                        autoComplete="off"
                                        value={dbData.M_Percentage}
                                        label={'Percentage %'}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                {/*  */}
                                <Grid container spacing={6}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        sx={{ mt: 2 }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'right',
                                                marginBottom: '25px',
                                            }}
                                        >
                                            <Button
                                                mb={5}
                                                sx={{ ml: 0 }}
                                                variant="contained"
                                                color="success"
                                                size="large"
                                                onClick={() =>
                                                    ExecuteFunction_03()
                                                }
                                            >
                                                Add Record
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider></Divider>
                            <Box overflow="auto">
                                <ProductTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ px: 2 }}
                                                colSpan={2}
                                            >
                                                Degree
                                            </TableCell>
                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={4}
                                            >
                                                Board
                                            </TableCell>
                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={2}
                                            >
                                                Passing Year
                                            </TableCell>
                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={1}
                                            >
                                                School
                                            </TableCell>
                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={1}
                                            >
                                                Percentage
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={1}
                                            ></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {EduArray.map((product, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell
                                                    colSpan={2}
                                                    align="left"
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {product.degree}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    colSpan={4}
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {product.board}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    colSpan={2}
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {product.year}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    colSpan={1}
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {product.school}
                                                </TableCell>

                                                <TableCell
                                                    sx={{ px: 0 }}
                                                    align="left"
                                                    colSpan={1}
                                                >
                                                    {/* <Small bgcolor={bgError}>{product.per}  {product.per}</Small> */}
                                                    {product.per}
                                                </TableCell>

                                                <TableCell
                                                    sx={{ px: 0 }}
                                                    align="left"
                                                    colSpan={1}
                                                >
                                                    <IconButton
                                                        onClick={() => {
                                                            removeItem({
                                                                degree: product.degree,
                                                            })
                                                        }}
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </ProductTable>
                            </Box>

                            <br />
                            {/* {EduArray.length !== 0 || EduArray.length !== undefined ?
                <Button sx={{ ml: 0 }} variant="contained" color="primary" size='large'
                  // onClick={() => navigate('/Admission/ApplyStage_04')}
                  onClick={() => ExecuteFunction_4()}

                >
                  Save and Next
                </Button> : <></>} */}
                        </ValidatorForm>
                    </SimpleCard>
                )

            case 3:
                return (
                    <SimpleCard title="DOCUMENTS">
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                {/* <h5>Upload Domicile</h5> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="warning"
                                    sx={{
                                        letterSpacing: '5px',
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                >
                                    UPLOAD DOMICILE
                                    <form
                                        method="POST"
                                        action="/profile-upload-single"
                                        encType="multipart/form-data"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            // onChange={(e) => {
                                            //     onChangePicture({
                                            //         e: e.target.files,
                                            //         state: 'img_Domicile',
                                            //     })
                                            // }}
                                            onChange={(e) =>
                                                setDomecileImage(
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    </form>
                                </Button>
                            </Grid>
                            {/*  */}
                            <Grid
                                item
                                lg={2}
                                md={2}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <div style={{ marginLeft: 'auto' }}>
                                    <img
                                        style={{ height: 100, width: 100 }}
                                        // src={dbData.img_Domicile}

                                        src={
                                            DomecileImage == ''
                                                ? null
                                                : URL.createObjectURL(
                                                      DomecileImage
                                                  )
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {/*  */}
                        {/*  */}
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                {/* <h5>Upload Domicile</h5> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    sx={{
                                        letterSpacing: '5px',
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                >
                                    UPLOAD CNIC B-FORM
                                    <form
                                        method="POST"
                                        action="/profile-upload-single"
                                        encType="multipart/form-data"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            // onChange={(e) => {
                                            //     onChangePicture({
                                            //         e: e.target.files,
                                            //         state: 'img_CNIC',
                                            //     })
                                            // }}
                                            onChange={(e) =>
                                                setcnicImage(e.target.files[0])
                                            }
                                        />
                                    </form>
                                </Button>
                            </Grid>
                            {/*  */}
                            <Grid
                                item
                                lg={2}
                                md={2}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <div style={{ marginLeft: 'auto' }}>
                                    <img
                                        style={{ height: 100, width: 100 }}
                                        // src={dbData.img_CNIC}

                                        src={
                                            cnicImage == ''
                                                ? null
                                                : URL.createObjectURL(cnicImage)
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {/*  */}
                        {/*  */}
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                {/* <h5>Upload Profile Picture</h5> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="success"
                                    sx={{
                                        letterSpacing: '5px',
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                >
                                    UPLOAD PROFILE PICTURE
                                    <form
                                        method="POST"
                                        action="/profile-upload-single"
                                        encType="multipart/form-data"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) =>
                                                setproImage(e.target.files[0])
                                            }
                                        />
                                    </form>
                                </Button>
                            </Grid>
                            {/* <button onClick={() => POST_PROFILE()}>POST</button> */}
                            {/*  */}
                            <Grid
                                item
                                lg={2}
                                md={2}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <div style={{ marginLeft: 'auto' }}>
                                    <img
                                        style={{ height: 100, width: 100 }}
                                        // src={dbData.img_Profile}

                                        src={
                                            proImage == ''
                                                ? null
                                                : URL.createObjectURL(proImage)
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {/*  */}
                        {/*  */}
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                {/* <h5>Upload Matriculation Marksheet</h5> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="error"
                                    sx={{
                                        letterSpacing: '5px',
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                >
                                    UPLOAD MATRICULATION MARKSHEET
                                    <form
                                        method="POST"
                                        action="/profile-upload-single"
                                        encType="multipart/form-data"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            // onChange={(e) => {
                                            //     onChangePicture({
                                            //         e: e.target.files,
                                            //         state: 'img_M_Marketsheet',
                                            //     })
                                            // }}
                                            onChange={(e) =>
                                                setmatricImage(
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    </form>
                                </Button>
                            </Grid>
                            {/*  */}
                            <Grid
                                item
                                lg={2}
                                md={2}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <div style={{ marginLeft: 'auto' }}>
                                    <img
                                        style={{ height: 100, width: 100 }}
                                        // src={dbData.img_M_Marketsheet}

                                        src={
                                            matricImage == ''
                                                ? null
                                                : URL.createObjectURL(
                                                      matricImage
                                                  )
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {/*  */}
                        {/*  */}
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={10}
                                md={10}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                {/* <h5>Upload Intermediate Marksheet</h5> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="info"
                                    sx={{
                                        letterSpacing: '5px',
                                        height: '50px',
                                        fontWeight: 'bolder',
                                        width: '100%',
                                    }}
                                >
                                    UPLOAD INTERMEDIATE MARKSHEET
                                    <form
                                        method="POST"
                                        action="/profile-upload-single"
                                        encType="multipart/form-data"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            // onChange={onChangePicture}
                                            // onChange={(e) => {
                                            //     onChangePicture({
                                            //         e: e.target.files,
                                            //         state: 'img_I_Marketsheet',
                                            //     })
                                            // }}
                                            onChange={(e) =>
                                                setinterImage(e.target.files[0])
                                            }
                                        />
                                    </form>
                                </Button>
                            </Grid>
                            {/*  */}
                            <Grid
                                item
                                lg={2}
                                md={2}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <div style={{ marginLeft: 'auto' }}>
                                    <img
                                        style={{ height: 100, width: 100 }}
                                        // src={dbData.img_I_Marketsheet}

                                        src={
                                            interImage == ''
                                                ? null
                                                : URL.createObjectURL(
                                                      interImage
                                                  )
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {/* <Button onClick={() => POST_DB_DATA()}>
              SAVE
            </Button> */}
                    </SimpleCard>
                )

            default:
                return ``
        }
    }

    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()

    const handleNext = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    // const handleNext = () => ExecuteFunction();

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const handleReset = () => setActiveStep(0)

    return (
        <div>
            <Container>
                <br />
                <Stack spacing={4}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box mt={4}>
                        {activeStep === steps.length ? (
                            <Box>
                                <SimpleCard title="HAVE YOU COMPLETED ?">
                                    <Button
                                        sx={{
                                            mt: 2,
                                            width: '100%',
                                            letterSpacing: '10px',
                                            height: '50px',
                                            fontWeight: 'bolder',
                                            fontSize: '18px',
                                        }}
                                        variant="contained"
                                        color="success"
                                        onClick={() => setOpen_Alert(true)}
                                    >
                                        SUBMIT
                                    </Button>
                                </SimpleCard>
                            </Box>
                        ) : (
                            <Box>
                                <Typography>
                                    {getStepContent(activeStep)}
                                </Typography>

                                <Box pt={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        sx={{ ml: 2 }}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            // alert(activeStep)
                                            if (activeStep == 0) {
                                                ExecuteFunction_01()
                                            }
                                            if (activeStep == 1) {
                                                ExecuteFunction_02()
                                            }
                                            if (activeStep == 2) {
                                                // ExecuteFunction_4()
                                                ExecuteFunction_Degree()
                                                // setActiveStep(
                                                //     (prevActiveStep) =>
                                                //         prevActiveStep + 1
                                                // )
                                            }
                                            if (activeStep == 3) {
                                                // else {
                                                ExecuteFunction_Image()
                                                // setActiveStep(
                                                //     (prevActiveStep) =>
                                                //         prevActiveStep + 1
                                                // )
                                            }
                                        }}
                                    >
                                        {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                                        Next and Save
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Stack>

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
                {/*  */}
                <Dialog
                    fullScreen
                    open={open_Modal}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                onClick={() => {
                                    setOpen_Modal(false)
                                    navigate('/')
                                }}
                                edge="start"
                                color="inherit"
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div
                        style={{
                            width: '100%',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 20,
                            flexDirection: 'row',
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {numbers.map((item) => (
                            <div
                                style={{
                                    paddingTop: 2,
                                    borderColor: 'black',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    marginRight: 10,
                                    marginBottom: 10,
                                    width: '25%',
                                }}
                            >
                                <div
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <i>
                                            <img
                                                // src="/assets/images/aror_logo.png"
                                                src={companyLogo}
                                                width="100px"
                                                height="100px"
                                            />
                                        </i>
                                    </div>
                                    {/* <br /> */}
                                    <h6
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                        }}
                                    >
                                        {item.Type}
                                    </h6>
                                    {/* <br /> */}
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        ADMISSION TEST FEES VOUCHER Fall
                                        2022-2023
                                    </p>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '17%',
                                                    paddingLeft: 4,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Form#
                                            </td>
                                            <td
                                                style={{
                                                    width: '33%',
                                                    fontSize: 12,
                                                }}
                                            >
                                                AU-F22-00233
                                            </td>
                                            <td
                                                style={{
                                                    width: '22%',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Issue Date
                                            </td>
                                            <td
                                                style={{
                                                    width: '28%',
                                                    fontSize: 12,
                                                }}
                                            >
                                                {moment().format('DD-MM-YYYY')}
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    borderColor: 'black',
                                                    borderStyle: 'solid',
                                                    backgroundColor:
                                                        'lightgray',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Name
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {dbData.S_name}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderStyle: 'solid',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Father's Name
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {dbData.F_Name}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '34%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    borderStyle: 'solid',
                                                }}
                                            >
                                                CNIC/B-Form #
                                            </td>
                                            <td
                                                style={{
                                                    width: '66%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {dbData.CNIC}
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <i>
                                            <img
                                                src="/assets/images/Allied-Bank-Logo1.png"
                                                width="60px"
                                                height="50px"
                                            />
                                        </i>
                                    </div>
                                    <br />
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        ABL A/C-0010086039670024
                                    </p>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            marginTop: -10,
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PUMS University Collection Account
                                    </p>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '38%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    backgroundColor:
                                                        'lightgray',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Program
                                            </td>
                                            <td
                                                style={{
                                                    width: '62%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                {FirstProgram}
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        style={{
                                            width: '100%',
                                            border: 1,
                                            borderTop: 0,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        <tr>
                                            <td
                                                style={{
                                                    width: '38%',
                                                    paddingLeft: 4,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        'lightgray',
                                                    borderTop: 0,
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    borderStyle: 'solid',
                                                }}
                                            >
                                                Admission Fee
                                            </td>
                                            <td
                                                style={{
                                                    width: '62%',
                                                    fontSize: 12,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                Rs. 1,200/
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                        }}
                                    >
                                        <b>Due Date / Validity Date: </b>
                                        September 9th, 2022
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            marginLeft: 17,
                                        }}
                                    >
                                        PAYMENT TERMS
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 26,
                                        }}
                                    >
                                        • Mode of Payment :- Local Pay Order /
                                        Allied
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 34,
                                            marginTop: -12,
                                        }}
                                    >
                                        Bank CC
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • Cheques are unacceptable
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • Pay Order / Allied Bank CC is
                                        acceptable till
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 34,
                                            marginTop: -12,
                                        }}
                                    >
                                        due date
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • No challan is acceptable after due
                                        date
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 27,
                                            marginTop: -12,
                                        }}
                                    >
                                        • PayOrder should be in favour of The
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 35,
                                            marginTop: -12,
                                        }}
                                    >
                                        Peoples University of Medical & Health
                                        Science for Women
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 35,
                                            marginTop: -12,
                                        }}
                                    >
                                        Account.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Dialog>

                <Dialog
                    open={open_Alert}
                    onClose={() => setOpen_Alert(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure? You want to submit this application?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen_Alert(false)}
                            color="primary"
                        >
                            Disagree
                        </Button>
                        <Button
                            onClick={() => runSave()}
                            color="primary"
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>

            <Modal
                open={OpenNew}
                onClose={handleCloseNew}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleNew}>
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
                            <h1>Information</h1>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                For Intermediate : Please fill the marks of 1st
                                year.
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bolder',
                                }}
                            >
                                For Bachelor's: Please fill the last announced
                                results.
                            </p>
                        </Grid>
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openCompletion}
                onClose={handleCloseCompletion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description">
                        <img
                            // src="/assets/images/aror_logo.png"
                            src={successimg}
                        />
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default SimpleForm
