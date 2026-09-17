import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const promos = [
  {
    number: "01",
    video: "/1.mp4",
    eyebrow: "BEAUTY ESSENTIALS",
    title: "Skincare made for your everyday.",
    link: "Shop beauty",
  },

  {
    number: "02",
    video: "/2.mp4",
    eyebrow: "APPLE COLLECTION",
    title: "The latest iPhone. Built to impress.",
    link: "Shop iPhone",
  },

  {
    number: "03",
    video: "/3.mp4",
    eyebrow: "AUDIO & TECH",
    title: "Hear every detail.",
    link: "Shop headphones",
  },
];

function PromoCard({ promo }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
    }
  }, []);

  return (
    <article
      className="
        group
        relative
        h-[470px]
        overflow-hidden
        bg-[#eeeeeb]
        dark:bg-[#1a1a1a]

        sm:h-[520px]
        lg:h-[580px]
      "
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={promo.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover

          scale-[1.015]

          transition-transform
          duration-[1800ms]
          ease-[cubic-bezier(.2,.8,.2,1)]

          group-hover:scale-[1.055]
        "
      />

      {/* SOFT OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/[0.06]

          transition-all
          duration-700

          group-hover:bg-black/[0.13]
        "
      />

      {/* CINEMATIC GRADIENT */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-black/15
          to-transparent
        "
      />

      {/* TOP INFORMATION */}
      <div
        className="
          absolute
          left-6
          right-6
          top-6

          flex
          items-center
          justify-between

          text-white

          sm:left-7
          sm:right-7
          sm:top-7
        "
      >
        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-white/75
          "
        >
          {promo.eyebrow}
        </span>

        <span
          className="
            text-[9px]
            font-medium
            tracking-[0.2em]
            text-white/55
          "
        >
          {promo.number}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0

          p-6
          text-white

          sm:p-7
          lg:p-8
        "
      >
        {/* TITLE */}
        <h3
          className="
            max-w-[330px]

            font-medium
            text-[29px]
            leading-[1]
            tracking-[-0.035em]

            sm:text-[33px]
            lg:text-[37px]
          "
        >
          {promo.title}
        </h3>

        {/* CTA */}
        <Link
          to="/products"
          className="
            group/link

            mt-6

            flex
            w-fit
            items-center
            gap-2

            border-b
            border-white/55
            pb-1.5

            text-[9px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-white/90

            transition-all
            duration-300

            hover:gap-3
            hover:border-white
            hover:text-white
          "
        >
          {promo.link}

          <FiArrowUpRight
            size={13}
            strokeWidth={1.7}
            className="
              transition-transform
              duration-300

              group-hover/link:-translate-y-0.5
              group-hover/link:translate-x-0.5
            "
          />
        </Link>
      </div>

      {/* PREMIUM FRAME */}
      <div
        className="
          pointer-events-none
          absolute
          inset-4

          border
          border-white/0

          transition-all
          duration-700

          group-hover:border-white/20
        "
      />

      {/* LIGHT SWEEP */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-[80%]
          z-20
          w-[28%]

          skew-x-[-18deg]

          bg-gradient-to-r
          from-transparent
          via-white/[0.10]
          to-transparent

          blur-[4px]

          transition-transform
          duration-[1800ms]
          ease-out

          group-hover:translate-x-[650%]
        "
      />
    </article>
  );
}

function PromoMosaic() {
  return (
    <section
      className="
        relative
        left-[50%]
        w-[100vw]
        -translate-x-[50%]

        bg-white
        dark:bg-[#111111]
      "
    >
      {/* HEADER */}
      <div
        className="
          mx-auto
          max-w-[1500px]

          px-5
          pb-9
          pt-16

          sm:px-8
          lg:px-10

          lg:pb-10
          lg:pt-20
        "
      >
        <div className="flex items-end justify-between">
          <div>
            {/* SMALL LABEL */}
            <p
              className="
                mb-4

                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]

                text-gray-400
              "
            >
              SHOPLY / CURATED
            </p>

            {/* MAIN TITLE */}
            <h2
              className="
                max-w-[680px]

                font-medium
                text-[34px]
                leading-[0.96]
                tracking-[-0.045em]

                text-[#111111]
                dark:text-white

                sm:text-[42px]
                lg:text-[50px]
              "
            >
              Discover products
              <br className="hidden sm:block" />
              worth bringing home.
            </h2>
          </div>

          {/* VIEW ALL */}
          <Link
            to="/products"
            className="
              hidden
              items-center
              gap-2

              border-b
              border-gray-900
              dark:border-white
              pb-1.5

              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]

              text-gray-900
              dark:text-white

              transition-all
              duration-300

              hover:gap-3

              sm:flex
            "
          >
            View all

            <FiArrowUpRight
              size={13}
              strokeWidth={1.7}
            />
          </Link>
        </div>
      </div>

      {/* THREE PROMO VIDEOS */}
      <div
        className="
          mx-auto
          grid
          max-w-[1500px]

          grid-cols-1
          gap-[3px]

          sm:grid-cols-2
          sm:px-4

          lg:grid-cols-3
          lg:px-6
        "
      >
        {promos.map((promo) => (
          <PromoCard
            key={promo.number}
            promo={promo}
          />
        ))}
      </div>
    </section>
  );
}

export default PromoMosaic;