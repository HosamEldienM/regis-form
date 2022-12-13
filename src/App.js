import React, { useEffect, useState } from "react";
import "./App.css";
import { CreateAccount } from "./components/CreateAccount";
import { Logged } from "./components/Logged";
import { Welcome } from "./components/Welcome";

function App() {
  const [displayCreateAccount, setDisplayCreateAccount] = useState("hide");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedEmail, setLoggedEmail] = useState("");

  const display = (displayState) => {
    setDisplayCreateAccount(displayState);
  };

  const loginHandler = async (user) => {
    let url = "https://goldblv.com/api/hiring/tasks/register";
    let url2 = "https://httpbin.org/post";

    try {
      let res = await fetch(url2, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      let resJson = await res.json();
      console.log(resJson.json);
      if (res.status === 200) {
        setLoggedEmail(resJson.json.email);
        setIsLoggedIn(true);
      } else {
        console.log("else ");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(isLoggedIn);
  return (
    <>
      {displayCreateAccount === "hide" ? (
        <Welcome onDisplayCreateAccount={display} />
      ) : isLoggedIn ? (
        <Logged email={loggedEmail} />
      ) : (
        <CreateAccount onLogin={loginHandler} />
      )}
    </>
  );
}

export default App;
