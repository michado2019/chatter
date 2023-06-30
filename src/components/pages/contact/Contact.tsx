import Navbar from "../../layouts/navbar/Navbar"
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData"

const Contact = () => {
  return (
    <div className='contactWrapper'>
      <div className="ccontactContents">
      <Navbar navbarLinks={navbarLinks}/>
      </div>
    </div>
  )
}

export default Contact