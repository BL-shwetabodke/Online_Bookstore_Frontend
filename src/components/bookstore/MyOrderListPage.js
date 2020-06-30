import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import {Grid, Typography} from "@material-ui/core";
import "../../css/wishlistPage.css"
import OrderSummary from "./OrderSummary";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "../../css/MyOrderListPage.css";
import OrderService from "../../services/OrderService";

class MyOrderListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OrderedItemsList: [],
            count: 0,
        }
    }

    getOrderedItemsList() {
        new OrderService().fetchOrders().then(response => {
            console.log("order fetch");
            console.log(response);
            {
                (response.data.statusCode === 200) ?
                    this.setState({
                        OrderedItemsList: response.data.data,
                        count: response.data.data.length
                    })
                    :
                    this.props.history.push("/login")
            }
        })
    };

    componentDidMount() {
        this.getOrderedItemsList();
    }

    render() {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const OrderedItemsList = this.state.OrderedItemsList;
        return (
            <Fragment>
                <NavigationBar/>
                <Grid container>
                    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                        <Link color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="textPrimary">My Order</Typography>
                    </Breadcrumbs>
                    <div id="myOrderContainer">
                        {OrderedItemsList.map((id, index) =>
                            <div id="myOrderCart">
                                <div id="OrderDate">
                                    <Typography style={{fontWeight: "bold"}}>Order Placed on
                                        {" " + id.orderPlacedDate.substr(8, 2)}
                                        {" " + months[parseInt(id.orderPlacedDate.substr(5, 2)) - 1]}
                                        {" " + id.orderPlacedDate.substr(0, 4)}
                                    </Typography></div>
                                {id.orderProducts.map((id2, index) =>
                                    <Grid style={{width: "fit-content", display: "flex", flexDirection: "row"}} item
                                          xs={12}
                                          sm={12} md={12} lg={12} xl={12}>
                                        <OrderSummary
                                            bookDetails={id2}
                                            quantity={id2.quantity}
                                        />
                                    </Grid>
                                )}
                            </div>
                        )}
                    </div>
                </Grid>
            </Fragment>
        );
    }
}

export default MyOrderListPage;