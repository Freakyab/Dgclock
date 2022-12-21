// import React from "react";
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
                        
                        // import React from "react";
                        // const json = [
//     {
//         id: 1,
//         text: "i am aryan",
//         des:"nice"
//     },
//     {
    //         id: 2,
    //         text: "my name is bhisikar",
    //         des:"noice"
    //     },
    //     {
        //         id:3,
        //         text:"i am king",
        //         des:"double noice"
        //     }        
// ]        
// const App = () => {
//     // const [Data, setData] = React.useState(json)            
//     return (
//         <>
//             {json.map(e => (
//                 <span key = {e.id}>{e.text}<br/>{e.des}<br/></span>
//             ))}                    
//         </>
//     )
// }
// import React from "react";                    
// const App = () => {
//   const [items, setItems] = React.useState([]);                        
//   const addItem = (e) => {
//     e.preventDefault();
//     setItems([...items, e.target.item.value]);
//     e.target.item.value = "Enter";
//   };
//   const removeItem = (index) => {
//     setItems(items.filter((item, i) => i !== index));
//   };                                
//   return (
//     <>
//       <form onSubmit={addItem}>
//         <input name="item" text="Enter"/>
//         <button>Add</button>
//       </form>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>
//             {item}
//             <button onClick={() => removeItem(index)}>X</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };
import React from "react";
import "../src/style.css"

const App = () => {
    const [item,setitem] = React.useState([])
    const clicked = (e) =>{
        e.preventDefault()
        setitem([...item,e.target.item.value]) 
        e.target.item.value = "";
        console.log(item)  
    }

    const Delete =(index) =>{
        setitem(item.filter((item,i)=>i!==index))
    }

    return(
        <>
        <h1>
            Todo list
        </h1>
        <div className="div-style">

        <form onSubmit={clicked} className="input-style">
            <input type="text" name = "item" />
            <button className="button-style">click me</button>
        </form>
        <ul>
            {item.map((e ,index)=>(
                <li key = {index}>{e}
                <button onClick={()=>Delete(index)}> del</button>
                </li>
            ))} 
        </ul>
        </div>
        </>
    )
}

export default App;