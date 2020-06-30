import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import UserService from "../../services/UserService";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";

class Signin extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: "",
            password: "",

            emailError: " ",
            passwordError: " ",
            alertShow: false,
            alertResponse: "",
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
    };

    validation = (event, pattern, message) => {
        if (event.target.value.match(pattern)) {
            this.setState({
                [event.target.id + "Error"]: " "
            })
        } else {
            this.setState({
                [event.target.id + "Error"]: message
            })
        }
    };

    handleSubmit = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log("User ", user);
        new UserService().loginUser(user).then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.props.showAlert("success", true, response.data.message)
                localStorage.setItem('token', response.headers.authorization);
                localStorage.setItem('userName', response.data.data);
                this.clearFieldsData();
                this.props.history.push("/");
            } else {
                this.props.showAlert("error", true, response.data.message)
            }
        });

    }

    clearFieldsData = () => {
        this.setState({
            email: "",
            password: "",
        });
        window.location.href = '/'
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
            <div className="logInHtml">
                <ThemeProvider theme={theme}>
                    <div className="loginContainer">
                        <div className="group1">
                            <TextField
                                error={this.state.emailError.trim().length !== 0}
                                value={this.state.email}
                                helperText={this.state.emailError}
                                onChange={this.handleChange}
                                onBlur={textEvent => this.validation(textEvent, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", "Please enter valid email address")}
                                id="email" label="Email Id"
                                variant="outlined"
                                fullWidth required autoComplete="off" name="email"/>
                        </div>
                        <div className="password">
                            <TextField error={this.state.passwordError.trim().length !== 0}
                                       value={this.state.password}
                                       helperText={this.state.passwordError}
                                       onChange={this.handleChange}
                                       className="password"
                                       onBlur={textEvent => this.validation(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "Please enter valid password")}
                                       id="password" label="Password"
                                       type="password" variant="outlined"
                                       fullWidth required autoComplete="off" name="password"/>
                            {this.props.isVisible === false ?
                                < VisibilityIcon onClick={this.props.handlePasswordVisibility}
                                                 className="passwordVisibility"/> :
                                <VisibilityOffIcon onClick={this.props.handlePasswordVisibility}
                                                   className="passwordVisibility"/>
                            }
                        </div>
                        <div className="forgetPassword">
                            <Link  to={'/forget/password'}>
                               <p style={{margin:"20px"}}> Forget Password</p>
                            </Link>
                            {/*<a href="/forget/password">Forgt Password?</a>*/}
                        </div>
                        <div className="group1">
                            <Button className="loginButton" variant="contained" onClick={this.handleSubmit}>Login
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        )
            ;
    }
}

export default withRouter(Signin);
            