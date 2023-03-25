// function saveElements(array) {
//   const newArray = array.map(element => element);
//   return newArray;
// }

// const savedArray = saveElements(originalArray);
// return <>
//     <span>{savedArray}</span>
// </>
import React from "react";
import "./style.css"
const App = () => {
    var defaultvalue = 0;
    const [value, setvalue] = React.useState([])
    const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "=", "AC","Square"];
    const con = (e) => {
        defaultvalue = e;
        if (e === "AC") {
            
            setvalue([])
        }
        else if(e ==="Square")
        {
            setvalue(eval(value*value))
        }
        else if (e === "=") {
            setvalue(eval(value))

            // setTimeout(setvalue([]),2000)
        }
        else {
            setvalue([value] + defaultvalue);
        }
    }
    
    return (
        <>
            <div className="container">
                <h1 >Calculator</h1>
                <input type="text" value={value} onChange={(event) =>setvalue(event.target.value)} className="label-style" />
                <div >
                {Array.map((ele, index) => (
                    // <div key = {index}>{ele}</div>
                    <button className="btn-style" key={index} onClick={() => con(ele)}>{ele}</button>
                        ))}
                </div>
            </div>
        </>
    );
};

export default App;


