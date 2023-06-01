import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [joinSelected, setJoinSelected] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (name) localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    setName(localStorage.getItem("name") ?? "");
  });

  return (
    <div>
      <h1 className="text-3xl md:text-2xl text-center mt-3">Meme Me App</h1>
      {name ? <div className="text-center mt-2">Hello, {name}</div> : <></>}
      <img
        src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${name}`}
        className="rounded-xl h-12 ml-auto mr-auto"
      />
      <div className="flex justify-center w-full">
        <input
          className="h-10 dark:bg-white dark:text-gray-700 mt-2 ring-gray-600 text-center ring-2 rounded-lg min-w-[300px] w-[30%]"
          placeholder="What is yor name?"
          minLength={3}
          maxLength={16}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {name ? (
        <div className="flex justify-center md:justify-evenly mt-10">
          <button className="w-[45%] bg-blue-500 h-10">Create</button>
          <button
            className="w-[45%] bg-red-500  h-10"
            onClick={() => setJoinSelected(true)}
          >
            join
          </button>
        </div>
      ) : (
        <></>
      )}
      {joinSelected ? (
        <div className="flex justify-center w-full">
          <input
            className="h-10 dark:bg-white dark:text-gray-700 mt-10 ring-gray-600 text-center ring-2 rounded-lg min-w-[300px] w-[30%]"
            placeholder="Enter Room id to Join (you can get one from host)"
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
      ) : (
        <></>
      )}
      {roomId ? <button>join</button> : <></>}
    </div>
  );
};

export default Home;
