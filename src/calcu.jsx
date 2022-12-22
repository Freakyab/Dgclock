// function saveElements(array) {
//   const newArray = array.map(element => element);
//   return newArray;
// }

// const savedArray = saveElements(originalArray);
// return <>
//     <span>{savedArray}</span>
// </>
import React from "react";

const App = () => {
    var defaultvalue = 0;
    const [value, setvalue] = React.useState([])
    const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9,0, "+", "-", "=", "AC"];
    const con = (e) => {
        defaultvalue=e;
        if (e === "AC") {
            setvalue([])
            console.log("hi")
        }
        else if (e === "=") {
            setvalue(eval(value))
        }
        else {
            setvalue([value] + defaultvalue)
            // console.log(e);
        }
    }
    // const inputdata =(e)=>{
    //     console.log(value)
    // }
    return (
        <>
            <input type="text" value={value} onChange={(event) => setvalue(event.target.value) }/>
            {Array.map((ele, index) => (
                <button key={index} onClick={() => con(ele)}>{ele}</button>
            ))}
        </>
    );
};

export default App;


