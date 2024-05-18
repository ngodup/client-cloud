import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear form after submission (optional)
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div style={{ margin: 0 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21006.256508195936!2d2.3180921847656686!3d48.8432955822624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671ef9e7dda15%3A0xd09f9f377dd84a37!2sTibet%20Art!5e0!3m2!1sfr!2sfr!4v1706642451746!5m2!1sfr!2sfr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          title="map"
        />
      </div>
      <div className="contact-container">
        <h3 className="text-center" style={{ marginTop: "2rem" }}>
          Contactez-nous
        </h3>
        <p>
          Si vous avez des questions concernant la taille, des difficultés à
          passer votre commande, ou toute autre information que vous souhaitez
          nous communiquer, n'hésitez pas à nous contacter. Remplissez le
          formulaire de contact ci-dessous ou envoyez-nous un courriel à
          l'adresse tibetartfr@hotmail.com Nous sommes toujours à votre
          disposition
        </p>

        <div className="contact-form" style={{ marginTop: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              rows={4}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>

        <div className="social-media-icons">
          <button aria-label="facebook">
            <FaSquareFacebook size={25} color="blue" />
          </button>
          <button aria-label="instagram">
            <FaInstagramSquare size={25} color="orange" />
          </button>
          <button aria-label="youtube">
            <FaYoutube size={30} color="red" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
