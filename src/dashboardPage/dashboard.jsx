import React, { useState } from "react";
import "./style.css";
import Github from "../components/githubPage/github";

const Dashboard = (props) => {

  const [showGithub, setShowGithub] = useState(false);

  const handleClick = () => {
    setShowGithub(true);
  };

  return (
    <>
      <div>
        <ul>
          <li>
            <h1 onClick={handleClick} className="heading">github</h1>
            {showGithub === true ? <Github id={props.id} /> : null}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
