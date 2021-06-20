import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import ProductList from './screens/ProductList';
import ProductView from './screens/ProductView';
import Home from './screens/Home';
import SignIn from './screens/SignIn'
import Cart from './screens/Cart';
import SignUp from './screens/SignUp';
import Purchase1 from './screens/Purchase1';
import Purchase2 from './screens/Purchase2';
import OrderD from './screens/Order';
import Stock from './admin/stock/Stock';
import AddProduct from './admin/stock/AddProduct';
import SetImage from './screens/SetImage';
import InvoicesGivenRange from './admin/InvoicesGivenRange';
import FormLogin from './formsLoginSignup/FormLogin';
import FormSignup from './formsLoginSignup/FormSignup';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/landingpage/Home';
import Footer2 from './components/footer/Footer.js';
import SideBar from './admin/SideBar';
import ApproveComments from './admin/comment/Comment';
import ViewInvoice from './admin/invoice/Invoice';
import InvoiceView from './admin/invoice/InvoiceView'
import CreateUsers from './admin/createaccount/Form';
import PriceDiscount from './admin/PriceDiscounts';
import Invoice from './screens/Invoice';
import Refund from './admin/refund/Refund';

import { useSelector } from 'react-redux';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userType } = userSignin;
  return (

    < div className="App" >
      {/* <Header /> */}
      {/* <ProductList /> */}
      <BrowserRouter>
        {(userType === '2' || userType === '3' || userType === '4') ? <SideBar /> : <NavBar />}

        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path="/PL/:id?/:type?/:cat?" component={ProductList}></Route>
          <Route path="/product/:id" component={ProductView}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/SignIn" component={SignIn}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/Cart" component={Cart}></Route>
          <Route path="/Purchase1" component={Purchase1}></Route>
          <Route path="/Purchase2" component={Purchase2}></Route>
          <Route path="/OrderDetail" component={OrderD}></Route>
          <Route path="/Invoice/:id" component={Invoice}></Route>
          <Route path="/Stock" component={Stock}></Route>
          <Route path="/AddProduct" component={AddProduct}></Route>
          <Route path="/SetImage/:id?" component={SetImage}></Route>
          <Route path="/InvoicesGivenRange" component={InvoicesGivenRange}></Route>
          <Route path="/FormSignup" component={FormSignup}></Route>
          <Route path="/FormLogin" component={FormLogin}></Route>
          <Route path="/ApproveComments" component={ApproveComments}></Route>
          <Route path="/ViewInvoice" component={ViewInvoice}></Route>
          <Route path="/InvoiceView/:id" component={InvoiceView}></Route>
          <Route path="/CreateUsers" component={CreateUsers}></Route>
          <Route path="/PriceDiscount" component={PriceDiscount}></Route>
          <Route path="/Refund" component={Refund}></Route>
        </Switch>
        {(userType === '1') ? <Footer2 /> : <></>}
      </BrowserRouter>
    </div >

  );
}

export default App;