# Flirting School💕
## Welcome to Flirting School🖐😍

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
    - 📄 fonts : font 셋팅
    - 📄 modal : 프로젝트 생성모달, 프로젝트 현황,
    - 📄 root : root 스타일
    - 📄 reset : reset
    - 📄 utils : mixin 및 기타
    - 📄 index : index

- 📂 components
  - 📂 Modal
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
  </div>

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

### 📚 FONT

- NanumbarunGothic 폰트 : 기본 폰트
- 10px 을 기준으로 rem단위 사용 ex) 15px -> 1.5rem
