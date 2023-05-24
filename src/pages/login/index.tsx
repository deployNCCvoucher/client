import "./style.scss";
const Login = () => {
  return (
    <div className="login">
      <div className="login-left">Ngà</div>
      <div className="login-right">
        <img className="logo" src="./images/logo.png" alt="logo" />
        <h1 className="logo-text">VOUCHER</h1>
        <button className="button">
          <img src="./images/google-logo.png" className="google-logo" alt=""/>
          <p>Sign in with google</p>
        </button>
        <p className="term-text">By sign in you agree to the <span style={{ fontWeight: '700' }}>Terms</span> and the <span style={{ fontWeight: '700' }}>Conditions</span></p>
      </div>
    </div>
  );
};
export default Login;
