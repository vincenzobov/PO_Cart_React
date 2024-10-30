export interface OrderItem {
  orderItemId: string;
  unitQuantity: string;
  unitPrice: string;
  currency: string;
  fulfillmentCenterName: string;
  orderItemInventoryStatus: string;
  shippingTax: string;
  description: string;
  orderItemStatus: string;
  shippingChargeCurrency: string;
  orderItemPrice: string;
  carrier: string;
  quantity: string;
  contractId: string;
  fulfillmentCenterId: string;
  createDate: string;
  correlationGroup: string;
  salesTaxCurrency: string;
  unitUom: string;
  partNumber: string;
  salesTax: string;
  isExpedited: string;
  freeGift: string;
  xitem_isPersonalAddressesAllowedForShipping: string;
  shipModeCode: string;
  orderItemFulfillmentStatus: string;
  shipModeDescription: string;
  shippingCharge: string;
  shipModeLanguage: string;
  lastUpdateDate: string;
  productId: string;
  shippingTaxCurrency: string;
  offerID: string;
  UOM: string;
  expectedShipDate: string;
  shipModeId: string;
  language: string;
  lineItemsTypes :string;
  }
  
  export interface OrderData {
    recordSetTotal: string;
    x_isPersonalAddressesAllowedForShipping: string;
    storeUniqueID: string;
    recordSetCount: string;
    totalSalesTaxCurrency: string;
    recordSetComplete: string;
    orderItem: OrderItem[];
    totalAdjustment: string;
    totalShippingTax: string;
    totalProductPrice: string;
    grandTotalCurrency: string;
    storeNameIdentifier: string;
    totalShippingCharge: string;
    grandTotal: string;
    totalSalesTax: string;
    buyerId: string;
    orderStatus: string;
    lastUpdateDate: string;
    totalProductPriceCurrency: string;
  }

  // Interfaccia per rappresentare il totale delle regolazioni
interface Adjustment {
  value: string;
  currency: string;
}

// Interfaccia per rappresentare una politica di addebito per la spedizione
interface ShippingChargePolicy {
  name: string;
  uniqueID: string;
  type: string;
}

export interface FrameDetails{
  attributes : attribute[],
  metaDescription? : string,
  uniqueID : string,
  parentCategoryID: string,
  productType: string,
  resourceId: string,
  title: string,
  thumbnail: string,
  parentProductID: string,
  manufacturer: string,
  name: string,
  buyable?: string,
  storeID: string,
  partNumber: string,
  lens? : ProductDetail  | undefined
  service? : ProductDetail[],
  price : Price
}
export interface Price {
  price: string;      // Prezzo attuale, rappresentato come stringa
  listprice: string;  // Prezzo di listino, rappresentato come stringa
  currency: string;   // Valuta del prezzo
}

export interface attribute {
  values: Value;
  dataType?: string;
  name?: string;
  uniqueID?: string;
  usage?: string;
  displayable?: string;
  comparable?: string;
  identifier: string;
  searchable?: string;
}

interface Value {
  values: string;
  uniqueID?: string;
  identifier: string;
}


export interface ProductDetail{

  metaDescription?: string;
  uniqueID: string;
  parentCategoryID: string;
  productType: string;
  resourceId: string;
  title: string;
  thumbnail: string;
  parentProductID: string;
  manufacturer: string;
  name: string;
  buyable: string;
  metaKeyword: string;
  storeID: string;
  fullImageAltDescription: string;
  partNumber: string;
  attributes: attribute[];
  price: Price

}


export interface ShippingOption{
  name: string;
  price: number;
  description: string;
  deliveryTime: string;
  icon: JSX.Element;
};
  

export interface ModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}