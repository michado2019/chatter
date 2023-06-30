import './App.css';
import Footer from './components/layouts/footer/Footer';
import { navbarLinks } from './components/layouts/navbar/navbarData/NavabarData';
import SmallScreenNav from './components/pages/smallScreenNav/SmallScreenNav';
import AppRouter from './components/route';

function App() {
  
  return (
    <div className="App">
      <SmallScreenNav navbarLinks={navbarLinks}/>
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
