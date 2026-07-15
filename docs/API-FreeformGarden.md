# FreeformGarden 컴포넌트 API 문서

## 개요

`FreeformGarden` 컴포넌트는 사용자가 보유한 꽃들을 자유롭게 배치하고 관리할 수 있는 인터랙티브한 정원 캔버스입니다. 드래그 앤 드롭, 클릭 등의 제스처를 통해 꽃을 심고, 이동하고, 삭제할 수 있습니다.

**파일 경로**: `src/pages/Garden/FreeformGarden.jsx`

---

## Props

### `theme` (Object) - 필수

정원 캔버스의 스타일 테마 객체입니다.

| 속성 | 타입 | 설명 |
|------|------|------|
| `bg` | String | 정원 캔버스의 배경색 CSS 값 |
| `overlay` | String | 정원 캔버스의 오버레이 색상 CSS 값 |

**예시**:
```jsx
<FreeformGarden theme={{ bg: '#f0f8ff', overlay: 'rgba(255,255,255,0.1)' }} />
```

---

## 상태 (State)

내부적으로 관리되는 컴포넌트 상태입니다.

| 상태명 | 타입 | 설명 |
|--------|------|------|
| `flowers` | Array | 정원에 심어진 꽃들의 배열. 각 꽃 객체는 `{id, x, y, flower}` 구조 |
| `selectedFlower` | Number \| null | 현재 선택된 팔레트 꽃의 ID (클릭 모드) |
| `hint` | String | 사용자 행동에 대한 안내 메시지 (자동으로 2초 후 사라짐) |
| `drag` | Object \| null | 드래그 상태 객체. 드래그 중일 때만 값을 가짐 |

### `flowers` 배열의 객체 구조

```typescript
{
  id: string;           // 꽃의 고유 ID (형식: "f{숫자}")
  x: number;            // X 좌표 (백분율: 3~97)
  y: number;            // Y 좌표 (백분율: 5~95)
  flower: number;       // 꽃 도감의 ID (flowerDirectory의 id와 연결)
}
```

### `drag` 객체 구조

```typescript
// 팔레트에서 드래그할 때
{
  type: "palette",
  flowerId: number,
  startX: number,
  startY: number,
  clientX: number,
  clientY: number,
  pct?: { x: number; y: number }  // 캔버스 위치일 때만
}

// 정원에 심어진 꽃을 드래그할 때
{
  type: "placed",
  id: string,
  startX: number,
  startY: number,
  clientX: number,
  clientY: number,
  pct?: { x: number; y: number }  // 캔버스 위치일 때만
}
```

---

## Hooks 의존성

### `useFlowerDirectoies()`

커스텀 훅으로, 사용자가 보유한 모든 꽃의 도감 정보를 TanStack Query를 통해 관리합니다.

```jsx
const flowerDirectory = useFlowerDirectoies();
```

**반환값**:
```typescript
{
  data?: {
    body: Array<{
      id: number;           // 꽃 ID
      flowerName: string;   // 꽃 이름
      flowerImg: string;    // 꽃 이미지 경로 (API 기준)
      userFlower?: Object;  // 사용자가 보유한 경우 객체, 미보유 시 null
    }>
  },
  isLoading: boolean;
}
```

---

## 주요 함수

### `isInsideCanvas(clientX, clientY)`

**설명**: 마우스/포인터 좌표가 정원 캔버스 영역 내에 있는지 판단합니다.

**매개변수**:
- `clientX` (number): 포인터의 X 좌표
- `clientY` (number): 포인터의 Y 좌표

**반환값**: `boolean`

**예시**:
```jsx
const isInside = isInsideCanvas(event.clientX, event.clientY);
```

---

### `toPercent(clientX, clientY)`

**설명**: 포인터의 절대 좌표를 정원 캔버스 내 상대 백분율 좌표로 변환합니다. 좌표는 자동으로 경계값으로 제한됩니다.

**매개변수**:
- `clientX` (number): 포인터의 X 좌표
- `clientY` (number): 포인터의 Y 좌표

