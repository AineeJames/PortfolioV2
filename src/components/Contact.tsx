import { Html, Text3D } from "@react-three/drei"
import { useState } from "react";
import './Contact.css'
import Icon from "./3DIcon";

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

function Contact({ yOffset }: { yOffset: number }) {

  const [formState, setFormState] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  return (
    <>
      <Icon
        icon={"email"}
        position={[-7, yOffset, 1]}
        size={0.4}
        hoverColor="white"
      />
      <Text3D
        font={"/SpaceMonoBold.json"}
        position={[-6.2, yOffset, 1]}
        height={0}
        size={0.5}
      >
        {"Contact Me"}
        <meshStandardMaterial color={"white"} />
      </Text3D>
      <Html
        center
        position={[0, yOffset - 3.6, 0]}
      >
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,700;1,400&display=swap');
        </style>
        <div className="contact-form-container">
          <div className="form-group">
            <label htmlFor="firstName">Name:</label>
            <div className="name-inputs">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="input-field"
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="johndoe@email.com"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              placeholder="Leave me a messsage here!"
              className="input-field"
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </Html >
    </>
  )

}

export default Contact
