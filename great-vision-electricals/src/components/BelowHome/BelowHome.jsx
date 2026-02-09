import "./BelowHome.css";
import { FaStore, FaBoxOpen, FaGlobe, FaStar } from "react-icons/fa";
import { differenceInYears } from "date-fns";

export default function Screen() {
  const startYear = new Date(2008, 0, 1);
  const years = differenceInYears(new Date(), startYear);

  return (
    <section className="screen">
      <div className="screen-inner">
        {/* DEVICE */}
        <div className="device-wrap">
          <div className="device-frame">
            <img src="/image.png" alt="Preview" />

            <div className="mobile-frame">
              <div className="mobile-border">
                <img src="/mobile.png" alt="Mobile preview" />
              </div>
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="info-box">
          <div className="info-item">
            <div className="info-icon"><FaStore /></div>
            <div className="info-title">Store</div>
            <div className="info-sub">{years}+ Years Experience</div>
          </div>

          <div className="info-divider" />

          <div className="info-item">
            <div className="info-icon"><FaBoxOpen /></div>
            <div className="info-title">Offline</div>
            <div className="info-sub">Offline Store</div>
          </div>

          <div className="info-divider" />

          <div className="info-item">
            <div className="info-icon"><FaGlobe /></div>
            <div className="info-title">Online</div>
            <div className="info-sub">Now Available Online</div>
          </div>

          <div className="info-divider" />

          <div className="info-item">
            <div className="info-icon"><FaStar /></div>
            <div className="info-title">Sponsored</div>
            <div className="info-sub">By Shivam Electricals</div>
          </div>
        </div>

        <div className="info-spacer" />

        {/* OWNERSHIP */}
        <div className="ownership">
          <div className="ownership-title">Owned by</div>
          <div className="ownership-sub">Shivam Electricals</div>
        </div>

        {/* OWNER BOXES */}
        <div className="owner-boxes">
          {/* TRUSTED */}
        <div className="owner-box">
  <div className="infra-badge sm">
    SHIVAM ELECTRICALS
  </div>


            <img src="/trusted.png" alt="Trusted" className="owner-img" />
            <span></span>
          </div>

          {/* SINCE – GRAPHIC TYPE */}
          <div className="owner-box since-box">
            <div className="since-top">SINCE</div>
            <div className="since-year">2008</div>
           <div className="info-sub">{years}+ Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
