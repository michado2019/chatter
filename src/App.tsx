import "./App.css";
import { useContext } from "react";
import Footer from "./components/layouts/footer/Footer";
import { navbarLinks } from "./components/layouts/navbar/navbarData/NavabarData";
import SmallScreenNav from "./components/pages/smallScreenNav/SmallScreenNav";
import AppRouter from "./components/route";
import { UserContext } from "./components/context/userContext/UserContext";

function App() {
  const userContext = useContext(UserContext);

  return (
    <div className="App">
      <SmallScreenNav navbarLinks={navbarLinks} />
      <AppRouter />
    </div>
  );
}
export default App;