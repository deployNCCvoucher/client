import "./style.scss";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axiosClient from '../../../../api/axiosClient'

const LoginSlide = () => {
  const clientId =
    "9811993498-flmr9etgn9vr42st1lhl2mf14of8jlu4.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const [open, setOpen] = useState(false);
  const responseGoogle = (response: any) => {
    console.log("response", response);
    if (response.accessToken) {
      const accessToken = response.accessToken;
      window.localStorage.setItem("accessToken", accessToken);
    }
  };
  useEffect(() => {
    const handleOpen = (): void => {
      if (window.innerWidth > 769) {
        setOpen(true);
      } else if (window.innerWidth < 769) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleOpen);
    return (): void => {
      window.removeEventListener("resize", handleOpen);
    };
  }, []);
  useEffect(() => {
    if (window.innerWidth > 769) {
      setOpen(true);
    }
  }, []);
  return (
    <div className="login-slide ">
      <div className="login-right-wrap">
        {open ? (
          <>
            <img className="logo" src="./images/logo.png" alt="logo" />
            <h1 className="logo-text">VOUCHER</h1>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="button"
                >
                  <img
                    src="./images/google-logo.png"
                    className="google-logo"
                    alt=""
                  />
                  <p>Sign in with google</p>
                </button>
              )}
            />
            <p className="term-text">
              By sign in you agree to the{" "}
              <span style={{ fontWeight: "700" }}>Terms</span> and the{" "}
              <span style={{ fontWeight: "700" }}>Conditions</span>
            </p>
          </>
        ) : (
          <div className="mob-wrap">
            <div>
              <img className="logo" src="./images/logo.png" alt="logo" />
              <h1 className="logo-text">VOUCHER</h1>
            </div>
            <div>
              <button className="button">
                <img
                  src="./images/google-logo.png"
                  className="google-logo"
                  alt=""
                />
                <p>Sign in with google</p>
              </button>
              <p className="term-text">
                By sign in you agree to the{" "}
                <span style={{ fontWeight: "700" }}>Terms</span> and the{" "}
                <span style={{ fontWeight: "700" }}>Conditions</span>
              </p>
            </div>
          </div>
        )}
      </div>
      {open ? (
        <img
          className="shape"
          style={{ width: "100%" }}
          src="./images/family-img.png"
          alt=""
        />
      ) : (
        <img
          className="shape-mb"
          style={{ width: "100%" }}
          src="./images/family-img-mb.png"
          alt=""
        />
      )}
    </div>
  );
};
export default LoginSlide;
