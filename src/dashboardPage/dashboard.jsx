import React, { useState } from "react";
import "./style.css";
import Github from "../components/githubPage/github";
import {BsFillArrowDownCircleFill} from "react-icons/bs"

const Dashboard = (props) => {

  const [showGithub, setShowGithub] = useState(false);
  const handleClick = () => {
    setShowGithub(!showGithub);
  };

  return (
    <>
      <div className="mainDiv">
        <h1 className="heading"> Admin </h1>
        <ul>
          <li>
            <span className="listElements"  onClick={handleClick}>
            <h2>github</h2>         
            <BsFillArrowDownCircleFill className="arrow" onClick={handleClick} style = {showGithub ? {transform: "rotate(0)"}: null}/>
            </span>
            {showGithub === true ? <Github id={props.id} /> : null}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
