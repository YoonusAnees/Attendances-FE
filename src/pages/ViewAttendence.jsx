import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

export default function ViewAttendence() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/participants`,
      );
      setParticipants(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load participants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const attendingPeople = participants.filter((p) => p.attending === true);
  const notAttendingPeople = participants.filter((p) => p.attending === false);
  const pendingPeople = participants.filter((p) => p.attending === null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 px-4 py-5 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md p-5 sm:p-7 md:p-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
                  <span>📊</span>
                  <span>Attendance Overview</span>
                </div>

                <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  View Attendance
                </h1>

                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Track who is coming, not coming, and pending.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <button
                  onClick={() => navigate("/")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Back
                </button>

                <button
                  onClick={loadParticipants}
                  className="rounded-2xl bg-blue-600 text-white px-4 py-3 font-semibold shadow-md transition hover:-translate-y-0.5"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                title="Coming"
                value={attendingPeople.length}
                color="green"
                icon="✅"
              />
              <StatCard
                title="Not Coming"
                value={notAttendingPeople.length}
                color="red"
                icon="❌"
              />
              <StatCard
                title="Pending"
                value={pendingPeople.length}
                color="yellow"
                icon="⏳"
              />
            </div>

            {loading ? (
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
                Loading participants...
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <AttendanceColumn
                  title="Attending"
                  count={attendingPeople.length}
                  emptyText="No one yet"
                  items={attendingPeople}
                  theme="green"
                />

                <AttendanceColumn
                  title="Not Attending"
                  count={notAttendingPeople.length}
                  emptyText="No one yet"
                  items={notAttendingPeople}
                  theme="red"
                />

                <AttendanceColumn
                  title="Pending"
                  count={pendingPeople.length}
                  emptyText="No pending users"
                  items={pendingPeople}
                  theme="yellow"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const styles = {
    green: "bg-green-50 border-green-200 text-green-900",
    red: "bg-red-50 border-red-200 text-red-900",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
  };

  return (
    <div
      className={`rounded-[28px] border ${styles[color]} p-5 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold opacity-80">{title}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">{value}</h2>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/70 flex items-center justify-center text-xl shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

function AttendanceColumn({ title, count, emptyText, items, theme }) {
  const themes = {
    green: {
      wrap: "border-green-200 bg-green-50/80",
      title: "text-green-900",
      badge: "bg-green-600 text-white",
      card: "border-green-100",
    },
    red: {
      wrap: "border-red-200 bg-red-50/80",
      title: "text-red-900",
      badge: "bg-red-600 text-white",
      card: "border-red-100",
    },
    yellow: {
      wrap: "border-yellow-200 bg-yellow-50/80",
      title: "text-yellow-900",
      badge: "bg-yellow-500 text-white",
      card: "border-yellow-100",
    },
  };

  const style = themes[theme];

  return (
    <div className={`rounded-[28px] border p-5 ${style.wrap}`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className={`text-lg font-bold ${style.title}`}>{title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
        >
          {count}
        </span>
      </div>

      <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
        {items.length === 0 ? (
          <div className="rounded-2xl bg-white/90 border border-white px-4 py-3 text-sm text-slate-500">
            {emptyText}
          </div>
        ) : (
          items.map((person) => (
            <div
              key={person._id}
              className={`rounded-2xl bg-white border px-4 py-3 shadow-sm ${style.card}`}
            >
              <div className="font-bold text-slate-900">
                {person.title} {person.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {person.attending === true
                  ? "Confirmed attendance"
                  : person.attending === false
                    ? "Unable to attend"
                    : "Awaiting response"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
