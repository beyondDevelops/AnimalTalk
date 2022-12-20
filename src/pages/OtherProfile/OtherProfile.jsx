import React, { useEffect, useState } from "react";
import { HeaderBasic } from "../../share/HeaderBind";
import UserProfile from "../../share/UserProfile";
import Club from "../../share/Club";
import PostTypeSelectBar from "../../components/PostTypeSelectBar/PostTypeSelectBar";
import Post from "../../share/Post";
import PostAlbum from "../../share/PostAlbum";
import Footer from "../../share/Footer";

const data = {
  post: [
    {
      id: "1",
      content:
        "안녕하세요. 1 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1664574654521-7faf33eb9086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      createdAt: "2021-12-20T06:39:39.929Z",
      updatedAt: "2021-12-20T08:39:39.929Z",
      hearted: false,
      heartCount: 1,
      commentCount: 10,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "2",
      content:
        "안녕하세요. 2 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1671395781342-fd36baf0eda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      createdAt: "2021-12-31T06:39:39.929Z",
      updatedAt: "2022-01-01T09:39:39.929Z",
      hearted: true,
      heartCount: 12,
      commentCount: 43,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "3",
      content:
        "안녕하세요. 3 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1671044508138-91281343f2f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60, https://images.unsplash.com/photo-1671372675714-dbeff989d93c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60, https://images.unsplash.com/photo-1671212041182-2657b7b950bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      createdAt: "2022-02-28T10:39:39.929Z",
      updatedAt: "",
      hearted: false,
      heartCount: 32,
      commentCount: 10,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "4",
      content:
        "안녕하세요. 4 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1671347202398-b09163f873bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60, https://plus.unsplash.com/premium_photo-1661398240310-c292420d7c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      createdAt: "2022-03-28T10:39:39.929Z",
      updatedAt: "2022-03-31T11:39:39.929Z",
      hearted: false,
      heartCount: 0,
      commentCount: 0,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "5",
      content:
        "안녕하세요. 5 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1671017926057-6e8ca6048b36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      createdAt: "2022-04-12T21:39:39.929Z",
      updatedAt: "",
      hearted: true,
      heartCount: 0,
      commentCount: 0,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "6",
      content:
        "안녕하세요. 6 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1671129823992-bd867dba6b12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      createdAt: "2022-06-19T21:39:39.929Z",
      updatedAt: "2022-09-11T21:39:39.929Z",
      hearted: false,
      heartCount: 0,
      commentCount: 0,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
    {
      id: "7",
      content:
        "안녕하세요. 7 입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugit harum et placeat libero tenetur, necessitatibus voluptas, labore deleniti accusantium maxime repellendus, sit eius exercitationem beatae corporis magni? Officia, aspernatur.",
      image:
        "https://images.unsplash.com/photo-1670843837936-1e10a67239c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60, https://images.unsplash.com/photo-1670710029361-7446b0519c9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      createdAt: "2022-08-11T14:39:39.929Z",
      updatedAt: "",
      hearted: true,
      heartCount: 10,
      commentCount: 23,
      author: {
        _id: "1209309vw12123094tv",
        username: "애월읍 위니브 감귤농장",
        accountname: "weniv_Mandarin",
        following: [],
        follower: ["follower id"],
        followerCount: 2350,
        followingCount: 128,
      },
    },
  ],
};

const OtherProfile = () => {
  const loadingImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;
  const [list, setList] = useState(true);
  const [postDataArray, setPostDataArray] = useState(null);

  useEffect(() => {
    if (!postDataArray) {
      const fetchData = async () => {
        try {
          await setPostDataArray(data.post);
        } catch (err) {}
      };
      fetchData();
    }
  }, [postDataArray]);

  const onListToggle = () => {
    setList(!list);
  };

  return (
    <div className="page">
      <HeaderBasic />
      <main>
        <UserProfile />
        <Club />
        <PostTypeSelectBar list={list} onListToggle={onListToggle} />
        <section className="">
          <h2 className="ir">유저 게시글</h2>
          {postDataArray ? (
            list ? (
              postDataArray.map((post, idx) => <Post key={post.id} post={post} />)
            ) : (
              <section className="flex flex-wrap my-[1.6rem] mx-[1.6rem]">
                {postDataArray.map((post, idx) => (
                  <PostAlbum key={post.id} post={post} idx={idx} />
                ))}
              </section>
            )
          ) : (
            <img src={loadingImg} alt="잠시만 기다려 주세요." />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OtherProfile;
