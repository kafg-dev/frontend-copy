import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cx from "classnames";
import { Col, Row, Card, Progress } from "reactstrap";

import Widget from "../../components/Widget";
import Trend from "react-trend";
import MainChart from "./components/Charts/MainChart";
import TaskContainer from "./components/TaskContainer/TaskContainer";
import BigStat from "./components/BigStat/BigStat";
import TableContainer from "./components/TableContainer/TableContainer";
import Calendar from "../dashboard/components/calendar/Calendar";
import HighchartsReact from "highcharts-react-official";

import mock from "./mock";
import s from "./Analitycs.module.scss";
import { receiveDataRequest } from "../../actions/analytics";

import ApexChart from "react-apexcharts";
import chartsData from "./mockApex";
import highChartsData from "./mockHighcharts";

class Analytics extends Component {
  static propTypes = {
    visits: PropTypes.any,
    performance: PropTypes.any,
    server: PropTypes.any,
    revenue: PropTypes.any,
    mainChart: PropTypes.any,
    isReceiving: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visits: {},
    performance: {},
    server: {},
    revenue: [],
    mainChart: [],
    isReceiving: false,
  };

  donut = () => {
    let series = [
      {
        name: "Revenue",
        data: this.props.revenue.map((s) => {
          return {
            name: s.label,
            y: s.data,
          };
        }),
      },
    ];
    return {
      chart: {
        type: "pie",
        height: 120,
        backgroundColor: "rgba(0,0,0,0)",
      },
      credits: {
        enabled: false,
      },
      title: false,
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          borderWidth: 0,
          showInLegend: true,
          innerSize: 60,
          size: 100,
          states: {
            hover: {
              halo: {
                size: 1,
              },
            },
          },
        },
      },
      colors: ["#FD5F00", "#005792", "#1A86D0"],
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          color: "#788898",
          fontWeight: 400,
        },
        itemHoverStyle: {
          color: "#cccccc",
        },
        itemMarginBottom: 5,
        symbolRadius: 0,
      },
      exporting: {
        enabled: false,
      },
      series,
    };
  };

  componentDidMount() {
    this.props.dispatch(receiveDataRequest());
  }

  state = {
    cd: chartsData,
    cdh: highChartsData,
  };

  render() {
    const { visits, isReceiving, performance, server, mainChart } = this.props;

    const { cd, cdh } = this.state;

    return (
      <div>
        <h1 className="page-title">Statistics</h1>
        <div className={s.sidesWrapper}>
          <div className={s.analyticsSide}>
            <Row>
              <Col xl={3} lg={4} md={6} xs={12}>
                <Widget>
                  <div className="clearfix">
                    <Row className="flex-nowrap">
                      <Col xs={3}>
                        <span className="widget-icon">
                          <i className="fi flaticon-like text-primary" />
                        </span>
                      </Col>
                      <Col xs="9">
                        <h6 className="m-0">VODEVI CALLS (YEAR)</h6>
                        <p className="h2 m-0 fw-normal">4,332</p>
                      </Col>
                    </Row>
                    <Row className="flex-nowrap">
                      <Col xs={6}>
                        <h6 className="m-0">This month</h6>
                        <p className="value5">16</p>
                      </Col>
                      <Col xs="6">
                        <h6 className="m-0">Last Call</h6>
                        <p className="value5">10 Oct 2021</p>
                      </Col>
                    </Row>
                  </div>
                </Widget>
              </Col>
              <Col xl={3} lg={4} md={6} xs={12}>
                <Widget>
                  <div className="clearfix">
                    <Row className="flex-nowrap">
                      <Col xs={3}>
                        <span className="widget-icon">
                          <i className="fi flaticon-magic-wand text-danger" />
                        </span>
                      </Col>
                      <Col xs="9">
                        <h6 className="m-0">VODEVI MINUTES (YEAR)</h6>
                        <p className="h2 m-0 fw-normal">12,324</p>
                      </Col>
                    </Row>
                    <Row className="flex-nowrap">
                      <Col xs={6}>
                        <h6 className="m-0">This month</h6>
                        <p className="value5">190 min</p>
                      </Col>
                      <Col xs="6">
                        <h6 className="m-0">Avg Minute</h6>
                        <p className="value5">17 min</p>
                      </Col>
                    </Row>
                  </div>
                </Widget>
              </Col>
              <Col xl={3} lg={4} md={6} xs={12}>
                <Widget>
                  <div className="clearfix">
                    <Row className="flex-nowrap">
                      <Col xs={3}>
                        <span className="widget-icon">
                          <i className="fi flaticon-shuffle text-info" />
                        </span>
                      </Col>
                      <Col xs="9">
                        <h6 className="m-0">TOTAL SOLVED (YEAR)</h6>
                        <p className="h2 m-0 fw-normal">4,330</p>
                      </Col>
                    </Row>
                    <Row className="flex-nowrap">
                      <Col xs={6}>
                        <h6 className="m-0">Solved (Month)</h6>
                        <p className="value5">562</p>
                      </Col>
                      <Col xs="6">
                        <h6 className="m-0">Total Pending</h6>
                        <p className="value5">32</p>
                      </Col>
                    </Row>
                  </div>
                </Widget>
              </Col>
              <Col xl={3} lg={4} md={6} xs={12}>
                <Widget>
                  <div className="clearfix">
                    <Row className="flex-nowrap">
                      <Col xs={3}>
                        <span className="widget-icon">
                          <i className="fi flaticon-diamond text-success" />
                        </span>
                      </Col>
                      <Col xs="9">
                        <h6 className="m-0">TOTAL LOGINS (YEAR)</h6>
                        <p className="h2 m-0 fw-normal">156</p>
                      </Col>
                    </Row>
                    <Row className="flex-nowrap">
                      <Col xs={6}>
                        <h6 className="m-0">This Month</h6>
                        <p className="value5">17</p>
                      </Col>
                      <Col xs="6">
                        <h6 className="m-0">Last Week</h6>
                        <p className="value5">6</p>
                      </Col>
                    </Row>
                  </div>
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col xl={5} lg={5} xs={12}>
                <Widget
                  title={
                    <h5>
                      <span className="fw-semi-bold">Vodevi Call Volume</span>
                    </h5>
                  }
                  //close
                  //collapse
                >
                  <ApexChart
                    className="sparkline-chart"
                    type={"bar"}
                    series={cd.column.series}
                    options={cd.column.options}
                  />
                </Widget>
              </Col>
              <Col xl={7} lg={7} xs={12}>
                <Widget
                  title={
                    <h5>
                      <span className="fw-semi-bold">
                        Duration of Vodevi Calls
                      </span>
                    </h5>
                  }
                  //close
                  //collapse
                >
                  <HighchartsReact options={cdh.line} />
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col md="6" xl="4">
                <Card
                  className={s.bgMidnightBloom}
                  //className="p-3 mb-5 "
                >
                  <div className={s.alignBoxRow}>
                    <div className="text-warning font-size-xl font-weight-bold pr-2">
                      500 Min
                    </div>
                    <div className="flex-grow-1">
                      <Progress
                        animated
                        className="progress-bar-rounded bg-white-50 progress-sm"
                        color="warning"
                        value="83"
                      />
                    </div>
                  </div>
                  <div className="text-white-50 pt-2">
                    USED MINUTES (600 Min)
                  </div>
                </Card>
              </Col>
              <Col md="6" xl="4">
                <Card
                  className={s.bgAsteroid}
                  //className="p-3 mb-5 "
                >
                  <div className={s.alignBoxRow}>
                    <div className="text-danger font-size-xl font-weight-bold pr-2">
                      300 MB
                    </div>
                    <div className="flex-grow-1">
                      <Progress
                        animated
                        className="progress-bar-rounded bg-white-50 progress-sm"
                        color="danger"
                        value="60"
                      />
                    </div>
                  </div>
                  <div className="text-white-50 pt-2">USED STORAGE (500MB)</div>
                </Card>
              </Col>
              <Col md="6" xl="4">
                <Card
                  className={s.bgMidnightBloom}
                  //className="p-3 mb-5 "
                >
                  <div className={s.alignBoxRow}>
                    <div className="text-warning font-size-xl font-weight-bold pr-2">
                      70 Call
                    </div>
                    <div className="flex-grow-1">
                      <Progress
                        animated
                        className="progress-bar-rounded bg-white-50 progress-sm"
                        color="warning"
                        value="70"
                      />
                    </div>
                  </div>
                  <div className="text-white-50 pt-2">USED CALLS (100)</div>
                </Card>
              </Col>
            </Row>
          </div>
          {/* <div className={s.analyticsSide}>
            <Row>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    className="mb-0 h-100"
                    close
                    bodyClass="mt-lg"
                    fetchingData={isReceiving}
                    title={<h5>Visits Today</h5>}
                  >
                    <div className="d-flex justify-content-between align-items-center mb h3">
                      <h2 style={{ fontSize: "2.1rem" }}>{visits.count}</h2>
                      <i className="la la-arrow-right text-success rotate-315" />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                      <div className={cx("mt")}>
                        <h6>+{visits.logins}</h6>
                        <p className="text-muted mb-0 mr">
                          <small>Logins</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>{visits.sign_out_pct}%</h6>
                        <p className="text-muted mb-0">
                          <small>Sign Out</small>
                        </p>
                      </div>
                      <div className={cx("mt")}>
                        <h6>{visits.rate_pct}%</h6>
                        <p className="text-muted mb-0 mr">
                          <small>Rate</small>
                        </p>
                      </div>
                    </div>
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    bodyClass="mt"
                    close
                    className="mb-0 h-100"
                    fetchingData={isReceiving}
                    title={<h5>Revenue Breakdown</h5>}
                  >
                    <HighchartsReact options={this.donut()} />
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    bodyClass="mt"
                    close
                    className="mb-0 h-100"
                    fetchingData={isReceiving}
                    title={<h5>App Perfomance</h5>}
                  >
                    <p className="text-muted d-flex flex-wrap">
                      <small className="mr-lg d-flex align-items-center">
                        <span
                          className="circle bg-danger text-success mr-xs"
                          style={{ fontSize: "4px" }}
                        >
                          .
                        </span>
                        This Period
                      </small>
                      <small className="mr-lg d-flex align-items-center">
                        <span
                          className="circle bg-primary text-warning mr-xs"
                          style={{ fontSize: "4px" }}
                        >
                          .
                        </span>
                        Last Period
                      </small>
                    </p>
                    <h6 className="fs-sm text-muted">SDK</h6>
                    <Progress
                      color="primary"
                      className="progress-sm"
                      style={{ height: "3px", marginBottom: "5px" }}
                      value={performance.sdk?.this_period_pct}
                    />
                    <Progress
                      color="danger"
                      className="progress-sm"
                      style={{ height: "3px" }}
                      value={performance.sdk?.last_period_pct}
                    />
                    <h6 className="mt fs-sm text-muted">Integration</h6>
                    <Progress
                      color="primary"
                      className="progress-sm"
                      style={{ height: "3px", marginBottom: "5px" }}
                      value={performance.integration?.this_period_pct}
                    />
                    <Progress
                      color="danger"
                      className="progress-sm"
                      style={{ height: "3px" }}
                      value={performance.integration?.last_period_pct}
                    />
                  </Widget>
                </div>
              </Col>
              <Col xs={12} xl={3} md={6}>
                <div className="pb-xlg h-100">
                  <Widget
                    bodyClass="mt-lg"
                    close
                    className="mb-0 h-100"
                    fetchingData={isReceiving}
                    title={<h5>Server Overview</h5>}
                  >
                    <div className="d-flex justify-content-between mb-sm">
                      <p className="width-150">
                        <small>
                          {server[1]?.pct}%{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[1]?.temp}????{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[1]?.frequency} Ghz
                        </small>
                      </p>
                      <div style={{ width: "calc(100% - 150px)" }}>
                        <Trend
                          gradient={["#FD5F00"]}
                          height={30}
                          smooth
                          strokeWidth="4"
                          data={mock.randomData.first}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-sm">
                      <p className="width-150">
                        <small>
                          {server[2]?.pct}%{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[2]?.temp}????{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[2]?.frequency} Ghz
                        </small>
                      </p>
                      <div style={{ width: "calc(100% - 150px)" }}>
                        <Trend
                          gradient={["#005792"]}
                          height={30}
                          smooth
                          strokeWidth="4"
                          data={mock.randomData.second}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-sm">
                      <p className="width-150">
                        <small>
                          {server[2]?.pct}%{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[2]?.temp}????{" "}
                          <span style={{ color: "#a3aeb7" }}>/</span>{" "}
                          {server[2]?.frequency} Ghz
                        </small>
                      </p>
                      <div style={{ width: "calc(100% - 150px)" }}>
                        <Trend
                          gradient={["#1A86D0"]}
                          height={30}
                          smooth
                          strokeWidth="4"
                          data={mock.randomData.third}
                        />
                      </div>
                    </div>
                  </Widget>
                </div>
              </Col>
              <Col lg={12} xs={12}>
                <MainChart data={mainChart} isReceiving={isReceiving} />
              </Col>
              <Col xs={12} lg={6} xl={4}>
                <BigStat {...mock.bigStat[0]} />
              </Col>
              <Col xs={12} lg={6} xl={4}>
                <BigStat {...mock.bigStat[1]} />
              </Col>
              <Col xs={12} lg={6} xl={4}>
                <BigStat {...mock.bigStat[2]} />
              </Col>
              <Col xs={12} className="mb-lg">
                <Widget
                  className="pb-0"
                  bodyClass={`mt p-0`}
                  title={
                    <h4>
                      {" "}
                      Support <strong>Requests</strong>
                    </h4>
                  }
                  close
                >
                  <TableContainer data={mock.table} />
                </Widget>
              </Col>
            </Row>
          </div>
          <div className={s.analyticsSide}>
            <Row>
              <Col xs={12} md={6} xl={12} className={s.lastSideElement}>
                <Widget className="mb-xlg pt-0" bodyClass="mt-0">
                  <Calendar />
                </Widget>
              </Col>
              <Col xs={12} md={6} xl={12} className={s.lastSideElement}>
                <TaskContainer data={mock.tasks} />
              </Col>
              <Col xs={12} md={6} xl={12} className={s.lastSideElement}>
                <Widget
                  className="widget"
                  bodyClass={cx(s.notifications, "w-100 mt-lg")}
                  title={
                    <h4>
                      Notifications{" "}
                      <span className="badge badge-pill badge-primary fw-normal pull-right mt-xs">
                        {mock.notifications.length}
                      </span>
                    </h4>
                  }
                >
                  {mock.notifications.map(({ id, icon, color, content }) => (
                    <div className="d-flex align-items-start" key={id}>
                      <i className={`la la-${icon} mr text-${color}`} />
                      <p
                        className={cx({
                          "mb-0": id === mock.notifications.length - 1,
                        })}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </div>
                  ))}
                </Widget>
              </Col>
            </Row>
          </div> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visits: state.analytics.visits,
    isReceiving: state.analytics.isReceiving,
    performance: state.analytics.performance,
    revenue: state.analytics.revenue,
    server: state.analytics.server,
    mainChart: state.analytics.mainChart,
  };
}

export default connect(mapStateToProps)(Analytics);
