import React, { useEffect } from "react";
import axios from "axios";
import "./style.css"
import { AiFillGithub } from "react-icons/ai"

const Github = (props) => {
    // const  { id } = props;
    const { id } = "6422d8d699c754e57a1b7419"
    const [search, setSearch] = React.useState("freakyab");
    const [data, setData] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [sendData, setSendData] = React.useState(null);
    const [update,setUpdate] = React.useState(false);
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
            const res1 = await axios.get("http://localhost:5000/Admin/sendData");

            setUserInfo(res.data);
            let newSelected = Array(res.data.length).fill(false);
            if(res1.data.data === 0){
                setSelected(newSelected);
            }else{
            res.data.map((e, index) => {
                res1.data.data.map(e1 => {
                    if (parseInt(e.id) === parseInt(e1.id)) {
                        newSelected[index] = "constant";
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
            await axios.get("http://localhost:5000/Admin/ProjectData?items=" + JSON.stringify(sendData));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data !== null) {
            fetchData();
        }
    }, [data]);
    useEffect(() => {
        setTimeout(() => {
            setUpdate(prev => !prev);
          }, 1000);
    }, [update]);
    return (
        <>
            {id === null ? null : (
                <>
                    <div>
                        <h1>{id}</h1>
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
                                                const newSelected = Array(userInfo.length).fill(false);
                                                newSelected[index] = true;

                                                setSelected(prevSelected => {
                                                    const newSelections = [...prevSelected];
                                                    newSelections[index] = prevSelected[index] === "constant" ? false : true;
                                                    return newSelections;
                                                  });
                                                  
                                                setSendData({
                                                    id: item.id,
                                                    name: item.name,
                                                    description: item.description,
                                                    owner: item.owner.login,
                                                    default_branch: item.default_branch,
                                                    html_url: item.html_url,
                                                    avatar_url: item.owner.avatar_url,
                                                    selected: "constant",
                                                    index: index
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
                            <button onClick={() => {toBackend(); setUpdate(prev => !prev);}}>send </button>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Github;
