import { useState } from "react";

import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";

function ProductImages({ product }) {
  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail || product.image];

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)]">

      {/* =====================================================
          THUMBNAILS
      ====================================================== */}

      <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">

        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View product image ${index + 1}`}
            className={`
              group/thumb
              relative
              flex
              h-[76px]
              min-w-[76px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-white
              p-2
              transition-all
              duration-300
              ${
                activeIndex === index
                  ? "border-2 border-gray-950 shadow-[0_5px_18px_rgba(0,0,0,0.10)] dark:border-white"
                  : "border border-gray-200 hover:border-gray-400 hover:shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-gray-500"
              }
            `}
          >
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="
                h-full
                w-full
                object-contain
                transition-transform
                duration-300
                group-hover/thumb:scale-105
              "
            />

            {/* Active indicator */}

            {activeIndex === index && (
              <span
                className="
                  absolute
                  bottom-1.5
                  left-1/2
                  h-1
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#ffd814]
                "
              />
            )}
          </button>
        ))}
      </div>

      {/* =====================================================
          MAIN IMAGE
      ====================================================== */}

      <div
        className="
          group/main
          relative
          order-1
          flex
          min-h-[430px]
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-[#fafafa]
          lg:order-2
          dark:border-[#2a2a2a]
          dark:bg-[#1a1a1a]
        "
      >

        {/* Soft premium background */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#fafafa_50%,#f1f1f1_100%)]
            dark:bg-[radial-gradient(circle_at_50%_45%,#2a2a2a_0%,#1a1a1a_50%,#151515_100%)]
          "
        />

        {/* Yellow glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-[#ffd814]/10
            blur-3xl
          "
        />

        {/* Product image */}

        <img
          src={activeImage}
          alt={product.title}
          className="
            relative
            z-10
            max-h-[460px]
            w-full
            object-contain
            p-8
            transition-transform
            duration-700
            ease-out
            group-hover/main:scale-[1.035]
          "
        />

        {/* =================================================
            IMAGE COUNTER
        ================================================== */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-4
              left-4
              z-20
              rounded-full
              border
              border-gray-200
              bg-white/90
              px-3
              py-1.5
              text-[10px]
              font-bold
              text-gray-600
              shadow-sm
              backdrop-blur-md
              dark:border-[#2a2a2a]
              dark:bg-[#1a1a1a]/90
              dark:text-gray-300
            "
          >
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* =================================================
            FULLSCREEN BUTTON
        ================================================== */}

        <button
          type="button"
          aria-label="View image"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white/90
            text-gray-600
            opacity-0
            shadow-sm
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-110
            hover:bg-white
            hover:text-black
            group-hover/main:opacity-100
            dark:border-[#2a2a2a]
            dark:bg-[#1a1a1a]/90
            dark:text-gray-300
            dark:hover:bg-[#222]
            dark:hover:text-white
          "
        >
          <FiMaximize2 size={15} />
        </button>

        {/* =================================================
            PREVIOUS
        ================================================== */}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="
                absolute
                left-4
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white/90
                text-gray-700
                opacity-0
                shadow-md
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                hover:text-black
                group-hover/main:opacity-100
                dark:border-[#2a2a2a]
                dark:bg-[#1a1a1a]/90
                dark:text-gray-300
                dark:hover:bg-[#222]
                dark:hover:text-white
              "
            >
              <FiChevronLeft size={18} />
            </button>

            {/* =================================================
                NEXT
            ================================================== */}

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="
                absolute
                right-4
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white/90
                text-gray-700
                opacity-0
                shadow-md
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                hover:text-black
                group-hover/main:opacity-100
                dark:border-[#2a2a2a]
                dark:bg-[#1a1a1a]/90
                dark:text-gray-300
                dark:hover:bg-[#222]
                dark:hover:text-white
              "
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductImages;