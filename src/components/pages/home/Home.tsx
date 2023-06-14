import "./Home.css";
import Navbar from "../../layouts/navbar/Navbar";
import SmallScreenNav from "../smallScreenNav/SmallScreenNav";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";

const Home = () => {
  return (
    <div className="homeWrapper">
        <Navbar navbarLinks={navbarLinks} />
        <SmallScreenNav navbarLinks={navbarLinks} />
      <div className="homeContents">
        ththhth hhlhh hlkhlhl hdkfhdk gdkhfgdk kfgkdgk kgdgkdg kdgfdkg
        kdgkgdkdgfkg kdgkdgk gkdgkdgk gkgkgdfkgfk gkdgfkdgfk gdkgfdkg kfgdkgfk
        gkfgdk gkdgfkdgfkg kdgkfgkg fkdg kgkdgfkg dkgfkgkg dkgkdgfkdg kdgfkdgkdg
        kgfdkgfkd gdkgfdkgfdkgfkdgk gkdgkgd ththhth hhlhh hlkhlhl hdkfhdk
        gdkhfgdk kfgkdgk kgdgkdg kdgfdkg kdgkgdkdgfkg kdgkdgk gkdgkdgk
        gkgkgdfkgfk gkdgfkdgfk gdkgfdkg kfgdkgfk gkfgdk gkdgfkdgfkg kdgkfgkg
        fkdg kgkdgfkg dkgfkgkg dkgkdgfkdg kdgfkdgkdg kgfdkgfkd gdkgfdkgfdkgfkdgk
        gkdgkgd
      </div>
    </div>
  );
};

export default Home;