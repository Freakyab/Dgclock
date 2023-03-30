import React, { useRef, useEffect } from "react";
import axios from "axios";
import "./style.css"
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";


function LoginPage({ setUser, setId }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invisible, setInvisible] = React.useState(false);

  const blobRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api-dusky-pi.vercel.app/Admin/login?username=${username}&password=${password}`
      );
      if (res.data.status === true) {
        setUser(true);
        setId(res.data.userId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const blob = blobRef.current;
    document.body.onpointermove = (e) => {
      let x = e.pageX;
      let y = e.pageY;
      if (blob) {
        blob.animate({
          left: `${x}px`,
          top: `${y}px`
        }, { duration: 3000, fill: "forwards" })
      }
    };
  }, [blobRef]);


  return (

    <div className="container">
      <div className="blob" ref={blobRef}></div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputBox">
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span >Username</span>
          </div>
          <div className="inputBox">
            <input
              type={invisible ? "text" : "password"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span >Password</span>
          </div>
          {invisible ? <AiFillEyeInvisible className="icon" onClick={() => {
            setInvisible(!invisible)
          }} /> : <AiFillEye className="icon" onClick={() => {
            setInvisible(!invisible)
          }} />}
         <button type="submit" className="sumbitBtn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
