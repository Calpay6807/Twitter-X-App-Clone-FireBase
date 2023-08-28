import { AiOutlineBell, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import { RiBookmarkLine } from "react-icons/ri";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <BiHomeCircle />,
  },
  {
    title: "Bildirimler",
    icon: <AiOutlineBell />,
  },
  {
    title: "Mesajlar",
    icon: <AiOutlineUser />,
  },
  {
    title: "Profil",
    icon: <AiOutlineMail />,
  },
  {
    title: "Favoriler",
    icon: <RiBookmarkLine />,
  },
];
