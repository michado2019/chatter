//Types for navbar links
export interface NavbarLink {
    navbarLinks: {
      id: number;
      link: string;
      name: string;
    }[];
  }
  
  //Navbar links array of objects
  export const navbarLinks = [
    {
      id: 1,
      link: "/",
      name: "Home",
    },
    {
      id: 2,
      link: "/about-us",
      name: "About us",
    },
    {
      id: 3,
      link: "/contact-us",
      name: "Contact",
    },
    {
      id: 4,
      link: "/blogs/feed",
      name: "Blogs",
    },
  ];
  