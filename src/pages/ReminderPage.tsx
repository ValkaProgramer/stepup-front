import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Toggle from "@/components/Toggle";
import { CirclePlus } from "lucide-react";

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
  const [selectedReminderId, setSelectedReminderId] = useState<number | null>(
    null
  );
  const [form, setForm] = useState({
    time: "",
    day: "",
    activity: "",
    recurrence: "daily",
    status: true,
  });
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

    const time = form.day ? `${form.day} ${form.time}` : form.time;

    try {
      await axios.post(
        "http://localhost:5000/api/reminders",
        { ...form, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Reminder created successfully!");

      setForm({
        time: "",
        day: "",
        activity: "",
        recurrence: "daily",
        status: true,
      });
    
      fetchReminders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create reminder.");
    }
  };

  const handleSelectReminder = (id: number | null) => {
    setSelectedReminderId(id === selectedReminderId ? null : id); // Toggle selection
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reminders/${id}`,
        { status: currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchReminders();
      toast.info("Reminder switched!");
    } catch (err) {
      console.error(err);
      toast.error("Reminder hasn't switched!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("You have successfully deleted the reminder!");
      fetchReminders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete reminder.");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="text-black" style={{ margin: "auto", paddingTop: 40 }}>
      {message && <p style={{ color: "crimson" }}>{message}</p>}
      <ul
        className="flex flex-col align-middle w-[50vw]"
        style={{ listStyleType: "none", padding: 0 }}
      >
        {/* "New Reminder" */}
        <li
          className="shadow-md"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            transition: "background-color 1s ease",
            marginBottom: "-5px",
            backgroundColor: selectedReminderId === 0 ? "#ff0088" : "white",
            width: "50vw",
            borderRadius: "8px",
          }}
        >
          <div
            className="p-2.5 cursor-pointer flex justify-between"
            onClick={() => handleSelectReminder(0)}
          >
            <strong className="flex" onClick={() => handleSelectReminder(0)}>
              New Reminder
            </strong>
            <CirclePlus className="flex"></CirclePlus>
          </div>
        </li>

        <div
          className={`shadow-md mb-[10px] rounded-b-2xl bg-[#E7E3E3] reminder-content ${
            selectedReminderId === 0 ? "expanded" : "collapsed"
          }`}
        >
          <form
            className="pt-[10px]"
            onSubmit={handleSubmit}
            style={{ marginTop: "10px" }}
          >
            <div className="grid grid-cols-2 gap-4">
              {form.recurrence === "weekly" && (
                <>
                  <div className="pl-5 flex items-center">
                    <label>Day:</label>
                  </div>
                  <div className="pl-5 flex items-center">
                    <select
                      className="bg-[#F6F6F6] p-2 rounded-[8px]"
                      value={form.day}
                      onChange={(e) =>
                        setForm({ ...form, day: e.target.value })
                      }
                    >
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                      <option value="Sat">Saturday</option>
                      <option value="Sun">Sunday</option>
                    </select>
                  </div>
                </>
              )}
              <div className="pl-5 flex items-center">
                <label>Time:</label>
              </div>
              <div className="pl-5 flex items-center">
                <input
                  className="bg-[#F6F6F6] p-2 rounded-[8px]"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
              <div className="pl-5 flex items-center">
                <label>Activity:</label>
              </div>

              <div className="pl-5 flex items-center">
                <input
                  className="bg-[#F6F6F6] p-2 rounded-[8px]"
                  type="text"
                  value={form.activity}
                  onChange={(e) =>
                    setForm({ ...form, activity: e.target.value })
                  }
                  required
                />
              </div>
              <div className="pl-5 flex items-center">
                <label>Recurrence:</label>
              </div>
              <div className="pl-5 flex items-center">
                <select
                  className="bg-[#F6F6F6] p-2 rounded-[8px]"
                  value={form.recurrence}
                  onChange={(e) =>
                    setForm({ ...form, recurrence: e.target.value })
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="pl-5 flex items-center">
                <label>Status:</label>
              </div>
              <div className="pl-5 flex items-center">
                <select
                  className="bg-[#F6F6F6] p-2 rounded-[8px]"
                  value={form.status ? "true" : "false"}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value === "true" })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <button
              className="cursor-pointer mt-4 mb-4 rounded-[100px] bg-[#FFDF2B]"
              type="submit"
            >
              Create Reminder
            </button>
          </form>
        </div>

        {/* Existing Reminders */}
        {reminders.map((reminder) => (
          <React.Fragment key={reminder.id}>
            <li
              className="shadow-md"
              key={reminder.id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "-5px",
                backgroundColor: reminder.status ? "yellow" : "gray",
                transition: "background-color 1s ease",
                borderRadius: "8px",
              }}
            >
              <div
                onClick={() => handleSelectReminder(reminder.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  className="flex flex-col items-left"
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <strong className="text-left">{reminder.activity}</strong>
                  <p
                    className="text-left"
                    style={{ margin: 0, fontSize: "0.9em" }}
                  >
                    {reminder.time}
                  </p>
                </div>

                <Toggle
                  checked={reminder.status}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(checked: boolean): void => {
                    handleToggleStatus(reminder.id, checked);
                  }}
                ></Toggle>
              </div>
            </li>

            <div
              className={`shadow-md mb-[10px] rounded-b-2xl bg-[#E7E3E3] reminder-content ${
                selectedReminderId === reminder.id ? "expanded" : "collapsed"
              }`}
            >
              <div className="pt-[10px]" style={{ marginTop: "10px" }}>
                <p>
                  <strong>Recurrence:</strong> {reminder.recurrence}
                </p>
                <button
                  className="cursor-pointer mb-4 mt-4 rounded-[100px] bg-[#FFDF2B]"
                  onClick={() => handleDelete(reminder.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ReminderPage;
