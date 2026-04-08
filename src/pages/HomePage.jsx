import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

export default function HomePage() {
  const [title, setTitle] = useState("Mr");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/participants", {
        title,
        name: name.trim(),
      });

      localStorage.setItem("participant", JSON.stringify(res.data));
      navigate("/schedule");
    } catch (error) {
      console.error(error);
      alert("Failed to save participant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#e2e8f0_35%,_#f8fafc_75%)] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] p-5 sm:p-7 md:p-9">
            <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative z-10 text-center mb-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
                <span>🎓</span>
                <span>Reunion Event</span>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Welcome to 2018 Reunion Programme
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                Enter your details to continue and view the full event schedule.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Title
                </label>
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition shadow-sm"
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition shadow-sm"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white py-3.5 font-bold shadow-[0_16px_40px_rgba(37,99,235,0.30)] transition hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}