import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { StoreProductsProps } from './types/product';

const productProps: StoreProductsProps = {
      "id": 1,
      "name":"Yami Yugi",
      "price":14.99,
      "imgUrl": "../src/assets/imgs/animation/anime1.jpg",
    };

ReactDOM.createRoot(document.getElementById('root')!).render(
      <App {...productProps}/>
)
