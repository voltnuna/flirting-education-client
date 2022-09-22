# CHATTER BOX👾👽🤖
## Welcome to Electron-Chatterbox👋🏻

<img src="https://img.shields.io/badge/npm-EF9421?style=for-the-badge&logo=Npm&logoColor=white"> <img src="https://img.shields.io/badge/React-1D1D1D?style=for-the-badge&logo=React&logoColor=#0371B5"> <img src="https://img.shields.io/badge/ReactQuery-9D1620?style=for-the-badge&logo=ReactQuery&logoColor=white"> <img src="https://img.shields.io/badge/Electron-002050?style=for-the-badge&logo=Electron&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-FFFFFF?style=for-the-badge&logo=Node.js&logoColor=#339933">

> Note: Standard Readme is designed for open source libraries. Although it's [historically](README.md#background) made for Node and npm projects, it also applies to libraries in other languages and package managers.


## Table of Contents

_Note: This is only a navigation guide for the specification, and does not define or mandate terms for any specification-compliant documents._

- [Sections](#sections)
  - 📚 [FILE STRUCTURE](#file-structure)
  - [Banner](#banner)
  - [Badges](#badges)
  - [Short Description](#short-description)
  - [Long Description](#long-description)
  - [Table of Contents](#table-of-contents-1)
  - [Security](#security)
  - [Background](#background)
  - [Install](#install)
  - [Usage](#usage)
  - [Extra Sections](#extra-sections)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Thanks](#thanks)
  - [Contributing](#contributing)
  - [License](#license)
- [Definitions](#definitions)

## Sections


### 📚 CROSS BROWSING

- 크롬 계열

### 📚FILE STRUCTURE

```
- 📂 assets
  - 📂 font
    - 📄 NanumBarunGothicLight : font-weight 300
    - 📄 NanumBarunGothic : font-weight 400
    - 📄 NanumBarunGothicBold : font-weight 700
  - 📂 styles
    - 📄 components : ResultComponent, SearchArea 등 큼직한 부분의 스타일
    - 📄 fonts : font 셋팅
    - 📄 modal : 프로젝트 생성모달, 프로젝트 현황,
    - 📄 mui : Mui 컴포넌트 스타일 커스텀 (datepicker, modal, svg)
    - 📄 root : root 스타일
    - 📄 reset : reset
    - 📄 utils : mixin 및 기타
    - 📄 index : index
  - 📄 dummy.js : 아코디언에 뿌려질 프로젝트 정보 dummy값
  - 📄 MapPinDummy.js : 지도 위에 Pin표시를 위해 생성한 dummy값

- 📂 components
  - 📂 MapPinComponent : 비행로그기록 아이콘 컴포넌트
  - 📂 Modal
    - 📄 AnalysisStatus : 검색결과 리스트에서 상세정보 확인하는 모달창
    - 📄 CreateProject : 프로젝트 생성 모달차
  - 📂 SearchArea : 좌측 컴포넌트 영역으로, 검색 + 검색결과 + 프로젝트 생성 버튼이 포함됨
  - 📂 ResultComponent :검색결과 컴포넌트
- 📂 container
- 📂 hoolks
  - 📄 useBoolean : 모달 open, hidden을 위한 hooks
  - 📄 useInputs : input 값 handle을 위한 hook

- ✅📄 craco.config.json : path alias를 위한 설정파일
- ✅📄 jsconfig.json : js설정파일 (추가할 경로가 있을 경우 이 파일에서 셋팅한다.)
```

## 📌 Container 구조

```
  <div id="container">
    // S: 좌측 컴포넌트
    <div className={isClosed ? "searcharea-wrap closed" : "searcharea-wrap"}>
      ...
    </div>

    // 우측 상단 탐색 결과 옵션 Tool모달
    <div className={toolmd ? "toolmodal" : "toolmodal show"}>
      ...
    </div>

    // Modals..
  </div>

```

## 📌 SearchArea 구조

### SearAread에 검색영역과 결과영역이 포함됩니다.

```
  <div className="search-inputs-wrap">
    <div className="search--filter">
      ...
    </div>
  </div>

  <div className="result-wrap">
    <ResultComponent projectData={dummyProjectList} openDetailModal={openDetailModal} />
  </div>

```

## 📌 MapPinComponent

```
     <MapPinComponent key={idx} top={pin.top} left={pin.left} />;

     비행로그기록 아이콘을 위치시킬 좌표 값을 넘겨주어야 한다.
```

## 📌 AnalysisStatus Modal

```
     <MapPinComponent key={idx} top={pin.top} left={pin.left} />;

     비행로그기록 아이콘을 위치시킬 좌표 값을 넘겨주어야 한다.
```

## 📌 Hooks

### useInput 사용

```
    import useInputs from "@hooks/useInputs";
    const [value, onValue, setValue] = useInputs("초기값");

    value는 input 안에 입력된 값
    onValue input에 change event가 발생했을 때 value 값을 갱신해주는 handler
    setValue 값을 직접 변경해야할 때 사용
```

### useBoolean 사용

```
    import useBoolean from "@src/hooks/useBoolean";
    const [value, setTrue, setFalse, onToggler] = useBoolean(false);

    value는 Boolean값
    setTrue value값을 true로 변경해주는 handler
    setFalse value값을 false 변경해주는 handler
    onToggler value값을 현재 값의 반대값으로 변경해주는 handler
```

### 📚 COLOR

- #4285f4 메인 블루 (header, titlebar 등-)
- #fc674e 과실 벳지 color
- #00993e 작물 벳지 color

### 📚 FONT

- NanumbarunGothic 폰트 : 기본 폰트
- 10px 을 기준으로 rem단위 사용 ex) 15px -> 1.5rem
