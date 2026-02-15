import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MyProduct.css";
import { getMyProducts } from "../../../../api/myproduct";
import pb from "../../../../lib/pb";
import { useNavigate } from "react-router-dom";

import ledPanel from "./images/great-vision-fanbox.png";
import smartSwitch from "./images/12-way-mcb-box-great-vision.png";
import shopowner from "./images/great-vision-new-logo.png";

const LIMIT = 8;

const MyProduct = ({ formatPrice }) => {
  const navigate = useNavigate();
  const observer = useRef(null);
  const fetchingRef = useRef(false);

  const localProducts = [
    { id: "local-1", name: "LED Panel Light", price: 799, image: ledPanel },
    { id: "local-2", name: "Smart Switch Board", price: 1499, image: smartSwitch },
  ];

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(false);

  const loadProducts = async (pageNumber) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      setLoading(true);
      const data = await getMyProducts(pageNumber, LIMIT);

      if (Array.isArray(data) && data.length > 0) {
        setProducts((prev) => {
          const filtered = data.filter(
            (item) => !prev.some((p) => p.id === item.id)
          );
          return pageNumber === 1
            ? filtered
            : [...prev, ...filtered];
        });

        if (data.length < LIMIT) setHasMore(false);
      } else {
        setHasMore(false);
      }

      setBackendError(false);
    } catch (err) {
      console.error("PB Fetch Error:", err);
      setBackendError(true);
      setHasMore(false);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 0.8 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (backendError) {
    return (
      <div className="myproduct-grid">
        {localProducts.map((item) => (
          <div key={item.id} className="myproduct-card">
            <div className="myproduct-img">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div className="myproduct-content">
              <h3 className="myproduct-name">{item.name}</h3>
              <p className="myproduct-price">
                {formatPrice ? formatPrice(item.price) : `₹${item.price}`}
              </p>
              <button
                className="myproduct-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="myproduct-grid">
      {products.map((item, index) => {
        let imageSrc = "";

        try {
          if (item?.main_image) {
            imageSrc = pb.files.getURL(item, item.main_image);
          } else if (item?.images?.length > 0) {
            imageSrc = pb.files.getURL(item, item.images[0]);
          }
        } catch {}

        const hasMrp =
          item?.mrp && Number(item.mrp) > Number(item.price);

        const discountPercent = hasMrp
          ? Math.round(
              ((Number(item.mrp) - Number(item.price)) /
                Number(item.mrp)) * 100
            )
          : 0;

        const isLast = index === products.length - 1;

        return (
          <div
            key={item.id}
            ref={isLast ? lastProductRef : null}
            className="myproduct-card"
          >
            <div className="myproduct-img">
              {imageSrc && (
                <img src={imageSrc} alt={item.name} loading="lazy" />
              )}
            </div>

            <div className="myproduct-content">
              <div className="myproduct-text">
                <h3 className="myproduct-name">{item.name}</h3>

                <p className="myproduct-price">
                  {formatPrice
                    ? formatPrice(item.price || 0)
                    : `₹${item.price || 0}`}
                </p>

                <p
                  className={`myproduct-stock ${
                    item.stock <= 10 ? "out" : ""
                  }`}
                >
                  {item.stock > 0
                    ? `In Stock (${item.stock})`
                    : "Out of Stock"}
                </p>

                {/* 🔥 Badge under stock */}
                {item?.offer_enabled &&
                  hasMrp &&
                  discountPercent > 0 && (
                    <div className="deal-badge-inline">
                      Limited time deal
                    </div>
                )}
              </div>

              <button
                className="myproduct-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
