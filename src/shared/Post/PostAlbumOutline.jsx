import { v4 as uuidv4 } from "uuid";
import PostAlbum from "./PostAlbum";

export const PostAlbumOutline = ({ results }) => {
  return (
    <section className="sm:grid sm:grid-cols-3 sm:gap-[0.8rem] my-[1.6rem] mx-[2rem]">
      <h2 className="ir">앨범형</h2>
      {results.map((result) => {
        return result.map((post) => <PostAlbum key={post.id + uuidv4()} post={post} />);
      })}
    </section>
  );
};
