import React from 'react';
import { CustomerActions } from '../../constants/Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import uuid from 'node-uuid';


class Customers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showGrid: 'N'
        }
    }

    render() {
        return (
            <div className="col-xs-10 col-xs-push-1">
                <div className="row">
                    <div className="col-xs-5 well" >
                        <SearchPanelContainer />
                    </div>
                    <div className="col-xs-5 col-xs-push-2 well" >
                        <CustomerInfoContainer />
                    </div>
                </div>
                <div className="row">
                    <SwitchBar showList={ () => this.setState({showGrid: 'N'}) } showGrid={ () => this.setState({showGrid: 'Y'}) }/>
                    <CreatCustomerButton />
                </div>
                <div id="products" className="row list-group">
                    <CustomersListContainer showGrid={this.state.showGrid}/>
                </div>
            </div>
        )
    }
}



let CreatCustomerButton = ({ router, dispatch }) => {
    return (
        <div className="col-xs-5 well well-sm pull-right">
            <button
                id="createCustomer"
                className="btn btn-success btn-md"
                onClick = { () => {
                        const customerId = uuid.v1();
                        dispatch({ type: CustomerActions.CREATE_CUSTOMER, customerId });
                        router.push(`/customers/${customerId}`);
                    } 
                }
                >
                Register New Customer 
            </button>
        </div>
    )
}

CreatCustomerButton = withRouter(connect()(CreatCustomerButton));


let SwitchBar = ({ showList, showGrid }) => {
    return (
        <div className="col-xs-5 well well-sm">
            <strong>Customers</strong>
            <div className="btn-group pull-right">
                <button
                    id="list"
                    className="btn btn-default btn-sm"
                    onClick={ showList }>
                    <span className="glyphicon glyphicon-th-list"></span>
                    List
                </button>
                <button id="grid" className="btn btn-default btn-sm"
                        onClick={ showGrid }>
                    <span className="glyphicon glyphicon-th"></span>
                    Grid
                </button>
            </div>
        </div>
    )
}



const mapStateToSearchPanelProps = (state) => {
    return {}
}

const mapDispatchToSearchPanelProps = (dispatch) => {
    return {
        onSearchClicked: (firstName, lastName, email, phone, customerId) => {

        }
    }
}

const SearchPanel = ({ onSearchClicked }) => {
    let firstNameInput;
    let lastNameInput;
    let emailInput;
    let phoneInput;
    let customerIdInput;

    return (
        <div className="form-horizontal" >
            <div className="form-group">
                <lable htmlFor="first-name" className="col-xs-3 control-label">First name</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="first-name" ref = { node => { firstNameInput = node }}></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="last-name" className="col-xs-3 control-label">Last name</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="last-name" ref = { node => { lastNameInput = node }}></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="email" className="col-xs-3 control-label">Email</lable>
                <div className="col-xs-8">
                    <input type="email" className="form-control" id="email" ref = { node => { emailInput = node }}></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="phone" className="col-xs-3 control-label">Phone</lable>
                <div className="col-xs-8">
                    <input type="tel" className="form-control" id="phone" ref = { node => { phoneInput = node }}></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="customer-id" className="col-xs-3 control-label">Customer ID</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="customer-id" ref = { node => { customerIdInput = node }}></input>
                </div>
            </div>
            <button className="btn btn-primary col-xs-8 col-xs-push-2"
                    onClick={ () => onSearchClicked(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value, customerIdInput.value)}>Search</button>
        </div>
    );
}

const SearchPanelContainer = connect(mapStateToSearchPanelProps, mapDispatchToSearchPanelProps)(SearchPanel);


const mapStateToCustomerInfoProps = (state) => {
    const custId = state.get("customerSection").get("currentCustomerId");
    const cust = state.get('customerSection').get('customersById').get(custId);
    return {
        firstName: cust.get("firstName"),
        lastName: cust.get("lastName"),
        email: cust.get("email"),
        phone: cust.get("phone")
    }
}

const mapDispatchToCustomerInfoProps = (dispatch) => {
    return {}
}

const CustomerInfo = ({ firstName, lastName, email, phone }) => {

    return (
        <div className="form-horizontal">
            <div className="form-group">
                <lable htmlFor="first-name" className="col-xs-3 control-label">First name</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="first-name" value={firstName}  readOnly></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="last-name" className="col-xs-3 control-label">Last name</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="last-name" value={lastName}  readOnly></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="email" className="col-xs-3 control-label">Email</lable>
                <div className="col-xs-8">
                    <input type="email" className="form-control" id="email"  value={email} readOnly></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="phone" className="col-xs-3 control-label">Phone</lable>
                <div className="col-xs-8">
                    <input type="tel" className="form-control" id="phone" value={phone} readOnly></input>
                </div>
            </div>
            <div className="form-group">
                <lable htmlFor="language" className="col-xs-3 control-label">Language</lable>
                <div className="col-xs-8">
                    <input type="text" className="form-control" id="language"  value={'English'} readOnly></input>
                </div>
            </div>
        </div>
    )
}

const CustomerInfoContainer = connect(mapStateToCustomerInfoProps, mapDispatchToCustomerInfoProps)(CustomerInfo);


const Customer = ({ showGrid, customer, onClick, onPressCustomer }) => {
    return (
        <div onClick={ onPressCustomer }
            className={showGrid === 'Y' ? 'item col-xs-4 col-lg-4' : 'item list-group-item col-xs-4 col-lg-4'}>
            <div className="thumbnail">
                <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                <div className="caption">
                    <h4 className="group inner list-group-item-heading">{customer.get('firstName')}</h4>
                    <p className="group inner list-group-item-text">{customer.get('email')}</p>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <p className="lead">{customer.get('phone')}</p>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <button className="btn btn-success" onClick={ onClick }>Show detail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const CustomersList = ({ customers, showGrid, router, onShowDetailClick, onPressCustomer }) => {
    return (
        <div>
            {customers.map(customer => (
                <Customer 
                    key={customer.get('customerId')} 
                    customer={customer} 
                    showGrid={showGrid} 
                    onClick={() => onShowDetailClick(customer, router)}
                    onPressCustomer = { () => onPressCustomer(customer) } />
            ))}
        </div>
    )
}

const mapStateToCustomerListProps = (state, { showGrid, router }) => {
    const customers = state.get("customerSection").get("customersById").toArray();
    // const showGrid = state.customerSection.get("showGrid");
    return {
        customers,
        showGrid,
        router
    }
}

const mapDispatchToCustomerListProps = (dispatch) => {
    return {
        onShowDetailClick: 
            (customer, router) => { 
                dispatch({
                    type: CustomerActions.SELECT_CUSTOMER,
                    customerId: customer.get('customerId')
                });
                router.push(`/customers/${customer.get('customerId')}`);
            },
        onPressCustomer:
            (customer) => {
                dispatch({
                    type: CustomerActions.SELECT_CUSTOMER,
                    customerId: customer.get('customerId')
                });
            }
    }
}

const CustomersListContainer = withRouter(connect(mapStateToCustomerListProps, mapDispatchToCustomerListProps)(CustomersList));


export default Customers;