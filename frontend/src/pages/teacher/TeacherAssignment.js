import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [teacherId, setTeacherId] = useState('');

    const [assignments, setAssignments] = useState([]);

    const [payments, setPayments] = useState([]);


    // Styles
    const containerStyle = {
        margin: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold' // Adds bold styling
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        marginBottom: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049'
    };

    const tableStyle = {
        width: '100%',
        marginTop: '30px',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '14px'
    };

    const thStyle = {
        padding: '12px 15px',
        border: '1px solid #ddd',
        backgroundColor: '#f2f2f2',
        textAlign: 'center'
    };

    const tdStyle = {
        padding: '12px 15px',
        border: '1px solid #ddd',
        textAlign: 'center'
    };

    const trEvenStyle = {
        backgroundColor: '#f9f9f9'
    };

    const trHoverStyle = {
        backgroundColor: '#f1f1f1'
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'blue',
        fontWeight: 'bold'
    };

    const linkHoverStyle = {
        textDecoration: 'underline'
    };

    // Getting teacher id from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData && userData._id) {
                setTeacherId(userData._id);
            } else {
                console.error('Teacher ID not found in user data');
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teacherId) {
            alert('Teacher ID not found. Please log in.');
            return;
        }

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('teacherId', teacherId);

        try {
            const response = await axios.post('http://localhost:5000/assignments/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Assignment uploaded successfully!');
            console.log(response.data);

            // Clear form after submission
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading assignment:', error.response?.data || error.message);
            alert('Error uploading assignment.');
        }
    };

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/studentassignments');
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Upload Assignment</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={inputStyle}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Upload</button>
            </form>

            <br />

            {/* Get student assignment answers */}
            <div className="p-6 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Student Assignment Answers
      </h2>

      {/* No Assignments Message */}
      {assignments.length === 0 ? (
        <p className="text-gray-600 text-center">No assignments available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-50 shadow-md rounded-lg overflow-hidden">
            {/* Table Header */}
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Upload Date</th>
                <th className="p-3 text-left">Download</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {assignments.map((assignment, index) => (
                <tr
                  key={assignment._id}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-gray-800">{assignment.title}</td>
                  <td className="p-3 text-gray-600">
                    {assignment.description || "No description"}
                  </td>
                  <td className="p-3 text-gray-800">
                    {assignment.studentId?.name || "Unknown"}
                  </td>
                  <td className="p-3 text-gray-700">
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {assignment.fileUrl ? (
                      <a
                        href={`http://localhost:5000${assignment.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-semibold hover:underline"
                      >
                        📂 View
                      </a>
                    ) : (
                      <span className="text-gray-500">No file</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
            )}
        </div>
        
        </div>
    );
};

export default UploadAssignment;
