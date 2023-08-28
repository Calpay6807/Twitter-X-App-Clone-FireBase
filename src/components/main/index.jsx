import React, { useEffect, useState } from "react";
import TweetForm from "../tweet-form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import TweetPost from "../tweet-post";

const Main = () => {
  const [tweets, setTweets] = useState(null);
  // kolleksiyonun referansını alma
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    //filtreleme ayarlarını oluşturma

    const queryOptions = query(tweetCol, orderBy("createdAt", "desc"));

    onSnapshot(queryOptions, (snapshot) => {
      // tweetleri geçici olarak tuttuğumuz dizi
      const liveTweets = [];

      // dökümanların verilerini  erişip diziyi aktarma
      snapshot.forEach((doc) => liveTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(liveTweets);
    });
  }, []);
  return (
    <main className=" col-span-4 md:col-span-3 border border-gray-500">
      <header className="font-bold p-4 border-b-2 border-gray-600">
        Anasayfa
      </header>
      <TweetForm />
      {/* loading */}
      {!tweets && (
        <div className="text-center mt-[200px]">
          <p className="text-5xl">Yükleniyor...</p>
        </div>
      )}

      {/*Atilan tweetler */}
      {tweets?.map((tweet, i) => (
        <TweetPost key={i} tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
