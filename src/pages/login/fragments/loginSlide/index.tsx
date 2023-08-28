import "./style.scss";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../../../redux/user/userAction";
import { useAppDispatch } from "../../../../redux/hook/useTypedSeletor";
import { useEffect, useState } from "react";
const LoginSlide = () => {
  const dispatch = useAppDispatch();
  const responseGoogle = async (response: any) => {
    await dispatch(login(response.credential));
  };
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

  return (
    <div className="login-slide ">
      <div className="login-wrap">
        <div className="login-img">
          <img className="coupon" src="./images/coupon.png" alt="coupon" />
          <div className="logo-content">
            <div className="logo-wrap">
              <img className="logo" src="./images/logo.png" alt="logo" />
              <div className="text-wrap">
                <h1 className="logo-text">NCC VOUCHER</h1>
                <p className="term-text">
                  By sign in you agree to the{" "}
                  <span style={{ fontWeight: "700" }}>Terms</span> and the{" "}
                  <span style={{ fontWeight: "700" }}>Conditions</span>
                </p>
              </div>
            </div>
            <div className="button">
              <GoogleLogin
                width={open ? "800px" : "300px"}
                size="medium"
                onSuccess={responseGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginSlide;
