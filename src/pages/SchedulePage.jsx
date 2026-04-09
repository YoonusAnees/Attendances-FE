import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinStatusBox from "../components/JoinStatusBox";
import { FaCalendarAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const programSchedule = [
  {
    time: "11:30 - 12:00",
    activity: "Quran reciting, welcome drink, welcome speech, school anthem",
  },
  { time: "12:00 - 12:30", activity: "Prayers" },
  {
    time: "12:30 - 2:00",
    activity:
      "Knowledge Sharing Session (Where Teachers Share Their Journeys , Experiences , and Life Lessons)",
  },
  { time: "2:00 - 2:30", activity: "Lunch" },
  { time: "2:30 - 3:00", activity: "Ornament Giving" },
  { time: "3:00 - 3:30", activity: "Cake Cutting" },
  { time: "4:00 - 4:10", activity: "End Speech" },
  { time: "4:10 - 4:30", activity: "Group Photo" },
  { time: "4:30 - 5:00", activity: "Tea Party" },
];

export default function SchedulePage() {
  const [participant, setParticipant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedParticipant = localStorage.getItem("participant");

    if (!savedParticipant) {
      navigate("/");
      return;
    }

    setParticipant(JSON.parse(savedParticipant));
  }, [navigate]);

  const handleStatusChange = (newStatus) => {
    const updatedParticipant = {
      ...participant,
      attending: newStatus,
    };

    setParticipant(updatedParticipant);
    localStorage.setItem("participant", JSON.stringify(updatedParticipant));
  };

  if (!participant) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <JoinStatusBox
        participantId={participant._id}
        currentStatus={participant.attending}
        onStatusChange={handleStatusChange}
      />

      <div className="flex-1 px-4 py-5 sm:py-8">
        <div className="max-w-5xl mx-auto pt-2 sm:pt-20">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md p-5 sm:p-7 md:p-9">
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
                <FaCalendarAlt className="text-blue-600" />
                <span>Programme Schedule</span>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Welcome, {participant.title} {participant.name}
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Here is the reunion schedule for the day. Please review the
                programme below.
              </p>
            </div>

            <div className="space-y-4">
              {programSchedule.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="sm:min-w-[180px]">
                      <div className="inline-flex rounded-full bg-blue-600 text-white text-xs sm:text-sm font-bold px-4 py-2 shadow-md">
                        {item.time}
                      </div>
                    </div>

                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      {item.activity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back Home
              </button>

              <button
                onClick={() => navigate("/view")}
                className="w-full rounded-2xl bg-slate-800 text-white px-5 py-3.5 font-semibold shadow-md transition hover:-translate-y-0.5"
              >
                Go to View Attendance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20 sm:pb-0">
        <Footer />
      </div>
    </div>
  );
}
