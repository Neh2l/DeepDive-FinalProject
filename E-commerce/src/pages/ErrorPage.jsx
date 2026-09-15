
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

function ErrorPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f7f7] px-4 py-12">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="relative mx-auto w-fit">
          <h1 className="select-none text-[120px] font-black leading-none tracking-[-0.08em] text-gray-950 sm:text-[170px]">
            404
          </h1>

          <div className="absolute bottom-2 left-1/2 h-3 w-32 -translate-x-1/2 -rotate-2 rounded-full bg-yellow-400 sm:bottom-3 sm:w-44" />
        </div>

    

        <span className="mt-7 inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">
          Page not found
        </span>

        <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-950 sm:text-4xl">
          Oops! We can't find that page.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
          The page you're looking for may have been moved,
          deleted, or the link might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-3.5 text-sm font-black text-gray-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg sm:w-auto"
          >
            <FiHome size={17} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md sm:w-auto"
          >
            Explore Products
            <FiArrowLeft
              size={17}
              className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="h-px w-10 bg-gray-200" />
          <span>Shoply</span>
          <span className="h-px w-10 bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
