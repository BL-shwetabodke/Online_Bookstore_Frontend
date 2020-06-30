import React, {Fragment} from 'react';
import "../../css/AddBook.css"
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import TextField from '@material-ui/core/TextField'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import NavigationBar from "../utils/NavigationBar";
import "../../css/NavigationBar.css"
import AdminService from "../../services/AdminService";
import CustomSnackBar from "../utils/CustomSnackBar";


export default class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isbnNumber: "",
            bookName: "",
            authorName: "",
            bookDetails: "",
            noOfCopies: "",
            bookPrice: "",
            publishingYear: "",
            bookImageSrc: "",

            isbnNumberError: " ",
            bookNameError: " ",
            authorNameError: " ",
            bookPriceError: " ",
            noOfCopiesError: " ",
            bookDetailsError: " ",
            publishingYearError: " ",
            bookImageSrcError: " ",

            alertShow: false,
            alertResponse: "",

            requiredFieldCheck: "",
            url: ""
        };
    }

    componentDidMount() {
        console.log("This State")
        console.log(this.props.location.state)
        if (this.props.location.state !==undefined) {
            this.setState({
                isbnNumber: this.props.location.state.bookData.isbnNumber.toString(),
                bookName: this.props.location.state.bookData.bookName.toString(),
                authorName: this.props.location.state.bookData.authorName.toString(),
                bookPrice: this.props.location.state.bookData.bookPrice.toString(),
                noOfCopies: this.props.location.state.bookData.noOfCopies.toString(),
                bookDetails: this.props.location.state.bookData.bookDetail.toString(),
                publishingYear: this.props.location.state.bookData.publishingYear.toString(),
            });
        }
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        new AdminService().uploadImage(formData).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({
                    url: response.data.data
                })
            } else {
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        }).catch(response => {
            console.log(response)
        })
    };
    imageNotNullValidation = (event) => {
        this.setState({
            bookImageSrc: "",
        });
        const imageName = event.target.value.substring(event.target.value.lastIndexOf('\\') + 1);
        if (imageName.toLowerCase().includes("png") || imageName.toLowerCase().includes("jpg") || imageName.toLowerCase().includes("jpeg")) {
            this.setState({
                bookImageSrc: imageName,
            });
        }
        this.onFileChangeHandler(event);

    };
    validation = (event, pattern, errorMessage) => {
        if (event.target.value.match(pattern)) {
            this.setState({[event.target.id + "Error"]: " ", tempName: event.target.id,});
        } else {
            this.setState({
                [event.target.id + "Error"]: errorMessage
            });
        }
    };
    addBook = () => {
        const book = {
            isbnNumber: this.state.isbnNumber,
            bookName: this.state.bookName,
            authorName: this.state.authorName,
            bookPrice: this.state.bookPrice,
            noOfCopies: this.state.noOfCopies,
            bookDetail: this.state.bookDetails,
            bookImageSrc: this.state.url,
            publishingYear: this.state.publishingYear
        };
        console.log("book ", book);
        new AdminService().addBook(book).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message
                });
                this.clearFieldsData();
            } else {
                this.setState({
                    severity: "error",
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        });
    };

    handleChange = ({target}) => {
        this.setState({[target.id]: target.value});
    };

    clearFieldsData = () => {
        this.setState({
            isbnNumber: "",
            bookName: "",
            authorName: "",
            bookPrice: "",
            noOfCopies: "",
            bookDetails: "",
            bookImageSrc: "",
            publishingYear: "",
        });
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    formFilledCheck() {
        return this.state.isbnNumber.trim().length > 0 && this.state.bookName.trim().length > 0 &&
            this.state.authorName.trim().length > 0 && this.state.bookDetails.trim().length > 0 && this.state.noOfCopies.trim().length > 0 &&
            this.state.bookPrice.trim().length > 0 && this.state.publishingYear.trim().length > 0 && this.state.bookImageSrc.trim().length > 0;
    }

    errorCheck() {
        return this.state.isbnNumberError.trim().length === 0
            && this.state.bookNameError.trim().length === 0 &&
            this.state.authorNameError.trim().length === 0 && this.state.bookPriceError.trim().length === 0 && this.state.noOfCopiesError.trim().length === 0 &&
            this.state.bookDetailsError.trim().length === 0 && this.state.publishingYearError.trim().length === 0;
    }

    canBeSubmitted() {
        return this.errorCheck() && this.formFilledCheck();
    }

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
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <NavigationBar/>
                <Container className="container">
                    <Card className="card">
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h3>
                                        Book Details
                                    </h3>
                                </Grid>
                                <ThemeProvider theme={theme}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="bookName" label="Book Name" onChange={this.handleChange}
                                                   name="Book Name"
                                                   value={this.state.bookName}
                                                   variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onBlur={event => this.validation(event, "^.{3,}$", "Enter Minimum 3 Characters")}
                                                   error={this.state.bookNameError.trim().length !== 0}
                                                   helperText={this.state.bookNameError}
                                                   required/>
                                    </Grid>
                                </ThemeProvider>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField id="authorName" label="Author Name" onChange={this.handleChange}
                                               name="Author Name"
                                               size="small"
                                               value={this.state.authorName}
                                               variant="outlined"
                                               fullWidth
                                               onBlur={event => this.validation(event, "^[A-za-z][A-Za-z .]{3,}$", "Enter Minimum 3 Characters(Only Alphabets)")}
                                               error={this.state.authorNameError.trim().length !== 0}
                                               helperText={this.state.authorNameError}
                                               required/>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField id="isbnNumber" label="ISBN" onChange={this.handleChange}
                                               name="ISBN" value={this.state.isbnNumber} variant="outlined"
                                               fullWidth
                                               size="small"
                                               onFocus
                                               onBlur={event => this.validation(event, "^.{10,13}$", "Enter 10-13 Characters")}
                                               error={this.state.isbnNumberError.trim().length !== 0}
                                               helperText={this.state.isbnNumberError}
                                               required/>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField id="noOfCopies" label="Stock Quantity"
                                               onChange={this.handleChange}
                                               name="Stock Quantity"
                                               value={this.state.noOfCopies}
                                               variant="outlined"
                                               fullWidth
                                               size="small"
                                               onBlur={event => this.validation(event, "^[1-9]{1}[0-9]{0,}", "Enter Value (greater Than 0)")}
                                               error={this.state.noOfCopiesError.trim().length !== 0}
                                               helperText={this.state.noOfCopiesError}
                                               required/>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        id="bookPrice" label="Price" onChange={this.handleChange}
                                        name="Price"
                                        value={this.state.bookPrice}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onBlur={event => this.validation(event, "^[1-9]{1}[0-9]{0,}", "Enter Value (greater Than 0)")}
                                        error={this.state.bookPriceError.trim().length !== 0}
                                        helperText={this.state.bookPriceError}
                                        required/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        id="publishingYear" label="Year" name="Year"
                                        value={this.state.publishingYear}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onBlur={event => this.validation(event, `^(140[0-9]|19[5-9]\\d|20[0-${[2] - 1}]\\d|20${[2]}[0-${[1]}])$`, "Enter value greater than 1400 to 2023")}
                                        error={this.state.publishingYearError.trim().length !== 0}
                                        helperText={this.state.publishingYearError}
                                        required/>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <div className="fileInputDiv">
                                        <input accept="image/*"
                                               style={{visibility: "hidden", height: "0px", width: "0px"}}
                                               className=""
                                               id="bookImageSrc" type="file"
                                               onChange={event => this.imageNotNullValidation(event)}
                                        />
                                        <label htmlFor="bookImageSrc">
                                            <TextField className="imageUrl"
                                                       id="bookImageSrc" label="Image" name="CoverImage"
                                                       value={this.state.bookImageSrc}
                                                       variant="outlined"
                                                       size="small"
                                                       disabled
                                                       fullWidth
                                                       helperText=" "
                                                       onChange={(e) => this.onFileChangeHandler(e)}
                                                       required/>
                                            <IconButton className="imageIcon" color="primary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                <PhotoLibraryIcon color="secondary"/>
                                            </IconButton>
                                        </label>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField id="bookDetails" label="Book Description" multiline rows={2}
                                               name="Details"
                                               onChange={this.handleChange}
                                               value={this.state.bookDetails}
                                               variant="outlined"
                                               fullWidth
                                               size="small"
                                               onBlur={event => this.validation(event, "^.{10,}$", "Enter Minimum 10 Character")}
                                               error={this.state.bookDetailsError.trim().length !== 0}
                                               helperText={this.state.bookDetailsError}
                                               required/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
                                        <Button className="btn"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={<SaveIcon/>}
                                                onClick={this.addBook}
                                                disabled={!this.canBeSubmitted()}
                                        >
                                            Save
                                        </Button>
                                        <Button className="btn"
                                                variant="contained"
                                                color="secondary"
                                                size="large"
                                                startIcon={<CancelOutlinedIcon/>}
                                                onClick={this.clearFieldsData}
                                        >Clear
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Fragment>
        );
    }
}