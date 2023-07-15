import React, { useState } from "react";
import "./App.css";
import Joi from "joi";
const Login = () => {
  const [inputs, setInputs] = useState({});
  const [flag, setFlag] = useState(false);
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const registerSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/
        )
      ),
  });
  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };
  console.log(errors);
  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name));
    if (validation.error) {
      setError({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setError({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="login">
      <h2 className="text-white my-3 ">Login</h2>
      <form className="p-1">
        <input
          type="email"
          onChange={onChange}
          name="email"
          className={`form-control my-2 ${
            Object.keys(errors)?.find((e) => e === "email")
              ? "text-danger"
              : "text-success"
          }`}
          placeholder="please enter your email"
        />
        <input
          onChange={onChange}
          className={`form-control my-2 ${
            Object.keys(errors)?.find((e) => e === "password")
              ? "text-danger"
              : "text-success"
          }`}
          name="password"
          type="password"
          placeholder="please enter your password"
        />
      </form>
      <div className="text-start ps-2">
        <input
          type="checkbox"
          id="subscribeNews"
          name="subscribe"
          value="newsletter"
          className="me-1"
        />
        <label htmlFor="subscribeNews" className="text-white">
          Remember me?
        </label>
      </div>
      <button
        onMouseMove={() => setFlag(!flag)}
        type="submit"
        className={`h5 mx-1  mt-4  px-5 btn  text-white float-right ${
          Object.keys(errors)?.length > 0
            ? flag
              ? "btn-right bg-info"
              : "btn-left bg-info"
            : "animate bg-success"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
