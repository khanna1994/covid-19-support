import React from "react";
import { Table, Pagination, Spin, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Header from "../layouts/header";
import CountUp from "react-countup";
import PrecautionCarousel from "../common/precautionCaraousel";
import WarningCarousel from "../common/warningCarousel";
import ReactGA from 'react-ga';

const columns = [
  {
    title: "Country",

    render: text => (
      <div className="row" style={{ width: "15rem" }}>
        <div className="col">
          <p className="tableDataStyle">{text.country}</p>
        </div>
        <div className="col">
          <img
            style={{ width: "20px", height: "20px" }}
            src={text.flag}
            alt="No Flag"
          />
        </div>
      </div>
    )
  },
  {
    title: "Total Cases",
    dataIndex: "total_cases",
    key: "total_cases",
    render: text => <p className="tableDataStyle">{text}</p>
  },
  {
    title: "New Cases",
    dataIndex: "new_cases",
    key: "new_cases",
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
    dataIndex: "total_deaths",
    key: "total_deaths",
    render: text => <p className="tableDataStyle">{text}</p>
  },
  {
    title: "New Deaths",
    dataIndex: "new_deaths",
    key: "new_deaths",
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
    dataIndex: "total_recovered",
    key: "total_recovered",
    render: text => <p className="tableDataStyle">{text}</p>
  },
  {
    title: "Active Cases",
    dataIndex: "active_cases",
    key: "active_cases",
    render: text => <p className="tableDataStyle">{text}</p>
  },
  {
    title: "Serious Critical",
    dataIndex: "serious_critical",
    key: "serious_critical",
    render: text => <p className="tableDataStyle">{text}</p>
  }
];
export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countryDataList: [],
      totalCount: null,
      overallData: [],
      lastUpdated: "",
      isLoading: true,
      page: 1
    };
  }
  pageChangeData = page => {
    fetch(
      `https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?page=${page}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          countryDataList: data.data.rows,
          totalCount: data.data.paginationMeta.totalRecords
        });
      });
  };
  componentDidMount() {
    ReactGA.initialize('UA-163316186-1');
    ReactGA.pageview('/home');
    document.getElementById("body").style.opacity = "0.4";
    fetch(
      "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          countryDataList: data.data.rows,
          totalCount: data.data.paginationMeta.totalRecords,
          lastUpdated: data.data.last_update,
          isLoading: false
        });
        document.getElementById("body").style.opacity = "1";
      });

    fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats")
      .then(response => response.json())
      .then(data => {
        this.setState({
          overallData: data.data
        });
      });
  }

  onPaginationChange = pageNumber => {
    this.setState({ page: pageNumber });
    this.pageChangeData(pageNumber);
  };
  renderTable = () => {
    const { countryDataList, totalCount } = this.state;
    if (countryDataList) {
      if (countryDataList.length > 0) {
        return (
          <>
            <Table
              columns={columns}
              dataSource={countryDataList}
              pagination={false}
              style={{ marginBottom: "5%" }}
              responsive
            />
            <Pagination
              defaultCurrent={1}
              pageSize={10}
              total={totalCount}
              responsive
              onChange={this.onPaginationChange}
              style={{ marginBottom: "5%" }}
            />
          </>
        );
      }
    }
  };

  renderOverallData = () => {
    const { overallData } = this.state;
    if (overallData) {
      if (overallData.total_cases) {
        const dataTotal = overallData.total_cases;
        const dataRecover = overallData.recovery_cases;
        const dataDeath = overallData.death_cases;
        let totalNumber = dataTotal.replace(/,/g, "");
        let recoverNumber = dataRecover.replace(/,/g, "");
        let deathNumber = dataDeath.replace(/,/g, "");

        return (
          <div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle" style={{ color: "#f34423" }}>Coronavirus Cases:</h1>
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
                </div>
              </div>
            </div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle" style={{ color: "#696969" }}>Deaths: </h1>
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
                </div>
              </div>
            </div>
            <div>
              <div className="card cardStyle cardWidthStyle">
                <h1 className="cardTitleStyle" style={{ color: "#8acb2c" }}>Recovered:</h1>
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
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  handleChange = e => {
    const { countryDataList } = this.state;
    this.filterIt(countryDataList, e.target.value);
  };
  filterIt = (arr, searchKey) => {
    const { page } = this.state;
    if (searchKey === "") {
      this.pageChangeData(page);
    }

    const returnData = arr.filter(item =>
      item.country.toLowerCase().includes(searchKey)
    );
    this.setState({
      countryDataList: returnData
    });
  };

  render() {
    const { lastUpdated, isLoading } = this.state;
    return (
      <div>
        {isLoading && <Spin size="large" />}
        <Header props={this.props} isActive={"home"} />
        <PrecautionCarousel />
        <div className="row">
          <div className="col">
            <h1>COVID-19 CORONAVIRUS PANDEMIC </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p style={{ color: "rgb(40, 167, 69)", fontSize: "18px", fontFamily: 'archia', fontWeight: '900' }}>
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>World Tracker</h1>
          </div>
        </div>
        {this.renderOverallData()}
        <WarningCarousel />
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col-md-12">
            <h1>
              Confirmed Cases and Deaths by Country, Territory, or Conveyance
            </h1>
          </div>
        </div>
        <div className="row" style={{ marginTop: "5%" }}>
          <div className="col searchBoxStyle">
            <Input
              placeholder="Search your country here"
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
