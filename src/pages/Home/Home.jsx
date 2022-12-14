import Post from "../../share/Post";
import Footer from "../../share/Footer";

const Home = () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <div className="page flex flex-col justify-between border-[1px] border-blue-400">
      <main className="w-[390px] overflow-hidden overflow-y-auto">
        {data.map((item) => (
          <Post key={item} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
