import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reminder {
  id: number;
  time: string;
  activity: string;
  recurrence: string;
  status: boolean;
  userId: number;
}

const ReminderPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [form, setForm] = useState({
    time: "",
    activity: "",
    recurrence: "daily",
    status: true,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const fetchReminders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reminders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReminders(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch reminders.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update reminder
        await axios.put(`http://localhost:5000/api/reminders/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessage("Reminder updated successfully.");
      } else {
        // Create reminder
        await axios.post("http://localhost:5000/api/reminders", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessage("Reminder created successfully.");
      }
      setForm({
        time: "",
        activity: "",
        recurrence: "daily",
        status: true,
      });
      setEditId(null);
      fetchReminders();
    } catch (err) {
      console.error(err);
      setMessage("Failed to save reminder.");
    }
  };

  const handleEdit = (reminder: Reminder) => {
    setForm({
      time: reminder.time,
      activity: reminder.activity,
      recurrence: reminder.recurrence,
      status: reminder.status,
    });
    setEditId(reminder.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Reminder deleted successfully.");
      fetchReminders();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete reminder.");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 40 }}>
      <h2>Reminders</h2>
      {message && <p style={{ color: "crimson" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Time:</label>
          <br />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Activity:</label>
          <br />
          <input
            type="text"
            value={form.activity}
            onChange={(e) => setForm({ ...form, activity: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Recurrence:</label>
          <br />
          <select
            value={form.recurrence}
            onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <br />
          <select
            value={form.status ? "true" : "false"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value === "true" })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: 10 }}>
          {editId ? "Update Reminder" : "Create Reminder"}
        </button>
      </form>
      <h3>Existing Reminders</h3>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <p>
              <strong>Time:</strong> {reminder.time} <br />
              <strong>Activity:</strong> {reminder.activity} <br />
              <strong>Recurrence:</strong> {reminder.recurrence} <br />
              <strong>Status:</strong> {reminder.status ? "Active" : "Inactive"}
            </p>
            <button onClick={() => handleEdit(reminder)}>Edit</button>
            <button onClick={() => handleDelete(reminder.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderPage;