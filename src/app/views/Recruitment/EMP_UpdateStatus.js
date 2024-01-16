import ip from '../DB/IP_Address'
import { authLoginEmp } from 'app/redux/action'

// export const UpdateEmpInfo = async (value) => {
//     //
//     const dispatch = useDispatch()
//     //
//     return await fetch(
//         ip.Address + 'erec.asmx/REC_LOGIN_BY_ID',

//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: 'systemID=' + value,
//         }
//     )
//         .then((res) => res.json())
//         .then((response) => {
//             const authData = response[0]
//             console.log(authData)
//             alert(authData)
//             //
//             dispatch(authLoginEmp(authData))
//             localStorage.setItem('authDataEmp', JSON.stringify(authData))
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }

export const UpdateEmpInfo = (value) => async (dispatch) => {
    try {
        const fetchProductDetails = await fetch(
            ip.Address + 'erec.asmx/REC_LOGIN_BY_ID',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'systemID=' + value,
            }
        )
        const DetailsData = await fetchProductDetails.json()
        const authData = DetailsData[0]
        //
        dispatch(authLoginEmp(authData))
        localStorage.setItem('authDataEmp', JSON.stringify(authData))
    } catch (err) {
        console.log(err + '**API Error productDetails')
    }
}
