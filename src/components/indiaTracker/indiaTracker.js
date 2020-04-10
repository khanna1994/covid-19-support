import React from "react";
import { Table, Spin, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Header from "../layouts/header";
import CountUp from "react-countup";
import moment from "moment";
import PrecautionCarousel from "../common/precautionCaraousel";
import WarningCarousel from "../common/warningCarousel";
import ReactGA from 'react-ga';

const columns = [
  {
    title: "State",
    sorter: true,

    render: text => (
      <div className="row" style={{ width: "15rem" }}>
        <div className="col">
          <p className="tableDataStyle">{text.state}</p>
        </div>
      </div>
    )
  },
  {
    title: "Confirmed Cases",
    sorter: (a, b) => a.confirmed - b.confirmed,
    render: text => <p className="tableDataStyle">{text.confirmed}</p>
  },
  {
    title: "Active Cases",
    sorter: (a, b) => a.amount - b.amount,
    render: text => <p className="tableDataStyle">{text.active}</p>
  },
  {
    title: "New Cases",
    dataIndex: "deltaconfirmed",
    key: "deltaconfirmed",
    sorter: (a, b) => a.deltaconfirmed - b.deltaconfirmed,
    render: text => (
      <div className="row" style={{ width: "12rem" }}>
        <div className="col">
          <p
            style={{
              background: "#FFEEAA",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >{`+ ${text}`}</p>
        </div>
      </div>
    )
  },
  {
    title: "Total Deaths",
    dataIndex: "deaths",
    sorter: (a, b) => a.deaths - b.deaths,
    key: "deaths",
    render: text => <p className="tableDataStyle">{text}</p>
  },
  {
    title: "New Deaths",
    dataIndex: "deltadeaths",
    key: "deltadeaths",
    sorter: (a, b) => a.deltadeaths - b.deltadeaths,
    render: text => (
      <div className="row" style={{ width: "12rem" }}>
        <div className="col">
          <p
            style={{
              background: "red",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >{`+ ${text}`}</p>
        </div>
      </div>
    )
  },
  {
    title: "Total Recovered",
    sorter: (a, b) => a.recovered - b.recovered,
    render: text => <p className="tableDataStyle">{text.recovered}</p>
  },

  {
    title: "Serious Critical",
    dataIndex: "serious_critical",
    key: "serious_critical",
    sorter: true,
    render: text => <p className="tableDataStyle">0</p>
  }
];
export default class IndiaTracker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateDataList: [],
      totalCount: null,
      overallData: [],
      lastUpdated: "",
      isLoading: true,
      page: 1
    };
  }
  resetData = () => {
    fetch("https://api.covid19india.org/data.json")
      .then(response => response.json())
      .then(data => {
        const dataOverallLength = data.cases_time_series.length;
        const overallData = data.cases_time_series[dataOverallLength - 1];
        this.setState({
          stateDataList: data.statewise,
          lastUpdated: data.statewise[0].lastupdatedtime,
          isLoading: false,
          overallData
        });
        document.getElementById("body").style.opacity = "1";
      });
  };
  componentDidMount() {
    ReactGA.initialize('UA-163316186-1');
    ReactGA.pageview('/india-tracker');
    document.getElementById("body").style.opacity = "0.4";
    fetch("https://api.covid19india.org/data.json")
      .then(response => response.json())
      .then(data => {
        const dataOverallLength = data.cases_time_series.length;
        const overallData = data.cases_time_series[dataOverallLength - 1];
        this.setState({
          stateDataList: data.statewise,
          lastUpdated: data.statewise[0].lastupdatedtime,
          isLoading: false,
          overallData
        });
        document.getElementById("body").style.opacity = "1";
      });
  }

  onPaginationChange = pageNumber => {
    this.setState({ page: pageNumber });
    this.pageChangeData(pageNumber);
  };
  renderTable = () => {
    const { stateDataList } = this.state;
    if (stateDataList) {
      if (stateDataList.length > 0) {
        return (
          <>
            <Table
              columns={columns}
              dataSource={stateDataList}
              pagination={false}
              style={{ marginBottom: "5%" }}
              responsive
            />
          </>
        );
      }
    }
  };

  renderOverallData = () => {
    const { stateDataList } = this.state;
    if (stateDataList) {
      if (stateDataList.length > 0) {
        const dataTotal = stateDataList[0].confirmed;
        const dataRecover = stateDataList[0].recovered;
        const dataDeath = stateDataList[0].deaths;
        let totalNumber = dataTotal.replace(/,/g, "");
        let recoverNumber = dataRecover.replace(/,/g, "");
        let deathNumber = dataDeath.replace(/,/g, "");
        let activeNumber = parseInt(stateDataList[0].active);

        return (
          <div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle" style={{ color: "#f34423" }}>Confirmed Cases:</h1>
                <div className="card-body">
                  <h1
                    className="card-text"
                    style={{
                      color: "#f34423",
                      fontSize: "30px",
                      fontWeight: "bold"
                    }}
                  >
                    <CountUp end={parseInt(totalNumber)} start={0} />
                  </h1>
                  <h1 className="dailyIndiaData" style={{ color: "#f34423" }}>
                    (+ {stateDataList[0].deltaconfirmed})
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle" style={{ color: "#007bff" }}>Active Cases:</h1>
                <div className="card-body">
                  <h1
                    className="card-text"
                    style={{
                      color: "#007bff",
                      fontSize: "30px",
                      fontWeight: "bold"
                    }}
                  >
                    <CountUp end={parseInt(activeNumber)} start={0} />
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle">Deaths: </h1>
                <div className="card-body">
                  <h1
                    className="card-text"
                    style={{
                      color: "#696969",
                      fontSize: "30px",
                      fontWeight: "bold"
                    }}
                  >
                    <CountUp end={parseInt(deathNumber)} />
                  </h1>
                  <h1 className="dailyIndiaData" style={{ color: "#696969" }}>
                    (+ {stateDataList[0].deltadeaths})
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h3 className="cardTitleStyle" style={{ color: "#8acb2c" }}>Recovered:</h3>
                <div className="card-body">
                  <h1
                    className="card-text"
                    style={{
                      color: "#8acb2c",
                      fontSize: "30px",
                      fontWeight: "bold"
                    }}
                  >
                    <CountUp end={parseInt(recoverNumber)} />
                  </h1>
                  <h1 className="dailyIndiaData" style={{ color: "#8acb2c" }}>
                    (+ {stateDataList[0].deltarecovered})
                  </h1>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  handleChange = e => {
    const { stateDataList } = this.state;
    this.filterIt(stateDataList, e.target.value);
  };
  filterIt = (arr, searchKey) => {
    if (searchKey === "") {
      this.resetData();
    }

    const returnData = arr.filter(item =>
      item.state.toLowerCase().includes(searchKey)
    );
    this.setState({
      stateDataList: returnData
    });
  };

  render() {
    const { lastUpdated, isLoading } = this.state;
    return (
      <div>
        {isLoading && <Spin size="large" />}
        <Header props={this.props} isActive={"india"} />
        <PrecautionCarousel />
        <div className="row">
          <div className="col">
            <h1>COVID-19 CORONAVIRUS PANDEMIC </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p style={{ color: "rgb(40, 167, 69)", fontSize: "18px", fontFamily: 'archia', fontWeight: '900' }}>
              Last updated:{" "}
              {moment(lastUpdated, "dd/mm/yyyy, hh:mm a").format(
                "DD MMMM YY, hh:mm a"
              )}{" "}
              IST
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>India Covid-19 Tracker</h1>
          </div>
        </div>
        {this.renderOverallData()}

        <WarningCarousel />
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col-md-12">
            <h1>COMPILED FROM STATE GOVT. NUMBERS</h1>
          </div>
        </div>
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col searchBoxStyle">
            <Input
              placeholder="Search your state here"
              id="search"
              onChange={this.handleChange}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col-md-12">{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}
