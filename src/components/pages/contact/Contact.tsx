import Navbar from "../../layouts/navbar/Navbar"
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData"
const Contact = () => {
  return (
    <div className='contactWrapper'>
      <Navbar navbarLinks={navbarLinks} />
      <p>Contact us page</p>
    </div>
  )
}

export default Contact