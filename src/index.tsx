import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/font-face.scss';
import './styles/baseline.scss';
import './styles/shared.scss';

const env = process.env.REACT_APP_ENV;
const container = document.getElementById('root') as HTMLDivElement;
const myApp = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (env === 'production-hydrate' || env === 'staging-hydrate') {
  hydrateRoot(container, myApp);
} else {
  const root = createRoot(container);
  root.render(myApp);
}

reportWebVitals();
