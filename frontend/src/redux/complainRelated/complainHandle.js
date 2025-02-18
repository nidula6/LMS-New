import axios from 'axios';
import { getRequest, getSuccess, getError } from './complainSlice';

export const getAllComplains = (schoolId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/complaints/${schoolId}`);
    dispatch(getSuccess(response.data));
  } catch (error) {
    // Extract only the message to store in state
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(getError(errorMessage)); // Dispatch only the string error message
  }
};

export const submitComplaint = (complaintData) => async (dispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/complaints`, complaintData);
    dispatch(getAllComplains(complaintData.school));
  } catch (error) {
    // Extract error message from AxiosError and dispatch it
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(getError(errorMessage)); // Dispatch the error message only
  }
};


export const deleteComplain = (complainId) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/complaints/${complainId}`); // Adjust URL if needed
        dispatch({ type: 'DELETE_COMPLAIN', payload: complainId });
    } catch (error) {
        console.error("Error deleting complain:", error);
        dispatch({ type: 'COMPLAIN_ERROR', payload: error });
    }
};
