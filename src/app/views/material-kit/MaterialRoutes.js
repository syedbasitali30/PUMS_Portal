import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

// ====================THEME PAGES START===================
const AppTable = Loadable(lazy(() => import('./tables/AppTable')))
const AppForm = Loadable(lazy(() => import('./forms/AppForm')))
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')))
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')))
const AppProgress = Loadable(lazy(() => import('./AppProgress')))
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')))
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')))
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')))
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')))
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')))
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')))
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')))
const AppAutoComplete = Loadable(
    lazy(() => import('./auto-complete/AppAutoComplete'))
)
const AppExpansionPanel = Loadable(
    lazy(() => import('./expansion-panel/AppExpansionPanel'))
)
// ====================THEME PAGES END=====================

// EMPLOYEE

const EMP_Dashboard = Loadable(
    lazy(() => import('../Recruitment/EMP_Dashboard'))
)
const EMP_Apply = Loadable(lazy(() => import('../Recruitment/EMP_Apply')))
const EMP_BasicInfo = Loadable(
    lazy(() => import('../Recruitment/EMP_BasicInfo'))
)
const EMP_JobInfo = Loadable(lazy(() => import('../Recruitment/EMP_JobInfo')))
const EMP_Education = Loadable(
    lazy(() => import('../Recruitment/EMP_Education'))
)
const EMP_UploadDocs = Loadable(
    lazy(() => import('../Recruitment/EMP_UploadDocs'))
)
const EMP_Research = Loadable(lazy(() => import('../Recruitment/EMP_Research')))
const EMP_JobApply = Loadable(lazy(() => import('../Recruitment/EMP_JobApply')))
// ADMISSION

const ADM_Apply = Loadable(lazy(() => import('../Admissions/ADM_Apply')))
const ADM_Dashboard = Loadable(
    lazy(() => import('../Admissions/ADM_Dashboard'))
)
const TEST_PDF = Loadable(lazy(() => import('../Admissions/TEST_PDF')))
const ADM_BasicInfo = Loadable(
    lazy(() => import('../Admissions/ADM_BasicInfo'))
)
const Vendor_Apply = Loadable(lazy(() => import('../Vendor/Vendor_Apply')))
const ADM_Education = Loadable(
    lazy(() => import('../Admissions/ADM_Education'))
)
const ADM_ElectiveSub = Loadable(
    lazy(() => import('../Admissions/ADM_ElectiveSub'))
)
const ADM_ChooseDept = Loadable(
    lazy(() => import('../Admissions/ADM_ChooseDept'))
)
// TECH ADMISSIONS
const Tech_Dashboard = Loadable(
    lazy(() => import('../TechAdmission/Tech_Dashboard'))
)
const Tech_BasicInfo = Loadable(
    lazy(() => import('../TechAdmission/Tech_BasicInfo'))
)
const Tech_Education = Loadable(
    lazy(() => import('../TechAdmission/Tech_Education'))
)
const Tech_ChooseDept = Loadable(
    lazy(() => import('../TechAdmission/Tech_ChooseDept'))
)

// MBBS
const MBBS_Home = Loadable(lazy(() => import('../MBBS_Admission/MBBS_Home')))

const MBBS_APLForm = Loadable(
    lazy(() => import('../MBBS_Admission/MBBS_APLForm'))
)

const MBBS_DocUpload = Loadable(
    lazy(() => import('../MBBS_Admission/MBBS_DocUpload'))
)
// VENDOR

const Vendor_BasicInfo = Loadable(
    lazy(() => import('../Vendor/Vendor_BasicInfo'))
)
const Vendor_Information = Loadable(
    lazy(() => import('../Vendor/Vendor_Information'))
)
const Vendor_AccSettings = Loadable(
    lazy(() => import('../Vendor/Vendor_AccSettings'))
)
const Vendor_Projects = Loadable(
    lazy(() => import('../Vendor/Vendor_Projects'))
)
const Vendor_UploadDocs = Loadable(
    lazy(() => import('../Vendor/Vendor_UploadDocs'))
)
const Vendor_Dashboard = Loadable(
    lazy(() => import('../Vendor/Vendor_Dashboard'))
)
const Vendor_Active_NIT = Loadable(
    lazy(() => import('../Vendor/Vendor_Active_NIT'))
)
const Vendor_Active_RFQ = Loadable(
    lazy(() => import('../Vendor/Vendor_Active_RFQ'))
)
const Vendor_Apply_Tender = Loadable(
    lazy(() => import('../Vendor/Vendor_Apply_Tender'))
)
const Vendor_Applied_Active_NIT = Loadable(
    lazy(() => import('../Vendor/Vendor_Applied_Active_NIT'))
)
const Vendor_Applied_Tender_Detail = Loadable(
    lazy(() => import('../Vendor/Vendor_Applied_Tender_Detail'))
)
//
const Instructions = Loadable(
    lazy(() => import('../dashboard/shared/Instructions'))
)
const MoreInfo = Loadable(lazy(() => import('../dashboard/shared/MoreInfo')))

