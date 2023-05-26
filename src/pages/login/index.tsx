import "./style.scss";
import LoginSlide from "./fragments/loginSlide";
const Login = () => {
  return (
    <div className="login">
      <div className="login-left">
        <LoginSlide />
      </div>
      <div className="login-right">
      </div>
    </div>
  );
};
export default Login;
