import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./pages/feed";
import Auth from "./pages/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
function App() {
  const navigate = useNavigate();
  const [img, setİmage] = useState(null);
  //kullanıcının oturumunu izleme
  useEffect(() => {
    //kullanıcı varsa anasayfaya değilse login sayfasına yönlendirir
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Feed />} />
    </Routes>
  );
}

export default App;
