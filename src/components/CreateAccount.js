import React, { useReducer, useState, useEffect } from "react";
import createAccountImage from "../images/createAccount.png";
import Button from "../UI/Button";
import "./CreateAccount.css";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      value: action.val,
      isValid: /[a-z0-9]+@[a-z]+\.[a-z]{3}/.test(action.val),
    };
  } else if (action.type === "EMAIL_BLUR") {
    return {
      value: state.value,
      isValid: /[a-z0-9]+@[a-z]+\.[a-z]{3}/.test(state.value),
    };
  } else {
    return { value: "", isValid: false };
  }
};
const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 8,
    };
  } else if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  } else {
    return { value: "", isValid: false };
  }
};
const confirmReducer = (state, action) => {
  if (action.type === "CONFIRM_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim() === action.firstPassword,
    };
  } else if (action.type === "CONFIRM_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim() === action.firstPassword,
    };
  } else {
    return { value: "", isValid: false };
  }
};
const userReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: /^[a-z][a-z0-9]{3,13}[a-z]$/.test(action.val),
    };
  } else if (action.type === "USER_BLUR") {
    return {
      value: state.value,
      isValid: /^[a-z][a-z0-9]{3,13}[a-z]$/.test(state.value),
    };
  } else {
    return { value: "", isValid: false };
  }
};

export const CreateAccount = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [confirmState, dispatchConfirm] = useReducer(confirmReducer, {
    value: "",
    isValid: null,
  });
  const [userState, dispatchUser] = useReducer(userReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: confirmIsValid } = confirmState;
  const { isValid: userIsValid } = userState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid && userIsValid && confirmIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, userIsValid, confirmIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "EMAIL_INPUT", val: event.target.value });
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };

  const confirmChangeHandler = (event) => {
    dispatchConfirm({
      type: "CONFIRM_INPUT",
      val: event.target.value,
      firstPassword: passwordState.value,
    });
  };
  const validateConfirmHandler = () => {
    dispatchConfirm({
      type: "CONFIRM_BLUR",
      firstPassword: passwordState.value,
    });
  };

  const userChangeHandler = (event) => {
    dispatchUser({ type: "USER_INPUT", val: event.target.value });
  };
  const validateUserHandler = () => {
    dispatchUser({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let user = {
      username: userState.value,
      email: emailState.value,
      password: passwordState.value,
      password_confirmation: confirmState.value,
    };

    props.onLogin(user);
  };

  return (
    <div className="container-page">
      <div className="container">
        <img src={createAccountImage} alt="" id="createImg"></img>
        <div className="create-container">
          <h2>create account</h2>
          <p>Go ahead and sign up, let everyone know how awesome you are!</p>
          <form onSubmit={submitHandler}>
            <div className="input">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="username"
                onChange={userChangeHandler}
                onBlur={validateUserHandler}
              />
            </div>
            {userIsValid === false && (
              <p className="invalid">invalid username</p>
            )}
            <div className="input">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
            </div>
            {emailIsValid === false && <p className="invalid">invalid email</p>}
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
            </div>
            {passwordIsValid === false && (
              <p className="invalid">invalid password </p>
            )}
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="confirm password"
                onChange={confirmChangeHandler}
                onBlur={validateConfirmHandler}
              />
            </div>
            {confirmIsValid === false && (
              <p className="invalid">invalid confirmation </p>
            )}

            <Button type="submit" disabled={!formIsValid}>
              create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
