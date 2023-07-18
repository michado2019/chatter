import "./App.css";
import { useContext } from "react";
import Footer from "./components/layouts/footer/Footer";
import { navbarLinks } from "./components/layouts/navbar/navbarData/NavabarData";
import SmallScreenNav from "./components/pages/smallScreenNav/SmallScreenNav";
import AppRouter from "./components/route";
import { UserContext } from "./components/context/userContext/UserContext";
import ErrorBoundary from "./components/pages/errorBoundary/ErrorBoundary";

function App() {
  const userContext = useContext(UserContext);

  return (
    <div className="App">
      <ErrorBoundary>
        <SmallScreenNav navbarLinks={navbarLinks} />
        <AppRouter />
        {userContext?.user === null && <Footer />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
