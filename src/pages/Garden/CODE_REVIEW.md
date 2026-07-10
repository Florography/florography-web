# Garden 코드 리뷰 문서 (`src/pages/Garden`)

정원 페이지는 "1번안(자유 배치)"과 "2번안(격자 배치)" 두 시안을 탭으로 비교하는 페이지입니다.
현재 팔레트에 표시할 보유 꽃 목록은 백엔드 도감 API(`useFlowerDirectoies`)를 연동하여 가져오지만, 정원 배치 상태 자체는 아직 컴포넌트 로컬 `useState`로만 관리됩니다 (`reference/florography 정원.dc.html` 참고).

## 파일 구성

| 파일 | 역할 |
|---|---|
| `GardenPage.jsx` | 페이지 셸(헤더·드로어·좌우 레일·캘린더) + 탭 상태 관리. 실제 배치 로직은 갖지 않고 하위 컴포넌트에 위임 |
| `FreeformGarden.jsx` | 1번안 — 정원 내 자유 좌표 배치, Pointer Events 기반 드래그 |
| `GridGarden.jsx` | 2번안 — 4×6 격자 배치, 네이티브 HTML5 Drag & Drop |
| `mockData.js` | 메뉴/네비/테마/꽃 목록/초기 배치 등 하드코딩 데이터 |
| `styles.js` | 위 세 컴포넌트가 공유하는 emotion `css` 정의 (헤더·드로어·레일·캔버스·팔레트·그리드 등) |

두 탭은 완전히 독립된 컴포넌트이며 상태를 공유하지 않습니다. 탭을 전환하면 `GardenPage`가 어느 쪽을 렌더링할지만 바꾸고, 각 컴포넌트는 자기 state로 배치 데이터를 들고 있습니다.

---

## 1. `mockData.js`

| export | 형태 | 설명 |
|---|---|---|
| `MENU_ITEMS` | `{icon,label,desc,href}[]` | 햄버거 드로어 메뉴. `href:null`이면 "준비 중" 토스트만 뜸 |
| `NAV_ITEMS` | `{label,href,active}[]` | 좌측 레일 네비게이션. `active:true`인 항목이 현재 페이지("정원") |
| `PETALS` | `number[]` (5개 각도) | 꽃잎 5장을 회전시킬 각도 목록. 모든 꽃 그래픽이 공용으로 사용 |
| `WATER_COUNT` | `number` | 좌측 레일 "오늘의 물 주기" 표시용 목업 값 |
| `FLOWER_TYPES` | `{name,color,count}[]` | 2번안에서 사용하는 보유중인 꽃 팔레트(8종). (1번안은 도감 API 연동으로 변경됨) |
| `THEMES` | `{name,bg,overlay}[]` | 정원 배경 테마 3종. `GardenPage`의 테마 순환 버튼이 인덱스를 돌림 |
| `TABS` | `{key,label}[]` | 탭 정의. `key`로 `activeTab` 비교, `label`이 버튼 텍스트("1번안"/"2번안") |
| `FREEFORM_INITIAL` | `{id,x,y,flower}[]` | 1번안 초기 배치 목업 데이터 (현재 1번안은 빈 배열로 초기화하며 사용하지 않음) |
| `GRID_ROWS`, `GRID_COLS` | `number` | 2번안 격자 크기 (4행 × 6열 = 24칸) |
| `GRID_INITIAL` | `{[cellIndex]: flowerIdx}` | 2번안 초기 배치. 키는 `row*GRID_COLS+col` |
| `MOOD_COLORS`, `WEEKDAYS`, `BLOOM_MAP_2026_06` | — | 우측 레일 캘린더용 목업 (다른 페이지와 동일 패턴) |

---

## 2. `GardenPage.jsx` — 페이지 셸

### State / Ref

