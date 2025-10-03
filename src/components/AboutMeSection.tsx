import React from "react";
import Image from "next/image";

const AboutMeSection = () => {
  return (
    <>
      <section id="about" className="container-fluid mt-5 pt-5">
        <div className="container">
          <h1
            className="display-2 fw-bolder text-center"
            data-aos="fade-up"
            data-aos-offset="180"
          >
            About Me
          </h1>

          <div id="about-2" className="container mt-5 pt-5">
            <div className="row">
              <div
                id="likes"
                className="col-12 order-6 col-sm-12 order-sm-1 col-md-6 order-md-6 col-xl-4 order-xl-1 col-lg-6 order-lg-6"
              >
                <h1
                  className="fw-bold"
                  data-aos="zoom-in"
                  data-aos-offset="190"
                >
                  Likes
                </h1>
                <Image
                  src="/hobbies.gif"
                  data-aos="zoom-in"
                  data-aos-offset="190"
                  className="img-fluid"
                  alt="hobbies.jpg"
                  unoptimized
                  width={400}
                  height={400}
                />
              </div>
              <div
                id="strengths"
                className="col-12 order-3 col-sm-12 order-sm-3 col-md-6 order-md-3 col-xl-4 order-xl-2 py-xl-0 col-lg-6 order-lg-3 my-lg-0"
              >
                <h1
                  className="fw-bold"
                  data-aos="zoom-in"
                  data-aos-offset="240"
                >
                  Strengths
                </h1>
                <Image
                  src="/strength.gif"
                  data-aos="zoom-in"
                  data-aos-offset="240"
                  className="img-fluid"
                  alt="strength.jpg"
                  unoptimized
                  width={400}
                  height={400}
                />
              </div>
              <div
                id="goals"
                className="col-12 order-4 col-sm-12 order-sm-5 col-md-6 order-md-4 col-xl-4 order-xl-3 col-lg-6 order-lg-4"
              >
                <h1
                  className="fw-bold"
                  data-aos="zoom-in"
                  data-aos-offset="290"
                >
                  Goals
                </h1>
                <Image
                  src="/goals.gif"
                  data-aos="zoom-in"
                  data-aos-offset="290"
                  className="img-fluid"
                  alt="goals.gif"
                  unoptimized
                  width={400}
                  height={400}
                />
              </div>
              <div className="col-12 order-6 col-sm-12 order-sm-2 col-md-6 order-md-1 col-xl-4 order-xl-4 col-lg-6 order-lg-1">
                <ul
                  className="lead pt-3 pt-lg-5 pt-md-5"
                  data-aos="zoom-in"
                  style={{ listStyle: "none" }}
                >
                  <li>🎮 Video Games</li>
                  <li>🏋️ Gym</li>
                  <li>🎬 Movies</li>
                  <li>🎵 Music</li>
                  <li>📈 Self Growth</li>
                  <li>🥗 Nutrition</li>
                  <li>🧘 Meditation</li>
                </ul>
              </div>
              <div className="col-12 order-3 col-sm-12 order-sm-4 col-md-6 order-md-2 col-xl-4 order-xl-5 col-lg-6 order-lg-2">
                <p className="lead pt-3 pt-lg-5 pt-md-5" data-aos="zoom-in">
                  My strengths lie in my persistent and patient nature. I
                  approach challenges with determination, refusing to be easily
                  deterred by obstacles. My patience serves as a valuable asset,
                  enabling me to work through intricate problems methodically
                  and maintain composure under pressure.
                </p>
              </div>
              <div className="col-12 order-5 col-sm-12 order-sm-6 col-md-6 order-md-5 col-xl-4 order-xl-6 col-lg-6 order-lg-5">
                <p className="lead pt-3 pt-lg-5 pt-md-5" data-aos="zoom-in">
                  I aim to continuously grow my skills in front-end and back-end
                  development. My goal is to collaborate on innovative projects
                  that push boundaries in design and functionality. Always eager
                  to learn, I thrive in solving complex challenges through
                  clean, efficient code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMeSection;
