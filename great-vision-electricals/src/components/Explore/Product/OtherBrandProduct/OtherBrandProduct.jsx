import React, { useEffect, useState } from "react";
import "./OtherBrandProduct.css";
import { getOtherProducts } from "../../../../api/myproduct";
import pb from "../../../../lib/pb";
import { useNavigate } from "react-router-dom";

const OtherBrandProduct = ({ formatPrice }) => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getOtherProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("OtherBrand Fetch Error:", err);
        setProducts([]);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="otherproduct-grid">

      {products.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No products available
        </p>
      )}

      {products.map((item) => {

        let imageSrc = "";

        try {
          if (item.main_image) {
            imageSrc = pb.files.getURL(item, item.main_image);
          } else if (item.images?.length > 0) {
            imageSrc = pb.files.getURL(item, item.images[0]);
          }
        } catch (e) {
          console.error("Image error:", e);
        }

        return (
          <div key={item.id} className="otherproduct-card">

            <div className="otherproduct-img">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.name || "product"}
                  loading="lazy"
                />
              )}
            </div>

            <div className="otherproduct-content">
              <h3 className="otherproduct-name">
                {item.name || "No Name"}
              </h3>

              <p className="otherproduct-price">
                {formatPrice
                  ? formatPrice(item.price || 0)
                  : `₹${item.price || 0}`}
              </p>

              <button
                className="otherproduct-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View Details
              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default OtherBrandProduct;
