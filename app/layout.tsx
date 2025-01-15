import './globals.css';
import '../styles/navBar.css';
import '../styles/content.css';
import Header from '../components/header.component';
import Footer from '../components/footer.component';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          <div className="item" id="item1">
            <Header />
          </div>
          <div className="item" id="item4"></div>
          <div className="item" id="item5">
            {children}
          </div>
          <div className="item" id="item6"></div>
          <div className="item" id="item7">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
