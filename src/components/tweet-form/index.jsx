import React from "react";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import dProfile from "../../assets/defalut.png";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
const TweetForm = () => {
  //kolleksiyonun referansını alma
  const tweetsCol = collection(db, "tweets");

  const uploadImage = async (image) => {
    if (!image) return null;

    console.log(image);
    //storagede dosya yer ayarlama

    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);
    //dosyayı yükleme
    const url = await uploadBytes(storageRef, image).then((res) =>
      getDownloadURL(res.ref)
    );
    // fonksiyonun çağırıldığı yere url gönderme
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    if (!textContent && !imageContent) {
      toast.error("tweet ekle");
      return;
    }

    const url = await uploadImage(imageContent);
    //kolleksiyona döküman ekler
    addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        picture: auth.currentUser.photoURL
          ? auth.currentUser.photoURL
          : dProfile,
      },
      likes: [],
    });
    //input temizleme
    e.target[0].value = "";
    e.target[1].value = null;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 p-2 border-b-2 border-gray-400"
    >
      <img
        className="h-[55px] rounded-full"
        src={auth?.currentUser?.photoURL ? auth.currentUser.photoURL : dProfile}
        alt=""
      />
      <div className="w-full">
        <input
          className="w-full outline-none my-2 bg-backdrop placeholder: text-2xl"
          placeholder="Tweet.."
          type="text"
        />
        <div className="flex items-center justify-between">
          <div className="hover:bg-gray-400 text-2xl cursor-pointer p-3 rounded-full">
            <label className="cursor-pointer" htmlFor="file-input">
              <BsCardImage />
            </label>
            <input id="file-input" className="hidden" type="file" />
          </div>
          <button className="bg-birdcolor rounded-full p-3 text-2xl">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
