import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map, fromJS, List } from 'immutable';
import { CustomerActions, OrderActions } from '../constants/Actions';
import { setCustomers, selectCustomer, leadsOn, createCustomer, showList, addQuestion, editCustomerInfo } from '../core/CustomerLogic';
import { loadState, saveState } from './LocalStorage'

const persistedState = loadState();
console.log(persistedState)

/*
const customerSection = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CustomerActions.CREATE_CUSTOMER:
            return createCustomer(state, action.customerId);
        case CustomerActions.SET_CUSTOMERS:
            return setCustomers(state, action.customers);
        case CustomerActions.LEADS_ON:
            return leadsOn(state, action.leads);
        case CustomerActions.SELECT_CUSTOMER:
            return selectCustomer(state, action.customer);
        case CustomerActions.SHOW_LIST:
            return showList(state, action.showGrid);
        case CustomerActions.ADD_CUSTOMER_QUESTION:
            return addQuestion(state, action.question);
        case CustomerActions.EDIT_CUSTOMER_INFO:
            return editCustomerInfo(state, action.field, action.value);
        default:
            return state;
	}
}
*/

const INITIAL_CUSTOMER_BY_ID = fromJS({
            '20183423': {
                customerId: '20183423',
                firstName: 'Joney',
                lastName: 'Wilson',
                email: 'jone@gmail.com',
                phone: '3028449202',
                questions: [
                    { content: 'How old are you?', answer: 'I am 15', key: '1' }
                ]
            },
            '201834383': {
                customerId: '201834383',
                firstName: 'Wilson',
                lastName: 'David',
                email: 'wilson@gmail.com',
                phone: '3028449202',
                questions: [
                    { content: 'How old are you?', answer: 'I am 15', key: '2' }
                ]
            }
        });

const INITIAL_ALL_CUSTOMER_IDS = List(['20183423', '201834383']);

const INITIAL_CURRENT_CUSTOMER_ID = '20183423';

const customersById = (state = INITIAL_CUSTOMER_BY_ID, action) => {
    switch(action.type) {
        case CustomerActions.CREATE_CUSTOMER:
            return state.set(action.customerId, Map({}));
        case CustomerActions.ADD_CUSTOMER_QUESTION:
            return state.updateIn([action.customerId, 'questions'], qs => qs.push(action.question));
        case CustomerActions.EDIT_CUSTOMER_INFO:
            return state.updateIn([action.customerId, action.field], v => action.value); 
        case CustomerActions.EDIT_QUESTION:
            console.log('content: ' + action.content)
            return state.updateIn([action.customerId, 'questions'], qs => qs.update(qs.findIndex((q) => q.get('key') === action.key), (q) => { return q.set('content', action.content).set('answer', action.answer) }));
        default:
            return state;
    }
}


const allCustomerIds = (state = INITIAL_ALL_CUSTOMER_IDS, action) => {
    switch(action.type) {
        case CustomerActions.CREATE_CUSTOMER:
            return state.push(action.customerId);
        default:
            return state;
    }
}

const currentCustomerId = (state = INITIAL_CURRENT_CUSTOMER_ID, action) => {
    switch(action.type) {
        case CustomerActions.CREATE_CUSTOMER:
            return action.customerId;
        case CustomerActions.SELECT_CUSTOMER:
            return action.customerId;
        default:
            return state;
    }
}

const getCurrentCustomer = (state) => {
    const custId = state.get('customerSection').get('currentCustomerId');
    const customer = state.get('customerSection').get('customersById').get(custId);
    console.log("current customer: " + customer);
    return customer
}


//combineReducers from 'redux-immutable' return an Immutable.Map
const customerSection = combineReducers({ customersById, allCustomerIds, currentCustomerId })





const INITIAL_ORDER_BY_ID = fromJS({
    'Y113362727': {
        orderNumber: 'Y113362727',
        amount: 6,
        orderDate: '02/27/2013',
        volumePoints: 23.95,
        items: [{
            description: 'KOSHER FORMULA #1',
            quantity: 63,
            sku:'3927943'
        },
        {
            description: 'CODME FORMULA #2',
            quantity: 12,
            sku:'736286'
        }]
    },
    'B21636245': {
        orderNumber: 'B21636245',
        amount: 3,
        orderDate: '11/16/2011',
        volumePoints: 23.95,
        items: [{
            description: 'CPL FORMULA #2',
            quantity: 32,
            sku: '39737'
        },
        {
            description: 'PPEMD FORMULA #4',
            quantity: 38,
            sku: "3928371"
        }]
    }
});

const INITIAL_ALL_ORDER_NUMBERS = List.of("Y113362727", "B21636245");

const INITIAL_CURRENT_ORDER_NUMBER = "Y113362727";





const orderByNumber = (state = INITIAL_ORDER_BY_ID, action) => {
    switch(action.type) {
        case OrderActions.ADD_ORDER:
            return state.set(action.orderNumber, action.order);
        case OrderActions.REMOVE_ORDER:
            return state.delete(action.orderNumber);
        default:
            return state;
    }
}

const allOrderNumbers = (state = INITIAL_ALL_ORDER_NUMBERS, action) => {
    switch(action.type) {
        case OrderActions.ADD_ORDER:
            return state.push(action.orderNumber);
        case OrderActions.REMOVE_ORDER:
            const index = state.find((orderNumber) => { return orderNumber === action.orderNumber });
            return state.delete(index);
        default:
            return state;
    }
}

const currentOrderNumber = (state = INITIAL_CURRENT_ORDER_NUMBER, action) => {
    switch(action.type) {
        case OrderActions.SELECT_ORDER:
            return action.orderNumber;
        case OrderActions.REMOVE_ORDER:
            return state === action.orderNumber ? "" : state;
        default:
            return state;
    }
}

const orderSection = combineReducers({ orderByNumber, allOrderNumbers, currentOrderNumber });


const reducer = combineReducers({ customerSection, orderSection });
const store = createStore(reducer, persistedState);
store.subscribe( () => {
    saveState(store.getState());
} )

export default store;