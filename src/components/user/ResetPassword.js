import React, {Component, Fragment} from "react";
import "../../css/ForgetPass.css";
import UserService from "../../services/UserService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Redirect} from "react-router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "../utils/CustomSnackBar";
import "../../css/ResetPassword.css";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import DialogBoxPage from "../utils/CustomDialogBox";
import Loader from "react-loader-spinner";
import NavigationBar from "../utils/NavigationBar";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordError: " ",

            confirmPassword: "",
            confirmPasswordError: " ",

            alertShow: false,
            alertResponse: "",
            responseStatus: false,
            passwordIsVisible:false,
            confirmPasswordIsVisible:false,

            isPasswordReset:false,
            isDialogBoxVisible:false,
            showProgress: false,
        };
    }
    isFormFilled = () => {
        return this.state.password.length > 0 && this.state.passwordError.trim().length === 0
            && this.state.confirmPasswordError.trim().length === 0 && this.state.confirmPassword.length > 0;
    }

    showLogin = () => {
        this.setState({
            isDialogBoxVisible: true
        })
    }
    setNewPassword = () => {
        const newPassword = {
            password: this.state.password,
        };
        new UserService().setNewPassword(newPassword, this.props.location.search).then((response) => {
            console.log(response.data);
            this.setState({
                showProgress: true,
            })
            if (response.status === 200) {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    responseStatus: true,
                    isPasswordReset:true,
                  //  isDialogBoxVisible:true
                });
            } else {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    showProgress:false
                });
            }
        });
    };

    setValue = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    confirmPasswordValidation(event) {
        if (event.target.value !== this.state.password) {
            this.setState({
                [event.target.id + "Error"]: "Password Not Match",
            });
        } else {
            this.setState({
                [event.target.id + "Error"]: " ",
            });
        }
    }

    handlePasswordVisibility = (value) => {
        const obj = document.getElementById(value);
        if (obj.type === "password") {
            obj.type = "text";
            this.setState({
                [value + "IsVisible"]: true,
            });
        } else {
            obj.type = "password";
            this.setState({
                [value + "IsVisible"]: false,
            });
        }
        console.log(localStorage.getItem('token'));
    }

    validation = (event, pattern, message) => {
        console.log(event.target.value)
        if (event.target.value.match(pattern)) {
            this.setState({
                [event.target.id + "Error"]: " ",
            });
        } else {
            this.setState({
                [event.target.id + "Error"]: message
            })
        }
    };

    closeAlertBox = () => {
        this.setState({alertShow: false});
    };
    dialogBoxClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#b90f4b',
                },
            },
        });
        return (
            <Fragment>
                <NavigationBar/>
                <div style={{paddingTop: "3%"}}>
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <ThemeProvider theme={theme}>
                    <Grid container spacing={0} style={{paddingTop: "3%"}}>
                        <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.dialogBoxClose}/>
                        {this.state.isPasswordReset  &&
                        <Grid container spacing={0} style={{paddingTop: "80px"}}>
                            <Grid item xs={12}>
                                <img height="150px" width="150px" src={require("../../assets/uploads/successcheck.png") } alt="success"/>
                            </Grid>
                            <Grid item xs={12}>
                                <h4>
                                    Password Reset Successfully !
                                </h4>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    size="large"
                                    color="inherit"
                                    onClick={this.showLogin}
                                    style={{
                                        background: "#b90f4b",
                                        color: "white",
                                        marginTop: "5%",
                                        marginBottom: "2%",
                                        padding: "17px",
                                        height: '10%'
                                    }}
                                >
                                    User Login
                                </Button>
                            </Grid>
                        </Grid>
                        }
                        {!this.state.isPasswordReset &&
                        <Grid id="resetContainer" item xs={12} sm={12} md={12}>
                            <Typography>
                                <b id="resetText">Reset Password</b>
                            </Typography>
                        </Grid>}
                        {!this.state.isPasswordReset &&
                        <Paper id="paper" elevation={4} position="static" color="default"
                               style={{marginTop: "2%", height: "fit-content"}}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography id="message" variant="subtitle1"
                                            style={{marginBottom: "2%", color: "grey", textAlign: "left"}}>
                                    Enter New Password
                                    To Reset Your Password.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    type="password"
                                    variant="outlined"
                                    id="password"
                                    label="Password"
                                    fullWidth="true"
                                    style={{height: '40%'}}
                                    autoFocus
                                    value={this.state.password}
                                    onChange={textEvent => this.setValue(textEvent)}
                                    onBlur={textEvent => this.validation(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "Please enter valid password")}
                                    error={this.state.passwordError.trim().length !== 0}
                                    helperText={this.state.passwordError}
                                    required/>
                                {this.state.passwordIsVisible === false ?
                                    < VisibilityIcon onClick={event => this.handlePasswordVisibility("password")}
                                                     className="resetPasswordVisibility"/> :
                                    <VisibilityOffIcon onClick={event => this.handlePasswordVisibility("password")}
                                                       className="resetPasswordVisibility"/>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    type="password"
                                    variant="outlined"
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    fullWidth="true"
                                    style={{height: '40%', marginTop: '-10px'}}
                                    value={this.state.confirmPassword}
                                    onChange={this.setValue}
                                    onBlur={textEvent => this.confirmPasswordValidation(textEvent)}
                                    error={this.state.confirmPasswordError.trim().length !== 0}
                                    helperText={this.state.confirmPasswordError}
                                    required/>
                                {this.state.confirmPasswordIsVisible === false ?
                                    < VisibilityIcon onClick={event => this.handlePasswordVisibility("confirmPassword")}
                                                     className="resetPasswordVisibility"/> :
                                    <VisibilityOffIcon
                                        onClick={event => this.handlePasswordVisibility("confirmPassword")}
                                        className="resetPasswordVisibility"/>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    size="large"
                                    color="inherit"
                                    fullWidth="true"
                                    onClick={this.setNewPassword}
                                    disabled={!this.isFormFilled()}
                                    style=
                                        {this.isFormFilled() === false ? {
                                            background: "#E0E0E0",
                                            color: "black",
                                            marginBottom: "2%",
                                            padding: "3.5%",
                                            height: '10%'
                                        } : {
                                            background: "#b90f4b",
                                            color: "white",
                                            marginBottom: "2%",
                                            padding: "3.5%",
                                            height: '10%'
                                        }}
                                >
                                    Reset Password
                                </Button>
                            </Grid>
                        </Paper>
                        }
                    </Grid>
                </ThemeProvider>
                </div>
            </Fragment>
        )
    };
}
