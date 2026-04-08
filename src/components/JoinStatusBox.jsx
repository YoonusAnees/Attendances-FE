import { useState } from "react";
import axios from "axios";

export default function JoinStatusBox({
  participantId,
  currentStatus,
  onStatusChange,
}) {
  const [popup, setPopup] = useState(null);
  const [hidden, setHidden] = useState(currentStatus !== null);
  const [loading, setLoading] = useState(false);

  const handleAttendance = async (status) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `http://localhost:5000/api/participants/${participantId}/attendance`,
        { attending: status }
      );

      onStatusChange(res.data.attending);
      setHidden(true);

      if (status) {
        setPopup("🎉 Thank you! See you on April 11");
      } else {
        setPopup("😊 Thank you! We’ll meet next time");
      }

      setTimeout(() => {
        setPopup(null);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!hidden && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:hidden">
            <div className="rounded-[26px] border border-white/70 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Join the reunion?
                  </p>
                  <p className="text-xs text-slate-500">
                    Confirm your attendance
                  </p>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                  🎊
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={loading}
                  onClick={() => handleAttendance(true)}
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 text-sm font-semibold shadow-lg shadow-green-500/25 transition active:scale-[0.98] disabled:opacity-60"
                >
                  Yes
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAttendance(false)}
                  className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 text-sm font-semibold shadow-lg shadow-red-500/25 transition active:scale-[0.98] disabled:opacity-60"
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:block fixed top-5 right-5 z-50 w-[340px]">
            <div className="rounded-[28px] border border-white/70 bg-white/92 backdrop-blur-xl shadow-[0_24px_70px_rgba(15,23,42,0.18)] p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-lg shadow-lg">
                  ✨
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Are you joining?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Let us know your reunion status
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={loading}
                  onClick={() => handleAttendance(true)}
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 text-sm font-semibold shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  Yes
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAttendance(false)}
                  className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 text-sm font-semibold shadow-lg shadow-red-500/25 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {popup && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-24px)] max-w-md">
          <div className="rounded-2xl bg-slate-900 text-white text-center px-5 py-3 shadow-2xl animate-fadeIn">
            {popup}
          </div>
        </div>
      )}
    </>
  );
}