import React from 'react';

const OrderSummary = ({ subtotal, shippingPrice , shippingType }) => {
  // Calcola il totale, convertendo shippingPrice in Price
  const totalPrice = (parseFloat(subtotal.price) + parseFloat(shippingPrice)).toString();
  const totalDiscount = (parseFloat(subtotal.listprice) - parseFloat(subtotal.price)).toFixed(2);

  return (
    <div className="order-summary">
      <div className='subtotal-summary'><span>Order Subtotal</span> <span>{subtotal.currency}{parseFloat(subtotal.price).toFixed(2)}</span> </div>
      {totalDiscount > 0 && (
        <div className='discount-summary'><span> Discount</span> <span>- {subtotal.currency}{totalDiscount} </span> </div>
      )}
      <div> <span>{shippingType}</span> <span> {subtotal.currency}{parseFloat(shippingPrice).toFixed(2)} </span></div>
      <div className='total-summary'><span>Total Order</span> {subtotal.currency}{parseFloat(totalPrice).toFixed(2)}</div>
    </div>
  );
}

export default OrderSummary;
