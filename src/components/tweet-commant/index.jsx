import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  collection,
} from "firebase/firestore"; // Eksik olan importları ekledik

const TweetCommant = ({ handleClose }) => {
  const [msg, setMsg] = useState(false);
  const handleSub = (e) => {
    e.preventDefault();
    setDoc(doc(db, "tweets", "message"));
    const message = doc(collection(db, "tweets"));
    setDoc(message, data);
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <button
          onClick={handleClose}
          className="bg-backdrop p-4 text-center rounded-full "
        >
          X
        </button>
      </div>

      <div className="flex items-center justify-center h-full ">
        <form onSubmit={handleSub}>
          <input
            name="comment"
            className="text-black outline-none rounded"
            type="text"
          />
          <button type="submit">Yorum Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default TweetCommant;
