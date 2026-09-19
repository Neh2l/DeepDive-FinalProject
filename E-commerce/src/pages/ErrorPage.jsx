import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

function ErrorPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f3f1] px-5 py-12 dark:bg-[#111111]">
      <div className="relative z-10 w-full max-w-[760px] text-center">

        {/* 404 */}
        <div className="relative mx-auto w-fit">
          <h1 className="select-none text-[120px] font-black leading-[0.8] tracking-[-0.09em] text-gray-950 dark:text-white sm:text-[190px]">
            404
          </h1>

          <div className="absolute -bottom-3 left-1/2 h-[5px] w-24 -translate-x-1/2 bg-[#ffd814] sm:-bottom-4 sm:w-36" />
        </div>

        {/* LABEL */}
        <div className="mt-10">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Error 404
          </span>
        </div>

        {/* TITLE */}
        <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[34px]">
          This page doesn't exist.
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-4 max-w-[500px] text-[13px] leading-6 text-gray-500 dark:text-gray-400 sm:text-[14px]">
          The page you're looking for may have been moved,
          deleted, or the link might be incorrect.
        </p>

        {/* ACTIONS */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="group flex h-12 w-full items-center justify-center gap-2 bg-[#ffd814] px-7 text-[10px] font-black uppercase tracking-[0.12em] text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] sm:w-auto"
          >
            <FiHome size={14} />

            Back to Home

            <FiArrowLeft
              size={14}
              className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/products"
            className="group flex h-12 w-full items-center justify-center gap-2 border border-[#d7d7d4] bg-white px-7 text-[10px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all duration-300 hover:border-gray-900 dark:border-[#333333] dark:bg-[#181818] dark:text-white dark:hover:border-white sm:w-auto"
          >
            Explore Products

            <FiArrowLeft
              size={14}
              className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="mx-auto mt-14 flex max-w-[260px] items-center justify-center gap-4">
          <span className="h-px flex-1 bg-[#dededb] dark:bg-[#292929]" />

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Shoply
          </span>

          <span className="h-px flex-1 bg-[#dededb] dark:bg-[#292929]" />
        </div>

        {/* SMALL MESSAGE */}
        <p className="mt-5 text-[9px] uppercase tracking-[0.16em] text-gray-400">
          Nothing here — let's get you back on track.
        </p>
      </div>
    </main>
  );
}

export default ErrorPage;