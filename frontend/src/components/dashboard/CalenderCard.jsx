import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // 👈 custom styles

export default function CalendarCard() {
  const navigate = useNavigate();

  const onDateClick = date => {
    const formatted = date.toLocaleDateString("en-CA"); 
    navigate(`/planned?date=${formatted}`);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold mb-4">Calendar</h3>

      <Calendar
        onClickDay={onDateClick}
        className="figma-calendar"
        tileClassName={({ date, view }) =>
          view === "month" &&
          date.toDateString() === new Date().toDateString()
            ? "today-tile"
            : null
        }
      />
    </div>
  );
}
