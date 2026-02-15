import React from "react";

export default function StudentList({ students = [], onEdit, onDelete }) {
  if (!students.length)
    return (
      <div>
        <div style={{ marginBottom: 8, color: "#6b7280" }}>No students found.</div>
      </div>
    );

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Roll No</th>
          <th>Name</th>
          <th>DOB</th>
          <th>Department</th>
          <th>Batch</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.rollNo}>
            <td>{s.rollNo}</td>
            <td>{s.name}</td>
            <td>{s.dob ? s.dob.split("T")[0] : ""}</td>
            <td>{s.department}</td>
            <td>{s.batchYear}</td>
            <td>
              <button onClick={() => onEdit(s)} className="btn small">
                Edit
              </button>
              <button onClick={() => onDelete(s.rollNo)} className="btn small danger">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
