import { List, Map, fromJS} from 'immutable';


export const setCustomers = (state, customers) => {
	const customersList = List(customers);
	const currentCustomer = customersList.get(0, Map());
	return state.set('customers', customersList).set('currentCustomer', currentCustomer);
}

export const selectCustomer = (state, customer) => {
	return state.set('currentCustomer', Map(customer));
}

export const leadsOn = (state, leads) => {
	return state.set('leadsOn', leads);
}

export const createCustomer = (state, customerId) => {
	const newCustomer = fromJS({
            customerId: customerId,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            questions: []});
	return state.set('customers', state.get("customers").push(newCustomer)).set('currentCustomer', newCustomer);
}

export const showList = (state, showGrid) => {
	return state.set('showGrid', showGrid);
}

export const addQuestion = (state, question) => {
	return state.updateIn(['currentCustomer', 'questions'], qs => {
		return qs.push(question);
	});
}

export const editCustomerInfo = (state, field, value) => {
	const customerId = state.get('currentCustomer').get('customerId')
	const customers = state.get('customers').map( (customer, index) => {
		if (customer.get('customerId') !== customerId) {
			return customer;
		}
		const c = customer.set(field, value);
			console.log(c)

		return c;
	})
	return state.set('customers', customers).updateIn(['currentCustomer', field], (fieldValue) => value )
}