import React from "react";
import {
 Carousel
} from "antd";


const PrecautionCarousel = props => {

  return (
    <div className="row" style={{ marginTop: "5%", marginBottom: "5%" }}>
    <div className="col-md-12">
      <Carousel autoplay effect="scrollx">
        <div>
          <h1 className="precDatastyle" style={{ color: '#fff'}}>
            Lockdown means LOCKDOWN! Avoid going out unless absolutely
            necessary. Stay safe!
          </h1>
        </div>
        <div>
          <h1 className="precDatastyle" style={{ color: '#fff'}}>
            Call up your loved ones during the lockdown, support each
            other through these times.
          </h1>
        </div>
        <div>
          <h1 className="precDatastyle" style={{ color: '#fff'}}>
            Stand against FAKE news and illegit WhatsApp forwards! Do NOT
            ❌ forward a message until you verify the content it contains.{" "}
          </h1>
        </div>

        <div>
          <h1 className="precDatastyle" style={{ color: '#fff'}}>
            Help out the elderly by bringing them their groceries and
            other essentials.
          </h1>
        </div>
        <div>
          <h1 className="precDatastyle" style={{ color: '#fff'}}>
            Help the medical fraternity by staying at home!
          </h1>
        </div>
      </Carousel>
    </div>
  </div>

  );
};

export default PrecautionCarousel;
