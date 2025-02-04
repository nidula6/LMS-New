
import { useState } from 'react';
import axios from 'axios';

const UploadAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
       // formData.append('teacherId', 'teacher123'); // Replace with actual teacher ID from authentication

        try {
            await axios.post('http://localhost:5000/api/assignments/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Assignment uploaded successfully!');
        } catch (error) {
            console.error('Error uploading assignment:', error);
        }
    };

    return (
        <div>
            <h2>Upload Assignment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadAssignment;






