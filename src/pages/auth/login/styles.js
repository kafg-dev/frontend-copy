export const styles = (theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/images/login/background.jpg"
    })`,
    backgroundSize: "cover",
    width: "60%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: "42.5%",
    marginBottom: "3.5%",
    marginRight: "2.5%",
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 40,
    fontFamily: "Lucida Console",
    textShadow: "0 0 12px #abcbe0, 0 0 12px #abcbe0",
    [theme.breakpoints.down("sm")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
  form: {
    width: 320,
  },
  heading: {
    marginBottom: 40,
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
      marginBottom: 20,
    },
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
});
