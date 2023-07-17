import { Link } from "react-router-dom";
import "./FootLinks.css";
import {
  Home,
  NotificationAddOutlined,
  Edit,
  Bookmark,
} from "@mui/icons-material";

type BlogNavbarType = {
  display: boolean;
};
const FootLinks = (props: BlogNavbarType) => {
  const { display } = props;
  return (
    <div
      className="footLinks-wrapper"
      style={{ marginLeft: display ? "280px" : "", transition: "all 0.3s" }}
    >
      <div className="footLinks-contents">
        <div className="footLinks-links">
          <Link to="/" className="footLinks-link">
            <Home className="footLinks-icons" />
          </Link>
        </div>
        <div className="footLinks-links">
          <Link to="/blogs/notifications" className="footLinks-link">
            <NotificationAddOutlined className="footLinks-icons" />
          </Link>
        </div>
        <div className="footLinks-links">
          <Link to="/blogs/post" className="footLinks-link">
            <Edit className="footLinks-icons" />
          </Link>
        </div>
        <div className="footLinks-links">
          <Link to="/blogs/bookMarks" className="footLinks-link">
            <Bookmark className="footLinks-icons" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FootLinks;
