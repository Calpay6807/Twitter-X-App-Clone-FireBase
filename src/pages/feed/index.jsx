import Nav from "../../components/nav";
import Aside from "../../components/aside";
import Main from "../../components/main";

const Feed = () => {
  return (
    <div className="bg-backdrop text-white min-h-[100vh] overflow-y-hidden">
      <div className="grid grid-cols-5">
        <Nav />
        <Main />
        <Aside />
      </div>
    </div>
  );
};

export default Feed;
