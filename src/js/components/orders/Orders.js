import React from 'react';
import { connect } from 'react-redux';



const Orders = () => {
    return (
    	<div className="col-xs-12">
    	    <SearchPanel />    	       
    	    <OrderPanelContainer />
    	</div>
    )
}

const SearchPanel = () => {
	return (
		<div className="row">
			<div className="col-xs-12 col-md-6 col-md-push-3 well" >
				<div className="form-horizontal" >
		            <div className="form-group">
		                <lable htmlFor="orderNumber" className="col-xs-4 control-label">Order Number</lable>
		                <div className="col-xs-8">
		                    <input type="text" className="form-control" id="orderNumber" onChange={() => {}}></input>
		                </div>
		            </div>
		            <div className="form-group">
		                <lable htmlFor="orderDate" className="col-xs-4 control-label">Order Date</lable>
		                <div className="col-xs-8">
		                    <input type="date" className="form-control" id="orderDate" onChange={() => {}}></input>
		                </div>
		            </div>
		            <button className="btn btn-primary col-xs-8 col-xs-push-2"
		                    onClick={ () => {} }>Search</button>
		        </div>
		    </div>
	    </div>
	)
}

const mapStateToOrderPanel = (state) => {
	const orders = state.get('orderSection').get('orderByNumber').toList();
	return {
		orders
	}
}



const OrderPanel = ({ orders }) => {
	const orderBoxes = orders.map((o) => {
		return (
			<OrderBox key={o.get('orderNumber')} order={o} />
		)
	});
	return (
        <div className="row">
            <div className="col-xs-10 col-xs-push-1">
                {orderBoxes}
			</div>
		</div>
	)
}

const OrderPanelContainer = connect(mapStateToOrderPanel, null)(OrderPanel);




const OrderBox = ({ order }) => {
	const items = order.get('items').map((item) => {
		return (
			<tr key={item.get('sku')}>
				<td>{ item.get('description') }</td>
			    <td>{ item.get('quantity') }</td>
			</tr>
		)
	});
	return (
		<div className="form-horizontal well">
			<div className="form-group">
				<div className="row">
		            <div className="col-xs-12 col-sm-6">
		                <lable htmlFor="orderNumber" className="col-sm-6 control-label">Order Number</lable>
		                <div className="col-sm-6">
		                    <input type="text" className="form-control" id="orderNumber" value={ order.get('orderNumber')} readOnly></input>
		                </div>
		            </div>
		            <div className="col-xs-12 col-sm-6">
		                <lable htmlFor="amount" className="col-sm-6 control-label col-sm-pull-3">Amount</lable>
		                <div className="col-sm-6 col-sm-pull-3">
		                    <input type="text" className="form-control" id="amount" value={ order.get('amount')} readOnly></input>
		                </div>
		            </div>
	            </div>
	        </div>
	        <div className="form-group">
	        	<div className="row">
		            <div className="col-xs-12 col-sm-6">
		                <lable htmlFor="orderDate" className="col-sm-6 control-label">Order Date</lable>
		                <div className="col-sm-6">
		                    <input type="text" className="form-control" id="orderDate" value={ order.get('orderDate')} readOnly></input>
		                </div>
		            </div>
		            <div className="col-xs-12 col-sm-6">
		                <lable htmlFor="volumePoints" className="col-sm-6 col-sm-pull-3 control-label">Volume Points</lable>
		                <div className="col-sm-6 col-sm-pull-3">
		                    <input type="text" className="form-control" id="volumePoints" value={ order.get('volumePoints')} readOnly></input>
		                </div>
		            </div>
	            </div>
	        </div>
	      <button type="button" className="btn btn-info" data-toggle="collapse" data-target={ `#${order.get('orderNumber')}` }>Order details</button>

	      <div id={ order.get('orderNumber') } className="collapse">
		      <table className="table">
	          	  <thead>
	              	  <tr>
	                	  <th>Item</th>
	                	  <th>Quantity</th>
	              	  </tr>
	              </thead>
	              <tbody>
	              	  {items}
	              </tbody>
			  </table>
	      </div>
		        
	        
	    </div>
	)
}

export default Orders;