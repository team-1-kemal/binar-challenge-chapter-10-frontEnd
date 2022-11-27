import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../api/axios";
import Loader from "react-spinners/PacmanLoader";

const pacman = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [hidden, setHidden] = useState("hidden");

  const [point, setPoint] = useState("");
  const router = useRouter();

  const scoreHandler = () => {
    const value = Math.floor(Math.random() * 11) * 10;
    setPoint(value);
    let pointUser = user.point;
    pointUser += value;
    axios
      .put(`/game/${2}/${id}?point=${pointUser}&title=PACMAN`)
      .then((response) => alert("You win!"))
      .catch((err) => console.log(err));
    setLoading(true);
    setHidden("");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    console.log(value);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    if (!router.isReady) return;
    axios
      .get("/game/" + id, { headers: { Authorization: token } })
      .then((user) => setUser(user.data.data))
      .catch((err) => console.log(err));
  }, [router.isReady, id]);

  return (
    <section className="flex justify-center bg-[url('/asset/bg-pacman.png')] min-h-screen bg-cover bg-center">
      <div className="flex flex-col items-center text-center">
        <img src="/asset/logo-pacman.png" className="h-[80px] w-auto mt-10" />
        <button
          onClick={scoreHandler}
          className="relative w-[150px] mt-[70px] inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-white rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-yellow-300 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Generate Score</span>
          <span className="relative invisible">Button Text</span>
        </button>
        {loading ? (
          <div className="mt-[50px] mr-[30px]">
            <Loader color={"#ffff32"} loading={loading} size={30} aria-label="Loading Spinner" data-testid="loader" />
            <p className="text-white mt-[60px] ml-[35px]">Loading...</p>
          </div>
        ) : (
          <div>
            <h2 className={`text-white ${hidden} font-montserrat text-base mt-[40px]`}>Your Score</h2>
            <p className="text-white text-[60px]  font-pressstart">{point}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default pacman;