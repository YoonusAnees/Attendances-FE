export default function Footer() {
  return (
    <footer className="mt-10 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-blue-500" />
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
