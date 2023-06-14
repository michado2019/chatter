import { NavLink } from "react-router-dom";

//Type for CustomNavLink
type CustomNavLinkProps = {
  children: React.ReactNode;
  className: string;
};
//Type for "to" prop
type ToProps = {
  to: string;
};
export const CustomNavLink = ({
  to,
  ...props
}: ToProps & CustomNavLinkProps) => {
  const activeStyle = {
    color: "#5d5d5d",
    transition: "all 0.3s ease-in-out",
  };
  return (
    <NavLink
      style={({ isActive }) => (isActive ? activeStyle : {})}
      to={to}
      end
      {...props}
    />
  );
};
