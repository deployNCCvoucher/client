import "./style.scss";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../../../redux/user/userAction";
import { useAppDispatch } from "../../../../redux/hook/useTypedSeletor";

const LoginSlide = () => {
  const dispatch = useAppDispatch();
  const responseGoogle = async (response: any) => {
    await dispatch(login(response.credential));
  };
  return (
    <div className="login-slide ">
      <div className="login-wrap">
        <div className="login-img">
          <img className="coupon" src="./images/coupon.png" alt="coupon" />
          <div className="logo-wrap">
            <img className="logo" src="./images/logo.png" alt="logo" />
            <div className="text-wrap">
              <div className="button">
                <GoogleLogin
                  size="medium"
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <h1 className="logo-text">NCC VOUCHER</h1>
              <p className="term-text">
                By sign in you agree to the{" "}
                <span style={{ fontWeight: "700" }}>Terms</span> and the{" "}
                <span style={{ fontWeight: "700" }}>Conditions</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginSlide;
