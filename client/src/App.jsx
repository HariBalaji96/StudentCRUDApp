import "./App.css";
import { useEffect, useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import api from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/");
      setStudents(res.data || []);
      setMessage("");
    } catch (err) {
      console.error("Failed to load students", err);
      setMessage("Failed to load students");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("/", data);
      setMessage("Student created");
      await load();
    } catch (err) {
      console.error(err);
      setMessage("Create failed");
    }
  };

  const handleUpdate = async (rollNo, data) => {
    try {
      await api.put(`/${rollNo}`, data);
      setEditing(null);
      setMessage("Student updated");
      await load();
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  const handleDelete = async (rollNo) => {
    if (!confirm("Delete this student?")) return;
    try {
      await api.delete(`/${rollNo}`);
      setMessage("Student deleted");
      await load();
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student CRUD</h1>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>{editing ? "Edit Student" : "Add Student"}</h2>
          {message && <div style={{ marginBottom: 8 }}>{message}</div>}
          <StudentForm
            key={editing ? editing.rollNo : "new"}
            initialData={editing}
            onSubmit={editing ? (data) => handleUpdate(editing.rollNo, data) : handleCreate}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="list-section">
          <h2>Students</h2>
          <StudentList
            students={students}
            onEdit={(s) => setEditing(s)}
            onDelete={(rollNo) => handleDelete(rollNo)}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
