import React from "react";
import "./OtherBrandProduct.css";

const OtherBrandProduct = ({ formatPrice }) => {

  const products = [
    {
      id: 1,
      name: "Ceiling LED Light",
      price: 1199,
      image: "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 2,
      name: "Decorative Wall Lamp",
      price: 999,
      image: "https://images.pexels.com/photos/5824518/pexels-photo-5824518.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 3,
      name: "Luxury Pendant Light",
      price: 2499,
      image: "https://images.pexels.com/photos/5824516/pexels-photo-5824516.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 4,
      name: "Modern Wall Sconce",
      price: 1599,
      image: "https://images.pexels.com/photos/5824515/pexels-photo-5824515.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  return (
    <div className="otherproduct-grid">
      {products.map((item) => (
        <div key={item.id} className="otherproduct-card">

          <div className="otherproduct-img">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
          </div>

          <div className="otherproduct-content">
            <h3 className="otherproduct-name">
              {item.name}
            </h3>

            <p className="otherproduct-price">
              {formatPrice(item.price)}
            </p>

            <button className="otherproduct-btn">
              View Details
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default OtherBrandProduct;
