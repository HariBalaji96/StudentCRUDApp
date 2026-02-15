import React, { useState, useEffect } from "react";

export default function StudentForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", dob: "", department: "", batchYear: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        dob: initialData.dob ? initialData.dob.split("T")[0] : "",
        department: initialData.department || "",
        batchYear: initialData.batchYear || "",
      });
    } else {
      setForm({ name: "", dob: "", department: "", batchYear: "" });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Name is required");
    // optional: normalize empty strings to undefined to avoid overwriting with blanks
    const payload = { ...form };
    onSubmit(payload);
  };

  return (
    <form className="student-form" onSubmit={submit}>
      {initialData && (
        <label>
          Roll No
          <input value={initialData.rollNo} readOnly />
        </label>
      )}

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label>
        DOB
        <input name="dob" type="date" value={form.dob} onChange={handleChange} />
      </label>

      <label>
        Department
        <input name="department" value={form.department} onChange={handleChange} />
      </label>

      <label>
        Batch Year
        <input name="batchYear" value={form.batchYear} onChange={handleChange} />
      </label>

      {error && <div style={{ color: "#b91c1c", marginTop: 6 }}>{error}</div>}

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initialData ? "Update" : "Create"}
        </button>
        {initialData && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
