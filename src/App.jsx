import { useState } from "react";
import "./App.css";
import Navbar from "/components/navbar.jsx";
import Todo from "/components/Todo.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Todo />
  
    </>
  );
}

export default App;
