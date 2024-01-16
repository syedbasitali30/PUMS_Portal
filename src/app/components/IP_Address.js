const SetupIP = 'http://13.90.206.49/hims_bl/setup/'
const OPDIP = 'http://13.90.206.49/hims_bl/OPD/'
const OPTIP = 'http://13.90.206.49/hims_bl/OPT/'

const ReportIP = 'http://13.90.206.49/hims_bl/Reports/'
export default { SetupIP, OPDIP, OPTIP,ReportIP }

export const ExecuteSetupAPI =async (value) => {
    return await fetch(
        SetupIP + value.ApiName + '/' + value.functionName,

        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: value.body,
        }
    )
        .then((res) => res.json())
        // .then((response) => {
        //     console.log(response)            
        // })
        .then((response) => {
            console.log(response)      
            return response
        })
        .catch((error) => {
            console.log(error)
            return error
        })
        
}

export const GetSetupAPI = async (value) => {
    // alert('a')
    return await fetch(
        SetupIP + value.ApiName + '/' + value.functionName,

        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
        .then((res) => res.json())
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}


export const GetSetupAPI_BY_ID = async (value) => {
    // alert('a')
    return await fetch(
        SetupIP + value.ApiName + '/' + value.functionName,

        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: value.body,
        }
    )
        .then((res) => res.json())
        .then((response) => {
            return response
        })
        .catch((error) => console.log(error))
}


export const GetReportAPI = async (value) => {
    // alert('a')
    return await fetch(
        ReportIP + value.ApiName + '/' + value.functionName,

        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
        .then((res) => res.json())
        .then((response) => {
             
            return response
        })
        .catch((error) => console.log(error))
}

export const GetReportAPI_By_ID = async (value) => {
    // alert('a')
    return await fetch(
        ReportIP + value.ApiName + '/' + value.functionName,

        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: value.body,
        }
    )
        .then((res) => res.json())
        .then((response) => {
             
            return response
        })
        .catch((error) => console.log(error))
}