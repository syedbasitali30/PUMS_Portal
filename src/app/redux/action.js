export const AUTHLOGIN = 'AUTHLOGIN'
export const AUTHLOGINVENDOR = 'AUTHLOGINVENDOR'
export const AUTHLOGINEMP = 'AUTHLOGINEMP'
export const AUTHLOGIN_FN_MBBS = 'AUTHLOGIN_FN_MBBS'
export const CHECKUSERAPL = 'CHECKUSERAPL'
export const SAVESESSION = 'SAVESESSION'
export const LOADPROGRESS = 'LOADPROGRESS'
export const LOADERROR = 'LOADERROR'
export const STAGE_02 = 'STAGE_02'
export const UNI_INFO = 'UNI_INFO'
//

export const authLogin = (response) => ({
    type: AUTHLOGIN,
    payload: response,
})

export const authLoginVendor = (response) => ({
    type: AUTHLOGINVENDOR,
    payload: response,
})

export const authLoginEmp = (response) => ({
    type: AUTHLOGINEMP,
    payload: response,
})

export const authLoginFN_MBBS = (response) => ({
    type: AUTHLOGIN_FN_MBBS,
    payload: response,
})

export const checkUserAPL = (response) => ({
    type: CHECKUSERAPL,
    payload: response,
})

export const saveSession = (response) => ({
    type: SAVESESSION,
    payload: response,
})

export const loadProgress = (response) => ({
    type: LOADPROGRESS,
    payload: response,
})

export const loadError = (response) => ({
    type: LOADERROR,
    payload: response,
})

export const uniInfo = (response) => ({
    type: UNI_INFO,
    payload: response,
})

export const stage_02 = (response) => ({
    type: STAGE_02,
    payload: response,
})