const materialRoutes = [
    // SETUP
    {
        path: '/Admission/ADM_Apply',
        element: <ADM_Apply />,
    },
    {
        path: '/Admission/EMP_Apply',
        element: <EMP_Apply />,
    },
    {
        path: '/Vendor/Vendor_Apply',
        element: <Vendor_Apply />,
    },
    {
        path: '/Admission/ADM_Dashboard',
        element: <ADM_Dashboard />,
    },
    {
        path: '/Tech/Tech_Dashboard',
        element: <Tech_Dashboard />,
    },
    {
        path: '/Admission/TEST_PDF',
        element: <TEST_PDF />,
    },
    {
        path: '/Admission/ADM_BasicInfo',
        element: <ADM_BasicInfo />,
    },
    {
        path: '/Tech/Tech_BasicInfo',
        element: <Tech_BasicInfo />,
    },
    {
        path: '/Admission/EMP_BasicInfo',
        element: <EMP_BasicInfo />,
    },
    {
        path: '/Vendor/Vendor_BasicInfo',
        element: <Vendor_BasicInfo />,
    },
    {
        path: '/Vendor/Vendor_Information',
        element: <Vendor_Information />,
    },
    {
        path: '/Vendor/Vendor_AccSettings',
        element: <Vendor_AccSettings />,
    },
    {
        path: '/Vendor/Vendor_Projects',
        element: <Vendor_Projects />,
    },
    {
        path: '/Admission/EMP_JobInfo',
        element: <EMP_JobInfo />,
    },
    {
        path: '/Admission/EMP_Education',
        element: <EMP_Education />,
    },
    {
        path: '/Admission/EMP_UploadDocs',
        element: <EMP_UploadDocs />,
    },
    {
        path: '/Admission/EMP_Research',
        element: <EMP_Research />,
    },
    {
        path: '/Admission/EMP_JobApply',
        element: <EMP_JobApply />,
    },
    {
        path: '/Vendor/Vendor_UploadDocs',
        element: <Vendor_UploadDocs />,
    },
    {
        path: '/Admission/ADM_Education',
        element: <ADM_Education />,
    },
    {
        path: '/Tech/Tech_Education',
        element: <Tech_Education />,
    },
    {
        path: '/Admission/ADM_ElectiveSub',
        element: <ADM_ElectiveSub />,
    },
    {
        path: '/Admission/ADM_ChooseDept',
        element: <ADM_ChooseDept />,
    },
    {
        path: '/Tech/Tech_ChooseDept',
        element: <Tech_ChooseDept />,
    },
    {
        path: '/MBBS_Admission/MBBS_Home',
        element: <MBBS_Home />,
    },
    {
        path: '/MBBS_Admission/MBBS_APLForm',
        element: <MBBS_APLForm />,
    },
    {
        path: '/MBBS_Admission/MBBS_DocUpload',
        element: <MBBS_DocUpload />,
    },
    {
        path: '/Admission/EMP_Dashboard',
        element: <EMP_Dashboard />,
    },
    {
        path: '/Vendor/Vendor_Dashboard',
        element: <Vendor_Dashboard />,
    },
    {
        path: '/Vendor/Vendor_Active_NIT',
        element: <Vendor_Active_NIT />,
    },
    {
        path: '/Vendor/Vendor_Active_RFQ',
        element: <Vendor_Active_RFQ />,
    },
    {
        path: '/Vendor/Vendor_Apply_Tender',
        element: <Vendor_Apply_Tender />,
    },
    {
        path: '/Vendor/Vendor_Applied_Active_NIT',
        element: <Vendor_Applied_Active_NIT />,
    },
    {
        path: '/Vendor/Vendor_Applied_Tender_Detail',
        element: <Vendor_Applied_Tender_Detail />,
    },
    {
        path: '/Dashboard/Shared/Instructions',
        element: <Instructions />,
    },
    {
        path: '/Dashboard/Shared/MoreInfo',
        element: <MoreInfo />,
    },

    // ====================THEME PAGES START===================
    {
        path: '/material/table',
        element: <AppTable />,
    },
    {
        path: '/material/form',
        element: <AppForm />,
    },
    {
        path: '/material/buttons',
        element: <AppButton />,
    },
    {
        path: '/material/icons',
        element: <AppIcon />,
    },
    {
        path: '/material/progress',
        element: <AppProgress />,
    },
    {
        path: '/material/menu',
        element: <AppMenu />,
    },
    {
        path: '/material/checkbox',
        element: <AppCheckbox />,
    },
    {
        path: '/material/switch',
        element: <AppSwitch />,
    },
    {
        path: '/material/radio',
        element: <AppRadio />,
    },
    {
        path: '/material/slider',
        element: <AppSlider />,
    },
    {
        path: '/material/autocomplete',
        element: <AppAutoComplete />,
    },
    {
        path: '/material/expansion-panel',
        element: <AppExpansionPanel />,
    },
    {
        path: '/material/dialog',
        element: <AppDialog />,
    },
    {
        path: '/material/snackbar',
        element: <AppSnackbar />,
    },
    // ====================THEME PAGES END=====================
]

export default materialRoutes
