import { Link } from "react-router-dom"
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footerWrapper">
        <div className="footerContents">
           <Link to="/" className="footerLogo">CHATTER</Link>
           <div className="footerContents2">
            <div className="footerDiv">
               <h2 className="footerTitle">Explore</h2>
               <Link to="" className="footerLink">Community</Link>
               <Link to="" className="footerLink">Trending blogs</Link>
               <Link to="" className="footerLink">Chatter for team</Link>
            </div>
            <div className="footerDiv">
               <h2 className="footerTitle">Support</h2>
               <Link to="" className="footerLink">Supports docs</Link>
               <Link to="" className="footerLink">Join slack</Link>
               <Link to="" className="footerLink">Contact</Link>
            </div>
            <div className="footerDiv">
               <h2 className="footerTitle">Official blog</h2>
               <Link to="" className="footerLink">Official blog</Link>
               <Link to="" className="footerLink">Engineering blog</Link>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Footer