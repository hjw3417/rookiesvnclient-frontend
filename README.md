# RookieSVN Client - Frontend

> 다중 SVN 서버를 웹 브라우저에서 통합 탐색할 수 있는 SVN 클라이언트 프론트엔드 애플리케이션

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.1-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

## 📅 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| **프로젝트명** | rookiesvnclient-frontend |
| **수행 기간** | **2025-05-03 ~ 2025-05-27** |
| **최초 커밋** | 2025-05-03 (Create React App 초기화) |
| **최종 커밋** | 2025-05-27 (서버 디렉토리/로그 조회 API 연동) |
| **버전** | 0.1.0 |

---

## 📖 프로젝트 소개

**RookieSVN**은 여러 SVN 서버(예: 33번/34번 서버)에 분산되어 있는 저장소의 디렉토리 구조와 로그를 웹 환경에서 통합적으로 조회할 수 있도록 만든 SVN 클라이언트 프론트엔드입니다.

JWT 기반 로그인 인증을 통해 백엔드 API와 통신하며, 다중 서버의 최상위 디렉토리 목록을 한 번에 불러와 사용자가 원하는 프로젝트를 선택/탐색할 수 있도록 지원합니다.

---

## ✨ 주요 기능

- 🔐 **JWT 기반 사용자 인증** — 로그인 후 발급된 토큰을 `localStorage`에 보관하여 API 호출에 자동 첨부
- 🗂️ **다중 SVN 서버 통합 탐색** — 여러 SVN 서버의 최상위 디렉토리를 한 화면에서 조회
- 🔍 **프로젝트 검색 / 선택 모달** — 서버별 프로젝트 목록을 검색하고 다중 선택 가능
- 📁 **계층형 디렉토리/파일 탐색** — 선택한 프로젝트의 하위 폴더로 드릴 다운, 상위 폴더 이동 지원
- 🧭 **프로젝트 존재 여부 툴팁** — 동일 경로가 어떤 서버에 존재/미존재 하는지 시각적으로 표시
- 📜 **사이트 기준 로그 조회** — 선택한 서버 기준의 SVN 로그 조회 기능
- 📌 **고정 가능한 사이드바** — 호버/핀 토글로 작업 흐름에 맞게 사이드바 노출 제어

---

## 🛠️ 기술 스택

### Core
- **React** `19.1.0` — UI 라이브러리
- **TypeScript** `4.9` — 정적 타입 시스템
- **React Router DOM** `6.30` — SPA 라우팅 (`/` 로그인, `/main` 메인)

