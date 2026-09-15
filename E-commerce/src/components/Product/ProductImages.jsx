import { useState } from "react";

function ProductImages({ product }) {
  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail || product.image];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[90px_minmax(0,1fr)]">
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition-all duration-300 ${
              activeImage === image
                ? "border-gray-950 shadow-md"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex min-h-[450px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 lg:order-2">
        <img
          src={activeImage}
          alt={product.title}
          className="max-h-[500px] w-full object-contain transition-all duration-500"
        />
      </div>
    </div>
  );
}

export default ProductImages;