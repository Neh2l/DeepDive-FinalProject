import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, 900);

    const finishTimer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onFinish();
      }, 700);
    }, 3000);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-hidden
        bg-[#050505]
        animate-[splashFadeOut_0.7s_ease-in-out_2.3s_forwards]
      "
    >
      {/* Soft ambient glow */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-[280px] w-[280px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#ffd814]/10
          blur-[100px]
        "
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <div
          className="
            opacity-0
            animate-[logoEnter_1.6s_cubic-bezier(0.16,1,0.3,1)_forwards]
          "
        >
          <img
            src="/logo.png"
            alt="Shoply"
            className="
              h-20 w-20
              object-contain
              drop-shadow-[0_0_30px_rgba(255,216,20,0.18)]
            "
          />
        </div>

        {/* Brand Name */}
        <div
          className={`
            mt-5 overflow-hidden
            transition-all duration-1000 ease-out
            ${
              showName
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }
          `}
        >
          <h1
            className="
              text-3xl
              font-black
              tracking-[0.35em]
              text-white
            "
          >
            SHOPLY
          </h1>
        </div>

        {/* Accent Line */}
        <div
          className="
            mt-5
            h-[2px]
            w-0
            overflow-hidden
            bg-[#ffd814]
            animate-[lineGrow_1.2s_ease-out_1.4s_forwards]
          "
        />

        {/* Tagline */}
        <p
          className={`
            mt-4
            text-[10px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-white/40
            transition-all duration-1000
            ${
              showName
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }
          `}
        >
          Everything you need
        </p>
      </div>

      {/* Bottom Loading Line */}
      <div className="absolute bottom-10 left-1/2 w-24 -translate-x-1/2">
        <div className="h-[1px] w-full overflow-hidden bg-white/10">
          <div
            className="
              h-full
              w-0
              bg-[#ffd814]
              animate-[loadingLine_2.5s_ease-in-out_forwards]
            "
          />
        </div>
      </div>

      <style>
        {`
          @keyframes logoEnter {
            0% {
              opacity: 0;
              transform: scale(0.65);
              filter: blur(10px);
            }

            60% {
              opacity: 1;
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: scale(1);
              filter: blur(0);
            }
          }

          @keyframes lineGrow {
            from {
              width: 0;
            }

            to {
              width: 55px;
            }
          }

          @keyframes loadingLine {
            0% {
              width: 0;
            }

            100% {
              width: 100%;
            }
          }

          @keyframes splashFadeOut {
            from {
              opacity: 1;
            }

            to {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default SplashScreen;