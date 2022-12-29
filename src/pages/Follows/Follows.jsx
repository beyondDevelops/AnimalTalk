import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { HeaderFollow } from "../../shared/Header/HeaderFollow";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import Footer from "../../shared/Footer/Footer";
import { useLocation } from "react-router-dom";

const Follow = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/")[3];
  // const { isfollow, follower, following, followerCount, followingCount } = useContext(UserContext);
  // console.log(follower, following);

  return (
    <div className="page">
      <HeaderFollow title={pageName} />
      <main>
        <SimpleUserList isBtn={true} />
      </main>
      <Footer />
    </div>
  );
};

export default Follow;
