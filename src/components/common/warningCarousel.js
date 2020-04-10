import React from "react";
import {
 Carousel
} from "antd";


const WarningCarousel = props => {

  return (

<div className="row" style={{ marginTop: "5%" }}>
<div className="col-md-12">
  <Carousel autoplay effect="fade">
    <div>
      <h1 className="precDatastyle" style={{ color: '#fff'}}>
        Regularly and thoroughly clean your hands with an
        alcohol-based hand rub or wash them with soap and water.
      </h1>
    </div>
    <div>
      <h1 className="precDatastyle" style={{ color: '#fff'}}>
        Maintain at least 1 metre (3 feet) distance between yourself
        and anyone who is coughing or sneezing.
      </h1>
    </div>
    <div>
      <h1 className="precDatastyle" style={{ color: '#fff'}}>
        Avoid touching eyes, nose and mouth
      </h1>
    </div>

    <div>
      <h1 className="precDatastyle" style={{ color: '#fff'}}>
        If you have fever, cough and difficulty breathing, seek
        medical care early
      </h1>
    </div>
    <div>
      <h1 className="precDatastyle" style={{ color: '#fff'}}>
        Stay informed and follow advice given by your healthcare
        provider
      </h1>
    </div>
  </Carousel>
</div>
</div>

  );
};

export default WarningCarousel;

