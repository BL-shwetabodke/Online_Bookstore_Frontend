import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import HomePage from "../components/bookstore/HomePage";
import CartPage from "../components/bookstore/CartPage";
import OrderSuccess from "../components/bookstore/OrderSuccess";
import Signup from "../components/user/Signup";
import WishlistPage from "../components/bookstore/WishlistPage";
import MyOrderListPage from "../components/bookstore/MyOrderListPage";
import ForgetPassword from "../components/user/ForgetPassword";
import ResetPassword from "../components/user/ResetPassword";
import VerifyEmail from "../components/user/VerifyEmail";
import Variants from "../components/bookstore/test";
import Dem from "../components/admin/Demotb";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route path={"/admin"} exact component={AddBook}/>
                    <Route path={"/update"} exact component={AddBook}/>
                    <Route path={"/admin/books"} exact component={Variants}/>
                    <Route path={"/"} exact component={HomePage}/>
                    <Route path={"/display"} exact component={HomePage}/>
                    <Route path={"/cart"} exact component={CartPage}/>
                    <Route path={"/order/successful"} exact component={OrderSuccess}/>
                    <Route path={"/wishlist"} exact component={WishlistPage}/>
                    <Route path={"/orders"} exact component={MyOrderListPage}/>
                    <Route path={"/forget/password"} exact component={ForgetPassword}/>
                    <Route path={"/reset/password"} exact component={ResetPassword}/>
                    <Route path={"/verify/email/"} exact component={VerifyEmail}/>
                    <Route path={"/admin/display/"} exact component={Dem}/>
                </Switch>
            </BrowserRouter>

        );
    }
}