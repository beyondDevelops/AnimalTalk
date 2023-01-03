# <span id="top"> 🐱 애니멀톡</span>

<!-- 추후 수정 필요 -->

[🔗 배포 URL](https://strawberry-market.vercel.app/)

## 개요

- 🏫 멋쟁이사자처럼 프론트엔드스쿨 3기 팀 프로젝트로 진행한 애니멀톡입니다.
- 🐱 애니멀톡 서비스는 참여하고 싶은 반려동물 모임(산책, 미용 등)을 등록하여 소통할 수 있는 SNS입니다. 오직 동물 관련된 모임만 업로드할 수 있습니다.
- ✉️ 모임을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다.
- 📝 글과 사진을 함께 게시물로 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다.
- 💕 피드를 구경하다가 마음에 드는 게시물을 발견했다면 좋아요를 누를 수 있고 댓글을 남기거나 공유할 수도 있습니다.

## 팀원 구성

|                                                                 이지형                                                                  |                                                                   이재영                                                                   |                                                                 정수현                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|                          <img src="https://avatars.githubusercontent.com/u/90930391?v=4" height=150 width=150>                          |                           <img src="https://avatars.githubusercontent.com/u/103429329?v=4" height=150 width=150>                           |                          <img src="https://avatars.githubusercontent.com/u/68059880?v=4" height=150 width=150>                          |
| <a href="https://github.com/July249"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> | <a href="https://github.com/GreattitJY"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> | <a href="https://github.com/IntHyun"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> |

<details>
<summary>목차</summary>

1. [프로젝트 목표](#goal)
2. [개발 환경 및 배포 URL](#dev)
3. [프로젝트 구조](#tree)
4. [역할 분담](#role)
5. [개발 기간 및 이슈 관리](#task)
6. [UI](#ui)
7. [페이지 기능](#pages)
8. [개발하며 겪은 이슈](#issues)

</details>

---

## <span id="goal">1. 프로젝트 목표</span>

- React와 TailwindCSS의 결합을 통해 마크업과 디자인 시간 단축을 고려합니다.
- 라우팅과 상태관리 및 비동기 통신을 이해하며 프로젝트를 진행합니다.
- React Hook에 대한 동작 원리와 구현 과정을 이해하며 프로젝트를 진행합니다.
- 사용자의 웹 접근성을 고려하여 시맨틱하게 개발합니다.
- 컴포넌트 분리를 통한 재활용성 향상을 지향합니다.
- 적극적인 코드리뷰를 통해 서로의 정보를 공유하고, 직접 코드를 설명하는 시간을 가져봅니다.

<p align="right"><a href="#top">(Top)</a></p>

## <span id="dev">2. 개발 환경 및 배포 URL</span>

### 개발 환경

- Front : React, TailwindCSS
- Back : 제공된 API 사용
- 버전 관리 및 이슈 : 🔗[GitHub](https://github.com/beyondDevelops/AnimalTalk), 🔗[GitHub Issues](https://github.com/beyondDevelops/AnimalTalk/issues), 🔗[GitHub Project](https://github.com/orgs/beyondDevelops/projects/3)
- 서비스 배포 환경 : [🔗 GitHub](https://github.com/)

### 배포 URL

URL : 🔗 https://

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>

- public/assets/ : 이미지, svg 등
- src/api/ : axios API 관리
- src/components/ : 단일 페이지의 하위 요소로 들어가는 컴포넌트
- src/context/ : 사용자 정보 등 상태관리
- src/hooks/ : 컴포넌트에서 사용되는 훅 관리
- src/pages/ : 화면에 렌더링 되는 컴포넌트
- src/share/ : 페이지에서 공통적으로 쓰이는 컴포넌트

```bash
AnimalTalk
│
├─public
│  └─assets
│      ├─img
│      └─index.html
│
└─src
   ├─api
   │  └─axios.jsx
   │
   ├─components
   │  ├─ChatDummyData
   │  ├─ChatModule
   │  ├─CheckAuth
   │  ├─ModalModule
   │  ├─NoFeed
   │  ├─PostTypeSelectBar
   │  ├─SimpleClub
   │  └─Textarea
   │
   ├─context
   │  └─UserContext.jsx
   │
   ├─hooks
   │  └─useIntersect.jsx
   │
   ├─pages
   │  ├─ChatList
   │  ├─ChatRoom
   │  ├─ClubUpload
   │  ├─EditProfile
   │  ├─Follows
   │  ├─Home
   │  ├─LoginEmail
   │  ├─LoginHome
   │  ├─NotFound
   │  ├─PostDetail
   │  ├─PostUpload
   │  ├─SignUp
   │  ├─SignupProfile
   │  ├─SplashScreen
   │  ├─UserFeed
   │  └─UserSearch
   │
   ├─shared
   │   ├─Footer
   │   ├─Header
   │   ├─Post
   │   ├─Profile
   │   ├─SimpleUserList
   │   └─UserClub
   │
   ├─App.jsx
   ├─index.css
   └─index.js
```

<p align="right"><a href="#top">(Top)</a></p>

## <span id="role">4. 역할 분담</span>

- 프로젝트를 진행하며 API 비교적 중요하다 생각되는 로그인, 회원가입 페이지를 공통으로 진행하였습니다.

### 🛠 공통 담당

- 라우팅, 로그인 API, 헤더 부분,

### 🙋‍♀️ 이지형

- 🔗[github/July249](https://github.com/July249)
- 홈, 검색 페이지, 팔로우 페이지, 사용자 피드 페이지 등

### 🙋🏼‍♀️ 이재영

- 🔗[github/GreattitJY)](https://github.com/GreattitJY)
- 게시글 페이지, 모임 페이지, 채팅 페이지, 푸터, 유저 프로필, 댓글 및 좋아요 기능 등

### 🙋🏻‍♀️ 정수현

- 🔗[github/IntHyun](https://github.com/IntHyun)
- 회원가입 기능 및 페이지, 회원정보 수정 기능 및 페이지, 모달 컴포넌트, 채팅 목록 페이지 등

<p align="right"><a href="#top">(Top)</a></p>

## <span id="task">5. 개발 기간 및 작업 관리</span>

- 전체 개발 기간 : 2022-12-09 ~ 2023-01-06

### 작업 관리

- 🔗[GitHub Projects](https://github.com/orgs/beyondDevelops/projects/3)를 사용하여 진행도와 상황을 꾸준히 공유하였습니다.
  <img src="https://user-images.githubusercontent.com/68059880/210364564-19f5dcfa-46f0-44cf-b9e4-3352ad30b813.png">

### 주간회의

주간회의를 진행하여 작업 방향이나 코드 고민에 대해 나누었고 GitHub Wiki를 사용하여 기록하였습니다.

- 🔗[221125 회의록 1회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221125-%ED%9A%8C%EC%9D%98%EB%A1%9D-1%ED%9A%8C%EC%B0%A8)
- 🔗[221127 회의록 2회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221127-%ED%9A%8C%EC%9D%98%EB%A1%9D-2%ED%9A%8C%EC%B0%A8)
- 🔗[221130 회의록 3회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221130-%ED%9A%8C%EC%9D%98%EB%A1%9D--3%ED%9A%8C%EC%B0%A8)
- 🔗[221207 회의록 4회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221207-%ED%9A%8C%EC%9D%98%EB%A1%9D-4%ED%9A%8C%EC%B0%A8)
- 🔗[221209 회의록 5회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221209-%ED%9A%8C%EC%9D%98%EB%A1%9D-5%ED%9A%8C%EC%B0%A8)
- 🔗[220103 회의록 6회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221212-%ED%9A%8C%EC%9D%98%EB%A1%9D-6%ED%9A%8C%EC%B0%A8)
- 🔗[211228 회의록 7회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221220-%ED%9A%8C%EC%9D%98%EB%A1%9D-7%ED%9A%8C%EC%B0%A8)
- 🔗[221222 회의록 8회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221222-%ED%9A%8C%EC%9D%98%EB%A1%9D-8%ED%9A%8C%EC%B0%A8)
- 🔗[221229 회의록 9회차](https://github.com/beyondDevelops/AnimalTalk/wiki/221229-%ED%9A%8C%EC%9D%98%EB%A1%9D-9%ED%9A%8C%EC%B0%A8)
- 🔗[231228 회의록 10회차](https://github.com/beyondDevelops/AnimalTalk/wiki/231228-%ED%9A%8C%EC%9D%98%EB%A1%9D-10%ED%9A%8C%EC%B0%A8)

<p align="right"><a href="#top">(Top)</a></p>

## <span id="ui">6. UI</span>

<img src="https://user-images.githubusercontent.com/68059880/210367588-a936e2a1-2d58-4037-8906-973a8dee8002.png">

<p align="right"><a href="#top">(Top)</a></p>

## <span id="pages">7. 페이지 기능</span>

### 1. Login

| 🔗[splash](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#splash) | 🔗[로그인](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80) | 🔗[회원가입](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8E%98%EC%9D%B4%EC%A7%80) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                 짤                                                                                 |                                                                                                         짤                                                                                                          |                                                                                                               짤                                                                                                               |

### 2. Home

| 🔗[홈](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%99%88-%ED%8E%98%EC%9D%B4%EC%A7%80) | 🔗[검색](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%80%EC%83%89-%ED%8E%98%EC%9D%B4%EC%A7%80) | 🔗[채팅](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%B1%84%ED%8C%85-%ED%8E%98%EC%9D%B4%EC%A7%80) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                              짤                                                                                               |                                                                                                    짤                                                                                                    |                                                                                                    짤                                                                                                    |

### 3. 게시글

| 🔗[작성](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9E%91%EC%84%B1-%ED%8E%98%EC%9D%B4%EC%A7%80) | 🔗[상세](https://github.com/beyondDevelops/AnimalTalk/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%83%81%EC%84%B8-%ED%8E%98%EC%9D%B4%EC%A7%80) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                  짤                                                                                                                  |                                                                                                                  짤                                                                                                                  |

| 🔗[수정](링크) | 🔗[삭제](링크) |
| :------------: | :------------: |
|       짤       |       짤       |

### 4. 프로필

| 🔗[내 프로필](링크) | 🔗[유저 프로필](링크) | 🔗[팔로워](링크) |
| :-----------------: | :-------------------: | :--------------: |
|         짤          |          짤           |        짤        |

| 🔗[내 프로필](링크) | 🔗[유저 프로필](링크) | 🔗[팔로워](링크) |
| :-----------------: | :-------------------: | :--------------: |
|         짤          |          짤           |        짤        |

### 5. 좋아요 및 댓글

### 6. 모임

<p align="right"><a href="#top">(Top)</a></p>

## <span id="issues">8. 개발하며 겪은 이슈</span>

#

<p align="right"><a href="#top">(Top)</a></p>
