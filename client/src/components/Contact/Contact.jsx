import React from "react";
import Form from "./Form";
import Header from '../Header';
import css from "./contact.css";

function Contact(){
    return (
        <>
            <Header />
            <div className="box" style={{flexWrap:"wrap"}}  id="4">
                <div className="heading">Contact Us</div>
                <Form />
            </div>
        </>
    );
}

export default Contact;