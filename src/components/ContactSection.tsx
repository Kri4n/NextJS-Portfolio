import React from "react";

const ContactSection = () => {
  return (
    <>
      <section
        id="contact"
        className="container text-center mt-5 pt-5 mb-5 pb-5"
      >
        <h1 className="display-2 fw-bolder">Contact Me</h1>
        <p className="lead">
          Feel free to reach out for any inquiries, opportunities, or
          collaborations. I’d love to hear from you!
        </p>

        <div className="row d-flex justify-content-center pt-2">
          <div
            id="contact-form"
            className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-5 rounded p-5 mb-3"
          >
            <form className="d-flex flex-column text-start lead" action="">
              <label htmlFor="name">Name</label>
              <input type="text" className="text-dark" name="name" id="name" />
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input
                type="email"
                className="text-dark"
                name="email"
                id="email"
              />
              <label htmlFor="message" className="mt-3">
                Message
              </label>
              <textarea
                name="message"
                className="text-dark pb-5"
                id="message"
              ></textarea>
              <button className="btn btn-light mt-5 w-50">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
