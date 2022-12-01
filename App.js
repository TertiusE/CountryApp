import { Provider } from 'react-redux';
import store from './redux/store';
import CountryApp from './CountryApp';


export default function App() {
  
  return (
    <Provider store={store}>
      <CountryApp />
    </Provider>
  );
}

