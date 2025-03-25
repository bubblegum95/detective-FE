import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import '../styles/globals.css';
import '../styles/navBar.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="containerHeader" id="header">
          <Header />
        </div>
        <div className="containerContent" id="content">
          <Component {...pageProps} />
        </div>
        <div className="containerFooter" id="footer">
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
