# Florography Web

**꽃과 함께하는 감정 표현 플랫폼** - React 웹 프론트엔드

## 📋 개요

Florography Web은 **꽃을 통해 감정을 표현하고 공유하는 플랫폼**의 프론트엔드 애플리케이션입니다. 사용자는 감정을 담은 편지를 작성하고, 꽃 정보를 조회하며, 자신의 정원을 관리할 수 있습니다.

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| **UI 프레임워크** | React 19.2.7 |
| **번들러** | Vite 8.1.0 |
| **라우팅** | React Router 8.0.1 |
| **상태 관리** | Zustand 5.0.14 |
| **서버 상태** | TanStack Query (React Query) 5.101.1 |
| **HTTP 클라이언트** | Axios 1.18.1 |
| **스타일링** | Emotion 11.14.0 |
| **린팅** | ESLint 10.5.0 |
| **노드 버전** | 18.x 이상 권장 |

## 📁 프로젝트 구조

```
src/
├── api/                    # API 호출 함수
│   ├── auth.js            # 인증 관련 API
│   ├── letters.js         # 편지 API
│   ├── gardens.js         # 정원 API
│   ├── flowers.js         # 꽃 정보 API
│   ├── board.js           # 게시판 API
│   └── client.js          # Axios 인스턴스
│
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header/           # 헤더 네비게이션
│   └── SideBar/          # 사이드바
│       ├── LeftBar/      # 좌측 네비게이션
│       └── RightBar/     # 우측 사이드바
│
├── pages/                # 라우트 단위 페이지
│   ├── HomePage/         # 홈페이지
│   ├── Login/            # 로그인 페이지
│   ├── CallbackPage/     # OAuth2 콜백 페이지
│   ├── HeartLetterPage/  # 편지 조회 페이지
│   ├── HeartLetterWritePage/ # 편지 작성 페이지
│   ├── Garden/           # 정원 관리 페이지
│   ├── FlowerDirectoryPage/ # 꽃 정보 조회 페이지
│   ├── SeedRecordPage/   # 씨드 기록 페이지
│   ├── ShareBoardPage/   # 공유 게시판
│   ├── MyPage/           # 마이페이지
│   └── Information/      # 정보 페이지
│
├── hooks/                # 커스텀 React 훅
│   ├── queries/         # TanStack Query 쿼리 훅
│   └── mutations/       # TanStack Query 뮤테이션 훅
│
├── stores/              # Zustand 전역 상태
│   ├── authStore.js     # 인증 상태
│   └── uiStore.js       # UI 상태
│
├── utils/               # 유틸리티 함수
│   ├── storage.js       # 로컬스토리지 관리
│   ├── token.js         # 토큰 관리
│   └── helpers.js       # 기타 헬퍼 함수
│
├── App.jsx             # 라우터 설정 및 레이아웃
├── main.jsx            # 엔트리 포인트
└── index.css           # 글로벌 스타일

public/                 # 정적 파일
docs/                   # 문서
```

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 프로젝트 클론
git clone <repository-url>
cd florography-web

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:5173 (기본 포트)
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### 린팅

```bash
# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint -- --fix
```

## 📚 주요 기능

### 1. **사용자 인증 (Authentication)**
- 회원가입 / 로그인
- OAuth2 소셜 로그인 (Google, Kakao, Naver)
- 자동 로그인 (토큰 기반)
- 로그아웃

### 2. **감정 편지 작성 (Heart Letter)**
- 감정을 담은 편지 작성
- 편지 목록 조회
- 편지 상세 조회
- 편지 수정 / 삭제
- 편지에 댓글 달기
- 편지 공유 기능

### 3. **정원 관리 (Garden)**
- 개인 정원 생성 및 관리
- 정원에 꽃 심기
- 정원 상태 실시간 조회
- 꽃의 성장 과정 확인

### 4. **꽃 정보 조회 (Flower Dictionary)**
- 다양한 꽃의 정보 검색
- 꽃별 의미 및 특징 조회
- 계절별 꽃 정보
- 꽃 추천 기능

### 5. **씨드 기록 (Seed Record)**
- 씨앗 심기 기록
- 성장 과정 기록 및 사진 업로드
- 기록 조회 및 수정

### 6. **커뮤니티 (Share Board)**
- 사용자 간 정보 공유 게시판
- 게시글 작성 / 수정 / 삭제
- 댓글 기능
- 좋아요 기능

### 7. **마이페이지 (MyPage)**
- 프로필 관리
- 나의 편지 목록
- 나의 정원 관리
- 활동 내역 조회

## 🔐 보안 기능

