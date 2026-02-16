import { useState, useEffect, useMemo } from "react";
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
    setExpand(false);

    let foundProduct = null;

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

    // ❌ product yahan null ho sakta hai
    if (!foundProduct) {
      console.log("Product not found");
      setProduct(null);
      setLoading(false);
      return;
    }

    // ✅ ONLY foundProduct use karo
    console.log("PRODUCT ID:", id);
    console.log("IS LOCAL?", foundProduct?.isLocal);
    console.log("RAW DESCRIPTION:", foundProduct?.description);
    console.log(
      "Text length:",
      foundProduct?.description
        ?.replace(/<[^>]+>/g, "")
        .length
    );

    // ✅ yahin state set karo
    setProduct(foundProduct);

    // 🔥 Recommended logic
    try {
      const pbList = await pb.collection("products").getList(1, 50, {
        sort: "-created",
      });

      const combined = [...localProducts, ...pbList.items];

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

      if (filtered.length === 0) {
        filtered = combined.filter(
          (item) => String(item.id) !== String(foundProduct.id)
        );
      }

      setRecommended(filtered.slice(0, 4));
    } catch {
      const fallback = localProducts.filter(
        (item) => String(item.id) !== String(foundProduct.id)
      );

      setRecommended(fallback.slice(0, 4));
    }

    setLoading(false);
  };

  if (id) loadProduct();
}, [id]);




 





  /* ================= IMAGE HANDLING ================= */

 /* ================= IMAGE HANDLING ================= */

const images = useMemo(() => {
  if (!product) return [];

  try {
    // LOCAL PRODUCT
    if (product.isLocal === true) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        return product.images;
      }

      if (product.image) {
        return [product.image];
      }

      return [];
    }

    // POCKETBASE PRODUCT
    const tempImages = [];

    if (product.main_image) {
      tempImages.push(
        pb.files.getURL(product, product.main_image)
      );
    }

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((file) => {
        if (file && file !== product.main_image) {
          tempImages.push(
            pb.files.getURL(product, file)
          );
        }
      });
    }

    return tempImages;
  } catch (err) {
    console.log("Image build error:", err);
    return [];
  }
}, [product]);


// ✅ Reset when product changes
useEffect(() => {
  if (product) {
    setActiveImage(0);
  }
}, [product]);


// ✅ Prevent invalid index
useEffect(() => {
  if (images.length > 0 && activeImage >= images.length) {
    setActiveImage(0);
  }
}, [images, activeImage]);

const currentImage =
  images.length > 0 ? images[0] : null;


 /* ================= LOADING CHECK ================= */

  /* ================= LOADING CHECK ================= */

if (loading) {
  return (
    <div className="loading-wrapper">
      <div className="loading-bar"></div>
    </div>
  );
}

if (!product) {
  return (
    <div className="loading-wrapper">
      <div className="loading-bar"></div>
      <p className="loading-text">
        May be server error or product not found
      </p>
    </div>
  );
}

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
    <div className="top-section">
      <div className="left-section">

        {/* MAIN IMAGE */}
        <div className="main-image">
          {images.length > 0 && (
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

  {product.short_description && (
    <div className="short-text">
      {product.short_description}
    </div>
  )}

  {product.description && (
    <>
      {expand && (
        <div
          dangerouslySetInnerHTML={{
            __html: product.description
          }}
        />
      )}

      <button
        className="expand-btn"
        onClick={() => setExpand(!expand)}
      >
        {expand ? "Show Less ▲" : "Read More ▼"}
      </button>
    </>
  )}

</div>






        </div>
      </div>

      {/* ================= SPEC SECTION ================= */}
<div className="spec-section">
  {images.length > 1 && (
    <div className="spec-gallery">
      {images.map((img, index) => (
        <div
          key={img}
          className="spec-thumb"
        >
          <img
            src={img}
            alt={`product-${index}`}
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
