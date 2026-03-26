import Header from "./component/Header";
import Hero from "./component/Hero";
import Tehnica from "./component/Tehnica";
import Nations from "./component/Nations";
import About from "./component/About";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <main className="bg-gray-900">
      <Header />
      <Hero />
      <Tehnica />
      <Nations />
      <About />
      <Footer />
    </main>
  );
}