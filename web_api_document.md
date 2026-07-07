# Florography Web API 명세서

이 문서는 백엔드와 프론트엔드 코드를 기반으로 분석된 최신 API 목록입니다.

## 1. User (사용자 및 소셜 연동)

### 1.1 소셜 계정 연동 시작
- **URL**: `POST /api/user/link/{provider}`
- **설명**: 프론트에서 이 API를 호출하면 제공된 소셜(provider: kakao, naver 등) 로그인 인증을 위한 링크가 반환됩니다. 프론트는 이 URL로 리다이렉트하여 연동을 진행합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "linkUrl": "string (리다이렉트할 인증 URL)"
    }
  }
  ```

### 1.2 연동된 소셜 계정 목록 조회
- **URL**: `GET /api/user/linked-accounts`
- **설명**: 현재 유저가 연동한 소셜 계정 리스트를 조회합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [ ...연동된 계정 정보 객체... ]
  }
  ```

### 1.3 소셜 계정 연동 해제
- **URL**: `DELETE /api/user/link/{provider}`
- **설명**: 특정 소셜 계정의 연동을 해제합니다. (최소 1개의 소셜 계정은 남아 있어야 합니다.)
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ...처리 결과... }
  }
  ```

---

## 2. ShareBoard (공유 게시판)

### 2.1 게시글 작성
- **URL**: `POST /api/shareboard`
- **설명**: 공유 게시판에 새로운 글을 작성합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "userId": "long (유저 ID)",
    "typeId": "short (한마디, 정원 분리 코드)",
    "body": "string (내용)",
    "like": "long (좋아요 수, 초기값)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ...CreateResponse(생성된 식별자 등)... }
  }
  ```

### 2.2 전체 게시글 조회
- **URL**: `GET /api/shareboard`
- **설명**: 공유 게시판의 최신 게시글 목록을 조회합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>` (선택적)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "userId": "long",
        "typeId": "short",
        "body": "string",
        "like": "long",
        "createdAt": "LocalDateTime"
      }
    ]
  }
  ```

### 2.3 인기 게시글(랭킹) 조회
- **URL**: `GET /api/shareboard/rank`
- **설명**: 좋아요 수가 많거나 랭킹이 높은 인기 게시글 목록을 반환합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>` (선택적)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [ ...ShareBoardResponse 배열... ]
  }
  ```

---

## 3. Comment (게시판 댓글)

### 3.1 댓글 작성
- **URL**: `POST /api/shareboard/comment`
- **설명**: 특정 공유 게시판 글에 댓글을 작성합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "boardId": "long (게시글 ID)",
    "userId": "long (작성자 ID)",
    "body": "string (댓글 내용)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ...CreateResponse... }
  }
  ```

### 3.2 게시글별 댓글 조회
- **URL**: `GET /api/shareboard/comment/{boardId}`
- **설명**: 특정 게시글에 달린 댓글 목록을 조회합니다.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "boardId": "long",
        "userId": "long",
        "body": "string",
        "createdAt": "LocalDateTime"
      }
    ]
  }
  ```

---

## 4. SeedRecord (씨앗 기록)

### 4.1 씨앗 기록 생성
- **URL**: `POST /api/seedrecord`
- **설명**: 새로운 일기나 씨앗 기록을 등록합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "userId": "string",
    "sentence": "string (문장/내용)",
    "moodIdx": "int (기분 인덱스)",
    "aiComment": "string (AI 코멘트)",
    "createdDate": "LocalDate (yyyy-MM-dd)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ...CreateResponse... }
  }
  ```

### 4.2 내 씨앗 기록 전체 조회
- **URL**: `GET /api/seedrecord`
- **설명**: 로그인한 사용자의 모든 씨앗 기록(일기 등)을 조회합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [ ...SeedrecordResponse 배열... ]
  }
  ```

### 4.3 씨앗 기록 수정
- **URL**: `PUT /api/seedrecord`
- **설명**: 기존 씨앗 기록을 수정합니다.
- **Header**:
  - `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "userId": "string",
    "sentence": "string (수정할 내용)",
    "moodIdx": "int",
    "aiComment": "string",
    "createdDate": "LocalDate"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": "수정 완료"
  }
  ```
