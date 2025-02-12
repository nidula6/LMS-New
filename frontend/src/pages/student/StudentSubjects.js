import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import { Box,Button} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { useNavigate } from 'react-router-dom';

const StudentSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) { //changed subjectMarks === []
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                
                
<div className="p-6 bg-white shadow-lg rounded-2xl max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Class Details</h2>
      <Button
          onClick={() => navigate("/Student/subjects/assignment")}
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          View Assignments
        </Button>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">You are currently in Class {sclassDetails?.sclassName}</h3>
      <h4 className="text-lg font-medium mb-2 text-gray-700">And these are the subjects:</h4>
      <ul className="list-disc pl-6 text-gray-700">
        {subjectsList?.map((subject, index) => (
          <li key={index} className="py-1">
            {subject.subName} ({subject.subCode})
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold text-center mt-6 mb-4 text-gray-700">Subject Marks</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjectMarks.map((result, index) => (
              result.subName && result.marksObtained ? (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3 text-gray-700">{result.subName.subName}</td>
                  <td className="p-3 text-gray-700">{result.marksObtained}</td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
            </Container>
        );
    };
    const renderTableSection = () => {
        return (
            <>
                <div className="p-6 bg-white shadow-lg rounded-2xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Subject Marks</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjectMarks.map((result, index) => (
              result.subName && result.marksObtained ? (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3 text-gray-700">{result.subName.subName}</td>
                  <td className="p-3 text-gray-700">{result.marksObtained}</td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };


    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <>
                            {renderClassDetailsSection()}
                        {<br />}
                        {<br />}
                        {<br />}
                            
                            {selectedSection === 'chart' && renderChartSection()}
                            {<br />}
                            {<br />}
                            {<br />}
                            {<br />}
                            {<br />}
                            {<br />}
                            {<br />}
                            {<br />}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                        
                        
                    
                </div>
            )}
        </>
    );
};

export default StudentSubjects;