import { useEffect } from "react";

type Reminder = {
  id: number;
  time: string;
  activity: string;
  recurrence?: string;
  status?: string;
};

const ReminderChecker = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Unable to connect to EventSource.");
      return;
    }
    const eventSource = new EventSource(
      `http://localhost:5000/events?token=${token}`
    );

    eventSource.onmessage = (event) => {
      const reminder:Reminder = JSON.parse(event.data);
      console.log("Reminder received:", reminder);
      
      new Notification("StepUp Reminder", {
        body: `It's time for: ${reminder.activity}`,
        icon: "./assets/step-up-icon.png",
      });
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
};

export default ReminderChecker;