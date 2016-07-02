import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map, fromJS, List } from 'immutable';
import { CustomerActions, OrderActions, InventoryActions, MealActions } from '../constants/Actions';
import { setCustomers, selectCustomer, leadsOn, createCustomer, showList, addQuestion, editCustomerInfo } from '../core/CustomerLogic';
import { loadState, saveState } from './LocalStorage'

const persistedState = loadState();

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


const INITIAL_PRODUCTS = fromJS([
    {
        productName: 'F1 HEALTHY MEAL-CAFE LATTE',
        quantity: '1',
        servingsRemaining: '60',
        totalServings: '60',
        servingSize: '1',
        caloriesPerServing: '150',
        servingsPerContainer: '60',
        sku: '38273'
    },
    {
        productName: 'F#1 COOKIES CREAM (750G)',
        quantity: '4',
        servingsRemaining: '160',
        totalServings: '160',
        servingSize: '1',
        caloriesPerServing: '200',
        servingsPerContainer: '40',
        sku: '847392'
    },
    {
        productName: 'F#1 PINA COLADA(750G)',
        quantity: '2',
        servingsRemaining: '100',
        totalServings: '100',
        servingSize: '1',
        caloriesPerServing: '250',
        servingsPerContainer: '50',
        sku: '263983'
    },
    {
        productName: 'US HMP-SPANISH',
        quantity: '1',
        servingsRemaining: '80',
        totalServings: '80',
        servingSize: '1',
        caloriesPerServing: '300',
        servingsPerContainer: '80',
        sku: '394737'
    }
]);

const products = (state = INITIAL_PRODUCTS, action) => {
    const index = state.findKey((product) => product.get('sku') === action.sku);
    switch(action.type) {
        case InventoryActions.CHANGE_SERVING_SIZE:
            return state.update(index, (product) => product.set('servingSize', action.servingSize));
        case InventoryActions.CHANGE_CALORIES_PER_SERVING:
            return state.update(index, (product) => product.set('caloriesPerServing', action.caloriesPerServing));
        case InventoryActions.CHANGE_SERVINGS_PER_CONTAINER:
            return state.update(index, (product) => {
                return product.set('servingsPerContainer', action.servingsPerContainer).set('totalServings', '' + parseInt(action.servingsPerContainer) * parseInt(product.get('quantity')))});
        default:
            return state;
    }
}

const getProductBySKU = (state, sku) => {
    const index = state.findKey((prod) => prod.get('sku') === sku);
    return state.get(index);
}

const inventorySection = combineReducers({ products });


const INITIAL_MEALS = fromJS({
    '3029188': {
            recipeName: 'CAFE & STRAWBERRY SHAKE LATTE',
            category: 'FOOD',
            mealId: '3029188',
            price: '60',
            mealPlan: [
                {
                    sku: '847392',
                    serving: '2'
                },
                {
                    sku: '263983',
                    serving: '1'
                },
                {
                    sku: '394737',
                    serving: '3'
                }
            ]
        },
    '3928311': {
            recipeName: 'BLUEBERRY SHAKE LATTE',
            category: 'FOOD',
            mealId: '3928311',
            price: '20',
            mealPlan: [
                {
                    sku: '847392',
                    serving: '1'
                },
                {
                    sku: '263983',
                    serving: '1'
                },
                {
                    sku: '394737',
                    serving: '3'
                }
            ]
        }
});

const INITIAL_CURRENT_MEAL = '3029188';
const INITIAL_ALL_MEAL_IDS = List.of('3029188', '3928311');

const meals = (state = INITIAL_MEALS, action) => {
    switch(action.type) {
        case MealActions.CREATE_MEAL:
            return state.set(action.mealId, Map({
                recipeName: '',
                category: 'FOOD',
                mealId: action.mealId,
                price: action.price,
                mealPlan: List()
            }));
        case MealActions.ADD_HERBALIFE_PRODUCT:
            return state.updateIn([action.mealId, 'mealPlan'], (mealPlan) => mealPlan.push(Map({ sku: action.sku, serving: '0', calories: '0'})));
        case MealActions.ADD_OTHER_INGREDIENTS:
            const index = state.findKey((product) => product.get('mealId') === action.mealId);
            return state.updateIn([action.mealId, 'mealPlan'], (mealPlan) => mealPlan.push(Map({ itemName: action.itemName, serving: '0', calories: '0'})));
        case MealActions.SELECT_CATEGORY:
            return state.update(action.mealId, (meal) => meal.set('category', action.category))
        default:
            return state
    }
}

const currentMeal = (state = INITIAL_CURRENT_MEAL, action) => {
    switch(action.type) {
        case MealActions.CREATE_MEAL:
            return action.mealId;
        case MealActions.SELECT_MEAL:
            return action.mealId;
        default:
            return state;
    }
}

const allMealIds = (state = INITIAL_ALL_MEAL_IDS, action) => {
    switch(action.type) {
        case MealActions.CREATE_MEAL:
            return state.push(action.mealId);
        default:
            return state;
    }
}

const mealSection = combineReducers({ meals, currentMeal, allMealIds })


const reducer = combineReducers({ customerSection, orderSection, inventorySection, mealSection });
const store = createStore(reducer, persistedState);
store.subscribe( () => {
    saveState(store.getState());
} )

export default store;