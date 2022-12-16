import Post from "../../share/Post";
import Footer from "../../share/Footer";
import { HeaderFeed } from "../../share/HeaderBind";

const Home = () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="page">
      <HeaderFeed />
      <main>
        {data.map((item) => (
          <Post key={item.id} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