- **JWT 토큰**: Authorization Bearer 토큰 사용
- **토큰 갱신**: Refresh Token으로 자동 갱신
- **로컬스토리지 보안**: 민감한 정보는 메모리에만 저장
- **CORS**: 백엔드에서 관리

## ⚙️ 환경 설정

### .env 파일 생성

프로젝트 루트에 `.env` 파일 생성:

```env
# API 서버 주소
VITE_API_BASE_URL=http://localhost:8080/api

# OAuth2 클라이언트 ID (필요시)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
```

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
  })],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
```

## 📖 코딩 컨벤션

### 파일 및 폴더 명명

- **컴포넌트 파일**: PascalCase (예: `LoginForm.jsx`)
- **훅/유틸리티**: camelCase (예: `useAuth.js`)
- **폴더**: camelCase (예: `heartLetterPage`)

### 컴포넌트 작성

```jsx
// MyComponent.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState('');
  
  const { data, isLoading } = useQuery({
    queryKey: ['myData'],
    queryFn: () => fetchData(),
  });

  return (
    <div css={containerStyle}>
      {/* JSX */}
    </div>
  );
};

const containerStyle = css`
  padding: 20px;
  color: #333;
`;

export default MyComponent;
```

### API 호출

```jsx
// src/api/letters.js
import client from './client';

export const fetchLetters = async () => {
  const response = await client.get('/letters');
  return response.data;
};

export const createLetter = async (letterData) => {
  const response = await client.post('/letters', letterData);
  return response.data;
};

// 컴포넌트에서 사용
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchLetters, createLetter } from '../api/letters';

const { data } = useQuery({
  queryKey: ['letters'],
  queryFn: fetchLetters,
});

const mutation = useMutation({
  mutationFn: createLetter,
  onSuccess: () => {
    // 성공 처리
  },
});
```

### 상태 관리

```javascript
// src/stores/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));

// 컴포넌트에서 사용
import { useAuthStore } from '../stores/authStore';

const MyComponent = () => {
  const { user, logout } = useAuthStore();
  
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};
```

## 🔄 라우팅

React Router v8을 사용한 라우팅:

```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 다른 라우트 */}
      </Routes>
    </Router>
  );
}
```

## 📱 반응형 디자인

Emotion을 사용한 반응형 스타일:

```javascript
const containerStyle = css`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
  }
`;
```

## 🧪 테스트

```bash
# 테스트 실행 (설정시)
npm run test

# 테스트 커버리지
npm run test:coverage
```

## 🚀 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### GitHub Pages 배포

```bash
# package.json 수정
{
  "homepage": "https://yourusername.github.io/florography-web"
}

# 빌드 및 배포
npm run build
npx gh-pages -d dist
```

## 💡 성능 최적화

- **코드 분할**: React.lazy와 Suspense 사용
- **이미지 최적화**: webp 포맷 사용
- **번들 크기 분석**: `npm run build -- --visualize`
- **TanStack Query**: 서버 상태 캐싱

## 🐛 주요 이슈 및 해결

### CORS 오류
```
백엔드 .env 설정에서 CORS_ALLOWED_ORIGINS에 프론트엔드 URL 추가
```

### 토큰 만료 이슈
```javascript
// api/client.js에서 Axios 인터셉터 설정
client.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      // 토큰 갱신 로직
    }
  }
);
```

### 로컬스토리지 권한 오류
```javascript
// private 윈도우/시크레 탭에서 로컬스토리지 사용 불가
try {
  localStorage.setItem('key', 'value');
} catch (e) {
  // 메모리 스토리지 사용
}
```

## 📚 추가 문서

- [API 명세서](./docs/API-CONTRACT.md)
- [웹 API 문서](./docs/web_api_document.md)
- [프로젝트 트러블슈팅](../Florography_프로젝트_트러블슈팅_상세.md)

## 👥 기여 가이드

### 브랜치 전략

```bash
# 기능 추가
git checkout -b feature/new-feature

# 버그 수정
git checkout -b fix/bug-fix

# 문서 업데이트
git checkout -b docs/update-readme
```

### 커밋 메시지

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드, 패키지 관리 등
```

### Pull Request

1. 자신의 브랜치에서 코드 작성
2. `npm run lint` 및 `npm run build` 통과 확인
3. PR 생성 및 리뷰 요청
4. 리뷰어 승인 후 main에 머지

## 🆘 Help & Support

문제가 발생하면:

1. [GitHub Issues](./issues)에서 같은 문제 검색
2. 새로운 이슈 생성 (재현 단계 포함)
3. 기술 문서 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**마지막 업데이트**: 2026-07-20

**개발팀**: Florography Team
