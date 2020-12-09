import React, { useState } from "react";
import axios from "axios";

function SidePanel({ setForm, setModalOpen, sidePanelOpen, setSidePanelOpen }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [sidebarMessage, setSidebarMessage] = useState("");

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("MYWAYS_JWT")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = input;

    axios
      .post(process.env.REACT_APP_BASE_URL + "/signin", { email, password })
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("MYWAYS_JWT", res.data.token);
          setIsSignedIn(res.data.token);
        }
        setSidebarMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = (e) => {
    e.preventDefault();
    setInput({
      email: "",
      password: "",
    });
    setSidebarMessage("");
    setIsSignedIn("");
    localStorage.setItem("MYWAYS_JWT", "");
  };

  return (
    <>
      {sidePanelOpen && (
        <div className="side-panel">
          <div className="side-panel-content">
            {(isSignedIn === null || isSignedIn === "") && (
              <h2 className="side-panel-title">Login</h2>
            )}
            {isSignedIn && <h2 className="side-panel-title">Logout</h2>}
            <button
              onClick={() => {
                setInput({
                  email: "",
                  password: "",
                });
                setSidebarMessage("");
                setSidePanelOpen(false);
              }}
              className="side-panel-close-button"
            >
              X
            </button>
            {isSignedIn && (
              <div>
                <button className="login-form-button button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
            {(isSignedIn === null || isSignedIn === "") && (
              <div className="login-form">
                <h2 className="login-form-title">Student</h2>
                <div className="login-form-bar"></div>
                <form onSubmit={handleSubmit} id="login-form">
                  <input
                    type="text"
                    required
                    value={input.email}
                    name="email"
                    onChange={(e) =>
                      setInput((prevState) => {
                        return { ...prevState, email: e.target.value };
                      })
                    }
                    placeholder=" Email"
                  ></input>
                  <input
                    type="password"
                    required
                    value={input.password}
                    name="password"
                    onChange={(e) =>
                      setInput((prevState) => {
                        return { ...prevState, password: e.target.value };
                      })
                    }
                    placeholder=" Password"
                  ></input>
                  <h3
                    className="forgot-password-link"
                    onClick={() => {
                      setForm(3);
                      setModalOpen(true);
                      setSidePanelOpen(false);
                    }}
                  >
                    Forgot Password?
                  </h3>
                  <button className="login-form-button button">Login</button>
                  <h3
                    className="signup-link"
                    onClick={() => {
                      setSidePanelOpen(false);
                      setModalOpen(true);
                    }}
                  >
                    New to MyWays? Sign Up here
                  </h3>
                </form>

                {sidebarMessage !== "" && (
                  <h4 className="login-form-message">{sidebarMessage}</h4>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SidePanel;
