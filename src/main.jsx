import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { initCsrf } from './utils/api.js';

const link = import.meta.env.VITE_LINK_API_URL;
// const link = import.meta.env.VITE_LINK_API_URL_LOCAL;

async function startApp() {
  await initCsrf(link);

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

startApp();