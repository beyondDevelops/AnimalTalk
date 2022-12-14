import Post from "../../share/Post";
import Footer from "../../share/Footer";

const Home = () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="page flex flex-col justify-between">
      <main className="w-[390px] overflow-hidden overflow-y-auto">
        {data.map((item) => (
          <Post key={item.id} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
