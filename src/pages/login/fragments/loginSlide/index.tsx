import "./style.scss";
import { useEffect, useState } from "react";
const LoginSlide = () => {
  const [open, setOpen] = useState(false);
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
  const handleLogin = () => {
    localStorage.setItem('token', 'login');
  }
  return (
    <div className="login-slide " onClick={handleLogin}>
      <div className="login-right-wrap">
        {open ? (
          <>
            <img className="logo" src="./images/logo.png" alt="logo" />
            <h1 className="logo-text">VOUCHER</h1>
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
