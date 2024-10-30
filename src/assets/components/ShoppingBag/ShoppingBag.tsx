import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import OrderSummary from '../OrderSummary/OrderSummary';
import {mockOrderData,mockServiceDetails,mockFrameDetails,mockLensDetails} from '../../../__mocks__/mockOrderData';
import { FrameDetails, OrderData, OrderItem, Price, ProductDetail } from '../../../interfaces/OrderTypes';
import ShippingOptions from '../ShippingOptions/ShippingOptions';
import CartButton from '../CartButton/CartButton';
import useIsMobile from '../../Hook/useIsMobile';
import EmptyCart from '../EmptyCart/EmptyCart';

const API_BASE_URL = 'https://stage.persol.com/wcs/resources/store/715838388/productview/byId/';

const fetchProductDetails = async (ids: string[]) => {
  const url = `${API_BASE_URL}${ids.join('&')}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ShoppingBag = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [frames, setFrames] = useState<FrameDetails[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingType, setShippingType] = useState("Green Shipping");
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await new Promise<OrderData>((resolve) => {
        setTimeout(() => {
          resolve(mockOrderData);
        }, 1000);
      });

      console.log("vincenzo-response",response)
      setOrderData(response);
    };

    fetchOrderData();
  }, []);

  useEffect(() => {
    const fetchProductDetailsData = async () => {
      if (orderData) {
        try {
          const orderItems = orderData.orderItem;

          // Filtra gli ID dei prodotti per frame, lenti e servizi
          const framesIds: string[] = [];
          const lensesIds: string[] = [];
          const servicesIds: string[] = [];

          orderItems.forEach(item => {
            if (item.lineItemsTypes === 'RFRM') {
              framesIds.push(item.productId);
            } else if (item.lineItemsTypes === 'RLNS') {
              lensesIds.push(item.productId);
            } else if (item.lineItemsTypes === 'RSER') {
              servicesIds.push(item.productId);
            }
          });

          // Esegui le chiamate per ottenere i dettagli
          const [frameDetails, lensDetails, serviceDetails] = await Promise.all([
            fetchProductDetails(framesIds, 'frame'),
            fetchProductDetails(lensesIds, 'lens'),
            fetchProductDetails(servicesIds, 'service'),
          ]);



          // Crea una mappa per i frame con lenti e servizi
          const frameMap: { [key: string]: FrameDetails } = {};
          frameDetails.forEach(frame => {
            frameMap[frame.uniqueID] = { ...frame, lens: undefined as unknown as ProductDetail, service: []};
          });

          // Associa lenti e servizi ai frame seguendo l'ordine
          let currentFrameId: string | null = null;

          orderItems.forEach(item => {
            if (item.lineItemsTypes === 'RFRM') {
              currentFrameId = item.productId;
            } else if (item.lineItemsTypes === 'RLNS' && currentFrameId) {
              const lens = lensDetails.find(l => l.uniqueID === item.productId);
              if (lens && frameMap[currentFrameId]) {
                console.log("test",lens)
                frameMap[currentFrameId].lens = lens;
              }
            } else if (item.lineItemsTypes === 'RSER' && currentFrameId) {
              
              const service = serviceDetails.find(s => s.uniqueID === item.productId);
              if (service && frameMap[currentFrameId]) {
                frameMap[currentFrameId].service?.push(service);
              }
            }
          });

          // Trasforma la mappa in un array e imposta lo stato
          const combinedFrames = Object.values(frameMap);
          console.log("vincenzo",Object.values(frameMap))
          setFrames(combinedFrames);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch product details:', error);
          setLoading(false);
        }
      }
    };

    fetchProductDetailsData();
  }, [orderData]);

  const fetchProductDetails = async (productIds: string[], type: 'frame' | 'lens' | 'service'): Promise<ProductDetail[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === 'frame') {
          resolve(mockFrameDetails.filter(product => productIds.includes(product.uniqueID)));
        } else if (type === 'lens') {
          resolve(mockLensDetails.filter(product => productIds.includes(product.uniqueID)));
        } else if (type === 'service') {
          resolve(mockServiceDetails.filter(product => productIds.includes(product.uniqueID)));
        }
        resolve([]);
      }, 1000);
    });
  }


  const removeItem = (frameToRemove: FrameDetails) => {
    setFrames(frames.filter(frame => frame.uniqueID !== frameToRemove.uniqueID));
  };

  
  function calculateSubtotal(frame : FrameDetails[]): Price {
 
    let subtotal: Price = {
      listprice: '0',
      price: '0',
      currency: '$'
    };

    
    let totalListPrice = 0;
    let totalOfferPrice = 0;

    frames.forEach(frame => {

      if(!!frame.service){
        frame.service.forEach(service => {
          totalListPrice += parseFloat(service.price.listprice);
          totalOfferPrice += parseFloat(service.price.price);
          console.log("vincenzo-servizi",service.price.price)
        });
      }
      if(!!frame.lens){
        totalListPrice += parseFloat(frame.lens.price.listprice);
        totalOfferPrice += parseFloat(frame.lens.price.price);

      }

      totalListPrice += parseFloat(frame.price.listprice);
      totalOfferPrice += parseFloat(frame.price.price);


      

      // Converti il risultato in stringa prima di restituirlo
      subtotal.listprice = totalListPrice.toFixed(2); // Converte in stringa
      subtotal.price = totalOfferPrice.toFixed(2);         // Converte in stringa
    })
  
  
   
  
    return subtotal;
  }
  

  const isMobile = useIsMobile();

  return (
    <>
    <div className="shopping-bag-header">
      <div className="plp-hero--content">Shopping Bag</div>
    </div><div className='checkout-page'>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
          {(isMobile && frames.length > 0) ? <><div className='cart-button-container'>
            <button className='button-checkout'>Proceed to Checkout</button>
            </div></> : "" }
            
            <div className="shopping-bag">
              {frames.length > 0 ? (
                <div className="product-list">
                  {frames.map((frameProduct) => (
                    <Product
                      key={frameProduct.uniqueID}
                      name={frameProduct.name}
                      size={'M'} // This might need to be updated based on actual data
                      frame={frameProduct} // Assuming the Product component can handle the full product object
                      lens={frameProduct.lens} // Placeholder for lenses
                      service={frameProduct.service} // Placeholder for services
                      imageUrl={frameProduct.thumbnail}
                      removeItem={() => removeItem(frameProduct)} />

                  ))}
                </div>
              ) : (
                <div className="empty-cart">
                  <EmptyCart />
                </div>
              )}
            </div>
            <div className='shopping-bag-right'>

              {frames.length > 0 && (
                <>
                  <ShippingOptions onShippingChange={(price) => setShippingCost(price)}  onShippingChangeType={(shippingType) => setShippingType(shippingType)}/>
                  <OrderSummary subtotal={calculateSubtotal(frames)} shippingPrice={shippingCost} shippingType={shippingType} />
                  <CartButton />
                </>
              )}
            </div>

          </>
        )}
      </div></>
  );
};

export default ShoppingBag;
