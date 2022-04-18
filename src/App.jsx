
import './App.css';

import { Hello } from "./components/Hello";

import {useEffect,useState} from "react";

function App() {
  const [Todos, setTodos] = useState([]);
  const [Text, setText] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() =>{
    getData();
  },[])
  
  async function getData()
  {
    const data = await fetch("http://localhost:8080/todos").then((d) =>
      d.json()
    )
    console.log('data:', data)
    setTodos(data);
  }
  return (
    <div className="App">
      <input onChange={(e) => setText(e.target.value)} type="text" />
      <button onClick={() =>{
        const payload = 
        {
          title : Text,
          status : false
        };

        fetch("http://localhost:8080/todos",
        {
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(payload)
        }).then(() =>{
          getData();
        });
        // axios.post("http://localpost:8080/todos",payload);
      }}>Add Text</button>
      {Todos.map((element) =>{
        console.log('element:', element)
        return <Hello Title = {element.title} Id = {element.id}  />
      })}
    </div>
  );
}

export default App;
