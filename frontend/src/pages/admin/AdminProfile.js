import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'; // ✅ Keep only this
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse } from '@mui/material';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Fixed: Only one `useSelector` call
    const { currentUser, response, error } = useSelector((state) => state.user);

    const address = "Admin";

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
    };

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
           
            <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section><section className="relative py-16 bg-gray-300">
  <div className="container mx-auto px-4">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
        <div className="text-center mt-12">
        <h3 className="text-4xl font-italic leading-normal mb-2 text-gray-800">
            Hi,
          </h3>
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
            {currentUser.name}
          </h3>
        </div>

        {/* Card Table */}
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-left">Details</th>
                  <th className="px-6 py-3 text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                

                {/* Student Number */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">Admin School:</td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.schoolName}</td>
                </tr>

                {/* Address */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                      Email:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.email}</td>
                </tr>

                {/* Birthdate */}
                <tr className="border-b">
                <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
                </tr>

               
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

      </main>
           
            
            
        </div>
    );
};

export default AdminProfile;

const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
};
