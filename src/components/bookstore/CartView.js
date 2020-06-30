import {CardMedia, Typography} from "@material-ui/core";
import React, {Fragment} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import "../../css/CartView.css"
import Button from "@material-ui/core/Button";

export default class CartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qValue: this.props.qValue,
            totalPrice: 0
        };
    }

    handleIncrement = e => {
        this.setState({qValue: this.state.qValue + 1}, () => this.props.totalPrice(this.state.qValue, this.props.cartId)
        )
    };

    handleDecrement = e => {
        this.setState({qValue: this.state.qValue - 1}, () => this.props.totalPrice(this.state.qValue, this.props.cartId)
        )
    };

    render() {
        return (
            <Fragment>
                <div container className="displayCart">
                    <CardMedia className="imageCart"
                               component="img"
                               image={this.props.bookDetails.book.bookImageSrc}
                               title={this.props.bookDetails.book.bookName}
                    />
                    <div className="details">
                        <Typography component="h2" className="bookName"
                        >
                            {this.props.bookDetails.book.bookName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="authorName"
                        >
                            by {this.props.bookDetails.book.authorName}
                        </Typography>
                        <Typography component="h2" className="price">Rs {(this.props.bookDetails.book.bookPrice * this.state.qValue)}
                        </Typography>

                        <div className="controls">
                            {this.state.qValue === 1 || this.props.pannel ?
                                <RemoveCircleOutlineIcon id="decrementButton" color="disabled"/> :
                                <RemoveCircleOutlineIcon onClick={this.handleDecrement} style={{color: "#b90f4b"}}/>
                            }

                            <input
                                type="text"
                                name="count"
                                className="counterField"
                                value={this.state.qValue}
                            />

                            {this.state.qValue === 5 || this.state.qValue>=this.props.bookDetails.book.noOfCopies || this.props.pannel ?
                                <AddCircleOutlineIcon id="decrementButton" color="disabled"/> :
                                <AddCircleOutlineIcon onClick={this.handleIncrement} style={{color: "#b90f4b"}}/>
                            }

                            <Button onClick={this.props.handleRemove(this.props.cartId)}
                                    style={{marginLeft: "5px",paddingTop:'0px', fontSize: "14px"}}
                                    className="remove" size="small"
                                    disabled={this.props.pannel}>
                                Remove
                            </Button>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
};