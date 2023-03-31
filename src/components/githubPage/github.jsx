import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
import { AiFillGithub } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const msg = (type) => {
    let str;
    if (type === true) {
        str = "🦄 Search successful";
    }
    else if(type === "backend") {
        str = "🦄 Backend Successful";
    }
    else {
        str = "🦄 Search unsuccessful";
    }
    toast(str, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}
const Github = (props) => {
    const { id } = props;
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [selected, setSelected] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(true);
    const [options, setOptions] = useState("Repo");
    const handleChange = (e) => {
        e.preventDefault();
        setData(search);
    };

    const changeString = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            let res;
            if (options === "Repo") {
                res = await axios.get(`https://api.github.com/users/${data}/repos`);
            }
            else {
                res = await axios.get(`https://api.github.com/orgs/${data}/repos`);
            }
            const res1 = await axios.get("https://api-dusky-pi.vercel.app/Admin/sendData");
            if (res.data.length === 0 || res.data.status === false) {
                setShow(false);
            }
            if(res.code === "ERR_BAD_REQUEST")
            {
                msg(false);
            }
            else {
                msg(true);
            }
            setUserInfo(res.data);
            let newSelected = Array(res.data.length).fill(false);
            if (res1.data.data === 0) {
                setSelected(newSelected);
            } else {
                res.data.map((e, index) => {
                    res1.data.data.map(e1 => {
                      if (parseInt(e.id) === parseInt(e1.id)) {
                        newSelected[index] = true;
                        setSelected(newSelected);
                      }
                      return null; // Adding a return statement to fix the warning
                    });
                    return null; // Adding a return statement to fix the warning
                  });
            }
        } catch (err) {
            console.log(err);
            msg(false);
        }
    };
    const toBackend = async () => {
        try {
            await axios.post("https://api-dusky-pi.vercel.app/Admin/ProjectData?items=" + JSON.stringify(selected.map((e, index) => {
                if (selected[index] === true) {
                    return {
                        id: userInfo[index].id,
                        name: userInfo[index].name,
                        description: userInfo[index].description,
                        owner: userInfo[index].owner.login,
                        default_branch: userInfo[index].default_branch,
                        html_url: userInfo[index].html_url,
                        avatar_url: userInfo[index].owner.avatar_url,
                        type: options
                    }
                }

                return [false, options];
            })
            )).then(res => {
                if (res.data.status === true) {
                    msg("backend");
                }
            });
            setUpdate(prev => !prev);
        } catch (err) {
            console.log(err);
            msg(false)
        }
    };

    useEffect(() => {
        if (data !== null) {
            fetchData();
            
        }
    }, [data, update]);
    return (
        <>
            {id === null ? null : (
                <>
                    <div>
                        <form>
                            <div className="inputDiv">
                                <input type="text" onChange={changeString} className="form__field"
                                    placeholder="Search" required />
                                <select className="round" onChange={(e) => setOptions(e.target.value)}>
                                    <option value="Repo">Repo</option>
                                    <option value="Orgo">Organisation</option>
                                </select>
                                <button type="submit" onClick={handleChange} className="inputDivSubmit" >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    {userInfo === null ? null : (
                        <>
                            <div className="contentDiv">
                                {userInfo.map((item, index) => {
                                    return (
                                        <div key={item.id} className={selected[index] ? "active" : "card"}
                                            onClick={() => {
                                                setSelected((prevSelected) => {
                                                    const newSelections = [...prevSelected];
                                                    newSelections[index] = !prevSelected[index];
                                                    return newSelections;
                                                });
                                            }}>
                                            <h1 className="header">{item.name}</h1>
                                            <p className="description">{item.description === null ? "No description" : item.description}</p>
                                            <img src={item.owner.avatar_url} alt="img" />
                                            <AiFillGithub onClick={() => window.location.href = item.html_url} className="gitIcon" />
                                            <p className="branch"> Default branch : {item.default_branch}</p>

                                        </div>
                                    );
                                })}
                            </div>
                            {data.length !== 0 || show ? <button onClick={() => { toBackend() }} className="inputDivSubmit">send </button> : null}
                        </>
                    )}
                </>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
};

export default Github;
