// import axios from 'axios';
// import {
//     getRequest,
//     getSuccess,
//     getFailed,
//     getError,
//     postDone,
//     doneSuccess
// } from './paymentSlice';

// export const getAllPayment = (id) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         console.log("Base URL:", process.env.REACT_APP_BASE_URL);
        
//         const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Payment/${id}`);

//         if (result.status !== 200) {
//             dispatch(getFailed(result.data.message || "Unexpected error"));
//         } else {
//             dispatch(getSuccess(result.data));
//         }
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || error.message || "Unknown error";
//         console.error("API Error:", errorMessage);
//         dispatch(getError(errorMessage));
//     }
// };
