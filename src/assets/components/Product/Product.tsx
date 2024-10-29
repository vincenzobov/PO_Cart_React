// src/components/Product/Product.tsx
import React, { useState } from 'react';
import EstimatedDeliveryDate from '../EstimatedDeliveryDate/EstimatedDeliveryDate.tsx';
import { attribute, FrameDetails, Price, ProductDetail} from '../../../interfaces/OrderTypes.ts';
import { clsx } from 'clsx';
import Modal from '../Modal/Modal.tsx';
import useIsMobile from '../../Hook/useIsMobile.js';

interface ProductProps {
  orderItemId?: string;
  name?: string;
  size?: string;
  frame?: FrameDetails;
  lens?: ProductDetail;
  price?: string;
  imageUrl?: string;
  service?: ProductDetail[],
  removeItem: () => void;
}

function getFrameColor(attributes: attribute[]): string{
  const frameColorAttribute = attributes.find(attr => attr.identifier === "FRAME_COLOR");
  return frameColorAttribute ? frameColorAttribute.values.values : "";
}

function getTotalPriceforLenses(lens: ProductDetail, services: ProductDetail[]): Price {
 
  let TotalPriceLensAndServices: Price = {
    listprice: '0',
    price: '0',
    currency: 'USD'
  };

  let totalListPrice = 0;
  let totalPrice = 0;

  services.forEach(service => {
    totalListPrice += parseFloat(service.price.listprice);
    totalPrice += parseFloat(service.price.price);
  });

  totalListPrice += parseFloat(lens.price.listprice);
  totalPrice += parseFloat(lens.price.price);

  // Converti il risultato in stringa prima di restituirlo
  TotalPriceLensAndServices.listprice = totalListPrice.toFixed(2); // Converte in stringa
  TotalPriceLensAndServices.price = totalPrice.toFixed(2);         // Converte in stringa

  return TotalPriceLensAndServices;
}

function getTotalPriceforProduct(framePrice: Price , lens?: ProductDetail, services?: ProductDetail[]): Price {
 
  let getTotalPriceforProduct: Price = {
    listprice: '0',
    price: '0',
    currency: 'USD'
  };

  let totalListPrice = 0;
  let totalPrice = 0;


  if(!!services && !!lens){
    services.forEach(service => {
      totalListPrice += parseFloat(service.price.listprice);
      totalPrice += parseFloat(service.price.price);
    });
  
    totalListPrice += parseFloat(lens.price.listprice);
    totalPrice += parseFloat(lens.price.price);
  }

  totalListPrice += parseFloat(framePrice.listprice);
  totalPrice += parseFloat(framePrice.price);

  // Converti il risultato in stringa prima di restituirlo
  getTotalPriceforProduct.listprice = totalListPrice.toFixed(2); // Converte in stringa
  getTotalPriceforProduct.price = totalPrice.toFixed(2);         // Converte in stringa

  return getTotalPriceforProduct;
}

function getCurrency(){
  const landId = "-1";

  if(landId == "-1"){
     return "$"
  }
}

