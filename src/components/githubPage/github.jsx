import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
import { AiFillGithub } from "react-icons/ai"

const Github = (props) => {
    const  { id } = props;
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [selected, setSelected] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(true);
    const handleChange = (e) => {
        e.preventDefault();
        setData(search);
    };

    const changeString = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${data}/repos`);
            const res1 = await axios.get("https://api-dusky-pi.vercel.app/Admin/sendData");
            if(res.data.status === false){
                setShow(false);
            }
            console.log(res1.data)
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
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    };
    const toBackend = async () => {
        try {
            console.log(selected)
            await axios.get("https://api-dusky-pi.vercel.app/Admin/ProjectData?items=" + JSON.stringify(selected.map((e, index) => {
                if (selected[index] === true) {
                    return {
                        id: userInfo[index].id,
                        name: userInfo[index].name,
                        description: userInfo[index].description,
                        owner: userInfo[index].owner.login,
                        default_branch: userInfo[index].default_branch,
                        html_url: userInfo[index].html_url,
                        avatar_url: userInfo[index].owner.avatar_url,
                    }}
                    return false;
                })
            ))
            setUpdate(prev => !prev);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data !== null) {
            fetchData();
        }
    }, [data,update]);
    return (
        <>
            {id === null ? null : (
                <>
                    <div>
                        <form>
                            <input type="text" onChange={changeString} />
                            <button type="submit" onClick={handleChange}>
                                Search
                            </button>
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
                                            <p>{item.description === null ? "No description" : item.description}</p>
                                            <img src={item.owner.avatar_url} alt="img" />
                                            <AiFillGithub onClick={() => window.location.href = item.html_url} />
                                            <p> Default branch : {item.default_branch}</p>

                                        </div>
                                    );
                                })}
                            </div>
                            {data.length!== 0 || !show ?<button onClick={() => { toBackend() }}>send </button>:null}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Github;
