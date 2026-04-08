export default function Footer() {
  return (
    <footer className="mt-10 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[28px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
            <p className="text-sm sm:text-base text-slate-600">
              Developed By{" "}
              <span className="font-bold  bg-clip-text  text-amber-950">
                Yoonus Anees
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
