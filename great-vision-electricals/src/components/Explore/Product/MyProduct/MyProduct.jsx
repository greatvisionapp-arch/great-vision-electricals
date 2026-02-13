import React, { useEffect, useState } from "react";
import "./MyProduct.css";
import { getMyProducts, getProductImage } from "../../../../api/myproduct";

import ledPanel from "./images/great-vision-fanbox.png";
import smartSwitch from "./images/12-way-mcb-box-great-vision.png";

const MyProduct = ({ formatPrice }) => {

  // 🔹 Always visible local products
  const localProducts = [
    {
      id: "local-1",
      name: "LED Panel Light",
      price: 799,
      image: ledPanel,
      isLocal: true
    },
    {
      id: "local-2",
      name: "Smart Switch Board",
      price: 1499,
      image: smartSwitch,
      isLocal: true
    }
  ];

  const [pbProducts, setPbProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getMyProducts();
        console.log("PB DATA:", data); // debug
        if (Array.isArray(data)) {
          setPbProducts(data);
        }
      } catch (err) {
        console.error("PB Fetch Error:", err);
      }
    }

    loadProducts();
  }, []);

  const allProducts = [...localProducts, ...pbProducts];

  return (
    <div className="myproduct-grid">
      {allProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>No products available</p>
      )}

      {allProducts.map((item) => {
        let imageSrc = "";

        if (item.isLocal) {
          imageSrc = item.image;
        } else {
          imageSrc = getProductImage(item);
        }

        return (
          <div key={item.id} className="myproduct-card">
            <div className="myproduct-img">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.name}
                  loading="lazy"
                />
              )}
            </div>

            <div className="myproduct-content">
              <h3 className="myproduct-name">{item.name}</h3>

              <p className="myproduct-price">
                {formatPrice
                  ? formatPrice(item.price)
                  : `₹${item.price}`}
              </p>

              <button className="myproduct-btn">
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyProduct;