| 이름 | 역할 |
|---|---|
| `menuOpen` | 햄버거 드로어 열림 여부 |
| `themeIdx` | `THEMES` 인덱스. 테마 버튼 클릭마다 순환 |
| `activeTab` | 현재 탭 키(`"freeform"` / `"grid"`). `TABS[0].key`로 초기화 |
| `saved` | 저장 버튼 클릭 후 1.8초간 "저장됨 ✓" 표시 플래그 (실제 저장 없음) |
| `year`, `month` | 우측 레일 캘린더 표시 월 |
| `toast`, `toastExiting` | 하단 토스트 메시지와 퇴장 애니메이션 트리거 |
| `toastTimer` (ref) | 토스트 자동 소멸 타이머 id 보관 (재호출 시 `clearTimeout`으로 중복 방지) |

### 함수

| 함수 | 기능 |
|---|---|
| `showToast(msg)` | 토스트를 띄우고 2초 후 퇴장 애니메이션 → 0.3초 후 완전히 숨김. 드로어/좌측 레일의 "준비 중" 안내에만 쓰임 (캔버스 내부 힌트와는 별개) |
| `goTo(item)` | 드로어/좌측 레일 네비 클릭 처리. `href`가 있으면 `navigate`, 없으면 `showToast`로 안내 |
| `cycleTheme()` | `themeIdx`를 `(i+1) % THEMES.length`로 순환 |
| `handleSave()` | `saved`를 잠깐 true로 바꿨다가 1.8초 후 원복 (시각 효과만, 영속화 없음) |
| `prevYear()` / `nextYear()` | 캘린더 월 이동. 1월에서 이전 이동 시 연도 -1 & 12월로, 12월에서 다음 이동 시 연도 +1 & 1월로 롤오버 |
| `railCal` (즉시실행 함수) | `year`/`month` 기준 42칸 이하의 캘린더 셀 배열 생성. `BLOOM_MAP_2026_06`은 2026년 6월일 때만 적용, 그 외 월은 빈 캘린더 |

### 파생 값

- `linkedAccounts`, `userName` — `useMe()` 응답에서 닉네임 추출, 없으면 `"정원사"` 기본값
- `theme` — `THEMES[themeIdx]`, `FreeformGarden`/`GridGarden`에 그대로 전달되는 유일한 prop

### 접근 제어

- `useEffect`로 `accessToken` 없으면 `/`로 즉시 리다이렉트 (다른 보호 페이지와 동일 패턴)

### 렌더링 구조

헤더 → 드로어 → `bodyGrid`(좌측 레일 / `main` / 우측 레일) → 하단 토스트.
`main` 내부에서 타이틀바(제목+테마+저장) 아래 탭 바를 렌더링하고, `activeTab`에 따라 `<FreeformGarden theme={theme} />` 또는 `<GridGarden theme={theme} />` 중 하나만 마운트합니다. **탭을 전환하면 반대쪽 컴포넌트는 언마운트되어 그 안의 state(배치한 꽃 등)는 사라집니다** — 두 시안을 비교하는 목업이라 의도된 동작이지만, 실제 기능으로 갈 때는 유의가 필요합니다.

---

## 3. `FreeformGarden.jsx` — 1번안 (자유 배치)

### 모듈 스코프 변수

| 이름 | 설명 |
|---|---|
| `CLICK_THRESHOLD = 6` | 포인터 이동 거리(px)가 이 값 이하면 "클릭", 초과면 "드래그"로 간주 |
| `API_BASE`, `flowerImgUrl` | 환경 변수에서 가져온 API Base URL과 이미지 경로를 절대 주소로 변환하는 헬퍼 함수 |
| `nextFreeformId` | 새로 심는 꽃의 id 발급용 카운터. **컴포넌트 스코프가 아닌 모듈 스코프**라 컴포넌트가 리마운트돼도 초기화되지 않고, 반대로 같은 모듈을 쓰는 인스턴스가 여러 개면 카운터를 공유합니다 (현재는 페이지에 하나만 마운트되므로 문제 없음) |

### 하위 컴포넌트 `FlowerBloom`

