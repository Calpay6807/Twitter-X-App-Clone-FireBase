import React from "react";
import { navSections } from "../../utils/constant";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { RxExit } from "react-icons/rx";
import dProfile from "../../assets/defalut.png";

const Nav = () => {
  console.log(auth);
  return (
    <nav className="h-[100vh] flex flex-col justify-between items-center ">
      {/* navigasyon linkleri */}
      <div>
        <img className="w-14" src="/x-logo.png" alt="" />
        {navSections.map((sec, i) => (
          <div
            className="flex items-center mt-11 gap-3  text-2xl p-3 hover:bg-gray-400 cursor-pointer rounded-full"
            key={i}
          >
            {sec.icon} <span>{sec.title}</span>
          </div>
        ))}
      </div>
      {/* kullanıcı bilgileri */}
      <div className="flex flex-wrap items-center gap-5 p-3">
        <img
          src={
            auth.currentUser?.photoURL ? auth.currentUser?.photoURL : dProfile
          }
          className="rounded-full w-14"
          alt=""
        />
        <div className="flex flex-col gap-2 text-center cursor-pointer">
          <span className="text-3xl">{auth?.currentUser?.displayName}</span>
          <span className="bg-gray-500 rounded-full">
            @{auth?.currentUser?.displayName?.toLowerCase()}
          </span>
        </div>
        <button
          className="text-2xl hover:bg-gray-600 bg-gray-400 text-black cursor-pointer rounded-full p-3"
          onClick={() => signOut(auth)}
        >
          {<RxExit />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
