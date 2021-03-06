import { Link } from "gatsby";
import React from "react";

const FourOFour = () => {
  return (
    <>
      <section className="bg-white text-dark py-5">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 col-sm-12 mx-auto text-center mb-5">
             
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mx-auto text-center">
              <h3>Sorry, that page doesn't exist</h3>
              <p>
                ¯\_(ツ)_/¯
              </p>
              <p>
                <Link to="/">
                  Go to Home Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FourOFour;