import React from 'react';

const EmptyCart = () => {
  return (
    <>
<div className="cartEmpty">
	<div className="cartEmpty_text-wrapper">
		<h2 className="cartEmpty__title">Your shopping bag is empty, continue shopping now!</h2>
			<div className="cartEmpty__cta">
				<a id="backOpticalPLP" href="https://stage.persol.com/CategoryDisplay?storeId=715838388&amp;urlRequestType=Base&amp;categoryId=3074457345616696201&amp;langId=-1&amp;catalogId=3074457345616685418" data-element-id="X_X_Summary_CTA1">
					<button  data-element-id="" className="buttonReturnPLP"> Shop Sunglasses</button>
				</a>
				<a id="backSunPLP" href="https://stage.persol.com/CategoryDisplay?storeId=715838388&amp;urlRequestType=Base&amp;categoryId=3074457345616696200&amp;langId=-1&amp;catalogId=3074457345616685418" data-element-id="X_X_Summary_CTA2">
						<button  data-element-id="" className="buttonReturnPLP black-button">Shop Eyeglasses</button>
				</a>
	        </div>
	</div>
</div>
  

  
  </>
);
}

export default EmptyCart;
