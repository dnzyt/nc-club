import React from 'react';
import { connect } from 'react-redux';
import { InventoryActions } from '../../constants/Actions';



const Inventory = () => {
    return (
    	<div className="col-xs-12">
    		<h1 className="text-center">Inventory</h1>
    		<br />
    		<ProductsContainer />
    	</div>
    );
}

const ProductBox = ({ product, onChangeServingSize, onChangeCaloriesPerServing, onChangeServingsPerContainer }) => {
	let ss;
	let cps;
	let spc;
	return (
		<div className="col-xs-12 col-md-8 col-md-push-2">
			<div className="row well">
				<div className="col-sm-6">
					<div className="row">
						<div className="col-md-8 col-md-push-3">
							<p className="text-info">Product: { product.get('productName') }</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 col-md-push-3">
							<p className="text-info">Quantity: { product.get('quantity') }</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 col-md-push-3">
							<p className="text-info">Serving Remaining: { product.get('servingsRemaining') }</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 col-md-push-3">
							<p className="text-info">Total Servings: { product.get('totalServings') }</p>
						</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-horizontal" >
			            <div className="form-group">
			                <lable htmlFor="servingSize" className="col-xs-4 control-label">Serving Size</lable>
			                <div className="col-xs-8">
			                    <input
			                    	ref={ (input) => { 
			                    		if (input != null) {
			                    			ss = input;
			                    		}}} 
			                    	type="text" 
			                    	className="form-control" 
			                    	id="servingSize" 
			                    	value={ product.get('servingSize')} 
			                    	onChange={() => { onChangeServingSize(ss.value, product.get('sku')) } }></input>
			                </div>
			            </div>
			            <div className="form-group">
			                <lable htmlFor="caloriesPerServing" className="col-xs-4 control-label">Calories/Serving</lable>
			                <div className="col-xs-8">
			                    <input 
			                    	ref={ (input) => { 
			                    		if (input != null) {
			                    			cps = input;
			                    		}}}
			                    	type="text" 
			                    	className="form-control" 
			                    	id="caloriesPerServing" 
			                    	value={ product.get('caloriesPerServing') } 
			                    	onChange={() => { onChangeCaloriesPerServing(cps.value, product.get('sku')) }}></input>
			                </div>
			            </div>
			            <div className="form-group">
			                <lable htmlFor="servingsPerContainer" className="col-xs-4 control-label">Servings/Container</lable>
			                <div className="col-xs-8">
			                    <input 
			                    	ref={ (input) => { 
			                    		if (input != null) {
			                    			spc = input;
			                    		}}}
			                    	type="text" 
			                    	className="form-control" 
			                    	id="servingsPerContainer" 
			                    	value={ product.get('servingsPerContainer') } 
			                    	onChange={() => { onChangeServingsPerContainer(spc.value, product.get('sku'), product.get('quantity')) } }></input>
			                </div>
			            </div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProductsProps = (state) => {
	return {
		products: state.get('inventorySection').get('products')
	}
}

const mapDispatchToProductsProps = (dispatch) => {
	return {
		onChangeServingSize: (servingSize, sku) => {
			dispatch({
				type: InventoryActions.CHANGE_SERVING_SIZE,
				servingSize,
				sku
			});
		},
		onChangeCaloriesPerServing: (caloriesPerServing, sku) => {
			dispatch({
				type: InventoryActions.CHANGE_CALORIES_PER_SERVING,
				caloriesPerServing,
				sku
			});
		},
		onChangeServingsPerContainer: (servingsPerContainer, sku, quantity) => {
			dispatch({
				type: InventoryActions.CHANGE_SERVINGS_PER_CONTAINER,
				servingsPerContainer,
				sku,
				quantity
			});
		}
	}
}

const Products = ({ products, onChangeServingSize, onChangeCaloriesPerServing, onChangeServingsPerContainer }) => {
	const productBoxes = products.map((product) => {
		return (
			<ProductBox
				key={ product.get('sku') }
				product={product} 
				onChangeServingSize={ onChangeServingSize } 
				onChangeCaloriesPerServing={ onChangeCaloriesPerServing } 
				onChangeServingsPerContainer={ onChangeServingsPerContainer } />
		);
	})
	return (
		<div className="col-xs-12">
			{productBoxes}
		</div>
	);
}

const ProductsContainer = connect(mapStateToProductsProps, mapDispatchToProductsProps)(Products);

export default Inventory;