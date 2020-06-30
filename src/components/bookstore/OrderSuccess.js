import React, {Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import CardMedia from '@material-ui/core/CardMedia';
import "../../css/OrderSuccess.css"
import CardContent from "@material-ui/core/CardContent";

export default class UpdateBook extends React.Component {
    handle = () => {
        this.props.history.push('/');
    }

    render() {
        const email = "admin@bookstore.com";
        const mobileNumber = "9874563210";
        const address = "Malhotra Chambers, First Floor, Govandi East, Mumbai, Maharashtra 400088";
        return (
            <Fragment>
                <NavigationBar/>
                <CardContent id="orderContainer">
                    <CardMedia id="orderImage"
                               component="img"
                               image={require(`../../assets/uploads/OrderSummaryImage.svg`)}
                    />
                    <div className="orderLabel"
                    >Order Placed Successfully
                    </div>
                </CardContent>
                <div className="orderMessage">
                    hurray!!! your order is confirmed the order id is
                   <b> #{this.props.location.state.orderId }</b> save the order id
                    for further communication...
                </div>
                <table className="orderTable">
                    <thead>
                    <tr className="tableRow">
                        <th>Email Us</th>
                        <th>Contact Us</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="tableRow">
                        <td data-tip data-for='emailId'>{email}
                            {/*<ReactTooltip id='emailId' aria-haspopup='true' role='example'>*/}
                            {/*    <p>{email}</p>*/}
                            {/*</ReactTooltip>*/}
                        </td>
                        <td data-tip data-for='mobileNumber'>{mobileNumber}
                            {/*<ReactTooltip id='mobileNumber' aria-haspopup='true' role='example'>*/}
                            {/*    <p>{mobileNumber}</p>*/}
                            {/*</ReactTooltip>*/}
                        </td>
                        <td data-tip data-for='address'> {address}
                            {/*<ReactTooltip id='address' aria-haspopup='true' role='example'>*/}
                            {/*    <p>{address}</p>*/}
                            {/*</ReactTooltip>*/}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button className="orderButton" onClick={this.handle}>Continue Shopping</button>
            </Fragment>
        );
    }
}
