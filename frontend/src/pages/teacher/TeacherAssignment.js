import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [teacherId, setTeacherId] = useState('');

    // Getting teacher id from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Ensure user data is stored
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
            console.log(response.data); // Log response for debugging

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
        <div>
            <h2>Upload Assignment</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.jpg,.png" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    required 
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadAssignment;
