import React from "react";
import Header from "../layouts/header";
import StaySafe from "../../images/stay-safe.png";
import {customerRef} from '../../firebase'


export default class HelpfulLinks extends React.PureComponent {

  render() {
    return (
      <div>
        <Header isActive={"links"} />
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <p className="helplineTextStyle">HELPLINE NUMBERS [BY STATE]</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a
              className="helplineTextStyle"
              href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
              target="_blank"
            >
              HTTPS://WWW.MOHFW.GOV.IN/PDF/CORONVAVIRUSHELPLINENUMBER.PDF
            </a>
          </div>
        </div>

        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <p className="helplineTextStyle">
              MINISTRY OF HEALTH AND FAMILY WELFARE, GOV. OF INDIA
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a
              className="helplineTextStyle"
              href="https://www.mohfw.gov.in/"
              target="_blank"
            >
              HTTPS://WWW.MOHFW.GOV.IN/
            </a>
          </div>
        </div>

        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <p className="helplineTextStyle">WHO : COVID-19 HOME PAGE</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a
              className="helplineTextStyle"
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
              target="_blank"
            >
              HTTPS://WWW.WHO.INT/EMERGENCIES/DISEASES/NOVEL-CORONAVIRUS-2019
            </a>
          </div>
        </div>

        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <p className="helplineTextStyle">
              CROWDSOURCED LIST OF RESOURCES & ESSENTIALS FROM ACROSS INDIA
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a
              className="helplineTextStyle"
              href="https://bit.ly/covid19resourcelist"
              target="_blank"
            >
              HTTPS://BIT.LY/COVID19RESOURCELIST
            </a>
          </div>
        </div>

        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <p className="helplineTextStyle">COVID-19 GLOBAL TRACKER</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a
              className="helplineTextStyle"
              href="https://coronavirus.thebaselab.com/"
              target="_blank"
            >
              HTTPS://CORONAVIRUS.THEBASELAB.COM/
            </a>
          </div>
        </div>
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <h3 className="taglineStyle">
              WE STAND WITH EVERYONE FIGHTING ON THE FRONTLINES
            </h3>
          </div>
        </div>
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col">
            <img
              src={StaySafe}
              alt="No Photo"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
