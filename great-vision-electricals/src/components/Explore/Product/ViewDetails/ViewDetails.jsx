import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "../../../../lib/pb";
import "./ViewDetails.css";
import { useNavigate } from "react-router-dom";
import ledPanel from "../MyProduct/images/great-vision-fanbox.png";
import smartSwitch from "../MyProduct/images/12-way-mcb-box-great-vision.png";

const ViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [expand, setExpand] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= LOCAL PRODUCTS ================= */

  const localProducts = [
    {
      id: "local-1",
      name: "Havells FAB BLDC Ceiling Fan",
      price: 27999,
      mrp: 31999,
      brand: "Havells",
      images: [ledPanel, smartSwitch, ledPanel],
      description:
        "Premium BLDC ceiling fan with remote control, timer support, silent motor technology, energy saving performance, durable copper winding and modern design suitable for all rooms.",
      stock: "10 left",
      isLocal: true,
    },
    {
      id: "local-2",
      name: "Smart Switch Board",
      price: 1499,
      mrp: 1999,
      brand: "Great Vision",
      image: smartSwitch,
      description:
        "Premium quality smart switch board with high durability and modern finishing suitable for all installations.",
      stock: "Available",
      isLocal: true,
    },
  ];

  /* ================= LOAD PRODUCT ================= */

  useEffect(() => {
  const loadProduct = async () => {
    setLoading(true);

    let foundProduct = null;
    let pbProducts = [];

    // 1️⃣ Check local first
    foundProduct = localProducts.find(
      (p) => String(p.id) === String(id)
    );

    // 2️⃣ If not local → check PocketBase
    if (!foundProduct) {
      try {
        foundProduct = await pb
          .collection("products")
          .getOne(id);
      } catch (err) {
        console.log("Not found in PB");
      }
    }

    setProduct(foundProduct);

    // 3️⃣ Recommended logic (Local + PB)
    // 🔥 Recommended (Brand-based, but safe)
try {
  const pbList = await pb.collection("products").getList(1, 50, {
    sort: "-created"
  });

  const combined = [
    ...localProducts,
    ...pbList.items
  ];

  const normalizedBrand = foundProduct?.brand
    ?.toLowerCase()
    ?.trim();

  let filtered = [];

  if (normalizedBrand) {
    filtered = combined.filter((item) => {
      const itemBrand = item.brand
        ?.toLowerCase()
        ?.trim();

      return (
        itemBrand === normalizedBrand &&
        String(item.id) !== String(foundProduct.id)
      );
    });
  }

  // 🔁 Fallback: agar same brand na mile to random show karo
  if (filtered.length === 0) {
    filtered = combined.filter(
      (item) =>
        String(item.id) !== String(foundProduct.id)
    );
  }

  setRecommended(filtered.slice(0, 4));

} catch {
  const fallback = localProducts.filter(
    (item) =>
      String(item.id) !== String(foundProduct?.id)
  );

  setRecommended(fallback.slice(0, 4));
}


    setLoading(false);
  };

  if (id) {
    loadProduct();
  }
}, [id]);




  /* ================= LOADING CHECK ================= */

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="loading">Product not found</div>;
  }





  /* ================= IMAGE HANDLING ================= */

  let images = [];

// LOCAL PRODUCT
if (product.isLocal) {
  if (product.images?.length > 0) {
    images = product.images;
  } else if (product.image) {
    images = [product.image];
  }
}

// POCKETBASE PRODUCT
else {
  const tempImages = [];

  // 1️⃣ Always push main_image first
  if (product.main_image) {
    tempImages.push(
      pb.files.getURL(product, product.main_image)
    );
  }

  // 2️⃣ Then push gallery images (avoid duplicate)
  if (product.images?.length > 0) {
    product.images.forEach((file) => {
      if (file !== product.main_image) {
        tempImages.push(
          pb.files.getURL(product, file)
        );
      }
    });
  }

  images = tempImages;
}