**반환값**:
```typescript
{
  x: number;  // 0~100 범위 (실제로는 3~97% 제한)
  y: number;  // 0~100 범위 (실제로는 5~95% 제한)
}
```

**예시**:
```jsx
const { x, y } = toPercent(event.clientX, event.clientY);
console.log(`꽃 위치: ${x}%, ${y}%`);
```

---

### `removeFlower(id, msg)`

**설명**: 정원에서 꽃을 제거하고 사용자에게 안내 메시지를 표시합니다.

**매개변수**:
- `id` (string): 제거할 꽃의 ID
- `msg` (string): 표시할 안내 메시지

**반환값**: 없음

**예시**:
```jsx
removeFlower('f1', '꽃을 치웠어요');
```

---

### `pickFlower(id)`

**설명**: 팔레트에서 꽃을 선택/해제합니다 (토글 방식). 선택된 꽃은 정원 캔버스를 클릭하여 심을 수 있습니다.

**매개변수**:
- `id` (number): 꽃의 ID

**반환값**: 없음

**예시**:
```jsx
pickFlower(5);  // ID 5번 꽃 선택
pickFlower(5);  // 다시 실행하면 선택 해제
```

---

### `showHint(msg)`

**설명**: 사용자에게 일시적인 안내 메시지를 표시합니다. 메시지는 자동으로 2초 후에 사라집니다.

**매개변수**:
- `msg` (string): 표시할 메시지

**반환값**: 없음

**예시**:
```jsx
showHint('65%, 42%로 옮겼어요');
```

---

### `startDragPlaced(id)`

**설명**: 정원에 심어진 꽃의 드래그를 시작합니다.

**매개변수**:
- `id` (string): 드래그할 꽃의 ID

**반환값**: 포인터 다운 이벤트 핸들러 함수

**사용 방식**:
```jsx
onPointerDown={startDragPlaced('f1')}
```

---

### `startDragPalette(flowerId)`

**설명**: 팔레트에서 꽃의 드래그를 시작합니다.

**매개변수**:
- `flowerId` (number): 드래그할 꽃의 도감 ID

**반환값**: 포인터 다운 이벤트 핸들러 함수

**사용 방식**:
```jsx
onPointerDown={startDragPalette(5)}
```

---

### `handleCanvasClick(e)`

**설명**: 정원 캔버스를 직접 클릭하여 선택한 꽃을 심습니다.

**사용 조건**:
- `selectedFlower`가 null이 아닐 때만 작동
- 클릭 대상이 캔버스 자신일 때만 작동

**반환값**: 없음

**사용 방식**:
```jsx
onClick={handleCanvasClick}
```

---

## 서브 컴포넌트

### `FlowerBloom`

**설명**: 개별 꽃 UI를 렌더링합니다. 이미지와 줄기 옵션을 포함합니다.

**Props**:
| 속성 | 타입 | 설명 |
|------|------|------|
| `img` | String | 꽃 이미지의 URL |
| `name` | String | 꽃의 이름 (alt 텍스트) |
| `size` | Number | 꽃 이미지의 크기 (px) |
| `withStem` | Boolean | 줄기 표시 여부 |

**예시**:
```jsx
<FlowerBloom 
  img="http://localhost:8080/images/rose.png"
  name="장미"
  size={56}
  withStem={true}
/>
```

---

## 인터랙션 가이드

### 1. 정원 캔버스에서의 꽃 관리

#### 팔레트에서 드래그하여 심기
1. 팔레트의 꽃을 누르고 드래그
2. 정원 캔버스 위로 드래그
3. 원하는 위치에서 마우스 버튼 해제
4. 꽃이 그 위치에 심어짐

#### 심어진 꽃 이동
1. 정원의 꽃을 누르고 드래그
2. 정원 내 새로운 위치로 드래그
3. 마우스 버튼 해제 시 새로운 위치에 이동

#### 심어진 꽃 삭제
1. 정원의 꽃을 조금만 드래그 (클릭으로 인식, 거리 < 6px)
2. 마우스 버튼 해제하면 꽃이 삭제됨

또는:

1. 정원의 꽃을 드래그
2. 정원 캔버스 바깥으로 드래그 해제
3. 꽃이 삭제됨

