import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
} from "firebase/auth";
import React, { useState } from "react";
import Google from "../../assets/google.png";
import { auth, provider } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setİsError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      createUserWithEmailAndPassword(auth, email, pass).catch((error) =>
        toast.error(error.code)
      );
    } else {
      signInWithEmailAndPassword(auth, email, pass).catch((error) => {
        toast.error(error.code);
        if (error.code === "auth/wrong-password") {
          setİsError(true);
        }
      });
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("maili kontrol et"))
      .catch((error) => toast.error(error.code));
  };
  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider).catch((err) => toast.error(err.code));
  };
  return (
    <div className=" h-[100vh] bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded ">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/public/x-logo.png" alt="" />
        </div>

        <h1 className="text-center font-bold text-xl ">Twitter Giriş Yap</h1>

        <div
          onClick={handleGoogleSignIn}
          className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200"
        >
          <img className="h-[20px]" src={Google} alt="" />
          <p className="whitespace-nowrap">Google İle Giriş Yap</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="text-black p-2 rounded"
              type="email"
            />

            <label>Password</label>
            <input className="text-black p-2 rounded" type="password" />

            <button
              className="bg-white text-black mt-10 rounded-full p-1 font-bold"
              type="submit"
            >
              {signUp ? "Kaydol" : "Giriş Yap"}
            </button>

            <p className="text-gray-500 mt-5 text-center">
              <span>Hesabiniz Yokmu?</span>
              <button
                type="button"
                onClick={() => setSignUp(!signUp)}
                className="mx-3 text-blue-500"
              >
                {signUp ? "Giriş Yap" : "Kaydol"}
              </button>
            </p>
            {!signUp && isError && (
              <button className="text-red-500" onClick={handleReset}>
                Şifrenimi Unuttun ?
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
