import React, { useState } from "react";
import axios from "axios";

function SideBar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("MYWAYS_JWT")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "signin", { email, password })
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("MYWAYS_JWT", res.data.token);
          setIsSignedIn(res.data.token);
          alert("Success");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    closeSidebar(e);

    document.getElementById("App").classList.add("blur");
    document.getElementById("modal").classList.add("open");

    const forms = document.getElementsByTagName("form");
    for (let index = 0; index < forms.length; index++) {
      forms[index].style.opacity = 0;
    }
    document.getElementById("login-form").style.opacity = 1;
    document.getElementById("reset-form").style.opacity = 1;
  };

  const logout = (e) => {
    e.preventDefault();

    setIsSignedIn("");
    document.getElementById("login-form").style.opacity = 1;
  };

  const closeSidebar = (e) => {
    e.preventDefault();
    console.log(isSignedIn);
    document.getElementById("App").classList.remove("blur");
    document.getElementById("sidebar").classList.remove("active");
  };

  return (
    <div id="sidebar" className="sidebar">
      <button onClick={closeSidebar} className="close-button">
        X
      </button>
      {isSignedIn && (
        <div>
          <h1 className="sidebar-message">Already Signed In</h1>
          <button className="sidebar-button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} id="login-form" className="login-form">
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <button className="sidebar-button">Submit</button>
      </form>

      <button className="sidebar-button" onClick={resetPassword}>
        RESET PASSWORD
      </button>
      {message !== "" && message}
    </div>
  );
}

export default SideBar;
