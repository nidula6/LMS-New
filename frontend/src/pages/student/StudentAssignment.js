import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentAssignment = () => {
    const [assignments, setAssignments] = useState([]);

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

    return (
        <div>
            <h2>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments available</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Teacher</th>
                            <th>Upload Date</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment._id}>
                                <td>{assignment.title}</td>
                                <td>{assignment.description || 'No description'}</td>
                                <td>{assignment.teacherId?.name || 'Unknown'}</td>
                                <td>{new Date(assignment.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {assignment.fileUrl ? (
                                        <a 
                                            href={`http://localhost:5000${assignment.fileUrl}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: 'blue' }}
                                        >
                                            📂 View
                                        </a>
                                    ) : (
                                        'No file'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentAssignment;
