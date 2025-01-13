import Image from 'next/image';
import Header from '../components/header.component';
import Content from '../components/content.component';
import Footer from '../components/footer.component';

export default function Home() {
  return (
    <div className="container">
      <div className="item" id="item1">
        <Header />
      </div>
      <div className="item" id="item4"></div>
      <div className="item" id="item5">
        <Content />
      </div>
      <div className="item" id="item6"></div>
      <div className="item" id="item7">
        <Footer />
      </div>
    </div>
  );
}
