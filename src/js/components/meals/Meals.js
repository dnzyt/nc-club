import React from 'react';
import { connect } from 'react-redux';
import { MealActions } from '../../constants/Actions';
import uuid from 'node-uuid';
import { withRouter } from 'react-router';

const Meals = () => {
    return (
    	<div className="col-xs-10 col-xs-push-1">
    		<h1 className="text-center">Meals</h1>
    		<br />
    		<NewMeal />
   			<MealGridContainer />
    	</div>
    );
}


let NewMeal = ({ router, dispatch }) => {
	return (
		<div className="row">
			<div className="col-xs-12 col-md-6 col-md-push-3 well" >
		        <button className="btn btn-primary col-xs-8 col-xs-push-2" onClick={ () => {
		        	const mealId = uuid.v1();
		        	dispatch({
		        		type: MealActions.CREATE_MEAL,
		        		mealId
		        	})
		        	router.push(`/meals/${mealId}`);
		        } }>New Meal</button>
		    </div>
	    </div>
	)
}

NewMeal = withRouter(connect()(NewMeal));


const Meal = ({ recipeName, onClickMeal }) => {
	return (
		<div className="circularMargin col-xs-6 col-sm-4 col-md-3">
			<button type="button" className="btn btn-success btn-circle btn-xl" onClick={ onClickMeal }>{ recipeName }</button>
		</div>
	);
}


const mapStateToMealGridProps = (state, { router }) => {
    const meals = state.get("mealSection").get("meals");
    return {
        meals,
        router
    }
}

const mapDispatchToMealGridProps = (dispatch) => {
    return {
    	onClickMeal: (mealId, router) => {
    		dispatch({
    			type: MealActions.SELECT_MEAL,
    			mealId
    		})
    		router.push(`/meals/${ mealId }`);
    	}
    }
}



const MealGrid = ({ meals, onClickMeal, router }) => {
	return (
		<div id="mealGrid" className="row list-group">
			{
				meals.map(meal => (
					<Meal recipeName={ meal.get('recipeName') } onClickMeal={ () => onClickMeal(meal.get('mealId'), router) } />
				))
			}
		</div>
	);
}

const MealGridContainer = withRouter(connect(mapStateToMealGridProps, mapDispatchToMealGridProps)(MealGrid));


export default Meals;