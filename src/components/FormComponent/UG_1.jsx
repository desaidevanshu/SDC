import React, { useState } from "react";

const UG1Form = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectUtility: '',
    description: '',
    receivedFinance: 'no',
    guideName: '',
    employeeCode: '',
    students: [{
      srNo: '1',
      branch: '',
      yearOfStudy: '',
      studentName: '',
      rollNumber: ''
    }]
  });

  const [files, setFiles] = useState({
    groupLeaderSignature: null,
    guideSignature: null,
    partsList: null
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (index, field, value) => {
    const newStudents = [...formData.students];
    newStudents[index][field] = value;
    setFormData(prev => ({ ...prev, students: newStudents }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (field === 'groupLeaderSignature' || field === 'guideSignature') {
      if (!file.type.startsWith("image/jpeg")) {
        setErrorMessage("Only JPEG format is allowed for signatures.");
        return;
      }
      setFiles(prev => ({ ...prev, [field]: file }));
    } else if (field === 'partsList') {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB.");
        return;
      }
      setFiles(prev => ({ ...prev, [field]: file }));
    }

    setErrorMessage("");
  };

  const addStudent = () => {
    const newSrNo = (formData.students.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, {
        srNo: newSrNo,
        branch: '',
        yearOfStudy: '',
        studentName: '',
        rollNumber: ''
      }]
    }));
  };

  const removeStudent = (index) => {
    if (formData.students.length > 1) {
      const newStudents = formData.students.filter((_, i) => i !== index)
        .map((student, i) => ({ ...student, srNo: (i + 1).toString() }));
      setFormData(prev => ({ ...prev, students: newStudents }));
    }
  };

  return (
    <div className="form-container max-w-4xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Under Graduate Form 1</h1>
      <p className="text-xl font-semibold mb-4 text-center text-gray-600">In-house Student Project within Department</p>
      
      <div className="mb-6">
        <label className="block font-semibold mb-2">Title of the Project:</label>
        <input
          type="text"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Utility of the Project:</label>
        <input
          type="text"
          name="projectUtility"
          value={formData.projectUtility}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded h-32"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Whether received finance from any other agency:</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="receivedFinance"
              value="yes"
              checked={formData.receivedFinance === 'yes'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="receivedFinance"
              value="no"
              checked={formData.receivedFinance === 'no'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Name of the Guide/Co-Guide:</label>
          <input
            type="text"
            name="guideName"
            value={formData.guideName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Employee Code:</label>
          <input
            type="text"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Student Details</h3>
        <table className="w-full mb-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Sr. No.</th>
              <th className="p-2 border border-gray-300">Branch</th>
              <th className="p-2 border border-gray-300">Year of Study</th>
              <th className="p-2 border border-gray-300">Student Name</th>
              <th className="p-2 border border-gray-300">Roll Number</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.students.map((student, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    value={student.srNo}
                    readOnly
                    className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    value={student.branch}
                    onChange={(e) => handleStudentChange(index, 'branch', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    value={student.yearOfStudy}
                    onChange={(e) => handleStudentChange(index, 'yearOfStudy', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    value={student.studentName}
                    onChange={(e) => handleStudentChange(index, 'studentName', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    value={student.rollNumber}
                    onChange={(e) => handleStudentChange(index, 'rollNumber', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeStudent(index)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addStudent}
        >
          ➕ Add Student
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Signature of Group Leader (JPEG Only)</label>
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/jpeg"
                onChange={(e) => handleFileUpload('groupLeaderSignature', e)}
              />
            </label>
            {files.groupLeaderSignature && (
              <span className="ml-2 text-sm">{files.groupLeaderSignature.name}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Signature of Guide (JPEG Only)</label>
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/jpeg"
                onChange={(e) => handleFileUpload('guideSignature', e)}
              />
            </label>
            {files.guideSignature && (
              <span className="ml-2 text-sm">{files.guideSignature.name}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload list of parts with price ( Max 5MB)</label>
        <div className="flex items-center">
          <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
            Choose File
            <input
              type="file"
              className="hidden"
              
              onChange={(e) => handleFileUpload('partsList', e)}
            />
          </label>
          {files.partsList && (
            <span className="ml-2 text-sm">{files.partsList.name}</span>
          )}
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

<div className="flex justify-between">
          <button className="back-btn bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Back
          </button>
          <button className="submit-btn bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Submit
          </button>
        </div>
    </div>
  );
};

export default UG1Form;