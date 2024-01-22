import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const cancelCourse = () => {
  document.querySelector("form").reset();
};

const EmailContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    emailjs
      .sendForm(
        "service_xl272p3",
        "template_87znu1d",
        form.current,
        "7L44NNLgW-Z6qV7Cp"
      )
      .then(
        (result) => {
          cancelCourse();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div id="form">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name*</label>
        <input type="text" name="user_name" className="item" required />
        <label>Email*</label>
        <input type="email" name="user_email" className="item" required />
        <label>Message*</label>
        <textarea name="message" id="text" cols="30" rows="6" required />
        <button type="submit" value="Send" className="item">
          Send
        </button>
      </form>
    </div>
  );
};

export default EmailContactForm;
