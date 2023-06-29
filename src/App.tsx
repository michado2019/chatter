import './App.css';
import Footer from './components/layouts/footer/Footer';
import Navbar from './components/layouts/navbar/Navbar';
import { navbarLinks } from './components/layouts/navbar/navbarData/NavabarData';
import SmallScreenNav from './components/pages/smallScreenNav/SmallScreenNav';
import AppRouter from './components/route';

function App() {
  
  return (
    <div className="App">
      <Navbar navbarLinks={navbarLinks}/>
      <SmallScreenNav navbarLinks={navbarLinks}/>
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
