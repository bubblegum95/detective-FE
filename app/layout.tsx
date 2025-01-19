'use client';
import './globals.css';
import '../styles/navBar.css';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider store={store}>
          <div className="container">
            <div className="containerHeader" id="item1">
              <Header />
            </div>
            <div className="item" id="item4"></div>
            <div className="containerContent" id="item5">
              {children}
            </div>
            <div className="item" id="item6"></div>
            <div className="containerFooter" id="item7">
              <Footer />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
