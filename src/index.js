import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import localeContext from './store/localecontext';



const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LocaleProvider> 
      <App />
    </LocaleProvider>
  </StoreContext.Provider>,
);
