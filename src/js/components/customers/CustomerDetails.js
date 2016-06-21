import React from 'react';
import { CustomerActions } from '../../constants/Actions';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import { Map } from 'immutable';


const CustomerDetails = () => {
	return (
		<div>
			<DetailsPanelContainer />
            <AddQuestionButtonContainer />
			<QuestionPanelContainer />
		</div>
    );
}

const mapStateToDetailsPanelProps = (state) => {
    const custId = state.get("customerSection").get("currentCustomerId");
    const customer = state.get('customerSection').get('customersById').get(custId);
    return {
        customer
    }
}

const mapDispatchToDetailsPanelProps = (dispatch) => {
    return {
        changeHandler: (event, customerId) => { 
            dispatch({
                type: 'EDIT_CUSTOMER_INFO',
                customerId,
                field: event.target.id,
                value: event.target.value
            });
        }
    }
}

const DetailsPanel = ({ customer, changeHandler }) => {
	return (
        <div className="jumbotron col-xs-6 col-xs-push-3">
            <form className="form-horizontal">
                <div className="form-group">
                    <lable htmlFor="first-name" className="col-xs-3 control-label">First name</lable>
                    <div className="col-xs-8">
                        <input type="text" className="form-control" id="firstName" value={customer.get('firstName')} onChange={(event) => changeHandler(event, customer.get('customerId'))}></input>
                    </div>
                </div>
                <div className="form-group">
                    <lable htmlFor="last-name" className="col-xs-3 control-label">Last name</lable>
                    <div className="col-xs-8">
                        <input type="text" className="form-control" id="lastName" value={customer.get('lastName')} onChange={(event) => changeHandler(event, customer.get('customerId'))}></input>
                    </div>
                </div>
                <div className="form-group">
                    <lable htmlFor="email" className="col-xs-3 control-label">Email</lable>
                    <div className="col-xs-8">
                        <input type="email" className="form-control" id="email" value={customer.get('email')} onChange={(event) => changeHandler(event, customer.get('customerId'))}></input>
                    </div>
                </div>
                <div className="form-group">
                    <lable htmlFor="phone" className="col-xs-3 control-label">Phone</lable>
                    <div className="col-xs-8">
                        <input type="tel" className="form-control" id="phone" value={customer.get('phone')} onChange={(event) => changeHandler(event, customer.get('customerId'))}></input>
                    </div>
                </div>
                <div className="form-group">
                    <lable htmlFor="language" className="col-xs-3 control-label">Language</lable>
                    <div className="col-xs-8">
                        <input type="text" className="form-control" id="language" value="English" onChange={(event) => changeHandler(event, customer.get('customerId'))}></input>
                    </div>
                </div>
            </form>
        </div>
		
	)
}

const DetailsPanelContainer = connect(mapStateToDetailsPanelProps, mapDispatchToDetailsPanelProps)(DetailsPanel);


const mapStateToQuestionPanelProps = (state) => {
    const customerId = state.get("customerSection").get("currentCustomerId");
    const customer = state.get('customerSection').get('customersById').get(customerId);
    const questions = customer.get('questions')
    return {
        questions: questions,
        customerId: customerId
    }
}

const mapDispatchToQuestionPanelProps = (dispatch) => {
    return {
        onChangeListener: 
            (content, answer, key, customerId) => { 
                dispatch({ 
                    type: CustomerActions.EDIT_QUESTION, 
                    customerId, 
                    content, 
                    answer, 
                    key 
                })
            }
    }
}

const QuestionsPanel = ({ questions, customerId, onChangeListener }) => {
	const questionBoxes = questions.map( (question, index) => {
		return (
            <QuestionBox 
                key={question.get('key')}
                question={question}
                customerId = {customerId}
				onChangeListener={ onChangeListener } />
        )
	})

	return (
        <div className="col-xs-12">
            <div className="col-xs-10 col-xs-push-1">
                {questionBoxes}
			</div>
		</div>)
}

const QuestionPanelContainer = connect(mapStateToQuestionPanelProps, mapDispatchToQuestionPanelProps)(QuestionsPanel);

const mapStateToAddQuestionButtonProps = (state) => {
    const customerId = state.get("customerSection").get("currentCustomerId");
    return {
        customerId
    }
}

const mapDispatchToAddQuestionButtonProps = (dispatch) => {
    return { dispatch }
}

const AddQuestionButton = ({customerId, dispatch }) => {
    return (
        <div className="col-xs-12">
            <div className="row">
                <div className="col-xs-10 col-xs-push-1 text-right"> 
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        style={{ marginBottom: 10 + 'px'}}
                        onClick={() => {
                            dispatch({
                                type: CustomerActions.ADD_CUSTOMER_QUESTION,
                                customerId,
                                question: Map({
                                    content: 'How old are you?',
                                    answer: 'I am 15', 
                                    key: uuid.v1()
                                })
                            })}}>Add Question</button>
                </div>
            </div>
        </div>
    )
}
const AddQuestionButtonContainer = connect(mapStateToAddQuestionButtonProps, mapDispatchToAddQuestionButtonProps)(AddQuestionButton);

const QuestionBox = ({ question, customerId, onChangeListener }) => {
	let q;
	let a;
	return (
        <div className="col-md-6 col-xs-12">
            <div className="col-xs-12 well">
    			<input 
    				ref={ (input) => { 
    					if (input != null) {
    						q = input;
    					}}} 
    				type="text" 
                    style={{ marginBottom: 10 + 'px'}}
    				className="form-control"
    				id="question" value={question.get('content')} 
    				onChange={ () => { onChangeListener(q.value, a.value, question.get('key'), customerId) } }></input>
    			<textarea 
    				ref={ (input) => { 
    					if (input != null) {
    						a = input;
    					}}} 
    				className="form-control" 
    				id="answer" value={question.get('answer')} 
                    rows="3"
    				onChange={ () => { onChangeListener(q.value, a.value, question.get('key'), customerId) } }></textarea>
            </div>
		</div>)
}

export default CustomerDetails;
