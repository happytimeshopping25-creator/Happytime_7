
import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-white mb-8">
        About Us
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-center">
        We are a team of passionate developers dedicated to building high-quality, modern web applications. Our mission is to create user-friendly and visually appealing software that solves real-world problems.
      </p>
    </div>
  );
};

export default About;
