import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function WelcomeCard() {
  const [visible, setVisible] = useState(false);
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setVisible(true);

      // جذب الانتباه مرة واحدة بعد ظهور الكارت
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
        bottom-6
        right-6
        z-[100]
        w-[365px]
        overflow-hidden
        rounded-[28px]
        border
        border-black/[0.06]
        bg-white/[0.97]
        backdrop-blur-xl
        shadow-[0_30px_100px_rgba(0,0,0,0.18)]
        transition-all
        duration-[950ms]
        ease-[cubic-bezier(.16,1,.3,1)]

        ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-[18%] translate-y-[150%] opacity-0"
        }

        ${attention ? "animate-[welcomeAttention_0.75s_ease-out]" : ""}
      `}
    >
      {/* Top yellow accent */}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-[#ffd814]" />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute -inset-[1px] rounded-[28px] bg-[#ffd814]/[0.03]" />

      <div className="relative p-5 sm:p-6">
        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close welcome card"
          className="
            absolute
            right-4
            top-4
            z-30
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-gray-50
            text-gray-400
            transition-all
            duration-300
            hover:bg-black
            hover:text-white
            hover:rotate-90
          "
        >
          <FiX size={13} strokeWidth={1.8} />
        </button>

        {/* Main Content */}
        <div className="flex items-center gap-5">
          {/* Video */}
          <div
            className={`
              relative
              h-[105px]
              w-[105px]
              shrink-0
              overflow-hidden
              rounded-[23px]
              bg-[#f5f5f2]
              transition-transform
              duration-700
              ${attention ? "scale-[1.04]" : "scale-100"}
            `}
          >
            <video
              src="/wel.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* Soft video overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/[0.04]" />

            {/* Live Indicator */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffd814]" />

              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white">
                Live
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-gray-400">
                SHOPLY
              </span>

              <span className="h-[3px] w-[3px] rounded-full bg-[#ffd814]" />
            </div>

            <h3 className="mt-2 text-[21px] font-medium leading-[0.98] tracking-[-0.05em] text-[#111]">
              Wait...
              <br />
              <span className="font-semibold">you found us.</span>
            </h3>

            <p className="mt-2.5 max-w-[175px] text-[11px] font-normal leading-[1.55] text-gray-500">
              There’s something worth discovering here.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-5 border-t border-black/[0.06] pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Your next favorite thing
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                might be one click away.
              </p>
            </div>

            <Link
              to="/products"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#111]
                px-4
                py-2.5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                !text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#ffd814]
                hover:text-black
                hover:shadow-[0_8px_25px_rgba(255,216,20,0.3)]
              "
            >
              Discover

              <FiArrowUpRight
                size={13}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
        <div className="h-full w-full origin-left bg-[#ffd814] animate-[welcomeProgress_6.5s_linear_forwards]" />
      </div>
    </div>
  );
}

export default WelcomeCard;