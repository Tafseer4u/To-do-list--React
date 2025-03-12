import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Todo from "./components/Todo";

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
