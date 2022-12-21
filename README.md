# AnimalTalk

멋쟁이사자처럼 프로젝트 12조 애니멀톡 레포지토리입니다.

## 회의록 링크(임시)

- [회의록](https://github.com/beyondDevelops/MandarinOrangeMarket/wiki)

<br>

## 브랜치 생성 컨벤션

- `(커밋컨벤션 키워드)/issue_(이슈번호)`로 변경 (22/12/13)
  - 브랜치 생성에 있어 네이밍을 단순화 및 획일화하여 추적이 가능하다는 용이함이 있어 변경되었음

## 커밋 컨벤션

| 키워드   | 사용 시점                              |
| :------- | :------------------------------------- |
| feat     | 새로운 기능 추가                       |
| fix      | 버그 수정                              |
| docs     | 문서 수정                              |
| chore    | 세미콜론 누락 등 기능 수정이 없는 경우 |
| design   | CSS 스타일링                           |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가 |
| refactor | 코드 리팩토링                          |
| build    | 빌드 파일 수정                         |
| setting  | 패키지 매니저 수정, 개발 환경 설정 등  |
| rename   | 파일 혹은 폴더명을 수정만 한 경우      |
| remove   | 파일을 삭제한 경우                     |

<br>

## 팀원

|                                                                 이지형                                                                  |                                                                   이재영                                                                   |                                                                 정수현                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|                          <img src="https://avatars.githubusercontent.com/u/90930391?v=4" height=150 width=150>                          |                           <img src="https://avatars.githubusercontent.com/u/103429329?v=4" height=150 width=150>                           |                          <img src="https://avatars.githubusercontent.com/u/68059880?v=4" height=150 width=150>                          |
| <a href="https://github.com/July249"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> | <a href="https://github.com/GreattitJY"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> | <a href="https://github.com/IntHyun"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> |

<details>
<summary>폴더 구조</summary>
<div markdown="1">

📦src
┣ 📂components
┃ ┣ 📂ChatModule
┃ ┃ ┣ 📜ChatRoomFooter.jsx
┃ ┃ ┗ 📜UserChat.jsx
┃ ┣ 📂LoginAndSignup
┃ ┃ ┗ 📜LoginAndSignup.jsx
┃ ┣ 📂ModalModule
┃ ┃ ┣ 📜Modal.jsx
┃ ┃ ┣ 📜ModalInfo.jsx
┃ ┃ ┗ 📜ModalPostImg.jsx
┃ ┣ 📂SimpleClub
┃ ┃ ┗ 📜SimpleClub.jsx
┃ ┗ 📂Textarea
┃ ┃ ┗ 📜Textarea.jsx
┣ 📂hooks
┣ 📂pages
┃ ┣ 📂Chat
┃ ┃ ┗ 📜Chat.jsx
┃ ┣ 📂ChatRoom
┃ ┃ ┗ 📜ChatRoom.jsx
┃ ┣ 📂ClubUpload
┃ ┃ ┗ 📜ClubUpload.jsx
┃ ┣ 📂EditProfile
┃ ┃ ┗ 📜EditProfile.jsx
┃ ┣ 📂Follows
┃ ┃ ┗ 📜Follows.jsx
┃ ┣ 📂Home
┃ ┃ ┗ 📜Home.jsx
┃ ┣ 📂LoginEmail
┃ ┃ ┗ 📜LoginEmail.jsx
┃ ┣ 📂LoginHome
┃ ┃ ┗ 📜LoginHome.jsx
┃ ┣ 📂NotFound
┃ ┃ ┗ 📜NotFound.jsx
┃ ┣ 📂PostDetail
┃ ┃ ┗ 📜PostDetail.jsx
┃ ┣ 📂PostUpload
┃ ┃ ┗ 📜PostUpload.jsx
┃ ┣ 📂Search
┃ ┃ ┗ 📜Search.jsx
┃ ┣ 📂Signup
┃ ┃ ┗ 📜Signup.jsx
┃ ┣ 📂SignupProfile
┃ ┃ ┗ 📜SignupProfile.jsx
┃ ┣ 📂SplashScreen
┃ ┃ ┗ 📜SplashScreen.jsx
┃ ┗ 📂UserFeed
┃ ┃ ┣ 📜MyProfile.jsx
┃ ┃ ┗ 📜OtherProfile.jsx
┣ 📂share
┃ ┣ 📂Header
┃ ┃ ┣ 📜HeaderBasic.jsx
┃ ┃ ┣ 📜HeaderChat.jsx
┃ ┃ ┣ 📜HeaderFeed.jsx
┃ ┃ ┣ 📜HeaderSave.jsx
┃ ┃ ┗ 📜HeaderSearch.jsx
┃ ┣ 📂ProfileShare
┃ ┃ ┣ 📂ProfileSetting
┃ ┃ ┃ ┗ 📜ProfileSetting.jsx
┃ ┃ ┗ 📂UserProfile
┃ ┃ ┃ ┗ 📜UserProfile.jsx
┃ ┣ 📜Footer.jsx
┃ ┣ 📜Post.jsx
┃ ┣ 📜PostAlbum.jsx
┃ ┣ 📜PostTypeSelectBar.jsx
┃ ┣ 📜SimpleUserList.jsx
┃ ┣ 📜UserClub.jsx
┃ ┗ 📜_HeaderBind.jsx
┣ 📜App.jsx
┣ 📜index.css
┗ 📜index.js

</div>
</details>
