import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherId, setTeacherId] = useState("");
  const [experience, setExperience] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  // const fields = { name, email, password, role, school, teachSubject, teachSclass }
  const fields = { 
    name, email, password, role, school, 
    teachSubject, teachSclass, teacherId, 
    experience, qualifications, contact, gender 
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
      <div className="register">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="text-2xl font-bold text-center text-gray-800 mb-4">Add Teacher</span>
          <br />
          <label>
            Subject : {subjectDetails && subjectDetails.subName}
          </label>
          <label className="text-gray-700" >
            Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </label>
          <label>Name</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Teacher ID</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter teacher's ID..."
            value={teacherId}
            onChange={(event) => setTeacherId(event.target.value)}
            autoComplete="teacherId" required />

          <label>Experiences</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter teacher's Experiences..."
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            autoComplete="Experiences" required />

          <label>Qualifications</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter teacher's Qualifications..."
            value={qualifications}
            onChange={(event) => setQualifications(event.target.value)}
            autoComplete="Qualifications" required />

          <label>Contact</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter teacher's Contact..."
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            autoComplete="Contact" required />
<label className="flex items-center gap-2 cursor-pointer">Gender :</label>
<label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(event) => setGender(event.target.value)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${gender === "Female" ? "bg-pink-500 border-pink-500" : "border-gray-400"}`}></div>
        <span className="text-gray-700">Female</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(event) => setGender(event.target.value)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${gender === "Male" ? "bg-green-500 border-green-500" : "border-gray-400"}`}></div>
        <span className="text-gray-700">Male</span>
    </label>


          <label>Password</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher