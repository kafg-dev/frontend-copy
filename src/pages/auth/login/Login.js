import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import config from "../../../config";
import { connect } from "react-redux";
import {
  loginUser,
  receiveToken,
  doInit,
  authError,
} from "../../../actions/auth";
import jwt from "jsonwebtoken";
import { push } from "connected-react-router";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { styles } from "./styles";
class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      error: null,
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);

    props.dispatch(authError(""));
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      this.props.dispatch(receiveToken(token));
      this.props.dispatch(doInit());
    }
  }

  signUp() {
    this.props.dispatch(push("/register"));
  }

  render() {
    const { classes } = this.props;
    return (
      // <div className="auth-page">
      //  <Typography className={classes.logotypeText}>Vodevi</Typography>

      // </div>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Logo"
            className={classes.logotypeImage}
          />
        </div>
        <div className={classes.formContainer}>
          <h1 className={"display-4 " + classes.heading}>Vodevi Portal</h1>
          <div className={classes.form}>
            <React.Fragment>
              <Fade in={this.props.errorMessage}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {this.props.errorMessage}
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={this.state.email}
                onChange={this.changeEmail}
                margin="normal"
                placeholder="Username"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={this.state.password}
                onChange={this.changePassword}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {this.state.isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      this.state.email.length === 0 ||
                      this.state.password.length === 0
                    }
                    onClick={this.doLogin}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button onClick={this.signUp} color="primary" size="large">
                  Sign Up
                </Button>
                {/*<Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>*/}
              </div>
            </React.Fragment>
          </div>
          <Typography
            color="primary"
            className={classes.copyright}
          ></Typography>
        </div>
      </Grid>
      // <h1>{classes}</h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Login)));
