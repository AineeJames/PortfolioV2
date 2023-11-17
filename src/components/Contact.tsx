import { Html, Text3D } from "@react-three/drei"
import { useEffect, useState } from "react";
import './Contact.css'
import Icon from "./3DIcon";
import axios from "axios";
import { sub } from "three/examples/jsm/nodes/Nodes.js";

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

function Contact({ yOffset }: { yOffset: number }) {

  const defaultFormState: ContactFormState = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  }

  const [formState, setFormState] = useState<ContactFormState>(defaultFormState)
  const [submitColor, setSubmitColor] = useState<string>("#007bff")
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<null | string>(null)

  useEffect(() => {
    setCanSubmit(() => {
      for (const key in formState) {
        if (formState[key] === "") return false
      }
      return true
    })
  }, [formState])

  useEffect(() => {
    if (submitStatus !== null) {
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        setSubmitStatus(null)
        setSubmitColor("#007bff")
      })();
    }
  }, [submitStatus])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    if (canSubmit) {
      setSubmitStatus("Submitting...")
      e.preventDefault();
      axios.post("https://xov7mdqakc.execute-api.us-west-2.amazonaws.com/default/submitContactForm", formState)
        .then((response) => {
          let submitStatus: null | number = null
          if (response.status === 200) {
            submitStatus = 200
            setFormState(defaultFormState)
            setCanSubmit(false)
            setSubmitStatus("Successfully submitted!")
          } else {
            submitStatus = response.status
            setSubmitStatus(`Could not submit, ${response.status}.`)
          }
          setSubmitColor(() => {
            if (submitStatus === null) return "#007bff"
            else if (submitStatus === 200) return "#40a020"
            else return "#ae0101"
          })
        })
        .catch(() => {
          setSubmitStatus("Could not submit, try again.")
          setSubmitColor("#ae0101")
        })
    } else {
      setSubmitStatus("There are missing fields.")
      setSubmitColor("#ae0101")
    }
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

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <button type="submit" onClick={handleSubmit} className="submit-button" style={{ background: submitColor }}>
              Submit
            </button>
            {submitStatus && <p style={{ marginLeft: 20 }}>{submitStatus}</p>}
          </div>
        </div>
      </Html >
    </>
  )

}

export default Contact
