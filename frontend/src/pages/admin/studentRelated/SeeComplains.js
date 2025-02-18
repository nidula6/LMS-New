import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import { IconButton } from '@mui/material'; // Import IconButton
import SpeedDialTemplate from '../../../components/SpeedDialTemplate'; // Adjust path if needed
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComplain } from '../../../redux/complainRelated/complainHandle'; // Adjust path as needed

import { deleteUser } from '../../../redux/userRelated/userHandle';
const SeeComplains = () => {

  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  const deleteHandler = (deleteID) => {
    dispatch(deleteComplain(deleteID)) // Call the correct delete action for complaints
        .then(() => {
            dispatch(getAllComplains(currentUser._id, "complaints"));
        })
        .catch((err) => console.error("Error deleting complaint:", err));  // Handle any errors
}


  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.log(error);
  }
  const actions = [
    { icon: <DeleteIcon />, name: 'Delete', action: () => console.log("Delete clicked") },
  ];
  
  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    // Safely access complain.user._id and complain.user.name
    const userName = complain?.user?.name || "Unknown User";
    const complaintText = complain?.complaint || "No Complaint Provided";
    const date = new Date(complain?.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";

    return {
      user: userName,
      complaint: complaintText,
      date: dateString,
      id: complain?._id || "N/A",  // Ensure complain._id exists
    };
  });
  
  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
         <IconButton onClick={() => deleteHandler(row.id, "Complain")}> 
            <DeleteIcon color="error" />
         </IconButton>
      </>
    );
};

  
  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complaints Right Now
            </Box>
            :
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                          {Array.isArray(complainsList) && complainsList.length > 0 && (
  <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
)}


                            <SpeedDialTemplate actions={actions} />
                        </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;