`{img, name, size, withStem}` props를 받아 꽃 이미지(`<img>`)와 선택적 줄기를 렌더링하는 순수 렌더 컴포넌트. 과거에는 CSS로 꽃잎을 직접 그렸으나, 현재는 백엔드 도감 API에서 받아온 이미지 URL을 사용합니다. 캔버스에 심어진 꽃(크게, 줄기 있음)과 드래그 고스트(작게, 줄기 없음)가 이 컴포넌트를 공유합니다.

### State / Ref

| 이름 | 역할 |
|---|---|
| `flowerDirectory` | `useFlowerDirectoies()` API 훅 반환값 (도감 데이터) |
| `unlockedFlowers` | 도감 데이터 중 사용자가 보유한 꽃 배열 (파생 값) |
| `flowersById` | `unlockedFlowers` 배열을 `id` 키로 매핑한 룩업 객체 (파생 값) |
| `flowers` | 배치된 꽃 배열 `{id,x,y,flower}[]`. 빈 배열(`[]`)로 초기화 |
| `selectedFlower` | 클릭(드래그 아님)으로 팔레트에서 선택한 꽃 인덱스. 캔버스 클릭 시 이 위치에 심음 |
| `hint` | 캔버스 안쪽 하단에 뜨는 안내 문구 |
| `drag` | 진행 중인 드래그 상태. `null`이 아니면 `{type:'placed'|'palette', id?/flowerId, startX, startY, clientX, clientY}` |
| `canvasRef` | 캔버스 DOM 참조. 좌표 변환·경계 판정에 사용 |
| `hintTimer` | 힌트 자동 소멸 타이머 id |

### 함수

| 함수 | 기능 |
|---|---|
| `showHint(msg)` | 힌트 표시 후 2초 뒤 자동으로 지움 (`clearTimeout`으로 중복 타이머 방지) |
| `isInsideCanvas(clientX, clientY)` | 뷰포트 좌표가 캔버스 `getBoundingClientRect()` 범위 안인지 판정 → "정원 밖" 판단의 기준 |
| `toPercent(clientX, clientY)` | 뷰포트 좌표를 캔버스 기준 %로 변환하고 `x:3~97`, `y:5~95` 범위로 clamp (꽃이 캔버스 가장자리를 완전히 벗어나 보이지 않는 것을 방지) |
| `removeFlower(id, msg)` | 해당 id의 꽃을 `flowers`에서 제거하고 힌트 표시 |
| `pickFlower(id)` | 팔레트 선택 토글 (같은 걸 다시 클릭하면 선택 해제) |
| `useEffect(..., [drag])` | **드래그 상태 머신의 핵심.** `drag`가 생기면 `window`에 `pointermove`/`pointerup`을 등록하고, 언마운트/드래그 종료 시 정리. 아래 참고 |
| `startDragPlaced(id)` | 배치된 꽃의 `onPointerDown` 핸들러 팩토리. `drag = {type:'placed', id, ...}` 시작 |
| `startDragPalette(flowerId)` | 팔레트 아이템의 `onPointerDown` 핸들러 팩토리. `drag = {type:'palette', flowerId, ...}` 시작 |
| `handleCanvasClick(e)` | `selectedFlower`가 있고 클릭 대상이 캔버스 배경 자체(`e.target === canvasRef.current`, 즉 꽃 위 클릭이 아님)일 때만 그 좌표에 심음 |
| `ghostFlower` | 드래그 중인 대상(배치된 꽃 or 팔레트 꽃)의 도감 객체(이미지, 이름 등)를 미리 찾아 고스트 렌더에 사용. 못 찾으면 `null` 처리 |

### 드래그 판정 로직 (`handleUp` 내부, `pointerup` 시 1회 실행)

이동 거리(`Math.hypot(dx,dy)`)가 `CLICK_THRESHOLD` 이하인지로 클릭/드래그를 나누고, `drag.type`과 조합해 4가지 케이스로 분기합니다.

