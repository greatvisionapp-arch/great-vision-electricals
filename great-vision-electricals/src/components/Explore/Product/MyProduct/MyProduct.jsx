import React, { useEffect, useState } from "react";
import "./MyProduct.css";
import { getMyProducts } from "../../../../api/myproduct";
import pb from "../../../../lib/pb";
import { useNavigate } from "react-router-dom";

import ledPanel from "./images/great-vision-fanbox.png";
import smartSwitch from "./images/12-way-mcb-box-great-vision.png";

const MyProduct = ({ formatPrice }) => {
  const navigate = useNavigate();

  const localProducts = [
    {
      id: "local-1",
      name: "LED Panel Light",
      price: 799,
      image: ledPanel,
      isLocal: true,
    },
    {
      id: "local-2",
      name: "Smart Switch Board",
      price: 1499,
      image: smartSwitch,
      isLocal: true,
    },
  ];

  const [pbProducts, setPbProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getMyProducts();
        setPbProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("PB Fetch Error:", err);
        setPbProducts([]);
      }
    }
    loadProducts();
  }, []);

  const allProducts = [...localProducts, ...pbProducts];

  return (
    <div className="myproduct-grid">
      {allProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No products available
        </p>
      )}

      {allProducts.map((item) => {
        let imageSrc = "";

        try {
          // LOCAL
          if (item.isLocal) {
            imageSrc = item.image;
          }

          // POCKETBASE
          else if (item?.main_image) {
            imageSrc = pb.files.getURL(item, item.main_image);
          }

          else if (item?.images?.length > 0) {
            imageSrc = pb.files.getURL(item, item.images[0]);
          }

        } catch (e) {
          console.error("Image error:", e);
          imageSrc = "";
        }

        return (
          <div key={item.id} className="myproduct-card">
            <div className="myproduct-img">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.name || "product"}
                  loading="lazy"
                />
              )}
            </div>

            <div className="myproduct-content">
              <h3 className="myproduct-name">
                {item.name || "No Name"}
              </h3>

              <p className="myproduct-price">
                {formatPrice
                  ? formatPrice(item.price || 0)
                  : `₹${item.price || 0}`}
              </p>

              <button
                className="myproduct-btn"
                onClick={() =>
                  navigate(`/product/${item.id}`)
                }
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

export default MyProduct;
