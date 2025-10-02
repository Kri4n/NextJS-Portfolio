import React from "react";
import Image from "next/image";

const ToolsSection = () => {
  return (
    <>
      <section id="tools" className="container-xxl text-center mt-5 pt-5">
        <h1
          className="display-2 fw-bolder"
          data-aos="fade-up"
          data-aos-offset="180"
        >
          Tools
        </h1>
        <div className="d-flex pb-5 flex-md-row flex-column gap-5 justify-content-center align-items-center mt-5 pt-5">
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image
              src="/Docker.png"
              alt="Docker.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">Docker</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image src="/Jest.png" alt="Jest.png" width={140} height={140} />
            <p className="d-block pt-3">Jest</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image src="/js.png" alt="js.png" width={140} height={140} />
            <p className="d-block pt-3">JavaScript</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image src="/MySQL.png" alt="mysql.png" width={140} height={140} />
            <p className="d-block pt-3">MySQL</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image src="/PHP.png" alt="php.png" width={140} height={140} />
            <p className="d-block pt-3">PHP</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image
              src="/Postman.png"
              alt="postman.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">Postman</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="300">
            <Image src="/html.png" alt="html.png" width={140} height={140} />
            <p className="d-block pt-3">HTML</p>
          </div>
        </div>
        <div className="d-flex pb-5 flex-md-row flex-column gap-5 justify-content-center align-items-center">
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image
              src="/mongodb.png"
              alt="mongodb.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">MongoDB</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image
              src="/Express.png"
              alt="Express.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">ExpressJS</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image
              src="/Node.js.png"
              alt="nodejs.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">NodeJS</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image src="/React.png" alt="react.png" width={140} height={140} />
            <p className="d-block pt-3">React</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image src="/figma.png" alt="figma.png" width={140} height={140} />
            <p className="d-block pt-3">Figma</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image src="/git.png" alt="git.png" width={140} height={140} />
            <p className="d-block pt-3">Git</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="250">
            <Image src="/css.png" alt="css.png" width={140} height={140} />
            <p className="d-block pt-3">CSS</p>
          </div>
        </div>
        <div className="d-flex pb-5 flex-md-row flex-column gap-5 justify-content-center align-items-center">
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/tailwind.png"
              alt="mongodb.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">Tailwind CSS</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/bootstrap.png"
              alt="express.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">Bootstrap</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/GitLab.png"
              alt="GitLab.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">GitLab</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/CSharp.png"
              alt="csharp.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">C#</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/Flutter.png"
              alt="flutter.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">Flutter</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image src="/Dart.png" alt="dart.png" width={140} height={140} />
            <p className="d-block pt-3">Dart</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image src="/Redis.png" alt="Redis.png" width={140} height={140} />
            <p className="d-block pt-3">Redis</p>
          </div>
        </div>
        <div className="d-flex pb-5 flex-md-row flex-column gap-5 justify-content-center align-items-center">
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/SQLite.png"
              alt="SQLite.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">SQLite</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/PostgreSQL.png"
              alt="PostgreSQL.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">PostgreSQL</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image src="/Go.png" alt="Go.png" width={140} height={140} />
            <p className="d-block pt-3">Go</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/Next.js.png"
              alt="Next.js.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">NextJS</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/TypeScript.png"
              alt="TypeScript.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">TypeScript</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image src="/Redux.png" alt="Redux.png" width={140} height={140} />
            <p className="d-block pt-3">Redux</p>
          </div>
          <div className="rotate" data-aos="zoom-in" data-aos-offset="200">
            <Image
              src="/Nest.js.png"
              alt="NestJS.png"
              width={140}
              height={140}
            />
            <p className="d-block pt-3">NestJS</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolsSection;