| `drag.type` | 이동 여부 | 결과 |
|---|---|---|
| `placed` | 안 움직임 (클릭) | 즉시 삭제 (`"꽃을 치웠어요"`) |
| `placed` | 움직였고 캔버스 안 | 새 좌표로 위치 갱신 |
| `placed` | 움직였고 캔버스 밖 | 삭제 (`"정원 밖으로 꺼내 꽃을 삭제했어요"`) |
| `palette` | 안 움직임 (클릭) | `pickFlower` 토글 (선택 상태만 바뀜) |
| `palette` | 움직였고 캔버스 안 | 새 꽃을 그 좌표에 추가 |
| `palette` | 움직였고 캔버스 밖 | 아무 것도 하지 않음 (원래 자리인 팔레트로 취소된 것처럼 보임) |

> 리뷰 포인트: `pointermove`/`pointerup`을 `window`에 등록하기 때문에 커서가 캔버스나 팔레트 바깥으로 나가도 드래그가 끊기지 않습니다. 다만 `useEffect`의 의존성 배열이 `[drag]`뿐이라 `eslint-disable-next-line react-hooks/exhaustive-deps`로 규칙을 우회하고 있습니다 — `handleMove`/`handleUp`이 매 렌더 새로 생성돼도 `drag`가 바뀔 때만 재등록되도록 의도된 설계입니다.

---

## 4. `GridGarden.jsx` — 2번안 (격자 배치)

### 모듈 스코프

| 이름 | 설명 |
|---|---|
| `TOTAL_CELLS = GRID_ROWS * GRID_COLS` | 24칸 |
| `buildInitialCells()` | `GRID_INITIAL`을 길이 24의 배열(`flowerIdx` 또는 `null`)로 변환. `useState`의 초기값 팩토리로 전달되어 최초 렌더 때만 실행 |

### State / Ref

| 이름 | 역할 |
|---|---|
| `cells` | 길이 24의 배열. 인덱스 = 칸 위치, 값 = `FLOWER_TYPES` 인덱스 또는 `null` |
| `selectedFlower` | 클릭으로 선택한 팔레트 꽃 (자유 배치와 동일 개념) |
| `overIdx` | 현재 드래그가 올라가 있는 칸 인덱스 (하이라이트 표시용) |
| `hint` | 캔버스 하단 안내 문구 (자유 배치와 달리 `hintToast` 공용 스타일 사용) |
| `hintTimer` | 힌트 소멸 타이머 |

### 함수

| 함수 | 기능 |
|---|---|
| `showHint(msg)` | FreeformGarden과 동일한 패턴 |
| `pickFlower(id)` | 팔레트 선택 토글 |
| `placeAt(idx, flowerId)` | 지정 칸에 꽃을 심고 힌트 표시 (내부 헬퍼, 클릭/드롭 두 경로에서 공용) |
| `handleCellClick(idx)` | 칸이 채워져 있으면 비우고, 비어 있고 `selectedFlower`가 있으면 `placeAt`, 아무것도 없으면 "먼저 선택하세요" 안내 |
| `handlePaletteDragStart(flowerId)` | 팔레트 아이템 `dragstart`. `dataTransfer`에 `{type:'palette', flowerId}` JSON 저장, `effectAllowed:'copy'` |
| `handleCellDragStart(idx)` | 채워진 칸의 `dragstart`. `{type:'cell', fromIndex:idx}` 저장, `effectAllowed:'move'` |
| `handleCellDragEnd(idx)` | **격자 밖 삭제 판정.** `e.dataTransfer.dropEffect === 'none'`이면(=어떤 유효한 drop 타겟에도 놓이지 않았으면) 해당 칸을 비우고 삭제 힌트 표시 |
| `handleCellDragOver(idx)` | `preventDefault()`로 drop 허용, 대상 칸이 채워져 있으면 `dropEffect='move'`(스왑 예정), 비어 있으면 `'copy'`(신규 배치 예정)로 미리 지정 → `dragend`에서 삭제 오판을 막음 |
| `handleCellDragLeave(idx)` | 그 칸이 현재 `overIdx`였을 때만 하이라이트 해제 |
| `handleCellDrop(idx)` | `dataTransfer`를 JSON 파싱해 두 경로로 분기: `type==='palette'`면 빈 칸일 때만 배치(채워져 있으면 "이미 꽃이 있어요"), `type==='cell'`이면 같은 칸이면 무시하고 아니면 두 칸의 값을 **스왑** |

