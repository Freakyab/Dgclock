import React, { useState } from "react";
import LoginPage from "../src/loginPage/login";
import Dashboard from "../src/dashboardPage/dashboard";

function Home() {
  const [user, setUser] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      {user ? (
        <Dashboard id={id} />
      ) : (
        <LoginPage setUser={setUser} setId={setId} />
      )}
    </>
  );
}

export default Home;