const Product = ({
  orderItemId,
  name,
  size,
  frame,
  lens,
  price,
  imageUrl,
  service,
  removeItem,
}: ProductProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };

  const confirmRemove = () => {
    removeItem(); // Chiamata alla funzione di rimozione passata come prop
    setIsModalOpen(false);
  };

  const cancelRemove = () => {
    setIsModalOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

// Definisci il prezzo di default come un oggetto Price con valori "0"
const defaultPrice: Price = {
  listprice: '0',
  price: '0',
  currency: 'USD'
};

// Passa frame?.price o il prezzo di default se frame?.price è undefined
const totalFramePrice = getTotalPriceforProduct(frame?.price ?? defaultPrice, lens, service);

  return (
    <>
    <div className="product">
    {isMobile ? (<>
      <div className="product-image">
        <div className='img-container'>
          <img src={imageUrl} alt={name} />
        </div>
          <div className='main-info-mobile'>
              <div className='model-name'>
                <span>{name}</span>
              </div>
              {!!lens && (
                <div className='prescription-badge'>PRESCRIPTION LENSES</div>
              )}
              <div className='total-price'>
               {parseFloat(totalFramePrice.listprice || "0") > parseFloat(totalFramePrice.price || "0") && (
                  <div className='list-price'>{getCurrency()}{totalFramePrice.listprice}</div>
                )}
                <div className='offer-price'>{getCurrency()}{totalFramePrice.price}</div>
              </div>
            </div>
        </div>
        <div className='estimated-delivery-date-container'>
             <EstimatedDeliveryDate daysToDelivery={"7"} />
        </div>    
        {isOpen && (
           <div className="product-details">
           <div className='box size-attribute'>
             <span>Size:</span>
           </div>
           <div className='box size-attribute-value'>
             <span>{size}</span>
           </div>
           <div className='box size-attribute-price'>
           </div>
           <div className='box frame-attribute'>
             <span>Frame:</span>
           </div>
           <div className="box frame-attribute-value">
             {frame?.attributes ? getFrameColor(frame.attributes) : "N/A"}
           </div>
           <div className='box frame-attribute-price'>
              {parseFloat(frame?.price.listprice || "0") > parseFloat(frame?.price.price || "0") && (
                    <div className='original-price'>{getCurrency()}{frame?.price?.listprice}</div>
              )}
              <div className='offer-price'>{getCurrency()}{frame?.price?.price}</div>
           </div>
           <div className="box lens-attribute">
             <span>Lens:</span>
           </div>
           <div className="box lens-attribute-value">
             {lens?.name || "N/A"}
           </div>
           <div className="box lens-attribute-price">
             {!!lens && !!service && (
               <><div className={clsx('list-price', { 'show-list-price': getTotalPriceforLenses(lens, service).listprice > getTotalPriceforLenses(lens, service).price })}>
                 <div className='original-price'>{getCurrency()}{getTotalPriceforLenses(lens, service).listprice}</div>
               </div><div className='offer-price'>{getCurrency()}{getTotalPriceforLenses(lens, service).price}</div></>

             )}
           </div>
         </div>
        )}
        <div className='viewMore-remove-container'>
            <div onClick={toggleAccordion} className='view-button-container'>
              {isOpen ? 
              <><div className='view-image'> 
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 19.7 19.7" xml:space="preserve">
                  <path d="M19.6,9.4L19.6,9.4C18.6,7.5,17.3,6,15.7,5l4-4L18.7,0l-4.3,4.3c-1.4-0.7-3-1.1-4.6-1.1c-4.1,0-7.8,2.4-9.7,6.2
                    C0,9.7,0,10,0.1,10.3c0.9,1.8,2.3,3.3,3.9,4.4l-4,4L1,19.7l4.3-4.3c1.4,0.7,3,1.1,4.6,1.1c4.1,0,7.8-2.4,9.7-6.2
                    C19.7,10,19.7,9.7,19.6,9.4z M1.3,9.8c1.7-3.3,5-5.3,8.5-5.3c1.3,0,2.5,0.3,3.6,0.8l-1.2,1.2c-0.7-0.5-1.6-0.8-2.5-0.8
                    c-2.3,0-4.3,1.9-4.3,4.3c0,0.9,0.3,1.8,0.8,2.5L5,13.8C3.5,12.9,2.2,11.5,1.3,9.8z M12.8,9.8c0,1.6-1.3,2.9-2.9,2.9
                    c-0.6,0-1.1-0.2-1.6-0.5l1.5-1.5c0,0,0.1,0,0.1,0c0.6,0,1-0.5,1-1.1c0,0,0-0.1,0-0.1l1.5-1.5C12.6,8.7,12.8,9.3,12.8,9.8z M6.9,9.8
                    c0-1.6,1.3-3,3-3c0.6,0,1.1,0.2,1.6,0.5L9.9,8.8c0,0-0.1,0-0.1,0c-0.6,0-1,0.5-1,1c0,0,0,0.1,0,0.1l-1.5,1.5
                    C7.1,10.9,6.9,10.4,6.9,9.8z M9.9,15.2c-1.3,0-2.5-0.3-3.6-0.8l1.2-1.2c0.7,0.5,1.6,0.8,2.5,0.8c2.3,0,4.2-1.9,4.2-4.2
                    c0-0.9-0.3-1.8-0.8-2.5l1.5-1.5c1.5,0.9,2.8,2.3,3.6,3.9C16.6,13.1,13.4,15.2,9.9,15.2z"/>
                  </svg>
                </div> <div className='view-text'> View Less</div> </> 
              : 
              <><div className='view-image'>
                 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 19.7 19.7"  xml:space="preserve">
                  <path d="M9.9,5.6c-2.3,0-4.3,1.9-4.3,4.3c0,2.3,1.9,4.2,4.3,4.2s4.2-1.9,4.2-4.2C14.1,7.5,12.2,5.6,9.9,5.6z M12.8,9.8
                    c0,1.6-1.3,2.9-2.9,2.9c-1.6,0-3-1.3-3-2.9c0-1.6,1.3-3,3-3C11.5,6.9,12.8,8.2,12.8,9.8z M10.9,9.8c0,0.6-0.5,1.1-1,1.1
                    s-1-0.5-1-1.1s0.5-1,1-1S10.9,9.3,10.9,9.8z M19.6,9.4L19.6,9.4c-1.9-3.8-5.7-6.2-9.7-6.2S2.1,5.6,0.1,9.4C0,9.7,0,10,0.1,10.3
                    c1.9,3.8,5.7,6.2,9.7,6.2s7.8-2.4,9.7-6.2C19.7,10,19.7,9.7,19.6,9.4z M18.4,9.8c-1.7,3.3-5,5.3-8.5,5.3c-3.5,0-6.8-2-8.5-5.4
                    c1.7-3.3,5-5.3,8.5-5.3C13.4,4.5,16.6,6.5,18.4,9.8z"/>
                  </svg>
                </div> <div className='view-text'> View More</div> </> }
            </div>
            <div className='remove-container' onClick={handleRemoveClick}>
               <div className='remove-image'>
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <mask id="path-1-outside-1_420_31002" maskUnits="userSpaceOnUse" x="-0.679688" y="-0.682617" width="17" height="17" fill="black">
                     <rect fill="white" x="-0.679688" y="-0.682617" width="17" height="17" />
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1535 15.0417C11.5146 15.0417 11.8149 14.7683 11.8521 14.4072L13.0062 2.87887H10.3469H5.65252H2.99317L4.14735 14.4072C4.1811 14.7683 4.48483 15.0417 4.84594 15.0417H11.1535ZM10.3469 0.958598H5.65252V2.23765H10.3469V0.958598ZM13.0029 2.24103H15.6757V2.87887H13.6373C13.6373 2.88701 13.6377 2.89475 13.6381 2.90223C13.6389 2.91645 13.6395 2.92972 13.6373 2.94299L12.4865 14.468C12.419 15.1564 11.8419 15.6795 11.1501 15.6795H4.84594C4.15748 15.6795 3.57701 15.1531 3.50951 14.468L2.3587 2.94299C2.35643 2.9271 2.35721 2.91274 2.35797 2.89887C2.35834 2.89213 2.3587 2.8855 2.3587 2.87887H0.320312V2.23765H2.99317H5.01131V0.958598C5.01131 0.604242 5.29817 0.317383 5.65252 0.317383H10.3435C10.6979 0.317383 10.9847 0.604242 10.9847 0.958598V2.24103H13.0029ZM7.67754 4.16129H8.31875V13.7626H7.67754V4.16129ZM10.5604 4.13945L9.92054 13.7399L10.5603 13.7825L11.2002 4.18209L10.5604 4.13945ZM4.80034 4.18318L5.44015 4.14054L6.07999 13.741L5.44018 13.7836L4.80034 4.18318Z" />
                   </mask>
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1535 15.0417C11.5146 15.0417 11.8149 14.7683 11.8521 14.4072L13.0062 2.87887H10.3469H5.65252H2.99317L4.14735 14.4072C4.1811 14.7683 4.48483 15.0417 4.84594 15.0417H11.1535ZM10.3469 0.958598H5.65252V2.23765H10.3469V0.958598ZM13.0029 2.24103H15.6757V2.87887H13.6373C13.6373 2.88701 13.6377 2.89475 13.6381 2.90223C13.6389 2.91645 13.6395 2.92972 13.6373 2.94299L12.4865 14.468C12.419 15.1564 11.8419 15.6795 11.1501 15.6795H4.84594C4.15748 15.6795 3.57701 15.1531 3.50951 14.468L2.3587 2.94299C2.35643 2.9271 2.35721 2.91274 2.35797 2.89887C2.35834 2.89213 2.3587 2.8855 2.3587 2.87887H0.320312V2.23765H2.99317H5.01131V0.958598C5.01131 0.604242 5.29817 0.317383 5.65252 0.317383H10.3435C10.6979 0.317383 10.9847 0.604242 10.9847 0.958598V2.24103H13.0029ZM7.67754 4.16129H8.31875V13.7626H7.67754V4.16129ZM10.5604 4.13945L9.92054 13.7399L10.5603 13.7825L11.2002 4.18209L10.5604 4.13945ZM4.80034 4.18318L5.44015 4.14054L6.07999 13.741L5.44018 13.7836L4.80034 4.18318Z" fill="black" />
                   <path d="M11.8521 14.4072L12.051 14.4277L12.0511 14.4272L11.8521 14.4072ZM13.0062 2.87887L13.2052 2.89879L13.2273 2.67887H13.0062V2.87887ZM2.99317 2.87887V2.67887H2.77214L2.79416 2.89879L2.99317 2.87887ZM4.14735 14.4072L4.34649 14.3886L4.34636 14.3873L4.14735 14.4072ZM5.65252 0.958598V0.758598H5.45252V0.958598H5.65252ZM10.3469 0.958598H10.5469V0.758598H10.3469V0.958598ZM5.65252 2.23765H5.45252V2.43765H5.65252V2.23765ZM10.3469 2.23765V2.43765H10.5469V2.23765H10.3469ZM15.6757 2.24103H15.8757V2.04103H15.6757V2.24103ZM15.6757 2.87887V3.07887H15.8757V2.87887H15.6757ZM13.6373 2.87887V2.67887H13.4373V2.87887H13.6373ZM13.6381 2.90223L13.4384 2.91257L13.4384 2.91258L13.6381 2.90223ZM13.6373 2.94299L13.4396 2.91004L13.4383 2.92312L13.6373 2.94299ZM12.4865 14.468L12.2875 14.4481L12.2875 14.4485L12.4865 14.468ZM3.50951 14.468L3.70855 14.4484L3.70852 14.4481L3.50951 14.468ZM2.3587 2.94299L2.55789 2.9231L2.55669 2.9147L2.3587 2.94299ZM2.35797 2.89887L2.55767 2.90977V2.90977L2.35797 2.89887ZM2.3587 2.87887H2.5587V2.67887H2.3587V2.87887ZM0.320312 2.87887H0.120312V3.07887H0.320312V2.87887ZM0.320312 2.23765V2.03765H0.120312V2.23765H0.320312ZM5.01131 2.23765V2.43765H5.21131V2.23765H5.01131ZM10.9847 2.24103H10.7847V2.44103H10.9847V2.24103ZM8.31875 4.16129H8.51875V3.96129H8.31875V4.16129ZM7.67754 4.16129V3.96129H7.47754V4.16129H7.67754ZM8.31875 13.7626V13.9626H8.51875V13.7626H8.31875ZM7.67754 13.7626H7.47754V13.9626H7.67754V13.7626ZM9.92054 13.7399L9.72098 13.7266L9.70768 13.9261L9.90724 13.9394L9.92054 13.7399ZM10.5604 4.13945L10.5737 3.93989L10.3741 3.92659L10.3608 4.12615L10.5604 4.13945ZM10.5603 13.7825L10.547 13.9821L10.7466 13.9954L10.7599 13.7958L10.5603 13.7825ZM11.2002 4.18209L11.3997 4.19539L11.413 3.99583L11.2135 3.98253L11.2002 4.18209ZM5.44015 4.14054L5.63971 4.12724L5.62641 3.92768L5.42685 3.94098L5.44015 4.14054ZM4.80034 4.18318L4.78704 3.98362L4.58749 3.99692L4.60079 4.19648L4.80034 4.18318ZM6.07999 13.741L6.09329 13.9405L6.29284 13.9272L6.27954 13.7277L6.07999 13.741ZM5.44018 13.7836L5.24062 13.7969L5.25392 13.9965L5.45348 13.9832L5.44018 13.7836ZM11.6531 14.3868C11.6263 14.6471 11.4108 14.8417 11.1535 14.8417V15.2417C11.6184 15.2417 12.0035 14.8896 12.051 14.4277L11.6531 14.3868ZM12.8072 2.85894L11.6531 14.3873L12.0511 14.4272L13.2052 2.89879L12.8072 2.85894ZM10.3469 3.07887H13.0062V2.67887H10.3469V3.07887ZM5.65252 3.07887H10.3469V2.67887H5.65252V3.07887ZM2.99317 3.07887H5.65252V2.67887H2.99317V3.07887ZM4.34636 14.3873L3.19217 2.85894L2.79416 2.89879L3.94835 14.4272L4.34636 14.3873ZM4.84594 14.8417C4.58706 14.8417 4.37053 14.6459 4.34649 14.3886L3.94822 14.4258C3.99167 14.8908 4.38261 15.2417 4.84594 15.2417V14.8417ZM11.1535 14.8417H4.84594V15.2417H11.1535V14.8417ZM5.65252 1.1586H10.3469V0.758598H5.65252V1.1586ZM5.85252 2.23765V0.958598H5.45252V2.23765H5.85252ZM10.3469 2.03765H5.65252V2.43765H10.3469V2.03765ZM10.1469 0.958598V2.23765H10.5469V0.958598H10.1469ZM15.6757 2.04103H13.0029V2.44103H15.6757V2.04103ZM15.8757 2.87887V2.24103H15.4757V2.87887H15.8757ZM13.6373 3.07887H15.6757V2.67887H13.6373V3.07887ZM13.8379 2.89189C13.8374 2.88379 13.8373 2.88106 13.8373 2.87887H13.4373C13.4373 2.89296 13.438 2.90571 13.4384 2.91257L13.8379 2.89189ZM13.8346 2.97587C13.841 2.93747 13.8384 2.90219 13.8379 2.89187L13.4384 2.91258C13.4386 2.91637 13.4387 2.91855 13.4388 2.92046C13.4388 2.92223 13.4388 2.92277 13.4388 2.92259C13.4388 2.92223 13.4388 2.91739 13.4401 2.91011L13.8346 2.97587ZM12.6855 14.4879L13.8363 2.96286L13.4383 2.92312L12.2875 14.4481L12.6855 14.4879ZM11.1501 15.8795C11.9448 15.8795 12.608 15.2784 12.6856 14.4875L12.2875 14.4485C12.23 15.0345 11.7391 15.4795 11.1501 15.4795V15.8795ZM4.84594 15.8795H11.1501V15.4795H4.84594V15.8795ZM3.31048 14.4876C3.38805 15.275 4.05454 15.8795 4.84594 15.8795V15.4795C4.26041 15.4795 3.76597 15.0312 3.70855 14.4484L3.31048 14.4876ZM2.15969 2.96286L3.3105 14.4879L3.70852 14.4481L2.55771 2.92312L2.15969 2.96286ZM2.15827 2.88798C2.1576 2.90029 2.15528 2.93326 2.16071 2.97127L2.55669 2.9147C2.55722 2.91841 2.5572 2.92069 2.5572 2.92036C2.5572 2.91925 2.55726 2.91744 2.55767 2.90977L2.15827 2.88798ZM2.1587 2.87887C2.1587 2.87862 2.15871 2.87905 2.15864 2.88064C2.15857 2.88238 2.15847 2.88437 2.15827 2.88798L2.55767 2.90977C2.55799 2.90396 2.5587 2.89187 2.5587 2.87887H2.1587ZM0.320312 3.07887H2.3587V2.67887H0.320312V3.07887ZM0.120312 2.23765V2.87887H0.520313V2.23765H0.120312ZM2.99317 2.03765H0.320312V2.43765H2.99317V2.03765ZM5.01131 2.03765H2.99317V2.43765H5.01131V2.03765ZM4.81131 0.958598V2.23765H5.21131V0.958598H4.81131ZM5.65252 0.117383C5.18771 0.117383 4.81131 0.493785 4.81131 0.958598H5.21131C5.21131 0.714699 5.40862 0.517383 5.65252 0.517383V0.117383ZM10.3435 0.117383H5.65252V0.517383H10.3435V0.117383ZM11.1847 0.958598C11.1847 0.493785 10.8083 0.117383 10.3435 0.117383V0.517383C10.5874 0.517383 10.7847 0.714699 10.7847 0.958598H11.1847ZM11.1847 2.24103V0.958598H10.7847V2.24103H11.1847ZM13.0029 2.04103H10.9847V2.44103H13.0029V2.04103ZM8.31875 3.96129H7.67754V4.36129H8.31875V3.96129ZM8.51875 13.7626V4.16129H8.11875V13.7626H8.51875ZM7.67754 13.9626H8.31875V13.5626H7.67754V13.9626ZM7.47754 4.16129V13.7626H7.87754V4.16129H7.47754ZM10.1201 13.7532L10.7599 4.15275L10.3608 4.12615L9.72098 13.7266L10.1201 13.7532ZM10.5736 13.583L9.93384 13.5403L9.90724 13.9394L10.547 13.9821L10.5736 13.583ZM11.0006 4.16879L10.3608 13.7692L10.7599 13.7958L11.3997 4.19539L11.0006 4.16879ZM10.5471 4.33901L11.1869 4.38165L11.2135 3.98253L10.5737 3.93989L10.5471 4.33901ZM5.42685 3.94098L4.78704 3.98362L4.81364 4.38274L5.45345 4.3401L5.42685 3.94098ZM6.27954 13.7277L5.63971 4.12724L5.24059 4.15384L5.88043 13.7543L6.27954 13.7277ZM5.45348 13.9832L6.09329 13.9405L6.06669 13.5414L5.42688 13.5841L5.45348 13.9832ZM4.60079 4.19648L5.24062 13.7969L5.63974 13.7703L4.9999 4.16988L4.60079 4.19648Z" fill="black" mask="url(#path-1-outside-1_420_31002)" />
                 </svg>

               </div>
               <a onClick={handleRemoveClick}>REMOVE</a>
             </div>
        </div> 
         <div className='addFavorite-container'>
               <div className='addFavorite-image'>
                 <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M9.53136 3.44127L10.1211 4.19181L10.7108 3.44127C11.0639 2.9919 11.6688 2.30293 12.4342 1.73214C13.2053 1.1572 14.0745 0.75 14.9727 0.75C17.4032 0.75 19.4961 2.94055 19.4961 5.77841C19.4961 7.0588 19.0578 8.27126 18.2713 9.20524L18.2226 9.26303L18.2095 9.28707C18.1611 9.33817 18.1157 9.38102 18.0597 9.43225L18.0597 9.4322L18.052 9.43941L17.9688 9.51773L17.9687 9.51767L17.9608 9.52537L10.1209 17.1249L2.57339 9.82122L2.538 9.76188L2.4517 9.68506C1.3731 8.7249 0.746094 7.31207 0.746094 5.77841C0.746094 2.94055 2.83905 0.75 5.26952 0.75C6.16765 0.75 7.0369 1.1572 7.80795 1.73214C8.57343 2.30293 9.17828 2.9919 9.53136 3.44127Z" stroke="black" stroke-width="1.5"></path>
                 </svg>
               </div>
               ADD TO FAVOURITES
          </div>
          </>) : (
      <>
      <div className="product-image">
            <img src={imageUrl} alt={name} />
            {!!lens && (
              <div className='prescription-badge'>PRESCRIPTION LENSES</div>
            )}
          </div><div className="product-details">
              <div className='main-info'>
                <div className='model-name'>
                  <span>{name}</span>
                </div>
                <div className='total-price'>    
                    {parseFloat(totalFramePrice.listprice || "0") > parseFloat(totalFramePrice.price || "0") && (
                    <div className='list-price'>{getCurrency()}{totalFramePrice.listprice}</div>
                  )}
                  <div className='offer-price'>{getCurrency()}{totalFramePrice.price}</div>
                </div>
              </div>
              <div className='box size-attribute'>
                <span>Size:</span>
              </div>
              <div className='box size-attribute-value'>
                <span>{size}</span>
              </div>
              <div className='box size-attribute-price'>
              </div>
              <div className='box frame-attribute'>
                <span>Frame:</span>
              </div>
              <div className="box frame-attribute-value">
                {frame?.attributes ? getFrameColor(frame.attributes) : "N/A"}
              </div>
              <div className='box frame-attribute-price'>
                {parseFloat(frame?.price.listprice || "0") > parseFloat(frame?.price.price || "0") && (
                      <div className='original-price'>{getCurrency()}{frame?.price?.listprice}</div>
                )}
                <div className='offer-price'>{getCurrency()}{frame?.price?.price}</div>
              </div>
              <div className="box lens-attribute">
                <span>Lens:</span>
              </div>
              <div className="box lens-attribute-value">
                {lens?.name || "N/A"}
              </div>
              <div className="box lens-attribute-price">
                {!!lens && !!service && (
                  <><div className={clsx('list-price', { 'show-list-price': getTotalPriceforLenses(lens, service).listprice > getTotalPriceforLenses(lens, service).price })}>
                    <div className='original-price'>{getCurrency()}{getTotalPriceforLenses(lens, service).listprice}</div>
                  </div><div className='offer-price'>{getCurrency()}{getTotalPriceforLenses(lens, service).price}</div></>

                )}
              </div>
              <div className='estimated-delivery-date-container'>
                <EstimatedDeliveryDate daysToDelivery={"7"} />
              </div>
              <div className='remove-wishlist-container'>
                <div className='remove-container' onClick={handleRemoveClick}>
                  <div className='remove-image'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_420_31002" maskUnits="userSpaceOnUse" x="-0.679688" y="-0.682617" width="17" height="17" fill="black">
                        <rect fill="white" x="-0.679688" y="-0.682617" width="17" height="17" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1535 15.0417C11.5146 15.0417 11.8149 14.7683 11.8521 14.4072L13.0062 2.87887H10.3469H5.65252H2.99317L4.14735 14.4072C4.1811 14.7683 4.48483 15.0417 4.84594 15.0417H11.1535ZM10.3469 0.958598H5.65252V2.23765H10.3469V0.958598ZM13.0029 2.24103H15.6757V2.87887H13.6373C13.6373 2.88701 13.6377 2.89475 13.6381 2.90223C13.6389 2.91645 13.6395 2.92972 13.6373 2.94299L12.4865 14.468C12.419 15.1564 11.8419 15.6795 11.1501 15.6795H4.84594C4.15748 15.6795 3.57701 15.1531 3.50951 14.468L2.3587 2.94299C2.35643 2.9271 2.35721 2.91274 2.35797 2.89887C2.35834 2.89213 2.3587 2.8855 2.3587 2.87887H0.320312V2.23765H2.99317H5.01131V0.958598C5.01131 0.604242 5.29817 0.317383 5.65252 0.317383H10.3435C10.6979 0.317383 10.9847 0.604242 10.9847 0.958598V2.24103H13.0029ZM7.67754 4.16129H8.31875V13.7626H7.67754V4.16129ZM10.5604 4.13945L9.92054 13.7399L10.5603 13.7825L11.2002 4.18209L10.5604 4.13945ZM4.80034 4.18318L5.44015 4.14054L6.07999 13.741L5.44018 13.7836L4.80034 4.18318Z" />
                      </mask>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1535 15.0417C11.5146 15.0417 11.8149 14.7683 11.8521 14.4072L13.0062 2.87887H10.3469H5.65252H2.99317L4.14735 14.4072C4.1811 14.7683 4.48483 15.0417 4.84594 15.0417H11.1535ZM10.3469 0.958598H5.65252V2.23765H10.3469V0.958598ZM13.0029 2.24103H15.6757V2.87887H13.6373C13.6373 2.88701 13.6377 2.89475 13.6381 2.90223C13.6389 2.91645 13.6395 2.92972 13.6373 2.94299L12.4865 14.468C12.419 15.1564 11.8419 15.6795 11.1501 15.6795H4.84594C4.15748 15.6795 3.57701 15.1531 3.50951 14.468L2.3587 2.94299C2.35643 2.9271 2.35721 2.91274 2.35797 2.89887C2.35834 2.89213 2.3587 2.8855 2.3587 2.87887H0.320312V2.23765H2.99317H5.01131V0.958598C5.01131 0.604242 5.29817 0.317383 5.65252 0.317383H10.3435C10.6979 0.317383 10.9847 0.604242 10.9847 0.958598V2.24103H13.0029ZM7.67754 4.16129H8.31875V13.7626H7.67754V4.16129ZM10.5604 4.13945L9.92054 13.7399L10.5603 13.7825L11.2002 4.18209L10.5604 4.13945ZM4.80034 4.18318L5.44015 4.14054L6.07999 13.741L5.44018 13.7836L4.80034 4.18318Z" fill="black" />
                      <path d="M11.8521 14.4072L12.051 14.4277L12.0511 14.4272L11.8521 14.4072ZM13.0062 2.87887L13.2052 2.89879L13.2273 2.67887H13.0062V2.87887ZM2.99317 2.87887V2.67887H2.77214L2.79416 2.89879L2.99317 2.87887ZM4.14735 14.4072L4.34649 14.3886L4.34636 14.3873L4.14735 14.4072ZM5.65252 0.958598V0.758598H5.45252V0.958598H5.65252ZM10.3469 0.958598H10.5469V0.758598H10.3469V0.958598ZM5.65252 2.23765H5.45252V2.43765H5.65252V2.23765ZM10.3469 2.23765V2.43765H10.5469V2.23765H10.3469ZM15.6757 2.24103H15.8757V2.04103H15.6757V2.24103ZM15.6757 2.87887V3.07887H15.8757V2.87887H15.6757ZM13.6373 2.87887V2.67887H13.4373V2.87887H13.6373ZM13.6381 2.90223L13.4384 2.91257L13.4384 2.91258L13.6381 2.90223ZM13.6373 2.94299L13.4396 2.91004L13.4383 2.92312L13.6373 2.94299ZM12.4865 14.468L12.2875 14.4481L12.2875 14.4485L12.4865 14.468ZM3.50951 14.468L3.70855 14.4484L3.70852 14.4481L3.50951 14.468ZM2.3587 2.94299L2.55789 2.9231L2.55669 2.9147L2.3587 2.94299ZM2.35797 2.89887L2.55767 2.90977V2.90977L2.35797 2.89887ZM2.3587 2.87887H2.5587V2.67887H2.3587V2.87887ZM0.320312 2.87887H0.120312V3.07887H0.320312V2.87887ZM0.320312 2.23765V2.03765H0.120312V2.23765H0.320312ZM5.01131 2.23765V2.43765H5.21131V2.23765H5.01131ZM10.9847 2.24103H10.7847V2.44103H10.9847V2.24103ZM8.31875 4.16129H8.51875V3.96129H8.31875V4.16129ZM7.67754 4.16129V3.96129H7.47754V4.16129H7.67754ZM8.31875 13.7626V13.9626H8.51875V13.7626H8.31875ZM7.67754 13.7626H7.47754V13.9626H7.67754V13.7626ZM9.92054 13.7399L9.72098 13.7266L9.70768 13.9261L9.90724 13.9394L9.92054 13.7399ZM10.5604 4.13945L10.5737 3.93989L10.3741 3.92659L10.3608 4.12615L10.5604 4.13945ZM10.5603 13.7825L10.547 13.9821L10.7466 13.9954L10.7599 13.7958L10.5603 13.7825ZM11.2002 4.18209L11.3997 4.19539L11.413 3.99583L11.2135 3.98253L11.2002 4.18209ZM5.44015 4.14054L5.63971 4.12724L5.62641 3.92768L5.42685 3.94098L5.44015 4.14054ZM4.80034 4.18318L4.78704 3.98362L4.58749 3.99692L4.60079 4.19648L4.80034 4.18318ZM6.07999 13.741L6.09329 13.9405L6.29284 13.9272L6.27954 13.7277L6.07999 13.741ZM5.44018 13.7836L5.24062 13.7969L5.25392 13.9965L5.45348 13.9832L5.44018 13.7836ZM11.6531 14.3868C11.6263 14.6471 11.4108 14.8417 11.1535 14.8417V15.2417C11.6184 15.2417 12.0035 14.8896 12.051 14.4277L11.6531 14.3868ZM12.8072 2.85894L11.6531 14.3873L12.0511 14.4272L13.2052 2.89879L12.8072 2.85894ZM10.3469 3.07887H13.0062V2.67887H10.3469V3.07887ZM5.65252 3.07887H10.3469V2.67887H5.65252V3.07887ZM2.99317 3.07887H5.65252V2.67887H2.99317V3.07887ZM4.34636 14.3873L3.19217 2.85894L2.79416 2.89879L3.94835 14.4272L4.34636 14.3873ZM4.84594 14.8417C4.58706 14.8417 4.37053 14.6459 4.34649 14.3886L3.94822 14.4258C3.99167 14.8908 4.38261 15.2417 4.84594 15.2417V14.8417ZM11.1535 14.8417H4.84594V15.2417H11.1535V14.8417ZM5.65252 1.1586H10.3469V0.758598H5.65252V1.1586ZM5.85252 2.23765V0.958598H5.45252V2.23765H5.85252ZM10.3469 2.03765H5.65252V2.43765H10.3469V2.03765ZM10.1469 0.958598V2.23765H10.5469V0.958598H10.1469ZM15.6757 2.04103H13.0029V2.44103H15.6757V2.04103ZM15.8757 2.87887V2.24103H15.4757V2.87887H15.8757ZM13.6373 3.07887H15.6757V2.67887H13.6373V3.07887ZM13.8379 2.89189C13.8374 2.88379 13.8373 2.88106 13.8373 2.87887H13.4373C13.4373 2.89296 13.438 2.90571 13.4384 2.91257L13.8379 2.89189ZM13.8346 2.97587C13.841 2.93747 13.8384 2.90219 13.8379 2.89187L13.4384 2.91258C13.4386 2.91637 13.4387 2.91855 13.4388 2.92046C13.4388 2.92223 13.4388 2.92277 13.4388 2.92259C13.4388 2.92223 13.4388 2.91739 13.4401 2.91011L13.8346 2.97587ZM12.6855 14.4879L13.8363 2.96286L13.4383 2.92312L12.2875 14.4481L12.6855 14.4879ZM11.1501 15.8795C11.9448 15.8795 12.608 15.2784 12.6856 14.4875L12.2875 14.4485C12.23 15.0345 11.7391 15.4795 11.1501 15.4795V15.8795ZM4.84594 15.8795H11.1501V15.4795H4.84594V15.8795ZM3.31048 14.4876C3.38805 15.275 4.05454 15.8795 4.84594 15.8795V15.4795C4.26041 15.4795 3.76597 15.0312 3.70855 14.4484L3.31048 14.4876ZM2.15969 2.96286L3.3105 14.4879L3.70852 14.4481L2.55771 2.92312L2.15969 2.96286ZM2.15827 2.88798C2.1576 2.90029 2.15528 2.93326 2.16071 2.97127L2.55669 2.9147C2.55722 2.91841 2.5572 2.92069 2.5572 2.92036C2.5572 2.91925 2.55726 2.91744 2.55767 2.90977L2.15827 2.88798ZM2.1587 2.87887C2.1587 2.87862 2.15871 2.87905 2.15864 2.88064C2.15857 2.88238 2.15847 2.88437 2.15827 2.88798L2.55767 2.90977C2.55799 2.90396 2.5587 2.89187 2.5587 2.87887H2.1587ZM0.320312 3.07887H2.3587V2.67887H0.320312V3.07887ZM0.120312 2.23765V2.87887H0.520313V2.23765H0.120312ZM2.99317 2.03765H0.320312V2.43765H2.99317V2.03765ZM5.01131 2.03765H2.99317V2.43765H5.01131V2.03765ZM4.81131 0.958598V2.23765H5.21131V0.958598H4.81131ZM5.65252 0.117383C5.18771 0.117383 4.81131 0.493785 4.81131 0.958598H5.21131C5.21131 0.714699 5.40862 0.517383 5.65252 0.517383V0.117383ZM10.3435 0.117383H5.65252V0.517383H10.3435V0.117383ZM11.1847 0.958598C11.1847 0.493785 10.8083 0.117383 10.3435 0.117383V0.517383C10.5874 0.517383 10.7847 0.714699 10.7847 0.958598H11.1847ZM11.1847 2.24103V0.958598H10.7847V2.24103H11.1847ZM13.0029 2.04103H10.9847V2.44103H13.0029V2.04103ZM8.31875 3.96129H7.67754V4.36129H8.31875V3.96129ZM8.51875 13.7626V4.16129H8.11875V13.7626H8.51875ZM7.67754 13.9626H8.31875V13.5626H7.67754V13.9626ZM7.47754 4.16129V13.7626H7.87754V4.16129H7.47754ZM10.1201 13.7532L10.7599 4.15275L10.3608 4.12615L9.72098 13.7266L10.1201 13.7532ZM10.5736 13.583L9.93384 13.5403L9.90724 13.9394L10.547 13.9821L10.5736 13.583ZM11.0006 4.16879L10.3608 13.7692L10.7599 13.7958L11.3997 4.19539L11.0006 4.16879ZM10.5471 4.33901L11.1869 4.38165L11.2135 3.98253L10.5737 3.93989L10.5471 4.33901ZM5.42685 3.94098L4.78704 3.98362L4.81364 4.38274L5.45345 4.3401L5.42685 3.94098ZM6.27954 13.7277L5.63971 4.12724L5.24059 4.15384L5.88043 13.7543L6.27954 13.7277ZM5.45348 13.9832L6.09329 13.9405L6.06669 13.5414L5.42688 13.5841L5.45348 13.9832ZM4.60079 4.19648L5.24062 13.7969L5.63974 13.7703L4.9999 4.16988L4.60079 4.19648Z" fill="black" mask="url(#path-1-outside-1_420_31002)" />
                    </svg>

                  </div>
                  <a onClick={handleRemoveClick}>REMOVE</a>
                </div>
                <div className='addFavorite-container'>
                  <div className='addFavorite-image'>
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.53136 3.44127L10.1211 4.19181L10.7108 3.44127C11.0639 2.9919 11.6688 2.30293 12.4342 1.73214C13.2053 1.1572 14.0745 0.75 14.9727 0.75C17.4032 0.75 19.4961 2.94055 19.4961 5.77841C19.4961 7.0588 19.0578 8.27126 18.2713 9.20524L18.2226 9.26303L18.2095 9.28707C18.1611 9.33817 18.1157 9.38102 18.0597 9.43225L18.0597 9.4322L18.052 9.43941L17.9688 9.51773L17.9687 9.51767L17.9608 9.52537L10.1209 17.1249L2.57339 9.82122L2.538 9.76188L2.4517 9.68506C1.3731 8.7249 0.746094 7.31207 0.746094 5.77841C0.746094 2.94055 2.83905 0.75 5.26952 0.75C6.16765 0.75 7.0369 1.1572 7.80795 1.73214C8.57343 2.30293 9.17828 2.9919 9.53136 3.44127Z" stroke="black" stroke-width="1.5"></path>
                    </svg>
                  </div>
                  ADD TO FAVOURITES
                </div>
              </div>
            </div>
            </>)
    }
    </div>




    <Modal
        isOpen={isModalOpen}
        message="Are you sure you want to remove this item?"
        onConfirm={confirmRemove}
        onCancel={cancelRemove} />
        </>
  );
};




export default Product;
