// import React from "react";
// import "./style.css"
// let time = new Date().toLocaleTimeString();
// const App = () =>{
//     const [ctime,setctime]=React.useState(time);

//     const upTime =() =>{
//         time = new Date().toLocaleTimeString();
//         setctime(time);
//     };
//     setInterval(upTime,1000)
//     return (
//         <>
//         <h1 className="mainTime">{ctime}</h1>

//         </>
//     )
// }
// export default App;
// let time = new Date().toLocaleTimeString()
// const App=()=>{
//     const [A,setA] = React.useState(time);
//     function changediv(){
//         time = new Date().toLocaleTimeString()
//         setA (time);
//     }
//     setInterval(changediv, 1000);
//     return (
//         <>
//         <div> time is :- {A}</div>
//         </>
//     )
// }
import React from "react";
const json = [
    {
        id: 1,
        text: "i am aryan",
        des:"nice"
    },
    {
        id: 2,
        text: "my name is bhisikar",
        des:"noice"
    },
    {
        id:3,
        text:"i am king",
        des:"double noice"
    }

]

const App = () => {
    // const [Data, setData] = React.useState(json)
    
    return (
        <>
            {json.map(e => (
                <span key = {e.id}>{e.text}<br/>{e.des}<br/></span>
            ))}
        
        </>
    )
}

export default App;