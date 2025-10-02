import { useEffect, useRef, useState } from "react";
// @ts-ignore: vanta has no types
import WAVES from "vanta/dist/vanta.waves.min";
import Image from "next/image";

const LandingSection = () => {
  useEffect(() => {
    WAVES({
      el: "#landing",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x51414f,
      shininess: 20.0,
      waveHeight: 10.0,
      waveSpeed: 0.8,
    });
  }, []);

  return (
    <>
      <section id="landing">
        <div className="container">
          <div className="row d-flex flex-sm-column flex-md-row align-items-center">
            <div className="col-12 col-sm-12 order-sm-1 col-md-6 order-md-2 col-lg-5 mt-0 pt-0 mt-md-5 pt-md-5 mt-sm-5 mt-5">
              <Image
                className="heading-frame img-fluid scale-in-center"
                src="/me.jpg"
                alt="Krian Lloyd Lerry - Software Engineer"
                width={530}
                height={530}
              />
            </div>
            <div className="col-12 col-sm-12 order-sm-2 col-md-6 order-md-1 col-lg-7 mt-md-5 pt-md-5 mt-sm-5 pt-sm-5 mt-lg-5 pt-lg-5 pt-5">
              <h1 className="fade-in-left fw-bold">
                Hello<span className="wave">👋🏻</span> I'm Krian, A Filipino
                Software Engineer.
              </h1>

              <p className="lead fade-in-left">
                Building user-friendly applications that makes life easier, one
                line of code at a time.
              </p>

              <div className="d-flex gap-3 ps-3 pb-3">
                <a
                  className="fade-in"
                  href="https:{/*github.com/Kri4n"
                  target="_blank"
                >
                  <img
                    src="/github.png"
                    alt="github.png"
                    className="social-logo"
                  />
                </a>

                <a
                  className="fade-in"
                  href="https:{/*www.linkedin.com/in/krian-lloyd-lerry-551a19324/"
                  target="_blank"
                >
                  <img
                    src="/linkedin.png"
                    alt="linkedin.png"
                    className="social-logo"
                  />
                </a>

                <a
                  className="fade-in"
                  href="https:{/*www.facebook.com/Kri4n"
                  target="_blank"
                >
                  <img
                    src="/facebook.png"
                    alt="facebook.png"
                    className="social-logo"
                  />
                </a>
              </div>

              <a href="/Resume_Lerry.pdf" target="_blank">
                <button className="btn-css fw-bold fade-in-left-btn">
                  View Resume
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingSection;
