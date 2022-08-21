import React from 'react';
import logo from './images/logo.png';
import '../layout/css/homePage.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start text-muted">
        <section className="">
          <div className="container text-center text-md-start">
            <div className="row" style={{ padding: "25px" }}>
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <Link
                  to="/homePage"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <img
                    style={{ height: '30px', width: '200px' }}
                    src="./images/logo.png"
                    classNameName="footer-logo-img"
                  />
                </Link>
                <p classNameName="text-muted">&copy; Stay Together, Save Together</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase text-dark fw-bold mb-4">
                  Support
                </h6>
                <p>
                  <span>Customer Support</span>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase text-dark fw-bold mb-4">
                  Useful links
                </h6>

                <p>
                  <span onClick={() => (window.location.href = '/login')}>Login</span>
                </p>


                <p>
                  <span onClick={() => (window.location.href = '/aboutUs')}>About Us</span>
                </p>


                <p>
                  <span onClick={() => (window.location.href = '/contactus')}>Contact Us</span>
                </p>


                <p>
                  <span onClick={() => (window.location.href = '/subscription')}>Subscription</span>
                </p>

              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase text-dark fw-bold mb-4">
                  Other Links
                </h6>
                <p>
                  {' '}
                  <span
                    classNameName="footer_link pointer"
                    onClick={() => (window.location.href = '/privacypolicy')}
                  >
                    Privacy Policy
                  </span>
                </p>
                <p>
                  {' '}
                  <span
                    classNameName="footer_link pointer"
                    onClick={() =>
                      (window.location.href = '/termsandconditions')
                    }
                  >
                    Terms and Conditions
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;

{
  /* <div classNameName="border-top bg-white">
  <div classNameName="container footer min-width">
    <footer classNameName="row row-cols-5 py-5 my-5 w-100 space-between">
      <div classNameName="col footer-logo w-30">
        <div>
          <Link
            to="/homePage"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <img src="./images/logo.png" classNameName="footer-logo-img" />
          </Link>
        </div>
        <p classNameName="text-muted">&copy; dmmy text dummy text </p>
      </div>

      <div classNameName="d-flex row w-70">
        <div classNameName="col footer_col">
          <h5>Support</h5>
          <span classNameName="footer_link">Customer Support</span>
        </div>

        <div classNameName="col footer_col">
          <h5>Useful Links</h5>

          <span
            classNameName="footer_link pointer"
            onClick={() => (window.location.href = '/login')}
          >
            Login
          </span>
          <br />

          <span
            classNameName="footer_link pointer"
            onClick={() => (window.location.href = '/aboutUs')}
          >
            About Us
          </span>
          <br />

          <span
            classNameName="footer_link pointer"
            onClick={() => (window.location.href = '/contactUs')}
          >
            Contact Us
          </span>
          <br />

          <span
            classNameName="footer_link pointer"
            onClick={() => (window.location.href = '/subscribe')}
          >
            Subscription
          </span>
        </div>

        <div classNameName="col footer_col">
          <h5>Other Links</h5>
          <span
            classNameName="footer_link pointer"
            onClick={() => (window.location.href = '/privacypolicy')}
          >
            Privacy Policy
          </span>

          <br />
          <span
            onClick={() => (window.location.href = '/termsandconditions')}
            classNameName="footer_link pointer"
          >
            Term & Condition
          </span>
        </div>
      </div>
    </footer>
  </div>
</div>; */
}
