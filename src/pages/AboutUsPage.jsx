import React from 'react';

const AboutUsPage = () => {
    return (
      <div className="max-w-7xl mx-auto p-5 md:p-10">
        <div className="hero bg-base-100 shadow-lg  my-10 rounded-lg">
          <div className="hero-content flex-col lg:flex-row">
            <div className="avatar lg:w-1/3">
              <div className="w-56 rounded-full">
                <img src="https://i.ibb.co/B2PnMv49/profile.png" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">About Developer</h1>
              <p className="py-6 text-lg font-semibold text-gray-500">
                Hello! My name is Shazzed Chowdhury, and I am a passionate
                Front-End Developer based in Chittagong, Bangladesh. I am
                currently pursuing my studies while honing my skills in modern
                web development technologies. <br></br>I enjoy creating
                responsive and user-friendly web applications that provide
                seamless experiences for users. Over time, I have built a number
                of projects that reflect my skills and dedication: <br></br>
                <a
                  className="font-semibold text-blue-500"
                  target='_blank'
                  href="https://b11-a10-mango-plantcare-client.web.app/
"
                >
                  Plant Care
                </a>
                <br />
                <a
                  className="font-semibold text-blue-500"
                  target='_blank'
                  href="https://b11-a9-quickjobsearch-project.web.app/
"
                >
                  Quick Job Search
                </a>
                <br />
                <a
                  className="font-semibold text-blue-500"
                  target='_blank'
                  href="https://a12-c01-lokto-bondhon.web.app/"
                >
                  Life Drop
                </a>
                <br />I am always eager to learn new technologies and take on
                challenging projects that allow me to grow as a developer. My
                goal is to contribute to meaningful projects while continually
                improving my expertise in web development.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AboutUsPage;