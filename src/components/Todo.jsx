import { useState, useEffect } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showtask, setshowtask] = useState(true);
  useEffect(() => {
    let todostring = localStorage.getItem("Todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(todos);
    }
  }, []);

  const handlechange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    SavetoLS();
  };
  const handleDelete = (e, id) => {
    let c = confirm("Do you want to delete you Todo");
    if (c == true) {
      let Newtodo = Todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(Newtodo);
      SavetoLS();
    }
  };
  const handleEdit = (e, id) => {
    let t = Todos.filter((item) => {
      return item.id == id;
    });
    setTodo(t[0].todo);
    let Newtodo = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(Newtodo);
    SavetoLS();
  };

  const handlecheck = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let Newtodo = [...Todos];
    Newtodo[index].iscompleted = !Newtodo[index].iscompleted;
    setTodos(Newtodo);
    SavetoLS();
  };
  const toggle = () => {
    setshowtask(!showtask);
  };
  const SavetoLS = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-[#201f1f]"></div>

      <div className="flex flex-col sm:flex-row justify-center items-center px-4">
        <div className="m-4 w-full sm:w-auto flex items-center justify-center">
          <input
            onChange={handlechange}
            value={todo}
            className="w-full sm:w-3xl bg-slate-200 py-3 px-5 shadow border-none focus:outline-none rounded-2xl"
            type="text"
            placeholder="Enter your Todo here"
          />
        </div>
        <button
          disabled={todo.length <= 2}
          onClick={handleAdd}
          className="cursor-pointer border-none font-bold h-12 shadow py-3 px-5 bg-[#0ab6ab] rounded-2xl hover:bg-[#08a79c] w-full sm:w-auto"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-around items-center text-2xl font-bold text-[#0ab6ab] px-4">
        <span>Your Todos</span>
        <div className="flex text-gray-600 text-sm items-center gap-2">
          <input
            onChange={toggle}
            className="h-4 w-4"
            type="checkbox"
            checked={showtask}
          />
          Show Finished
        </div>
      </div>

      <div className="flex flex-wrap justify-center text-white bg-white mx-auto my-3 rounded-2xl px-3 py-2 max-h-[440px] overflow-y-auto max-w-4xl ">
        {Todos.length === 0 && (
          <div className="text-gray-600 p-2 mx-2 text-center">
            No todo's to display
          </div>
        )}
        {Todos.map(
          (item) =>
            (showtask || !item.iscompleted) && (
              <div
                key={item.id}
                className="flex flex-row  sm:flex-row w-full sm:w-[90%] md:w-[80%] lg:w-[100%] text-black items-center bg-slate-200 rounded-2xl border-black mx-2 my-2 p-2 "
              >
                {/* Checkbox */}
                <div className="flex items-center justify-center mx-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      onChange={handlecheck}
                      type="checkbox"
                      className="peer hidden"
                      checked={item.iscompleted}
                      name={item.id}
                    />
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-[#0ab6ab] transition">
                      {item.iscompleted && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </label>
                </div>

                {/* Todo Text */}
                <div
                  className={`flex items-center w-full sm:w-2/3 px-2 overflow-auto ${
                    item.iscompleted ? "line-through" : ""
                  }`}
                >
                  {item.todo}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-2 sm:mt-0 sm:ml-auto">
                  <button onClick={(e) => handleEdit(e, item.id)}>
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                      fill="#08a79c"
                    >
                      <path d="M24,11l2.414-2.414c0.781-0.781,0.781-2.047,0-2.828l-2.172-2.172c-0.781-0.781-2.047-0.781-2.828,0L19,6L24,11z M17,8	L5.26,19.74c0,0,0.918-0.082,1.26,0.26c0.342,0.342,0.06,2.58,0.48,3s2.644,0.124,2.963,0.443c0.319,0.319,0.297,1.297,0.297,1.297	L22,13L17,8z M4.328,26.944l-0.015-0.007C4.213,26.97,4.111,27,4,27c-0.552,0-1-0.448-1-1c0-0.111,0.03-0.213,0.063-0.313	l-0.007-0.015L4,23l1.5,1.5L7,26L4.328,26.944z"></path>
                    </svg>
                  </button>

                  <button onClick={(e) => handleDelete(e, item.id)}>
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                      fill="#08a79c"
                    >
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Todo;
