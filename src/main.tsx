import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterPathsProps } from './routes/RouterPaths.routes.tsx';

const productProps: RouterPathsProps = {
  products: []
};

ReactDOM.createRoot(document.getElementById('root')!).render(
      <App {...productProps} />
)
