import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './assets/components/Header/Header'
import ShoppingBag from './assets/components/ShoppingBag/ShoppingBag';
import OrderSummary from './assets/components/OrderSummary/OrderSummary';
import './styles/Product.scss';
import './styles/Shipping.scss';
import './styles/OrderSummary.scss';
import './styles/CartButton.scss';
import './styles/App.scss';
import './styles/Modal.scss';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header></Header>
      </div>
        <ShoppingBag />
    </>
  )
}

export default App
