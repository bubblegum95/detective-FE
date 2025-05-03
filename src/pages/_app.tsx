import type { AppProps } from 'next/app';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import '../styles/globals.css';
import { ChatProvider } from '../context/chat.provider';
import { UserInfoProvider } from '../context/userInfo.provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserInfoProvider>
      <ChatProvider>
        <div className="container">
          <div className="containerHeader" id="header">
            <Header />
          </div>
          <div
            className="containerContent"
            id="content"
            style={{ width: '100%' }}
          >
            <Component {...pageProps} />
          </div>
          <div className="containerFooter" id="footer">
            <Footer />
          </div>
        </div>
      </ChatProvider>
    </UserInfoProvider>
  );
}
