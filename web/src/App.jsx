import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import TextInput from "./components/TextInput";
import Header from "./components/Header";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000", {
      transports: ["websocket"],
    });
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index} className="flex flex-col py-1 hover:bg-black hover:bg-opacity-10 px-10 mt-1" >
        <h3 className="text-white text-lg font-bold">
          {'@'}{name}
          <p className="text-stone-300 text-lg font-normal px-1">{message}</p>
        </h3>
      </div>
    ));
  };


  return (
    <div className="h-screen">
      <Header />
      <form
        onSubmit={onMessageSubmit}
        div
        className="grid grid-cols-12 w-full mx-auto h-full pt-24"
      >
        <div className="col-span-3 bg-[#1b1b1b] text-stone-200 font-bold p-8 relative">
          <h2 className="text-2xl py-10">Your Name</h2>
          <div className="">
            <TextInput
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
              placeholder="Type your name here"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 w-full absolute left-0 bottom-0 bg-[#262626] border-t-2 border-stone-900 py-6">
          <div className="col-span-3"></div>
          <div className="col-span-9 flex flex-row gap-2 px-2">
            <div className="w-full">
          <TextInput
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Type your message here"
          />
            </div>
          <button className="bg-[#3d3d3d] text-white py-4 w-[200px] rounded-md hover:bg-[#333] cursor-pointer transition font-bold">Send Message</button>
          </div>
        </div>

        <div className="col-span-9 bg-[#222] py-10 h-full">
          {chat.length === 0 ? (
            <h1 className="mx-auto text-center text-stone-200">
              nothing here yet, start a conversation
            </h1>
          ) : null}

          {renderChat()}
        </div>
      </form>
    </div>
  );
}

export default App;
