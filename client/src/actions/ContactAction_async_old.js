import { CREATE_NEW_CONTACT } from './types/';
import axios from "axios"


export const createContactAsync = (contact) => {

    return async (dispatch) => {
        try {
            const response = await signup(contact)
            dispatch({
                type: CREATE_NEW_CONTACT,
                contact: response.data
            });
            return response;
        } catch (error) {
            //console.log("Server Error ", error)
            dispatch({
                type: CREATE_NEW_CONTACT,
                contact: error
            });
        }
    }


};

//export const HOST_NAME = `http://127.0.0.1:8800/api/users/login`;
export const HOST_NAME=`http://api.open-notify.org/astros.json`


export const createContact = function (params) {
	let address_data = {
		type: CREATE_NEW_CONTACT,
		contact: new Promise((resolve, reject) => {
			signup(params).then((response) => {
				resolve(response);
				return response.data
			}).catch((err) => {
				reject(err.message);
			})
		})
	}
	return address_data;
}


const signup = async function (params) {

    let { email, password } = params
    let postData = `password=${password}&email=${email}`
    let response = await axios.get(`${HOST_NAME}`, postData);
    return response;

}