### UI / 스타일링
- **MUI (Material UI)** `7.1` — 아이콘 및 컴포넌트
- **@emotion/react`, `@emotion/styled`** — CSS-in-JS
- **Bootstrap** `5.3` + **react-bootstrap** `2.10` — 모달, 버튼, 툴팁 등

### 네트워킹
- **Axios** `1.9` — HTTP 클라이언트 (공통 인스턴스로 baseURL 관리)
- **qs** `6.14` — 쿼리스트링 직렬화 (배열 파라미터 `repeat` 포맷)

### 테스트
- **Testing Library** (`@testing-library/react`, `jest-dom`, `user-event`)

---

## 📂 디렉토리 구조

```
rookiesvnclient-frontend/
├── public/                     # 정적 리소스 (favicon, manifest 등)
├── src/
│   ├── api/                    # 백엔드 API 호출 레이어
│   │   ├── axios.ts            #   - Axios 공통 인스턴스
│   │   ├── authApi.ts          #   - 로그인 API
│   │   └── svnApi.ts           #   - SVN 루트 / 하위 디렉토리 API
│   ├── services/               # 비즈니스 로직 / 데이터 가공 레이어
│   │   ├── authService.ts      #   - 로그인 처리 (토큰 추출)
│   │   └── svnService.ts       #   - 프로젝트 lookup 리스트 가공
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── AppHeader.tsx       #   - 상단 헤더
│   │   ├── Sidebar.tsx         #   - 사이드바 본체
│   │   ├── SidebarTabs.tsx     #   - 사이드바 탭
│   │   ├── SidebarHeader.tsx   #   - 사이드바 헤더
│   │   ├── ProjectLookup.tsx   #   - 프로젝트 검색 영역
│   │   ├── ProjectSearchModal.tsx  # - 프로젝트 선택 모달
│   │   └── ProjectTree.tsx     #   - 디렉토리/파일 트리
│   ├── pages/                  # 라우트 단위 페이지
│   │   ├── LoginPage.tsx       #   - 로그인 페이지
│   │   └── MainPage.tsx        #   - 메인(탐색) 페이지
│   ├── types/                  # 타입 정의 (.d.ts)
│   │   ├── auth.d.ts
│   │   └── svn.d.ts
│   ├── App.tsx                 # 라우터 설정
│   └── index.tsx               # 엔트리 포인트
├── .env                        # 환경변수 (API base URL)
├── tsconfig.json
└── package.json
```

---

## 🏗️ 아키텍처 레이어

```
┌────────────────────────────────────────────────────┐
│  Pages (LoginPage, MainPage)                       │  ← 라우팅 단위
├────────────────────────────────────────────────────┤
│  Components (Sidebar, ProjectTree, Modal ...)      │  ← UI 단위
├────────────────────────────────────────────────────┤
│  Services (authService, svnService)                │  ← 도메인 로직
├────────────────────────────────────────────────────┤
│  API (authApi, svnApi)                             │  ← HTTP 호출
├────────────────────────────────────────────────────┤
│  Axios Instance (baseURL = REACT_APP_API_BASE_URL) │
└────────────────────────────────────────────────────┘
                       ↕
                  Backend Server
```

---

## 🔌 주요 API 엔드포인트

| Method | Endpoint | 설명 |
| --- | --- | --- |
| `POST` | `/api/login` | 로그인 (JWT 발급) |
| `GET`  | `/api/svn/roots` | 모든 SVN 서버의 최상위 디렉토리 조회 |
| `GET`  | `/api/svn/children?roots=&path=` | 선택 서버/경로의 하위 폴더·파일 병합 조회 |

> 모든 SVN API는 `Authorization: Bearer <token>` 헤더가 필요합니다.

---

## 🚀 시작하기

### 1. 사전 요구사항
- Node.js (LTS 권장)
- npm

### 2. 설치
```bash
npm install
```

### 3. 환경변수 설정
프로젝트 루트의 `.env` 파일에서 백엔드 API 주소를 설정합니다.
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 4. 실행
```bash
npm start          # 개발 서버 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
```

---

## 🧩 사용 흐름

1. `/` 경로에서 **아이디 / 비밀번호로 로그인**
2. JWT 토큰이 `localStorage`에 저장되고 `/main` 으로 이동
3. 사이드바의 **"프로젝트 검색"** 버튼 클릭 → 다중 SVN 서버의 프로젝트 목록 조회
4. 원하는 프로젝트(들)를 선택 후 확인
5. 프로젝트 트리에서 **폴더 클릭 → 하위로 이동**, **"상위" 버튼 → 부모로 이동**
6. 폴더/파일 호버 시 **어떤 서버에 존재하는지 툴팁으로 확인**

---

## 📝 커밋 히스토리 요약

| 일자 | 내용 |
| --- | --- |
| 2025-05-03 | Create React App 으로 프로젝트 초기화 |
| 2025-05-10 | 초기 커밋 (기본 구조 / 로그인 / 메인 페이지 골격 구축) |
| 2025-05-27 | 33·34번 서버의 최상위 디렉토리 조회 API 구현, 폴더 기반 하위 탐색 (재귀 가능) 및 사이트 기준 로그 조회 기능 추가 |

---

## 📌 참고

- 본 프로젝트는 [Create React App](https://github.com/facebook/create-react-app) 기반으로 부트스트랩되었습니다.
- 백엔드 서버는 별도의 SVN 통합 백엔드 애플리케이션을 통해 제공됩니다.
