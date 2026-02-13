import React, { useState } from "react";
import "./Product.css";

import MyProduct from "./MyProduct/MyProduct";
import OtherBrandProduct from "./OtherBrandProduct/OtherBrandProduct";

const Product = () => {
  const [isOtherBrand, setIsOtherBrand] = useState(false);

  const handleToggle = (e) => {
    setIsOtherBrand(e.target.checked);
  };

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="product-section">
      <div className="product-container">

        {/* Toggle */}
        <div className="switch-holder">
          <div className="switch-label">
            <span>
              {isOtherBrand ? "Other Brand Product" : "My Product"}
            </span>
          </div>

          <div className="switch-toggle">
            <input
              type="checkbox"
              id="productSwitch"
              checked={isOtherBrand}
              onChange={handleToggle}
            />
            <label htmlFor="productSwitch"></label>
          </div>
        </div>

        {/* Products */}
        <div className="product-view">
          {isOtherBrand ? (
            <OtherBrandProduct formatPrice={formatPrice} />
          ) : (
            <MyProduct formatPrice={formatPrice} />
          )}
        </div>

      </div>
    </section>
  );
};

export default Product;
