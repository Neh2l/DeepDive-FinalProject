import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function WelcomeCard() {
  const [visible, setVisible] = useState(false);
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setVisible(true);

      const attentionTimer = setTimeout(() => {
        setAttention(true);

        setTimeout(() => {
          setAttention(false);
        }, 750);
      }, 850);

      return () => clearTimeout(attentionTimer);
    }, 900);

    const exitTimer = setTimeout(() => {
      setVisible(false);
    }, 7500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <div
      className={`
        fixed
        z-[100]
        left-1/2
        top-1/2
        w-[calc(100%-24px)]
        max-w-[370px]
        overflow-hidden
        rounded-[22px]
        border
        border-black/[0.07]
        bg-white
        shadow-[0_24px_70px_rgba(0,0,0,0.18)]
        transition-all
        duration-[800ms]
        ease-[cubic-bezier(.16,1,.3,1)]
        -translate-x-1/2

        ${
          visible
            ? "-translate-y-1/2 scale-100 opacity-100"
            : "translate-y-[calc(-50%+25px)] scale-[0.96] opacity-0"
        }

        ${attention ? "animate-[welcomeAttention_0.75s_ease-out]" : ""}

        sm:bottom-6
        sm:left-auto
        sm:right-6
        sm:top-auto
        sm:w-[365px]
        sm:max-w-[365px]
        sm:translate-x-0
        sm:translate-y-0
        sm:scale-100

        dark:border-[#2a2a2a]
        dark:bg-[#181818]
      `}
    >
      <div className="absolute left-0 top-0 h-[2px] w-full bg-[#ffd814]" />

      <button
        onClick={() => setVisible(false)}
        aria-label="Close welcome card"
        className="
          absolute
          right-3.5
          top-3.5
          z-30
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-gray-400
          shadow-sm
          backdrop-blur-md
          transition-all
          duration-300
          hover:rotate-90
          hover:bg-black
          hover:text-white
          dark:bg-[#222]/90
          dark:text-gray-400
          dark:hover:bg-white
          dark:hover:text-black
        "
      >
        <FiX size={13} strokeWidth={1.8} />
      </button>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-4">
          <div
            className={`
              relative
              h-[100px]
              w-[100px]
              shrink-0
              overflow-hidden
              rounded-[18px]
              bg-[#f4f4f1]
              transition-transform
              duration-700

              sm:h-[105px]
              sm:w-[105px]

              dark:bg-[#222]

              ${attention ? "scale-[1.035]" : "scale-100"}
            `}
          >
            <video
              src="/wel.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/[0.08]" />

            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffd814]" />

              <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-white">
                Live
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1 pr-5">
            <div className="flex items-center gap-2">
              <span className="text-[7px] font-semibold uppercase tracking-[0.26em] text-gray-400">
                SHOPLY
              </span>

              <span className="h-[3px] w-[3px] rounded-full bg-[#ffd814]" />
            </div>

            <h3 className="mt-2 text-[20px] font-medium leading-[0.98] tracking-[-0.055em] text-[#111] dark:text-white">
              Wait...
              <br />
              <span className="font-semibold">you found us.</span>
            </h3>

            <p className="mt-2 max-w-[160px] text-[10px] leading-[1.5] text-gray-500 dark:text-gray-400">
              There’s something worth discovering here.
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-black/[0.07] pt-3.5 dark:border-[#2a2a2a]">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Your next favorite thing
              </p>

              <p className="mt-1 text-[9px] text-gray-500 dark:text-gray-400">
                might be one click away.
              </p>
            </div>

            <Link
              to="/products"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                bg-[#111]
                px-3.5
                py-2.5
                text-[7px]
                font-bold
                uppercase
                tracking-[0.15em]
                !text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#ffd814]
                hover:!text-black
                hover:shadow-[0_8px_22px_rgba(255,216,20,0.25)]
                dark:bg-white
                dark:!text-black
                dark:hover:bg-[#ffd814]
              "
            >
              <span className="!text-inherit">Discover</span>

              <FiArrowUpRight
                size={12}
                strokeWidth={2}
                className="
                  !text-white
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:!text-black
                  dark:!text-black
                "
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100 dark:bg-[#292929]">
        <div className="h-full w-full origin-left bg-[#ffd814] animate-[welcomeProgress_6.5s_linear_forwards]" />
      </div>
    </div>
  );
}

export default WelcomeCard;