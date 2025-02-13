import { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [assignments, setpayment] = useState([]);

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

    // useEffect(() => {
    //     const fetchAssignments = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/assignments');
    //             setAssignments(response.data);
    //         } catch (error) {
    //             console.error('Error fetching assignments:', error);
    //         }
    //     };

    //     fetchAssignments();
    // }, []);

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
            const response = await axios.post('http://localhost:5000/payment/spayment', formData, {
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
           
      
            
            <br />
            <h2 style={headingStyle}>Upload Payment Slip</h2>
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

export default Payment;
