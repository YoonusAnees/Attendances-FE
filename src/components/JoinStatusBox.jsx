import { useState } from "react";
import axios from "axios";
import { FaGlassCheers, FaStar } from "react-icons/fa";

export default function JoinStatusBox({
  participantId,
  currentStatus,
  onStatusChange,
}) {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasResponded = currentStatus === true || currentStatus === false;

  const handleAttendance = async (status) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API}/api/participants/${participantId}/attendance`,
        { attending: status }
      );

      onStatusChange(res.data.attending);

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
      {!hasResponded && (
        <>
          {/* MOBILE */}
          <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:hidden">
            <div className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Join the reunion?
                  </p>
                  <p className="text-xs text-slate-500">
                    Confirm your attendance
                  </p>
                </div>

                <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <FaGlassCheers className="text-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={loading}
                  onClick={() => handleAttendance(true)}
                  className="rounded-2xl bg-emerald-600 text-white py-3 text-sm font-semibold shadow-md transition active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Yes"}
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAttendance(false)}
                  className="rounded-2xl bg-rose-600 text-white py-3 text-sm font-semibold shadow-md transition active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Saving..." : "No"}
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:block fixed top-5 right-5 z-50 w-[340px]">
            <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-md">
                  <FaStar />
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
                  className="rounded-2xl bg-emerald-600 text-white py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Yes"}
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAttendance(false)}
                  className="rounded-2xl bg-rose-600 text-white py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "No"}
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