import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Gender, setGender] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [ParentName, setParentName] = useState('');
    const [Address, setAddress] = useState('');

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
        <br />
    <br />
    <br />
    <br /><br />
            <div className="register">
    <form className="registerForm" onSubmit={submitHandler}>
    <br />
    <br />
    <br />
    <br /><br />
    <br /><br />
    <br />

        <span className="registerTitle">Add Student</span>

        <label>Name</label>
        <input className="registerInput" type="text" placeholder="Enter student's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

        <label>Birthday</label>
        <input className="registerInput" type="date"
            value={Birthday}
            onChange={(event) => setBirthday(event.target.value)}
            required />

        <label>Gender</label>
        <div className="genderOptions flex gap-4">
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            name="gender"
            value="Male"
            checked={Gender === "Male"}
            onChange={(event) => setGender(event.target.value)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${Gender === "Male" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}></div>
        <span className="text-gray-700">Male</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            name="gender"
            value="Female"
            checked={Gender === "Female"}
            onChange={(event) => setGender(event.target.value)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${Gender === "Female" ? "bg-pink-500 border-pink-500" : "border-gray-400"}`}></div>
        <span className="text-gray-700">Female</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            name="gender"
            value="Other"
            checked={Gender === "Other"}
            onChange={(event) => setGender(event.target.value)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${Gender === "Other" ? "bg-green-500 border-green-500" : "border-gray-400"}`}></div>
        <span className="text-gray-700">Other</span>
    </label>
</div>


        <label>Phone</label>
        <input className="registerInput" type="tel" placeholder="Enter student's phone..."
            value={Phone}
            onChange={(event) => setPhone(event.target.value)}
            required />

        <label>Address</label>
        <input className="registerInput" type="text" placeholder="Enter student's Address..."
            value={Address}
            onChange={(event) => setAddress(event.target.value)}
            required />

        <label>Email</label>
        <input className="registerInput" type="email" placeholder="Enter student's email..."
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
            required />

        <label>Parent Name</label>
        <input className="registerInput" type="text" placeholder="Enter parent's name..."
            value={ParentName}
            onChange={(event) => setParentName(event.target.value)}
            required />

{
                        situation === "Student" &&
                        <>
                            <label>Class</label>
                            <select
                                className="registerInput"
                                value={className}
                                onChange={changeHandler} required>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    }

                    <label>Student num</label>
                    <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required />

                    <label>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password" required />

                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Add'
                        )}
                    </button>
    </form>
</div>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent

