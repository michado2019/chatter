import './App.css';
import Footer from './components/layouts/footer/Footer';
import AppRouter from './components/route';

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
