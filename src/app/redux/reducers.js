import {
    AUTHLOGIN,
    AUTHLOGINVENDOR,
    AUTHLOGINEMP,
    AUTHLOGIN_FN_MBBS,
    CHECKUSERAPL,
    SAVESESSION,
    STAGE_02,
    UNI_INFO,
    LOADPROGRESS,
    LOADERROR,
} from './action'

const loggedUser = {
    data: [],
}

export const loginReducer = (state = loggedUser, action) => {
    switch (action.type) {
        case AUTHLOGIN:
            return { ...state, LoginData: action.payload }
        case AUTHLOGINVENDOR:
            return { ...state, VendorData: action.payload }
        case AUTHLOGINEMP:
            return { ...state, EmpData: action.payload }
        case AUTHLOGIN_FN_MBBS:
            return { ...state, FN_MBBS_Data: action.payload }
        case CHECKUSERAPL:
            return { ...state, APLdata: action.payload }
        default:
            return state
    }
}

export const userDataReducer = (state = loggedUser, action) => {
    switch (action.type) {
        case SAVESESSION:
            return { ...state, SessionData: action.payload }
        default:
            return state
    }
}

export const focusReducer = (state = loggedUser, action) => {
    switch (action.type) {
        case LOADPROGRESS:
            return { ...state, Progress: action.payload }
        case LOADERROR:
            return { ...state, Error: action.payload }
        default:
            return state
    }
}

export const uniInfoReducer = (state = loggedUser, action) => {
    switch (action.type) {
        case UNI_INFO:
            return { ...state, InfoData: action.payload }
        default:
            return state
    }
}

export const stageReducer = (state = loggedUser, action) => {
    switch (action.type) {
        case STAGE_02:
            return { ...state, stageData: action.payload }
        default:
            return state
    }
}
