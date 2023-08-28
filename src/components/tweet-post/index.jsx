import { BsThreeDots } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FiShare2 } from "react-icons/fi";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import TweetCommant from "../tweet-commant";
import moment from "moment/moment";
import "moment/locale/tr";

const TweetPost = ({ tweet }) => {
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);

  //tarih bilgisine erişme
  const date = tweet.createdAt?.toDate();

  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    setLiked(found);
  }, [tweet]);
  const handleLine = () => {
    // güncellenecek tweetin referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    // aktif kullanıcıyı tweetin likes dizisine ekleme
    updateDoc(tweetRef, {
      likes: liked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    deleteDoc(tweetRef);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-600">
      <div>
        <img className="w-14 h-14 rounded-full" src={tweet.user.picture} />
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="text-2xl">{tweet?.user?.name}</p>
            <p className="text-gray-500">@{tweet?.user?.name?.toLowerCase()}</p>
            <p>{moment(date).fromNow()}</p>
          </div>

          {
            <div onClick={handleDelete}>
              {tweet.user.id === auth.currentUser.uid && <BsThreeDots />}
            </div>
          }
        </div>
        <div className="my-4">
          <p>{tweet.textContent}</p>
          {tweet.imageContent && <img src={tweet.imageContent} />}
        </div>
        <div className="flex cursor-pointer  justify-between text-3xl">
          <div className={show ? "active" : ""}>
            {show ? (
              <TweetCommant
                tweet={tweet}
                handleChange={handleChange}
                handleClose={handleClose}
              />
            ) : (
              <BiMessageRounded onClick={handleOpen} />
            )}
          </div>

          <div className="flex items-center gap-3" onClick={handleLine}>
            {liked ? <FcLike /> : <AiOutlineHeart />}
            <span className="text-xl">{tweet.likes.length}</span>
          </div>
          <FaRetweet />
          <FiShare2 />
        </div>
      </div>
    </div>
  );
};

export default TweetPost;
