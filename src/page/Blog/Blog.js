import React from "react";

const Blog = () => {
  return (
    <div className="bg-base-300">
      <div className="w-[80%] mx-auto py-5 ">

        
        <div className="lg:card card-side bg-base-100 shadow-xl mb-6 ">
          <figure className="lg:w-[40%]">
            <img
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--6VAU9Cus--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/gedn65jh83oew6hb1391.png"
              alt="Movie"
            />
          </figure>
          <div className="card-body lg:w-[60%]">
            <h2 className="card-title text-2xl">
              1. What are the different ways to manage a state in a React
              application?
            </h2>
            <h3>
              There are four main types of state you need to properly manage in
              your React apps: <p>Local state</p> <p>Global state</p>{" "}
              <p>Server state</p> <p>URL state</p>
            </h3>
          </div>
        </div>

        <div className="lg:card card-side bg-base-100 shadow-xl mb-6">
          <figure className="lg:w-[40%]">
            <img
              src="https://www.cronj.com/blog/wp-content/uploads/inheritance.png.webp"
              alt="Movie"
            />
          </figure>
          <div className="card-body lg:w-[60%]">
            <h2 className="card-title text-2xl">
              2. How does prototypical inheritance work?
            </h2>
            <p>
              Every object with its methods and properties contains an internal
              and hidden property known as [[Prototype]]. The Prototypal
              Inheritance is a feature in javascript used to add methods and
              properties in objects. It is a method by which an object can
              inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object.getPrototypeOf and Object.setPrototypeOf.
              Nowadays, in modern language, it is being set using __proto__.
            </p>
          </div>
        </div>

        <div className="lg:card card-side bg-base-100 shadow-xl mb-6">
          <figure className="lg:w-[40%]">
            <img
              src="https://i.ytimg.com/vi/lj5nnGa_DIw/maxresdefault.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body lg:w-[60%]">
            <h2 className="card-title text-2xl">
              3. What is a unit test? Why should we write unit tests?
            </h2>
            <h3>
              Unit Testing is a type of software testing where individual units
              or components of a software are tested. The purpose is to validate
              that each unit of the software code performs as expected. Unit
              Testing is done during the development (coding phase) of an
              application by the developers. Unit Tests isolate a section of
              code and verify its correctness. A unit may be an individual
              function, method, procedure, module, or object.
              <br />
              <br />
              <p>
                unit test enable you to catch bugs early in the development
                process. Automated unit tests help a great deal with regression
                testing. They detect code smells in your codebase. For example,
                if you're having a hard time writing unit tests for a piece of
                code, it might be a sign that your function is too complex.
              </p>
            </h3>
          </div>
        </div>

        <div className="lg:card card-side bg-base-100 shadow-xl mb-6">
          <figure className="lg:w-[40%]">
            <img
              src="https://presence.agency/wp-content/uploads/2020/07/1_lC1kj3IeXoE8Z3OCKJoWkw.jpeg"
              alt="Movie"
            />
          </figure>
          <div className="card-body lg:w-[60%]">
            <h2 className="card-title text-2xl">
              4. React vs. Angular vs. Vue?
            </h2>
            <h3>
              <p>
                <strong>react</strong>
                React, developed by Facebook, was initially released in 2013.
                Facebook uses React extensively in their products (Facebook,
                Instagram, and WhatsApp). Similar to Vue, the React developers
                also announce their newest version on the blog section of the
                React website.
              </p>

              <p>
                <strong>Angular</strong>
                developed by Google, was first released in 2010, making it the
                oldest of the lot. It is a TypeScript-based JavaScript
                framework. A substantial shift occurred in 2016 on the release
                of Angular 2 (and the dropping of the “JS” from the original
                name – AngularJS). Angular 2+ is known as just Angular. Although
                AngularJS (version 1) still gets updates, we will focus the
                discussion on Angular.
              </p>

              <p>
                <strong>Vue,</strong>
                also known as Vue.js, is the youngest member of the group. It
                was developed by ex-Google employee Evan You in 2014. Over the
                last several years, Vue has seen a substantial shift in
                popularity, even though it doesn’t have the backing of a large
                company. The most current version is always announced on the
                official Vue website on their releases page. Contributors for
                Vue are supported by Patreon. It should be noted that Vue also
                has its own GitHub repo, and functions using TypeScript. Further
                reading: Vue.js Tutorial for Beginner Developers
              </p>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