### 2. 팔레트에서의 꽃 선택

#### 클릭 모드 활용
1. 팔레트의 꽃을 클릭 (드래그 거리 < 6px)
2. 꽃이 선택되어 하이라이트됨
3. 정원 캔버스를 클릭하여 꽃 심기
4. 다시 클릭하면 선택 해제됨

---

## 상수 정의

| 상수명 | 값 | 설명 |
|--------|-----|------|
| `CLICK_THRESHOLD` | 6 | 클릭으로 인식할 최대 드래그 거리 (픽셀) |
| `API_BASE` | `import.meta.env.VITE_API_BASE_URL` | API 서버 기본 URL (기본값: `http://localhost:8080`) |

---

## 좌표계 설명

정원 캔버스는 **백분율 기반 상대 좌표계**를 사용합니다.

- **X축**: 0% (왼쪽) ~ 100% (오른쪽)
  - 실제 제한: 3% ~ 97%
  
- **Y축**: 0% (위쪽) ~ 100% (아래쪽)
  - 실제 제한: 5% ~ 95%

이 좌표계는 반응형 캔버스에서도 일정한 위치를 유지할 수 있게 설계되었습니다.

---

## 이미지 경로 처리

`flowerImgUrl` 함수는 API 서버의 상대 경로를 절대 URL로 변환합니다.

```jsx
const url = flowerImgUrl('/images/rose.png');
// 결과: 'http://localhost:8080/images/rose.png'
```

API 응답에서 받은 `flowerImg` 값(상대 경로)을 이 함수로 감싸 사용하면 이미지가 올바르게 로드됩니다.

---

## 주의사항

### 1. 꽃 ID 생성
- 정원에 심어진 꽃의 ID는 자동으로 `f{숫자}` 형식으로 생성됩니다.
- `nextFreeformId` 변수는 컴포넌트 외부에서 관리되므로, 여러 인스턴스가 동시에 존재하면 ID가 중복될 수 있습니다.
- 프로덕션 환경에서는 UUID 사용을 권장합니다.

### 2. 드래그 이벤트 추적
- 드래그 중 포인터가 캔버스 바깥으로 나가도 `window` 레벨에서 추적됩니다.
- 이를 통해 사용자가 정원 밖에서 버튼을 해제해도 정상 작동합니다.

### 3. 꽃 필터링
- 팔레트에는 **사용자가 실제로 보유한 꽃만** 표시됩니다 (`userFlower` 값이 존재하는 경우).
- 미보유 꽃은 자동으로 필터링되므로, 접근 권한 없는 꽃을 심을 수 없습니다.

### 4. 성능 최적화
- `flowers` 상태 배열이 매우 커지면 렌더링 성능이 저하될 수 있습니다.
- 필요시 가상화(virtualization) 라이브러리 추가를 고려하세요.

### 5. 메모리 누수 방지
- `hintTimer` useRef는 컴포넌트 언마운트 시 타이머가 자동으로 정리됩니다.
- 드래그 이벤트 리스너는 드래그 완료 시 자동으로 정리됩니다.

---

## 사용 예시

```jsx
import FreeformGarden from './FreeformGarden';

function GardenPage() {
  const theme = {
    bg: 'linear-gradient(135deg, #f0f8ff 0%, #fff0f5 100%)',
    overlay: 'rgba(255, 255, 255, 0.05)'
  };

  return (
    <div>
      <h1>자유로운 정원</h1>
      <FreeformGarden theme={theme} />
    </div>
  );
}

export default GardenPage;
```

---

## 브라우저 호환성

- **Pointer Events API** 사용: Chrome 55+, Firefox 59+, Safari 13+, Edge 15+
- IE11 미지원

---

## 관련 파일

- **스타일**: `src/pages/Garden/styles.js` (@emotion/react 기반)
- **훅**: `src/hooks/queries/flowerDirectory.js` (TanStack Query)
- **부모 컴포넌트**: `src/pages/Garden/GardenPage.jsx`

---

**문서 작성일**: 2026-07-12  
**컴포넌트 버전**: 1.0  
**최종 업데이트**: 2026-07-12
