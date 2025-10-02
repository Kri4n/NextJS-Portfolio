import React from "react";
import Image from "next/image";

const ProjectsSection = () => {
  return (
    <>
      <section id="projects" className="container-fluid mt-5 pt-5">
        <h1
          className="text-center display-2 fw-bolder"
          data-aos="fade-up"
          data-aos-offset="250"
        >
          Projects
        </h1>

        <div className="container mt-5 pt-5 d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-2">
          <div
            className="card border-0 shadow-lg col-md-5"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <a href="https://github.com/Kri4n/WriteScape" target="_blank">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid rounded-top"
                  src="/writescape.png"
                  alt="dashboard.png"
                  width={540}
                  height={260}
                />
              </div>
            </a>
            <div className="card-body rounded-bottom bg-red">
              <h5 className="fw-bold text-white">WriteScape</h5>
              <p className="lead text-white">A full stack Blog Web App.</p>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                MongoDB
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                ExpressJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                React
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                NodeJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                Tailwind
              </button>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-offset="330"
            className="card border-0 shadow-lg col-md-7"
          >
            <iframe
              className="rounded-top"
              height="400"
              src="https://www.youtube.com/embed/T2Fc4zlko0o"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="card-body rounded-bottom bg-red">
              <button className="btn btn-dark">
                <a
                  className="text-decoration-none text-white"
                  target="_blank"
                  href="https://writescape.vercel.app/"
                >
                  Live Demo
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="container pt-2 d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-2">
          <div
            className="card border-0 shadow-lg col-md-7 order-2 order-md-1 order-lg-1"
            data-aos="zoom-in"
            data-aos-offset="330"
          >
            <iframe
              className="rounded-top"
              height="400"
              src="https://youtube.com/embed/fsuExisR384?si=ONUdQsscLv9Oj3D4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="card-body rounded-bottom bg-red">
              <button className="btn btn-dark">
                <a
                  className="text-decoration-none text-white"
                  target="_blank"
                  href="https://www.dropbox.com/scl/fi/cy9y4vddh391tkf2isu9p/fitmeter.apk?rlkey=8jayzteivmc2ygqa1tqpgrlnt&st=oc1r1ikn&dl=1"
                >
                  Download APK
                </a>
              </button>
            </div>
          </div>

          <div
            className="card border-0 shadow-lg col-md-5 order-1 order-md-2 order-lg-2"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <a href="https://github.com/Kri4n/FitMeter-Mobile" target="_blank">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid rounded-top"
                  src="/FitMeter.png"
                  alt="FitMeter.png"
                  width={540}
                  height={260}
                />
              </div>
            </a>
            <div className="card-body rounded-bottom bg-red">
              <h5 className="fw-bold text-white">FitMeter</h5>
              <p className="lead text-white">
                A fitness tracker mobile application integrated with Rest API I
                built with flutter. Originally a website made with react.
              </p>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                Flutter
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                Dart
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                NodeJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                ExpressJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                MongoDB
              </button>
            </div>
          </div>
        </div>

        <div className="container pt-2 d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-2">
          <div
            className="card border-0 shadow-lg col-md-5"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <a href="https://github.com/Kri4n/Cartify" target="_blank">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid rounded-top"
                  src="/ec1.png"
                  alt="ec1.png"
                  width={540}
                  height={260}
                />
              </div>
            </a>
            <div className="card-body rounded-bottom bg-red">
              <h5 className="fw-bold text-white">Cartify</h5>
              <p className="lead text-white">
                A fully functional ecommerce website with user authentication
                (JWT) and password hashing (Bcrypt).
              </p>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                MongoDB
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                ExpressJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                NextJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                NodeJS
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2">
                Bootstrap
              </button>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-offset="330"
            className="card border-0 shadow-lg col-md-7"
          >
            <iframe
              className="rounded-top"
              height="400"
              src="https://www.youtube.com/embed/4AXPghh3JF4?si=8abql5HhFrAfY15P"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="card-body rounded-bottom bg-red">
              <button className="btn btn-dark">
                <a
                  className="text-decoration-none text-white"
                  target="_blank"
                  href="https://cartify-io.vercel.app/"
                >
                  Live Demo
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="container pt-2 d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-2">
          <div
            data-aos="zoom-in"
            data-aos-offset="330"
            className="card border-0 shadow-lg col-md-7 order-2 order-md-1 order-lg-1"
          >
            <iframe
              className="rounded-top"
              height="400"
              src="https://www.youtube.com/embed/FPHVL2vmi9Y?si=rkcMXsNNtGncukPm"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="card-body rounded-bottom bg-red">
              <button className="btn btn-dark">
                <a
                  className="text-decoration-none text-white"
                  target="_blank"
                  href="https://www.youtube.com/watch?v=FPHVL2vmi9Y"
                >
                  Watch Demo
                </a>
              </button>
            </div>
          </div>

          <div
            className="card border-0 shadow-lg col-md-5 order-1 order-md-2 order-lg-2"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <a href="https://github.com/Kri4n/FindThere" target="_blank">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid rounded-top"
                  src="/p2.png"
                  alt="dashboard.png"
                  width={540}
                  height={260}
                />
              </div>
            </a>
            <div className="card-body rounded-bottom bg-red">
              <h5 className="fw-bold text-white">FindThere</h5>
              <p className="lead text-white">
                A full stack lost and found / lost item finder web application.
                Deployment currently in progress.
              </p>
              <button className="btn btn-outline-light me-1">JavaScript</button>
              <button className="btn btn-outline-light me-1">PHP</button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-sm-0">
                MySQL
              </button>
            </div>
          </div>
        </div>

        <div className="container pt-2 d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-2">
          <div
            className="card border-0 shadow-lg col-md-5"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <a href="https://github.com/Kri4n/gomegle" target="_blank">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid rounded-top"
                  src="/Gomegle.jpg"
                  alt="dashboard.png"
                  width={540}
                  height={260}
                />
              </div>
            </a>
            <div className="card-body rounded-bottom bg-red">
              <h5 className="fw-bold text-white">Gomegle</h5>
              <p className="lead text-white">
                A real time chat app omegle inspired made with Go.
              </p>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                Go
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-2 me-1">
                WebSocket
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                HTML
              </button>
              <button className="btn btn-outline-light mt-lg-0 mt-md-2 mt-2 me-1">
                JavaScript
              </button>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-offset="330"
            className="card border-0 shadow-lg col-md-7"
          >
            <iframe
              className="rounded-top"
              height="400"
              src="https://www.youtube.com/embed/as4_2TrmIUM?si=IhWpbvDZJfsKVfSk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="card-body rounded-bottom bg-red">
              <button className="btn btn-dark">
                <a
                  className="text-decoration-none text-white"
                  target="_blank"
                  href="https://gomegle.onrender.com/"
                >
                  Live Demo
                </a>
              </button>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-right"
          data-aos-offset="250"
          className="d-flex justify-content-center pt-5"
        >
          <a
            className="text-decoration-none text-white"
            href="https://github.com/Kri4n?tab=repositories"
            target="_blank"
          >
            <button className="view-more-btn px-5 py-3">More Projects</button>
          </a>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
