import React, { useEffect, useState, useRef, useCallback } from "react";
import "./OtherBrandProduct.css";
import { getOtherProducts } from "../../../../api/myproduct";
import pb from "../../../../lib/pb";
import { useNavigate } from "react-router-dom";

const LIMIT = 8;

const OtherBrandProduct = ({ formatPrice }) => {
  const navigate = useNavigate();
  const observer = useRef(null);
  const fetchingRef = useRef(false);

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
      const data = await getOtherProducts(pageNumber, LIMIT);

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
      console.error("OtherBrand Fetch Error:", err);
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
      <div className="otherproduct-grid">
        <p style={{ textAlign: "center" }}>
          Failed to load products
        </p>
      </div>
    );
  }

  return (
    <div className="otherproduct-grid">

      {products.length === 0 && !loading && (
        <p style={{ textAlign: "center" }}>
          No products available
        </p>
      )}

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
            className="otherproduct-card"
          >
            <div className="otherproduct-img">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={item.name}
                  loading="lazy"
                />
              )}
            </div>

            <div className="otherproduct-content">
              <div className="otherproduct-text">
                <h3 className="otherproduct-name">
                  {item.name}
                </h3>

                <p className="otherproduct-price">
                  {formatPrice
                    ? formatPrice(item.price || 0)
                    : `₹${item.price || 0}`}
                </p>

                <p
                  className={`otherproduct-stock ${
                    item.stock <= 10 ? "out" : ""
                  }`}
                >
                  {item.stock > 0
                    ? `In Stock (${item.stock})`
                    : "Out of Stock"}
                </p>

                {/* 🔥 Same Deal Badge */}
                {item?.offer_enabled &&
                  hasMrp &&
                  discountPercent > 0 && (
                    <div className="deal-badge-inline">
                      Limited time deal
                    </div>
                )}
              </div>

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

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default OtherBrandProduct;