// Ensure active index valid
const currentImage =
  images[activeImage] || images[0] || "";


  /* ================= PRICE ================= */

  const hasMrp =
    product.mrp && product.price && product.mrp > product.price;

  const discountPercent = hasMrp
    ? Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
      )
    : 0;

  /* ================= RETURN ================= */

  return (
    <div className="viewdetails">
      {/* ================= TOP SECTION ================= */}
      <div className="top-section">
        {/* LEFT SIDE */}
        <div className="left-section">
  <div className="main-image">
    {currentImage && (
      <img
        src={currentImage}
        alt={product.name}
      />
    )}
  </div>
</div>


        {/* RIGHT SIDE */}
        <div className="right-section">
          <h1 className="product-title">
            {product.name}
          </h1>

          {product.offer_enabled && hasMrp && discountPercent > 0 && (
  <div className="deal-badge">
    Limited time deal
  </div>
)}


          <div className="price-row">
            {hasMrp && discountPercent > 0 && (
              <span className="discount">
                -{discountPercent}%
              </span>
            )}
            <span className="main-price">
              ₹{product.price}
            </span>
          </div>

          {hasMrp && (
            <p className="mrp">
              M.R.P.: <span>₹{product.mrp}</span>
            </p>
          )}

          <p className="tax">
            Inclusive of all taxes
          </p>

          <div className="brand-warranty">

  {product.brand && (
    <div>
      Brand: <strong>{product.brand}</strong>
    </div>
  )}

  {product.warranty && (
    <div>
      🛡 {product.warranty}
    </div>
  )}

</div>


          <div className="short-desc-box">

  <div
    dangerouslySetInnerHTML={{
      __html: expand
        ? product.description || ""
        : (product.description || "").substring(0, 300)
    }}
  />

  {(product.description || "").length > 300 && (
    <button
      className="expand-btn"
      onClick={() => setExpand(!expand)}
    >
      {expand ? "Show Less ▲" : "Read More ▼"}
    </button>
  )}



          </div>
        </div>
      </div>

      {/* ================= SPEC SECTION ================= */}
      <div className="spec-section">
        {/* GALLERY */}
        {images.length > 1 && (
          <div className="spec-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="spec-thumb"
                onClick={() =>
                  setActiveImage(index)
                }
              >
                <img
                  src={img}
                  alt="product"
                />
              </div>
            ))}
          </div>
        )}

        {/* SPEC TABLE */}
        <div className="spec-table">

  {product.brand && (
    <div className="spec-row">
      <div>Brand</div>
      <div>{product.brand}</div>
    </div>
  )}

  {product.colour && (
    <div className="spec-row">
      <div>Colour</div>
      <div>{product.colour}</div>
    </div>
  )}

  {product.style && (
    <div className="spec-row">
      <div>Style</div>
      <div>{product.style}</div>
    </div>
  )}

  {product.power_source && (
    <div className="spec-row">
      <div>Power Source</div>
      <div>{product.power_source}</div>
    </div>
  )}

  {product.electric_fan_design && (
    <div className="spec-row">
      <div>Fan Design</div>
      <div>{product.electric_fan_design}</div>
    </div>
  )}

  {product.product_dimensions && (
    <div className="spec-row">
      <div>Product Dimensions</div>
      <div>{product.product_dimensions}</div>
    </div>
  )}

  {product.room_type && (
    <div className="spec-row">
      <div>Room Type</div>
      <div>{product.room_type}</div>
    </div>
  )}

  {product.special_feature && (
    <div className="spec-row">
      <div>Special Feature</div>
      <div>{product.special_feature}</div>
    </div>
  )}

  {product.recommended_uses && (
    <div className="spec-row">
      <div>Recommended Uses</div>
      <div>{product.recommended_uses}</div>
    </div>
  )}

  {product.mounting_type && (
    <div className="spec-row">
      <div>Mounting Type</div>
      <div>{product.mounting_type}</div>
    </div>
  )}

</div>

{/* ================= RECOMMENDED PRODUCTS ================= */}

{/* ================= RECOMMENDED PRODUCTS ================= */}

{/* ================= RECOMMENDED ================= */}

{recommended.length > 0 && (
  <div style={{ marginTop: "60px" }}>
    <h2 style={{ marginBottom: "25px" }}>
      Recommended Products
    </h2>

    <div className="myproduct-grid">
      {recommended.map((item) => {

        let imageSrc = "";

        try {
          if (item.isLocal) {
            imageSrc = item.image || item.images?.[0];
          } else if (item?.main_image) {
            imageSrc = pb.files.getURL(item, item.main_image);
          } else if (item?.images?.length > 0) {
            imageSrc = pb.files.getURL(item, item.images[0]);
          }
        } catch {
          imageSrc = "";
        }

        return (
          <div
            key={item.id}
            className="myproduct-card"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="myproduct-img">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.name}
                />
              )}
            </div>

            <div className="myproduct-content">
              <h3 className="myproduct-name">
                {item.name}
              </h3>

              <p className="myproduct-price">
                ₹{item.price || 0}
              </p>

              <button
  className="myproduct-btn"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/product/${item.id}`);
  }}
>
  View Details
</button>

            </div>
          </div>
        );
      })}
    </div>
  </div>
)}




      </div>
    </div>
  );
};

export default ViewDetails;
