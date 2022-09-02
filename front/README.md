# 포트폴리오 공유 서비스 프론트엔드 코드

> 여러 유저들의 포트폴리오를 공유하는 사이트입니다.<br><br>
> 각 유저의 포트폴리오는 학력, 수상이력, 자격증, 프로젝트로 구성되어 있습니다.<br><br>
> 네트워크 페이지에서 여러 사람들의 포트폴리오늘 볼 수 있으며, 다른 사람의 포트폴리오를 보고 마음에 들면 좋아요❤️ 버튼을 누를 수 있고,<br><br>
  다른사람의 페이지를 보면 조회수가 올라갑니다. 가장 좋아요수가 높은 유저를 모달창으로 보여주어 확인이 가능합니다.<br><br>

## 실행 방법

## 1. react-srcipts start 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. src폴더는 아래와 같이 구성됩니다.

- components 폴더:

  - Header.js: 네비게이션 바입니다.<br>
  - Porfolio.js: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트입니다.<br><br>


   ✔️ 5개의 컴포넌트 폴더

  - award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들 입니다.<br>
  - certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들 입니다.<br>
  - education 폴더: 포트폴리오 중 학력 관련 컴포넌트들 입니다.<br>
  - project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들 입니다.<br>
  - user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들 입니다.<br>
  - popup 폴더: 네트워크 페이지에서 좋아요수 가장 많은 사람을 보여주는 모달창 입니다.<br><br>

  ✔️ 전체적인 로직은 아래와 같습니다.

  - 포트폴리오(Porfolio.js) 컴포넌트는 5개 컴포넌트 (Awards,certificates,educations,projects,users) 컴포넌트를 사용합니다.<br>
  - 복수형 컴포넌트(Awards,certificate,education,project,user)는 항목의 **목록**으로, 여러 개의 단수형 컴포넌트(Award,certificate,education,project,user)로 구성됩니다.<br>
  - (추가하기 버튼 클릭 시) (컴포넌트명)AddForm 컴포넌트로 구성됩니다.(ex-AwardAddForm)<br>
  - 각 컴포넌트는 **isEditing(편집버튼 클릭) 상태에 따라**, false면 (컴포넌트명)Card, true면 (컴포넌트명)EditForm이 됩니다.(ex-AwardCard,AwardEditForm)<br>
  - **isEditable**(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.<br>
  - **isAdding**이 true면 (컴포넌트명)AddForm, false면 그냥 컴포넌트들의 모음이 됩니다.<br>
  - 삭제 버튼을 누르면 삭제가 가능합니다.<br><br>

- context 폴더:

  - themeProvider.js: 다크모드,라이트모드 localStorage 저장하여 상태 저장 및 구현하는 코드가 있습니다.<br><br>

 - style 폴더:
  
   - GlobalStyles.js: 글로벌 스타일시트 코드가 있습니다.<br>
   - theme.js: 다크모드 컨텐츠 스타일시트 코드가 있습니다.<br>
   - theme.js: 다크모드 토글버튼 스타일시트 코드가 있습니다.<br><br>

- api.js:

  - axios를 사용하는 코드가 있습니다.<br><br>

- App.js:
  - SPA 라우팅 코드가 있습니다.<br><br>
 
- reducer.js:
  - 로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.


