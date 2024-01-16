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
import ip from '../DB/IP_Address'

import Modal from '@mui/material/Modal'
import { join } from 'lodash'
import InputMask from 'react-input-mask'
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const VendorForm = () => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    //
    const [dbData, setdbData] = useState({
        Ven_RegistraionID: userData._id,
        businessName: '',
        URL: '',
        contactName: '',
        contactNumber: '',
        faxNumber: '',
        cellNumber: '',
        contactEmail: '',
        purOrderEmail: '',
        CurrentAddress: '',
        PerAddress: '',
        zipCode: '',
        religion: '',
        Nationality: '',
        Country: '',
        Province: '',
        City: '',
        Date: '',
        classification: '',
        category: '',
        NTNnumber: '',
        STRNnumber: '',
        CNICnumber: '',
        workExperience: '',
        tech_profAbility: '',
        productSupport: '',
        supportPolicy: '',
        organizationYears: '',
        contractTerminate: '',
        softwareSolution: '',
        lawSuits: '',
        bankruptcy: '',
        bankName: '',
        bankAddress: '',
        bankPhone: '',
        bankBranch: '',
        accName: '',
        accNumber: '',
        BICcode: '',
        IBANno: '',
        financeDepartment: '',
        ServicesArray: [],
        checkA: '',

        // advertisment: '',
        // date: '',
        // name: '',
        // fname: '',
        // cnic: '',
        // contact: '',
        // DOB: '',
        // Date: '',
        // email: '',
        // domicile: '',
        // religion: '',
        // Gender: '',
        // MaritalStatus: '',
        // Blood_Group: '',
        // Province: '',
        // Country: '',
        // City: '',
        // Nationality: '',
        // PEC_RegNo: '',
        // CurrentAddress: '',
        // PerAddress: '',
        // proTraining: '',
        // compLiteracy: '',
        // award: '',
        // NameOfPost: '',
        // BasicPay: '',
        // Organization: '',
        // ServiceFromDate: '',
        // ServiceToDate: '',
        // publication: '',
        // research: '',
        // thesis: '',

        Qouta: '',
        TestCenter: '',
        Status: 'true',
        IsUpdate: 'true',
        isActive: 'true',
        FeeStatus: 'PENDING',
        M_School: '',
    })

    // console.log(dbData.ServicesArray)
    const navigate = useNavigate()
    // STATES

    ////// COUNTRY STATE CITY START
    ////// COUNTRY STATE CITY START

    useEffect(() => {
        GetCountry()
        GET_SERVICES_LIST()
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

    //
    const [DepartmentSelected, setDepartmentSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [ApplyforSelected, setApplyforSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    //
    const [Applying, setApplying] = useState({
        _id: '0',
        TITLE: '',
    })

    const [GenderSelected, setGenderSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [MaritalSelected, setMaritalSelected] = useState({
        _id: '0',
        TITLE: '',
    })

    const [Department, setDepartment] = useState({
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

    const [Refresh, setRefresh] = useState(false)
    const [cvImage, setcvImage] = useState('')
    const [proImage, setproImage] = useState('')
    const [cnicImage, setcnicImage] = useState('')
    const [PRCImage, setPRCImage] = useState('')
    const [DomecileImage, setDomecileImage] = useState('')
    const [NTNImage, setNTNImage] = useState('')
    const [STRNImage, setSTRNImage] = useState('')
    const [CNICImage, setCNICImage] = useState('')

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
    const [ExperienceArray, setExperienceArray] = useState([])

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

    const removeExperienceItem = (item) => {
        setExperienceArray((current) =>
            current.filter((product) => {
                return product.nameofpost !== item.nameofpost
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
    const ExecuteFunction_00 = () => {
        const arr = [
            { state: dbData.businessName, value: '', name: 'Business Name' },
            { state: dbData.URL, value: '', name: 'URL for Web Site' },
            { state: dbData.contactName, value: '', name: 'Contact Name' },
            { state: dbData.contactNumber, value: '', name: 'Contact Number' },
            {
                state: dbData.contactEmail,
                value: '',
                name: 'Email For Contact Person *',
            },
            { state: dbData.faxNumber, value: '', name: 'Fax Number' },
            { state: dbData.cellNumber, value: '', name: 'Cell Number' },
            {
                state: dbData.purOrderEmail,
                value: '',
                name: 'Email for Purchase Order',
            },
            // { state: dbData.CNICnumber, value: '', name: 'CNIC Number' },
            { state: dbData.zipCode, value: '', name: 'Zip Code' },
            { state: dbData.Date, value: '', name: 'Date' },
            { state: dbData.Date, value: null, name: 'Date' },
            {
                state: dbData.Date,
                value: 'Invalid Date',
                name: 'Date',
            },
            { state: ReligionSelected._id, value: '0', name: 'Religion' },
            { state: NationalitySelected, value: '', name: 'Nationality' },
            { state: CountrySelected, value: '', name: 'Country' },
            { state: StateSelected, value: '', name: 'Province' },
            { state: CitySelected, value: '', name: 'City' },
            {
                state: dbData.CurrentAddress,
                value: '',
                name: 'Current Address',
            },
            { state: dbData.PerAddress, value: '', name: 'Permanent Address' },
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

                    // Blood_Group: BloodSelected.TITLE,
                    // MaritalStatus: MaritalSelected.TITLE,
                    // Gender: GenderSelected.TITLE,
                    Religion: ReligionSelected.TITLE,
                    // Disability: DisabilitySelected.TITLE,
                }
            })

            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    //
    const ExecuteFunction_01 = () => {
        const arr = [
            {
                state: dbData.classification,
                value: '',
                name: 'Select Classification',
            },
            { state: dbData.category, value: '', name: 'Select Category' },
            { state: dbData.NTNnumber, value: '', name: 'NTN Number' },
            { state: dbData.STRNnumber, value: '', name: 'STRN Number' },
            { state: dbData.CNICnumber, value: '', name: 'CNIC Number' },
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

        // if (!found) {
        //     // console.log(dbData)

        //     setdbData((state) => {
        //         return {
        //             ...state,

        //             ApplyFor: ApplyforSelected.TITLE,
        //             Department: DepartmentSelected.TITLE,
        //         }
        //     })

        //     setActiveStep((prevActiveStep) => prevActiveStep + 1)
        // }
    }

    //

    const ExecuteFunction_02 = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1)
        function getChecked() {
            var checked = []

            for (var i = 0; i < servicesList.length; i++) {
                var checkbox = servicesList[i]
                if (checkbox.isCheck) checked.push(checkbox._id)
            }
            // console.log(checked)
            return checked
        }
        // getChecked()

        if (getChecked() === undefined || getChecked().length === 0) {
            setMessage({
                type: 'error',
                title: 'Alert ! Please select at least one service',
            })
            setOpen(true)
        } else {
            setdbData({
                ...dbData,
                ServicesArray: getChecked(),
            })
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const ExecuteFunction_Image = () => {
        var found = false
        const arr = [
            { state: NTNImage, value: '', name: 'NTN' },
            { state: STRNImage, value: '', name: 'STRN' },
            { state: CNICImage, value: '', name: 'CNIC' },
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

    const ExecuteFunction_03 = () => {
        const arr = [
            {
                state: dbData.workExperience,
                value: '',
                name: 'Please Provide 3 references',
            },
            {
                state: dbData.tech_profAbility,
                value: '',
                name: 'Technical & Professional Ability',
            },
            {
                state: dbData.productSupport,
                value: '',
                name: 'Product Support',
            },
            {
                state: dbData.supportPolicy,
                value: '',
                name: 'Provide Details of your product support',
            },
            {
                state: dbData.organizationYears,
                value: '',
                name: 'How many years has your organization',
            },
            {
                state: dbData.contractTerminate,
                value: '',
                name: 'Have you had any contracts terminated',
            },
            {
                state: dbData.softwareSolution,
                value: '',
                name: 'Do you use any software solution',
            },
            {
                state: dbData.lawSuits,
                value: '',
                name: 'any outstanding law suits against your organization',
            },
            {
                state: dbData.bankruptcy,
                value: '',
                name: 'Is your organization the subject of proceedings',
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
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    //

    const ExecuteFunction_04 = () => {
        const arr = [
            { state: dbData.bankName, value: '', name: 'Bank Name' },
            { state: dbData.bankAddress, value: '', name: 'Bank Address' },
            { state: dbData.bankPhone, value: '', name: 'Phone Number' },
            { state: dbData.bankBranch, value: '', name: 'Bnak Branch' },
            { state: dbData.accName, value: '', name: 'Account Name' },
            { state: dbData.accNumber, value: '', name: 'Account Number' },
            { state: dbData.BICcode, value: '', name: 'SWIFT/ BIC Code' },
            { state: dbData.IBANno, value: '', name: 'IBAN No' },
            {
                state: dbData.financeDepartment,
                value: '',
                name: 'Finanace Department',
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
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    //
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
        // GETALL_DEG()
        // GETALL_PRO()
        // GETALL_DROP()
    }, [])

    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }

    // const { classification, category } = state

    const [servicesList, setserviceList] = useState([])
    const GET_SERVICES_LIST = () => {
        axios
            .get('http://121.52.155.34:5000/PRO_Service/GETALL')
            .then((response) => {
                // console.log(res.data)
                let modify = response.data.map((val) => {
                    return {
                        ...val,
                        isCheck: false,
                    }
                })
                console.log(modify)
                setserviceList(modify)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const RUN_SAVE_EMP = () => {
        axios
            .post(ip.localhost + 'PRO_INSERT/post/', dbData)
            .then((res) => {
                sendFile({ folder: 'VEN_NTNImage', file: NTNImage })
                sendFile({ folder: 'VEN_STRNImage', file: STRNImage })
                sendFile({ folder: 'VEN_CNICImage', file: CNICImage })
                setOpen_Alert(false)
                setMessage({
                    type: 'success',
                    title: 'Record Saved Successfully',
                })
                setOpen(true)
                navigate('/Vendor/Vendor_Dashboard')
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const sendFile = (val) => {
        const data = new FormData()
        const file = val.file
        data.append('image', file) // <-- use "avatar" instead of "file" here
        axios({
            method: 'post',
            // url: ip.localhost + 'applicantImg/upload',
            url:
                ip.localhost +
                'SaveImage/upload?folder=' +
                val.folder +
                '&CNIC=' +
                userData.CNIC,
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
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
    const handleDate = (date) => setdbData({ ...dbData, Date: date })
    const handleServiceFromDate = (date) =>
        setdbData({ ...dbData, ServiceFromDate: date })
    const handleServiceToDate = (date) =>
        setdbData({ ...dbData, ServiceToDate: date })

    const handleClassification = (val) =>
        setdbData({ ...dbData, classification: val })

    const handleCategory = (val) => setdbData({ ...dbData, category: val })

    // const handleDateChange_ = (date) =>
    //     setdbData({ ...dbData, SelectM_Year: date })

    // const { gender, date } = state

    const H4 = styled('h3')(({ textcolor }) => ({
        margin: 0,
        color: textcolor,
        fontWeight: '500',
        marginLeft: '12px',
    }))

    function getSteps() {
        return [
            'VENDOR GENERAL INFORMATION',
            'VENDOR CLASSIFICATION',
            'PRODUCT / SERVICE INFORMATION',
            'EXPERIENCE RECORD',
            'BANK DETAIL',
        ]
    }

    // ==================== CALLING API's START ==================== //
    // STATES

    const [ddl, setddl] = useState({ DistrictData: [{}] })

    const handleSubmit = (event) => {}

    // ==================== CALLING API's END ==================== //

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <SimpleCard title="VENDOR GENERAL INFORMATION">
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
                                        value={dbData.businessName}
                                        label={'Business Name *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                businessName: value,
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
                                        value={dbData.URL}
                                        label={'URL for Web Site *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                URL: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.contactName}
                                        label={'Contact Name *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                contactName: value,
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
                                        value={dbData.contactNumber}
                                        label={'Mobile Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                contactNumber: value,
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
                                        value={dbData.contactEmail}
                                        label={'Email For Contact Person *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                contactEmail: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.faxNumber}
                                        label={'Fax Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                faxNumber: value,
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
                                        value={dbData.cellNumber}
                                        label={'Cell Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                cellNumber: value,
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
                                        value={dbData.purOrderEmail}
                                        label={'Email for Purchase Order  *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                purOrderEmail: value,
                                            })
                                        }}
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
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            value={dbData.Date}
                                            onChange={handleDate}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Date*"
                                                    id="mui-pickers-date"
                                                    sx={
                                                        {
                                                            // mb: 2,
                                                            // width: '100%',
                                                        }
                                                    }
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
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
                                        value={dbData.zipCode}
                                        label={'Zip Code *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                zipCode: value,
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
                                    sx={{ mt: 1 }}
                                >
                                    <FormControl fullWidth size="small">
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
                                </Grid>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 1 }}
                                >
                                    <FormControl fullWidth size="small">
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
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 1 }}
                                >
                                    <FormControl fullWidth size="small">
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
                                    sx={{ mt: 1 }}
                                >
                                    <FormControl fullWidth size="small">
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
                                    sx={{ mt: 4 }}
                                >
                                    <TextInputBox
                                        value={dbData.CurrentAddress}
                                        label={'Corporate Address (Current) *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                CurrentAddress: value,
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
                                    sx={{ mt: 4 }}
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
                                                onChange={() => {
                                                    setdbData({
                                                        ...dbData,
                                                        PerAddress:
                                                            dbData.CurrentAddress,
                                                    })
                                                }}
                                                value="checkedA"
                                            />
                                        }
                                        label="Same as Corporate Address *"
                                    />
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </SimpleCard>
                )

            case 1:
                return (
                    <SimpleCard title="VENDOR CLASSIFICATION">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <RadioGroup
                                    sx={{ mb: 2 }}
                                    value={dbData.classification}
                                    name="classification"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            classification: event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="Individual"
                                        control={<Radio />}
                                        label="Individual"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="(PVT) Ltd"
                                        control={<Radio />}
                                        label="(PVT) Ltd"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Company"
                                        control={<Radio />}
                                        label="Company"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 1 }}
                            >
                                <h3>Category</h3>
                                <RadioGroup
                                    sx={{ mb: 2 }}
                                    value={dbData.category}
                                    name="category"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            category: event.target.value,
                                        })
                                    }}
                                    // onChange={handleCategory}
                                    row
                                >
                                    <FormControlLabel
                                        value="Filer"
                                        control={<Radio />}
                                        label="Filer"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Non Filer"
                                        control={<Radio />}
                                        label="Non Filer"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
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
                                        value={dbData.NTNnumber}
                                        label={'NTN Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                NTNnumber: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={7}
                                    md={7}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    {/* <h5>Upload Profile Picture</h5> */}
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
                                        UPLOAD NTN IMAGE
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
                                                    setNTNImage(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </form>
                                    </Button>
                                </Grid>
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
                                            style={{
                                                height: 100,
                                                width: 100,
                                            }}
                                            // src={dbData.img_Profile}

                                            src={
                                                NTNImage == ''
                                                    ? null
                                                    : URL.createObjectURL(
                                                          NTNImage
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
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.STRNnumber}
                                        label={'STRN Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                STRNnumber: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={7}
                                    md={7}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    {/* <h5>Upload Profile Picture</h5> */}
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
                                        UPLOAD STRN IMAGE
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
                                                    setSTRNImage(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </form>
                                    </Button>
                                </Grid>
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
                                            style={{
                                                height: 100,
                                                width: 100,
                                            }}
                                            src={
                                                STRNImage == ''
                                                    ? null
                                                    : URL.createObjectURL(
                                                          STRNImage
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
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextInputBox
                                        value={dbData.CNICnumber}
                                        label={'CNIC Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                CNICnumber: value,
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={7}
                                    md={7}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
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
                                        UPLOAD CNIC IMAGE
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
                                                    setCNICImage(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </form>
                                    </Button>
                                </Grid>
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
                                            style={{
                                                height: 100,
                                                width: 100,
                                            }}
                                            src={
                                                CNICImage == ''
                                                    ? null
                                                    : URL.createObjectURL(
                                                          CNICImage
                                                      )
                                            }
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                        </ValidatorForm>
                    </SimpleCard>
                )
            case 2:
                return (
                    <SimpleCard title="SERVICES">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
                            {servicesList.map((v) => {
                                return (
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Checkbox
                                            onChange={(event) => {
                                                // console.log(
                                                //     event.target.checked
                                                // )
                                                for (
                                                    let i = 0;
                                                    i < servicesList.length;
                                                    i++
                                                ) {
                                                    if (
                                                        servicesList[i]._id ===
                                                        v._id
                                                    ) {
                                                        if (
                                                            event.target
                                                                .checked == true
                                                        ) {
                                                            servicesList[
                                                                i
                                                            ].isCheck = true
                                                            setRefresh(false)
                                                        } else {
                                                            servicesList[
                                                                i
                                                            ].isCheck = false
                                                            setRefresh(false)
                                                        }
                                                    }
                                                }
                                            }}
                                            value={v.isCheck}
                                        />
                                        {v.SERVICE_TITLE}
                                    </Grid>
                                )
                            })}
                        </ValidatorForm>
                    </SimpleCard>
                )
            case 3:
                return (
                    <SimpleCard title="EXPERIENCE RECORD">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <h4>
                                    Please Provide 3 references for your work
                                    experience (200 words)
                                </h4>
                                {/* <h5>Reference 1</h5> */}
                                <TextField
                                    sx={{ mt: -1 }}
                                    placeholder="Type here ....."
                                    multiline
                                    rowsMax={4}
                                    fullWidth
                                    value={dbData.workExperience}
                                    onChange={(e) =>
                                        setdbData({
                                            ...dbData,
                                            workExperience: e.target.value,
                                        })
                                    }
                                    // onKeyUp={sendMessageOnEnter}
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <h4>
                                    Technical & Professional Ability should be
                                    submitted (200 words)
                                </h4>
                                <TextField
                                    sx={{ mt: -1 }}
                                    placeholder="Type here ....."
                                    multiline
                                    rowsMax={4}
                                    fullWidth
                                    value={dbData.tech_profAbility}
                                    onChange={(e) =>
                                        setdbData({
                                            ...dbData,
                                            tech_profAbility: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <h4>Product Support (200 words)</h4>
                                <TextField
                                    sx={{ mt: -1 }}
                                    placeholder="Type here ....."
                                    multiline
                                    rowsMax={4}
                                    fullWidth
                                    value={dbData.productSupport}
                                    onChange={(e) =>
                                        setdbData({
                                            ...dbData,
                                            productSupport: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <h4>
                                    Provide Details of your product support
                                    policy and after sales service (200 words)
                                </h4>
                                <TextField
                                    sx={{ mt: -1 }}
                                    placeholder="Type here ....."
                                    multiline
                                    rowsMax={4}
                                    fullWidth
                                    value={dbData.supportPolicy}
                                    onChange={(e) =>
                                        setdbData({
                                            ...dbData,
                                            supportPolicy: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h4>
                                    How many years has your organization been in
                                    the current business?
                                </h4>
                                <RadioGroup
                                    sx={{ mt: -2 }}
                                    value={dbData.organizationYears}
                                    name="organizationYears"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            organizationYears:
                                                event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="5 years"
                                        control={<Radio />}
                                        label="5 years"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="5 - 10 years"
                                        control={<Radio />}
                                        label="5 - 10 years"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="10 - 15 years"
                                        control={<Radio />}
                                        label="10 - 15 years"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="20 years"
                                        control={<Radio />}
                                        label="20 years"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h4>
                                    Have you had any contracts terminated for
                                    poor performance in the last five years? YES
                                    NO
                                </h4>
                                <RadioGroup
                                    sx={{ mt: -2 }}
                                    value={dbData.contractTerminate}
                                    name="contractTerminate"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            contractTerminate:
                                                event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="YES"
                                        control={<Radio />}
                                        label="YES"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="NO"
                                        control={<Radio />}
                                        label="NO"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h4>
                                    Do you use any software solution that
                                    integrates routine operations like
                                    purchasing, order management, invoicing
                                    etc.?
                                </h4>
                                <RadioGroup
                                    sx={{ mt: -2 }}
                                    value={dbData.softwareSolution}
                                    name="softwareSolution"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            softwareSolution:
                                                event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="YES"
                                        control={<Radio />}
                                        label="YES"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="NO"
                                        control={<Radio />}
                                        label="NO"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                            <h2>Professioanl Information</h2>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h4>
                                    Are there any outstanding law suits against
                                    your organization in the state or elsewhere?
                                </h4>
                                <RadioGroup
                                    sx={{ mt: -2 }}
                                    value={dbData.lawSuits}
                                    name="lawSuits"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            lawSuits: event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="YES"
                                        control={<Radio />}
                                        label="YES"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="NO"
                                        control={<Radio />}
                                        label="NO"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <h4>
                                    Is your organization the subject of
                                    proceedings for a declaration of bankruptcy
                                    or any other similar proceedings under
                                    national laws or regulations?
                                </h4>
                                <RadioGroup
                                    sx={{ mt: -2 }}
                                    value={dbData.bankruptcy}
                                    name="bankruptcy"
                                    onChange={(event) => {
                                        setdbData({
                                            ...dbData,
                                            bankruptcy: event.target.value,
                                        })
                                    }}
                                    // onChange={handleClassification}
                                    row
                                >
                                    <FormControlLabel
                                        value="YES"
                                        control={<Radio />}
                                        label="YES"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="NO"
                                        control={<Radio />}
                                        label="NO"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </Grid>
                        </ValidatorForm>
                    </SimpleCard>
                )
            case 4:
                return (
                    <SimpleCard title="BANK DETAILS">
                        <ValidatorForm
                            onError={() => null}
                            onSubmit={handleSubmit}
                        >
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
                                        value={dbData.bankName}
                                        label={'Bank Name *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                bankName: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.bankAddress}
                                        label={'Bank Address *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                bankAddress: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.bankPhone}
                                        label={'Phone Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                bankPhone: value,
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
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
                                    <TextInputBox
                                        value={dbData.bankBranch}
                                        label={'Bank Branch *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                bankBranch: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.accName}
                                        label={'Account Name *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                accName: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.accNumber}
                                        label={'Account Number *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                accNumber: value,
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
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
                                    <TextInputBox
                                        value={dbData.BICcode}
                                        label={'SWIFT/ BIC Code *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                BICcode: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.IBANno}
                                        label={'IBAN No *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                IBANno: value,
                                            })
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
                                    <TextInputBox
                                        value={dbData.financeDepartment}
                                        label={'Finance Department *'}
                                        onChangeValue={(value) => {
                                            setdbData({
                                                ...dbData,
                                                financeDepartment: value,
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*  */}
                            {/*  */}
                        </ValidatorForm>
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
                                                ExecuteFunction_00()
                                            }
                                            if (activeStep == 1) {
                                                ExecuteFunction_Image()
                                                ExecuteFunction_01()
                                            }
                                            if (activeStep == 2) {
                                                ExecuteFunction_02()
                                            }
                                            if (activeStep == 3) {
                                                ExecuteFunction_03()
                                            }

                                            if (activeStep == 4) {
                                                ExecuteFunction_04()
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
                            onClick={() => RUN_SAVE_EMP()}
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
                        <img src={successimg} />
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default VendorForm
