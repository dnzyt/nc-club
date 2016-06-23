import React from 'react';
import { Router, hashHistory, Route, IndexLink } from 'react-router';

import Home from './Home';
import Customers from './customers/Customers';
import CustomerDetails from './customers/CustomerDetails';
import Orders from './orders/Orders';
import Sales from './sales/Sales';
import Inventory from './inventory/Inventory';
import About from './about/About';
import Contact from './contact/Contact';



// Routing schema of the entire application
const App = () => {
    return (
        <Router history={hashHistory}>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            <Route path="/" component={Home}>
                <Route path="/customers" component={Customers}></Route>
                <Route path="/customers/:customerId" component={CustomerDetails} />
                <Route path="/orders" component={Orders}></Route>
                <Route path="/sales" component={Sales}></Route>
                <Route path="/inventory" component={Inventory}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/contact" component={Contact}></Route>
            </Route>
        </Router>
    )
}

export default App;