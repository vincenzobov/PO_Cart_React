import React, { useState } from 'react';
import { ShippingOption } from '../../../interfaces/OrderTypes';



const shippingOptions: ShippingOption[] = [
  {
    name: 'Green Shipping',
    price: 0,
    description: 'We use logistics service providers who employ solutions to reduce emissions.',
    deliveryTime: '3-4 business days',
    icon: (
        <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="50" height="50" rx="25" fill="#405535"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.875 22.3622L39.7812 26.956C39.9235 27.1757 39.9994 27.4317 40 27.6935V32.8497C39.9951 33.2227 39.8421 33.5784 39.5749 33.8386C39.3076 34.0988 38.948 34.2422 38.575 34.2372H37.4125C37.1166 35.3259 36.1282 36.0816 35 36.0816C33.8718 36.0816 32.8834 35.3259 32.5875 34.2372H17.4125C17.1166 35.3259 16.1282 36.0816 15 36.0816C13.8718 36.0816 12.8834 35.3259 12.5875 34.2372H11.25C10.5596 34.2372 10 33.6776 10 32.9872V29.8622H11.25V32.9872H12.5875C12.8834 31.8985 13.8718 31.1428 15 31.1428C16.1282 31.1428 17.1166 31.8985 17.4125 32.9872H30V16.1685H17.5V14.9185H30C30.6904 14.9185 31.25 15.4781 31.25 16.1685V21.7372H35.625C36.1217 21.7153 36.5945 21.9517 36.875 22.3622ZM13.75 33.6122C13.75 34.3026 14.3096 34.8622 15 34.8622C15.6904 34.8622 16.25 34.3026 16.25 33.6122C16.25 32.9219 15.6904 32.3622 15 32.3622C14.3096 32.3622 13.75 32.9219 13.75 33.6122ZM35 34.8622C34.3096 34.8622 33.75 34.3026 33.75 33.6122C33.75 32.9219 34.3096 32.3622 35 32.3622C35.6904 32.3622 36.25 32.9219 36.25 33.6122C36.25 34.3026 35.6904 34.8622 35 34.8622ZM38.5688 32.9872C38.6565 32.9984 38.7371 32.9372 38.75 32.8497L38.725 27.6935C38.7309 27.673 38.7309 27.6514 38.725 27.631L35.7875 23.0685C35.7502 23.0161 35.6893 22.9856 35.625 22.9872H31.25V32.9872H32.5875C32.8834 31.8985 33.8718 31.1428 35 31.1428C36.1282 31.1428 37.1166 31.8985 37.4125 32.9872H38.5688Z" fill="white"/>
            <path d="M22.337 27.6477C20.8871 19.2901 14.1378 17.9182 10.9444 18.277C10.9347 21.9237 13.1996 28.9034 22.337 27.6477ZM22.337 27.6477L13.071 20.6888" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ), 
  },
  {
    name: 'Standard Shipping',
    price: 5.99,
    description: 'Classic shipping method with standard delivery time.',
    deliveryTime: '2-3 business days',
    icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="m26.875 11.862 2.906 4.594c.143.22.218.476.219.738v5.156a1.406 1.406 0 0 1-1.425 1.387h-1.162a2.5 2.5 0 0 1-4.826 0H7.412a2.5 2.5 0 0 1-4.824 0H1.25c-.69 0-1.25-.56-1.25-1.25v-3.125h1.25v3.125h1.337a2.5 2.5 0 0 1 4.825 0H20V5.668H7.5v-1.25H20c.69 0 1.25.56 1.25 1.25v5.57h4.375c.497-.023.97.214 1.25.624zM3.75 23.112a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zM25 24.362a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3.569-1.875a.162.162 0 0 0 .181-.137l-.025-5.157a.113.113 0 0 0 0-.062l-2.938-4.563a.194.194 0 0 0-.162-.08H21.25v10h1.337a2.5 2.5 0 0 1 4.826 0h1.156z" fill="#000"/>
            <path fill="#000" d="M5 8.112h6.25v1.25H5zM2.5 11.862h6.25v1.25H2.5zM0 15.612h6.25v1.25H0z"/>
        </svg>
      ), 
  },
];

type ShippingOptionsProps = {
  onShippingChange: (price: number) => void;
};

function ShippingOptions({ onShippingChange }: ShippingOptionsProps) {
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0]);

  const handleShippingChange = (option: ShippingOption) => {
    setSelectedShipping(option);
    onShippingChange(option.price);
  };

  return (
    <div className="shipping-options">
      {shippingOptions.map((option, index) => (
        <div
          key={index}
          className={`shipping-option ${selectedShipping.name === option.name ? 'selected' : ''}`}
          onClick={() => handleShippingChange(option)}
        >
          <div className="shipping-header">
            <input
              type="radio"
              id={option.name}
              name="shipping"
              value={option.name}
              checked={selectedShipping.name === option.name}
              onChange={() => handleShippingChange(option)}
            />
            <label htmlFor={option.name}>
            <span className="shipping-icon">{option.icon}</span>
              <span className="shipping-name">{option.name}</span>
              <span className="shipping-price">{option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}</span>
            </label>
          </div>
          <p className="shipping-description">{option.description}</p>
          <p className="shipping-delivery">{option.deliveryTime}</p>
        </div>
      ))}
    </div>
  );
}

export default ShippingOptions;
