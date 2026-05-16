# RookieSVN — 다중 SVN 저장소 통합 탐색기 (Web UI)

> 분산되어 있는 여러 SVN 서버의 저장소 구조를 **하나의 웹 화면에서 통합 탐색**할 수 있도록 만든 React + TypeScript 기반 프론트엔드.

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.1-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

## 📅 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| **프로젝트명** | rookiesvnclient-frontend |
| **수행 기간** | **2025-05-03 ~ 2025-05-27** |
| **유형** | 개인 학습 / 사내 SVN 통합 탐색 도구 프로토타입 |
| **포지션** | Frontend (단독 개발) |
| **버전** | 0.1.0 |

---

## 🧭 프로젝트 개요

사내에는 여러 대의 SVN 서버가 운영되고 있어, 어떤 프로젝트가 어느 서버에 있는지 매번 확인해야 하는 비효율이 존재했습니다. **RookieSVN**은 이를 해결하기 위해 만든 웹 기반 탐색기로,

- 여러 SVN 서버의 저장소를 **한 번에 조회**하고,
- 특정 디렉토리/파일이 **어느 서버에 존재하는지**를 한눈에 확인하며,
- 트리 형태로 **하위 경로를 자유롭게 드릴 다운**할 수 있도록 설계했습니다.

JWT 기반 인증으로 백엔드 API와 통신하며, 사이드바 UI를 통해 작업 흐름을 끊지 않는 탐색 경험을 제공합니다.

---

## ✨ 구현 범위

### 🔐 인증
- 아이디/비밀번호 기반 로그인
- 발급된 **JWT 토큰을 `localStorage`에 보관**, Axios 요청 시 `Authorization: Bearer` 헤더로 자동 첨부
- 라우팅 단위 페이지 분리 (`/` 로그인, `/main` 탐색)

### 🗂️ 다중 서버 통합 탐색
- 여러 SVN 서버의 **최상위 디렉토리 목록을 단일 API 호출로 통합 조회**
- 서버별로 그룹화된 프로젝트 목록을 가공해 검색용 데이터로 변환
- `qs` 의 `arrayFormat: 'repeat'` 직렬화로 다중 `roots` 파라미터 전달

### 🔍 프로젝트 검색 & 다중 선택
- 전체 프로젝트를 모달에서 검색·다중 선택
- 선택된 항목을 칩(chip) UI로 표시하고 개별 해제 가능

### 📁 계층형 디렉토리 트리
- 선택한 다중 프로젝트의 하위 폴더/파일을 **머지하여 단일 트리로 표시**
- 폴더 클릭 시 하위 경로로 **드릴 다운**, "상위" 버튼으로 부모 이동
- `currentPath` 누적 관리로 임의 깊이까지 탐색

### 🧭 존재 여부 시각화 (핵심 UX)
- 동일 이름의 디렉토리/파일이 **어떤 서버에는 존재하고 어떤 서버에는 없는지**를 호버 툴팁으로 표시
- `exists project` / `not exists project` 영역으로 구분, 다중 서버 환경에서 형상 차이를 즉시 파악 가능

### 📌 사이드바 인터랙션
- **호버 노출 / 핀 고정 토글** 두 가지 모드
- 사이드바 width에 따라 메인 영역이 부드럽게 슬라이드(`cubic-bezier` 전환)

---

## 🛠️ 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| **UI 라이브러리** | React 19, React Router DOM 6 |
| **언어 / 타입** | TypeScript 4.9 (strict mode) |
| **컴포넌트 / 스타일** | MUI 7, react-bootstrap 2, Emotion, CSS Modules |
| **HTTP / 직렬화** | Axios (공통 인스턴스), qs |
| **테스트** | Jest, React Testing Library |
| **빌드** | Create React App (react-scripts 5) |

---

## 📂 디렉토리 구조

```
src/
├── api/                # HTTP 호출 레이어 (axios 인스턴스 / endpoint 함수)
│   ├── axios.ts
│   ├── authApi.ts
│   └── svnApi.ts
├── services/           # 도메인 로직 / 응답 데이터 가공
│   ├── authService.ts
│   └── svnService.ts
├── components/         # 재사용 UI 컴포넌트
│   ├── AppHeader.tsx
│   ├── Sidebar.tsx          / SidebarTabs.tsx / SidebarHeader.tsx
│   ├── ProjectLookup.tsx
│   ├── ProjectSearchModal.tsx
│   └── ProjectTree.tsx
├── pages/              # 라우트 단위 페이지
│   ├── LoginPage.tsx
│   └── MainPage.tsx
└── types/              # 도메인 타입 정의
    ├── auth.d.ts
    └── svn.d.ts
```

---

## 🏗️ 아키텍처

```
Pages   ─ 라우트 단위 화면 (Login / Main)
  │
Components ─ UI 단위 (Sidebar, Tree, Modal …)
  │
Services   ─ 도메인 로직 (응답 가공, 토큰 추출)
  │
API        ─ Axios 인스턴스 기반 endpoint 함수
  │
Backend    ─ /api/login, /api/svn/roots, /api/svn/children
```

**레이어 분리 원칙**
- `api` 는 HTTP 호출만 담당 — 응답을 그대로 반환
- `services` 는 도메인 관점의 가공 (예: 서버별 응답을 `ProjectLookupItem[]` 평탄화)
- `components` 는 props 만으로 동작하는 표현 단위, 상태는 페이지(`MainPage`)가 보유

---

## 🔌 연동 API

| Method | Endpoint | 설명 |
| --- | --- | --- |
| `POST` | `/api/login` | 로그인 후 JWT 발급 |
| `GET`  | `/api/svn/roots` | 모든 서버의 최상위 저장소 목록 |
| `GET`  | `/api/svn/children?roots=&path=` | 다중 서버/경로 기준 하위 항목 머지 조회 |

> SVN API는 `Authorization: Bearer <token>` 헤더가 필요합니다.

---

## 🚀 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (.env)
REACT_APP_API_BASE_URL=http://localhost:8080

# 3. 개발 서버
npm start          # http://localhost:3000

# 4. 빌드 / 테스트
npm run build
npm test
```

---

## 💡 주요 작업 포인트 (회고)

- **레이어 책임 분리** — `api / services / components / pages` 4계층으로 나누어, HTTP 변경이나 응답 스키마 변경이 UI에 직접 닿지 않도록 설계.
- **다중 서버 응답 머지 전략** — `roots` 별 children 을 `Map<rootPath, items>` 로 보관하면서도, UI 표시는 단일 머지 트리로 단순화하여 사용자의 인지 부하를 줄임.
- **다중 파라미터 직렬화 이슈 해결** — `roots=A&roots=B` 형식 전송을 위해 `qs` 의 `repeat` 포맷 적용.
- **TypeScript strict 모드 유지** — `tsconfig` 의 `strict: true` 하에서 타입 정의(`types/*.d.ts`) 분리로 API 응답 안전성 확보.

---

## 📜 작업 이력

| 일자 | 내용 |
| --- | --- |
| 2025-05-03 | CRA 기반 프로젝트 초기화, TypeScript 환경 구성 |
| 2025-05-10 | 라우팅 / 로그인 / 메인 페이지 기본 골격, 인증 흐름 구축 |
| 2025-05-27 | 다중 서버 루트 조회 API 연동, 프로젝트 검색 모달, 계층형 탐색 트리, 존재 여부 툴팁 UX 구현 |
