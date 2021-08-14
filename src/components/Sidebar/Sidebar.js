import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import isScreen from "../../core/screenHelper";
import BrowserIcon from "../../images/sidebar/Outline/Browser";
import KeypadIcon from "../../images/sidebar/Outline/Keypad";
import PersonIcon from "../../images/sidebar/Outline/Person";
import PieChartIcon from "../../images/sidebar/Outline/PieChart";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  }

  render() {
    const user = this.props.currentUser;

    let sidebarNav;

    if (user?.role === "admin") {
      sidebarNav = (
        <>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Statistics"
            iconElement={<PieChartIcon />}
            iconName="flaticon-controls"
            link="/admin/users"
            isHeader
            index="admin-statistics"
            //labelColor="info"
            //label="Admin"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="User Controls"
            iconElement={<PersonIcon />}
            iconName="flaticon-user"
            link="/admin/users"
            isHeader
            index="admin-controls"
            //labelColor="info"
            //label="Admin"
          />
        </>
      );
    } else {
      sidebarNav = (
        <>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Statistics"
            isHeader
            iconElement={<PieChartIcon />}
            iconName="flaticon-controls"
            link="/app/main/statistics"
            index="client-statistics"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Call Management"
            isHeader
            iconElement={<KeypadIcon />}
            iconName="flaticon-network"
            link="/app/main/dashboard"
            index="client-call-management"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="History Logs"
            isHeader
            iconElement={<BrowserIcon />}
            iconName="flaticon-layers"
            link="/app/main/widgets"
            index="client-history-logs"
          />
        </>
      );
    }

    return (
      <div
        className={`${
          !this.props.sidebarOpened && !this.props.sidebarStatic
            ? s.sidebarClose
            : ""
        } ${s.sidebarWrapper}`}
      >
        <nav
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className={s.root}
        >
          <header className={s.logo}>
            <a href="https://demo.flatlogic.com/sing-app-react/">
              <span className={s.logoStyle}>Vodevi Portal</span>{" "}
            </a>
          </header>
          <ul className={s.nav}>{sidebarNav}</ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
    sidebarColor: store.layout.sidebarColor,
    currentUser: store.auth.currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