### 상호작용 요약

| 동작 | 결과 |
|---|---|
| 팔레트 클릭 → 빈 칸 클릭 | 배치 |
| 채워진 칸 클릭 | 즉시 삭제 |
| 팔레트 → 빈 칸 드래그 | 배치 |
| 팔레트 → 채워진 칸 드래그 | 무시 + "이미 꽃이 있어요" |
| 채워진 칸 → 다른 칸 드래그 | 이동(빈 칸) 또는 스왑(채워진 칸) |
| 채워진 칸 → 격자 밖 드래그 | 삭제 |

> 리뷰 포인트: 네이티브 HTML5 Drag & Drop을 사용하므로 **터치스크린(모바일)에서는 드래그가 동작하지 않습니다.** 클릭 기반 배치/삭제 경로가 있어 최소한의 대체 수단은 되지만, FreeformGarden(Pointer Events 기반이라 터치도 지원)과 입력 지원 범위가 다르다는 점은 두 시안을 비교할 때 감안해야 합니다.

---

## 5. `styles.js`

두 탭이 공유하는 emotion `css` 정의 모음입니다. 로직은 없고 전부 스타일 팩토리 함수(`slot(empty, over)`, `petal(w,h,color,rotate,opacity)`, `flowerCore(...)`, `gridCell(filled, over, invalid)` 등)로, 상태값을 인자로 받아 그에 맞는 `css` 객체를 반환하는 순수 함수들입니다. `COLORS` 토큰과 헤더/드로어/레일 스타일은 `MyPage`/`FlowerDirectoryPage`의 것과 동일한 팔레트를 그대로 복제해 디자인 일관성을 맞췄습니다 (프로젝트 관례상 컴포넌트 간 스타일 공유 모듈은 아직 없어 페이지별로 중복 정의).

---

## 종합 리뷰 포인트

1. **부분적인 API 연동 (배치 상태 영속성 없음)** — 보유한 꽃 목록은 API(`useFlowerDirectoies`)를 통해 가져오지만, 두 탭 모두 배치 정보는 `useState`만 사용하며 저장/새로고침 시 데이터가 유지되지 않습니다. "저장" 버튼은 아직 시각 효과만 있고 실제 저장 API 호출이 없습니다.
2. **탭 전환 시 데이터 소실** — `activeTab`에 따라 조건부로 컴포넌트를 마운트/언마운트하므로, 한쪽 탭에서 배치한 내용은 다른 탭으로 갔다가 돌아오면 초기값으로 리셋됩니다.
3. **입력 방식 불일치** — 1번안(Pointer Events)은 마우스/터치 모두 지원, 2번안(HTML5 DnD)은 마우스 전용. 최종안 선택 시 감안 필요.
4. **`nextFreeformId` 모듈 스코프** — 컴포넌트 인스턴스가 여러 개 동시에 마운트될 일이 없는 현재 구조에선 문제없지만, 추후 재사용 시 id 충돌 가능성을 염두에 둘 것.
5. **접근성 미비** — 배치 대상이 전부 `div`/`span`이라 키보드 포커스, `role`/`aria-*` 속성이 없습니다. 마우스/터치 상호작용 검증용 프로토타입 단계로는 무방하나 실제 기능화 시 보완이 필요합니다.
6. **`GridGarden`의 `handleCellDragEnd`의 `dropEffect==='none'` 판정**은 표준적인 "유효하지 않은 곳에 드롭됨" 감지 기법이지만 브라우저별 `dropEffect` 처리 차이에 민감할 수 있어, 실제 다양한 브라우저에서의 QA가 필요합니다.
