import Navbar from '../../layouts/navbar/Navbar'
import { navbarLinks } from '../../layouts/navbar/navbarData/NavabarData'
import './SignUp.css'
const SignUp = () => {
  return (
    <div className='signUp-wrapper'>
      <Navbar navbarLinks={navbarLinks} />
    </div>
  )
}

export default SignUp