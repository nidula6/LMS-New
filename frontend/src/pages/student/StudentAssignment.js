import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentAssignment = () => {
    const [assignments, setAssignments] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [studentId, setStudentId] = useState('');

    // Inline Styles
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

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/assignments');
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    // Getting student id from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Ensure user data is stored
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData && userData._id) {
                setStudentId(userData._id);
            } else {
                console.error('Student ID not found in user data');
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!studentId) {
            alert('Student ID not found. Please log in.');
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
        formData.append('studentId', studentId);

        try {
            const response = await axios.post('http://localhost:5000/assignments/supload', formData, {
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

    return (
        <div style={containerStyle}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Assignments</h2>
      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center">No assignments available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Teacher</th>
                <th className="p-3 text-left">Upload Date</th>
                <th className="p-3 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3 text-gray-700 font-medium">{assignment.title}</td>
                  <td className="p-3 text-gray-600">
                    {assignment.description || "No description"}
                  </td>
                  <td className="p-3 text-gray-700">{assignment.teacherId?.name || "Unknown"}</td>
                  <td className="p-3 text-gray-600">{new Date(assignment.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    {assignment.fileUrl ? (
                      <a
                        href={`http://localhost:5000${assignment.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center gap-1"
                      >
                        📂 View
                      </a>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
            )}
            <br />
            <h2 style={headingStyle}>Upload Assignment Answers</h2>
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
        </div>
    );
};

export default StudentAssignment;

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentPayments = () => {
//     const [payments, setPayments] = useState([]);

//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [file, setFile] = useState(null);
//     const [studentId, setStudentId] = useState('');

//     // Inline Styles
//     const containerStyle = {
//         margin: '20px',
//         fontFamily: 'Arial, sans-serif',
//         color: '#333'
//     };

//     const headingStyle = {
//         textAlign: 'center',
//         color: '#333',
//         fontWeight: 'bold' // Adds bold styling
//     };
    

//     const tableStyle = {
//         width: '100%',
//         marginTop: '30px',
//         borderCollapse: 'collapse',
//         textAlign: 'left',
//         fontSize: '14px'
//     };

//     const thStyle = {
//         padding: '12px 15px',
//         border: '1px solid #ddd',
//         backgroundColor: '#f2f2f2',
//         textAlign: 'center'
//     };

//     const tdStyle = {
//         padding: '12px 15px',
//         border: '1px solid #ddd',
//         textAlign: 'center'
//     };

//     const trEvenStyle = {
//         backgroundColor: '#f9f9f9'
//     };

//     const trHoverStyle = {
//         backgroundColor: '#f1f1f1'
//     };

//     const linkStyle = {
//         textDecoration: 'none',
//         color: 'blue',
//         fontWeight: 'bold'
//     };

//     const linkHoverStyle = {
//         textDecoration: 'underline'
//     };

//     const formStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '15px',
//         maxWidth: '600px',
//         margin: '0 auto',
//         padding: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         backgroundColor: '#f9f9f9'
//     };

//     const inputStyle = {
//         width: '100%',
//         padding: '10px',
//         borderRadius: '5px',
//         border: '1px solid #ddd',
//         fontSize: '16px',
//         marginBottom: '10px'
//     };

//     const buttonStyle = {
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         padding: '12px 20px',
//         border: 'none',
//         borderRadius: '5px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s'
//     };

//     const buttonHoverStyle = {
//         backgroundColor: '#45a049'
//     };

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/payments');
//                 setPayments(response.data);
//             } catch (error) {
//                 console.error('Error fetching assignments:', error);
//             }
//         };

//         fetchPayments();
//     }, []);

//     // Getting student id from localStorage
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user'); // Ensure user data is stored
//         if (storedUser) {
//             const userData = JSON.parse(storedUser);
//             if (userData && userData._id) {
//                 setStudentId(userData._id);
//             } else {
//                 console.error('Student ID not found in user data');
//             }
//         } else {
//             console.error('No user data found in localStorage');
//         }
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!studentId) {
//             alert('Student ID not found. Please log in.');
//             return;
//         }

//         if (!file) {
//             alert('Please select a file to upload.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('file', file);
//         formData.append('studentId', studentId);

//         try {
//             const response = await axios.post('http://localhost:5000/assignments/supload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             alert('Assignment uploaded successfully!');
//             console.log(response.data);

//             // Clear form after submission
//             setTitle('');
//             setDescription('');
//             setFile(null);
//         } catch (error) {
//             console.error('Error uploading assignment:', error.response?.data || error.message);
//             alert('Error uploading assignment.');
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Assignments</h2>
//       {payments.length === 0 ? (
//         <p className="text-gray-500 text-center">No assignments available</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Description</th>
//                 <th className="p-3 text-left">Teacher</th>
//                 <th className="p-3 text-left">Upload Date</th>
//                 <th className="p-3 text-left">Download</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payments) => (
//                 <tr key={payments._id} className="border-b border-gray-200 hover:bg-gray-100">
//                   <td className="p-3 text-gray-700 font-medium">{payments.title}</td>
//                   <td className="p-3 text-gray-600">
//                     {payments.description || "No description"}
//                   </td>
//                   <td className="p-3 text-gray-700">{payments.teacherId?.name || "Unknown"}</td>
//                   <td className="p-3 text-gray-600">{new Date(payments.createdAt).toLocaleDateString()}</td>
//                   <td className="p-3">
//                     {payments.fileUrl ? (
//                       <a
//                         href={`http://localhost:5000${payments.fileUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:underline flex items-center gap-1"
//                       >
//                         📂 View
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">No file</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
      
//             )}
//             <br />
//             <h2 style={headingStyle}>Upload Assignment Answers</h2>
//             <form onSubmit={handleSubmit} style={formStyle}>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     style={inputStyle}
//                 />
//                 <textarea
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     style={inputStyle}
//                 />
//                 <input
//                     type="file"
//                     accept=".pdf,.doc,.docx,.jpg,.png"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     required
//                     style={inputStyle}
//                 />
//                 <button type="submit" style={buttonStyle}>Upload</button>
//             </form>
//         </div>
//     );
// };

// export default StudentPayments;

