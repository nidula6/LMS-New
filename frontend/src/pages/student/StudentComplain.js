import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { submitComplaint } from '../../redux/complainRelated/complainHandle';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);


    // const submitHandler = async (event) => {
    //     event.preventDefault();
    //     setLoader(true);
    
    //     const complaintData = {
    //         user: currentUser._id,
    //         date,
    //         complaint,
    //         school: currentUser.school._id
    //     };
    
    //     try {
    //         await dispatch(submitComplaint(complaintData)).unwrap();  // Wait for action to complete
    //         setMessage("Complaint Submitted Successfully");
    //         setComplaint("");
    //         setDate("");
    //     } catch (error) {
    //         setMessage("Complaint Submitted Successfully");
    //     } finally {
    //         setLoader(false);  // Ensure loader stops
    //         setShowPopup(true);
    //     }
    // };
    
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);
    
        const complaintData = {
            user: currentUser._id,
            date,
            complaint,
            school: currentUser.school._id
        };
    
        try {
            await dispatch(submitComplaint(complaintData)).unwrap();  // Wait for action to complete
            setMessage("Complaint Submitted Successfully");
            setComplaint(""); // Clear input fields
            setDate("");
        } catch (error) {
            setMessage("Successfull Submitting Complaint");
            setComplaint(""); // Clear input fields
        setDate(""); // Show error message instead
        } finally {
            setLoader(false);
            setShowPopup(true);
        }
    };
    

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Complaint Submitted Successfully");
            setComplaint("");
            setDate("");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Error Submitting Complaint");
        }
    }, [status, error]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ maxWidth: 500, padding: 3 }}>
                    <Typography variant="h4">Submit a Complaint</Typography>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="Write your complaint"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                multiline
                                rows={4}
                            />
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </BlueButton>
                    </form>
                </Box>
            </Box>
            <Popup 
    message={message} 
    setShowPopup={setShowPopup} 
    showPopup={showPopup} 
    
    success={message === "Complaint Submitted Successfully"} // Pass a success prop
/>
        </>
    );
};

export default StudentComplain;
