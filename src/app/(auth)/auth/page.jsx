"use client";
import React, { useState } from "react";
import styles from "./Authpage.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Authpage = () => {
  const [resetStep, setResetStep] = useState(0);
  const [signupStep, setSignupStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
    createPassword: false,
  });
  const [signinData, setSigninData] = useState({
    phone: "",
    password: "",
  });

  const handleToggle = (e) => {
    const container = document.querySelector("." + styles.container);
    if (e.target.classList.contains(styles.registerBtn)) {
      container.classList.add(styles.containerActive);
    } else {
      container.classList.remove(styles.containerActive);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetStep(resetStep + 1);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupStep(1);
  };

  const handleVerifySignupOTP = (e) => {
    e.preventDefault();
    setSignupStep(0);
    const container = document.querySelector("." + styles.container);
    container.classList.remove(styles.containerActive);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    // Handle sign in logic
  };

  const renderResetPasswordForm = () => {
    switch (resetStep) {
      case 1:
        return (
          <form onSubmit={handleResetPassword}>
            <h1>Reset Password</h1>
            <div className={styles.inputBox}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <i className="bx bxs-envelope" />
            </div>
            <button type="submit" className={styles.btn}>
              Send OTP
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setResetStep(0)}
            >
              Back
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleResetPassword}>
            <h1>Enter OTP</h1>
            <p>Please enter the OTP sent to {resetEmail}</p>
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className={styles.btn}>
              Verify OTP
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setResetStep(1)}
            >
              Back
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleResetPassword}>
            <h1>Create New Password</h1>
            <div className={styles.inputBox}>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="New Password"
                required
              />
              <span
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <div className={styles.inputBox}>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                required
              />
              <span
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <button type="submit" className={styles.btn}>
              Update Password
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setResetStep(2)}
            >
              Back
            </button>
          </form>
        );
      default:
        return (
          <form onSubmit={handleSignin}>
            <h1>Sign In</h1>
            <div className={styles.inputBox}>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={signinData.phone}
                onChange={(e) =>
                  setSigninData({ ...signinData, phone: e.target.value })
                }
              />
              <i className="bx bxs-phone" />
            </div>
            <div className={styles.inputBox}>
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                required
                value={signinData.password}
                onChange={(e) =>
                  setSigninData({ ...signinData, password: e.target.value })
                }
              />
              <span
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <div className={styles.forgotLink}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setResetStep(1);
                }}
              >
                Reset Password?
              </a>
            </div>
            <button type="submit" className={styles.btn}>
              Sign In
            </button>
          </form>
        );
    }
  };

  const renderSignupForm = () => {
    switch (signupStep) {
      case 1:
        return (
          <form onSubmit={handleVerifySignupOTP}>
            <h1>Verify Email</h1>
            <p>Please enter the OTP sent to your email</p>
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className={styles.btn}>
              Verify OTP
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setSignupStep(0)}
            >
              Back
            </button>
          </form>
        );
      default:
        return (
          <form onSubmit={handleSignup}>
            <h1>Sign Up</h1>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Username"
                required
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
              />
              <i className="bx bxs-user" />
            </div>
            <div className={styles.inputBox}>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
              <i className="bx bxs-envelope" />
            </div>
            <div className={styles.inputBox}>
              <input
                type={showPassword.createPassword ? "text" : "password"}
                placeholder="Create Password"
                required
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
              <span
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility("createPassword")}
              >
                {showPassword.createPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
          </form>
        );
    }
  };

  return (
    <div className={styles.authpage}>
      <div
        className={
          styles.container +
          " " +
          (resetStep === 0 && signupStep === 0 ? "" : styles.containerActive)
        }
      >
        <div className={styles.formBox + " " + styles.login}>
          {renderResetPasswordForm()}
        </div>
        <div className={styles.formBox + " " + styles.formBoxRegister}>
          {renderSignupForm()}
        </div>
        <div className={styles.toggleBox}>
          <div className={styles.togglePanel + " " + styles.togglePanelLeft}>
            <h1>Welcome!</h1>
            <p>New here? Create an account</p>
            <button
              className={styles.btn + " " + styles.registerBtn}
              onClick={handleToggle}
            >
              Sign Up
            </button>
          </div>
          <div className={styles.togglePanel + " " + styles.togglePanelRight}>
            <h1>Good to See You!</h1>
            <p>Have an account? Sign in</p>
            <button
              className={styles.btn + " " + styles.loginBtn}
              onClick={handleToggle}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authpage;