import { useState, ChangeEvent, FormEvent, useContext } from "react";
import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import "./Contact.css";
import { UserContext } from "../../context/userContext/UserContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  subscribe: boolean;
}

const Contact = () => {
  const userContext = useContext(UserContext);
  const userData = userContext?.user;

  const [formData, setFormData] = useState<FormData>({
    name: userData?.displayName || "",
    email: userData?.email || "",
    phone: "",
    subject: "",
    message: "",
    subscribe: false,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      setSuccessMessage("Thank you for your message! We'll be in touch soon.");
    // Clear form data after successful submission
    setFormData({
      name: userData?.displayName || "",
      email: userData?.email || "",
      phone: "",
      subject: "",
      message: "",
      subscribe: false,
    });
    console.log(formData);

    //Set time out to clear the success message
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div>
      <Navbar navbarLinks={navbarLinks} />
      {successMessage !== "" ? (
        <h2 className="postAlert">{successMessage}</h2>
      ) : (
        ""
      )}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>
          Have a question, feedback, or suggestion? Fill out the form below to
          get in touch with our team.
        </p>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="subscribe-checkbox">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              required
            />
            <label htmlFor="subscribe">Subscribe to newsletters</label>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
