import { useEffect, useState } from "react";
import { registerShareBoard } from "../../api/shareboardApi";
import { useMe } from "../../hooks/queries/useUser";
import { useBoardLike, useComment, useShareBoard } from "../../hooks/queries/useShareboard";
import { useBoardLikeDeleteMutation, useBoardLikeRegisterMutation, useCommentDeleteMutation, useCommentPutMutation, useCommentRegisterMutation, useLikeDownMutation, useLikeUpMutation, useShareBoardDeleteMutation, useShareBoardPutMutation, useShareBoardResisterMutation } from "../../hooks/mutations/useShareBoard";
import { data } from "react-router";
import * as s from "./styles";
import { useGardenById, useGardenByUserId } from "../../hooks/queries/useGarden";
import { FLOWER_TYPES } from "../../globalData";
import { useFlowerDirectoies } from "../../hooks/queries/flowerDirectory";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const flowerImgUrl = (path) => (path ? `${API_BASE}${path}` : "");

const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
};


function ShareBoardPage() {


    //게시판
    const boardQuery = useShareBoard();
    const boards = boardQuery.data?.body || [];

    const user = useMe();
    const currentUserId = user.data?.body?.linkedAccounts?.[0]?.uid
        ? String(user.data.body.linkedAccounts[0].uid)
        : "";
    if (currentUserId) {
        console.log("길이:", currentUserId.length);
        console.log("값:", currentUserId);
    }
    const { mutate: registerShareBoard, isPending } = useShareBoardResisterMutation();
    const { mutate: deleteBoard } = useShareBoardDeleteMutation();
    const { mutate: updateBoard } = useShareBoardPutMutation();

    //정원 첨부 모드 온/오프 상태
    const [isGardenAttached, setIsGardenAttached] = useState(false);
    const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
    const [selectedGarden, setSelectedGarden] = useState(null);
    // 정원버튼 클릭시 에만 api 조회를 위한 useGardenById호출
    const gardenQuery = useGardenByUserId(currentUserId);
    console.log(gardenQuery);
    const gardenList = Array.isArray(gardenQuery.data?.body)
        ? gardenQuery.data?.body
        : gardenQuery.data?.body ? [gardenQuery.data.body] : [];


    //본인글만 보기 필터상태관리
    const [isOnlyMyPosts, setIsOnlyMyPosts] = useState(false);


    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: "",
        body: "",
        like: 0,
        typeId: 1,
        gardenImg: null,
    });

    useEffect(() => {


        if (currentUserId) {
            setInputSeedRecord((prev) => ({
                ...prev,
                userId: currentUserId,
            }));
        }
    }, [currentUserId]); // 가 들어오거나 변경될 때마다 실행


    //본인글만보기 필터
    const displayedBoards = isOnlyMyPosts
        ? boards.filter((board) => board.userId === currentUserId)
        : boards;
    //본인글만 보기 핸들러
    const handleToggleFilter = () => {
        if (!isOnlyMyPosts && !currentUserId) {
            alert("로그인이 필요한 기능입니다.")
            return;
        }
        setIsOnlyMyPosts((prev) => !prev)
    };

    // 정원 선택 처리 함수
    const handleSelectGarden = (garden) => {
        setSelectedGarden(garden);
        setIsGardenAttached(true);
        setIsGardenModalOpen(false); // 선택 완료 후 모달 닫기

        // garden.gardenData 내부 형태 예시: { freeformFlowers: [{ id: 1, flower: 1, x: 20, y: 30 }] }
        const rawData = garden.gardenData || garden.gardenImg || garden;


        const gardenDataPayload = typeof rawData === "object"
            ? JSON.stringify(rawData)
            : rawData;

        setInputSeedRecord((prev) => ({
            ...prev,
            typeId: 2, // 정원 첨부 시 타입 변경 (예시)
            gardenImg: gardenDataPayload, // 좌표 문자열 저장
        }));
    };

    //나의 정원 버튼 선택/ 취소 토글
    const handleToggleGarden = () => {
        if (!currentUserId) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }

        if (selectedGarden || isGardenAttached) {
            // 이미 첨부된 정원이 있다면 해제
            setSelectedGarden(null);
            setIsGardenAttached(false);
            setIsGardenModalOpen(false);
            setInputSeedRecord((prev) => ({
                ...prev,
                typeId: 1,
                gardenImg: null,
            }));
        } else {
            // 정원 선택 모달 띄우기
            setIsGardenModalOpen(true);
        }
    };



    const handleDeleteOnClick = (boardId, boardWriterId) => {
        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (currentUserId !== boardWriterId) {
            alert("본인이 작성한 글만 삭제할 수 있습니다.");
            return;
        }
        if (confirm("정말 이 글을 삭제하시겠습니까?")) {
            deleteBoard({ id: boardId, userId: currentUserId });
        }
    };

    const handleBoardInputChange = (e) => {
        setInputSeedRecord((prev) => ({
            ...prev,
            body: e.target.value,
        }));
    };

    const handleBoardOnClick = async () => {
        if (!inputSeedRecord.body?.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }





        // 2. 정원 첨부 데이터 처리 (객체일 경우 JSON 문자열화)
        let gardenImgPayload = null;
        if (isGardenAttached && selectedGarden) {
            const rawData = selectedGarden.gardenData || selectedGarden.gardenImg || selectedGarden;
            gardenImgPayload = typeof rawData === "object" ? JSON.stringify(rawData) : rawData;
        }

        // 3. ShareBoardCreateRequest DTO 스펙에 맞춘 Payload 생성
        const payload = {
            userId: String(currentUserId),
            typeId: isGardenAttached ? 2 : 1, // 텍스트만 작성 시 1
            body: inputSeedRecord.body,
            like: 0,                          // 💡 null 방지 (기본 0)
            gardenImg: isGardenAttached ? gardenImgPayload : null, // 💡 미첨부 시 null
        };

        registerShareBoard(payload, {
            onSuccess: (response) => {
                alert("공유가 완료되었습니다.");
                setInputSeedRecord((prev) => ({ ...prev, body: "" }));
                setSelectedGarden(null);
                setIsGardenAttached(false);
            },
            onError: (error) => {
                alert(`공유 실패: ${error?.message || "서버 저장 실패"}`);
            }
        });
    };

    return (
        <>
            <div css={s.composerCard}>
                <p css={s.composerLabel}>게시글 작성</p>

                {selectedGarden && (
                    <div style={{ marginBottom: "12px" }}>
                        <p style={{ fontSize: "12px", color: "#2e7d32", fontWeight: "bold" }}>
                            🌱 선택된 정원: {selectedGarden.name || "나의 정원"} (type_id: 2)
                        </p>
                        <GardenPreview gardenImgData={inputSeedRecord.gardenImg} />
                    </div>
                )}
                <div css={s.composerRow}>
                    <input css={s.composerInput} type="text"
                        value={inputSeedRecord.body}
                        onChange={handleBoardInputChange}
                        placeholder="오늘의 한마디를 나눠보세요."
                    />
                    <button css={s.composerButton} onClick={handleToggleGarden}>{selectedGarden ? "정원 취소" : "나의 정원"}</button>
                    <button css={s.composerButton} onClick={handleBoardOnClick} >공유</button>
                </div>
            </div>
            <div css={s.filterRow}>
                <button css={s.filterButton} onClick={handleToggleFilter}>
                    {isOnlyMyPosts ? "전체 글 보기" : "내가 쓴 글만 보기"}
                </button>
            </div>
            <div>
                <p css={s.sectionLabel}>게시글 목록</p>
            </div>
            <ul css={s.boardList}>
                {displayedBoards.length > 0 ? (
                    displayedBoards.map((board) => (
                        <BoardItem
                            key={board.id}
                            board={board}
                            currentUserId={currentUserId}
                            user={user}
                            handleDeleteOnClick={handleDeleteOnClick}
                            updateBoard={updateBoard}
                        />
                    ))
                ) : (
                    <p css={s.boardEmpty}>
                        {isOnlyMyPosts ? "내가 작성한 글이 없습니다." : "등록된 게시글이 없습니다."}
                    </p>
                )}
            </ul>

            {isGardenModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3 style={{ marginBottom: "12px" }}>나의 정원 목록 선택</h3>
                        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "12px" }}>
                            {gardenList.length > 0 ? (
                                gardenList.map((garden, index) => (
                                    <div
                                        key={garden.id || index}
                                        onClick={() => handleSelectGarden(garden)}
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #eee",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column", // 세로 레이아웃으로 설정하여 정원 이름을 위에, 썸네일을 아래에 배치
                                            gap: "8px"
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontWeight: "600", fontSize: "13.5px" }}>
                                                {garden.name || garden.gardenName || `정원 #${index + 1}`}
                                            </span>
                                            <button style={{
                                                cursor: "pointer",
                                                padding: "3px 10px",
                                                borderRadius: "4px",
                                                border: "1px solid #ddd",
                                                background: "#fdfdfd",
                                                fontSize: "12px"
                                            }}>
                                                선택
                                            </button>
                                        </div>

                                        {/* 💡 각 정원의 좌표 데이터를 미니 높이(80px)로 렌더링 */}
                                        <GardenPreview
                                            gardenImgData={garden.gardenData || garden.gardenImg}
                                            height="80px"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p style={{ padding: "10px", color: "#666" }}>불러올 정원이 없습니다.</p>
                            )}
                        </div>
                        <button onClick={() => setIsGardenModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

        </>
    );
}


export default ShareBoardPage;

function BoardItem({ board, currentUserId, user, handleDeleteOnClick, updateBoard }) {
    // 실시간 좋아요 여부 DB 조회
    const { data: likeQueryData } = useBoardLike(board.id, currentUserId);
    const isLiked = !!likeQueryData?.body;

    const { mutate: likeUp } = useBoardLikeRegisterMutation();
    const { mutate: likeDown } = useBoardLikeDeleteMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editBody, setEditBody] = useState(board.body);

    const gardenData = board.gardenImg;

    // 하트 토글 핸들러 (누르면 증감저장 / 감소삭제)
    const handleLikeToggle = () => {
        if (!currentUserId) return alert("로그인이 필요합니다.");

        if (isLiked) {
            likeDown({
                boardId: board.id,
                userId: currentUserId
            }); // ❤️ -> 🤍 (취소 및 1 감소)
        } else {
            likeUp({
                boardId: board.id,
                userId: currentUserId
            }); // 🤍 -> ❤️ (저장 및 1 증가)
        }
    };

    const handleSaveClick = () => {
        if (!editBody.trim()) return alert("내용을 입력해 주세요.");

        updateBoard(
            { userId: currentUserId, data: { id: board.id, userId: currentUserId, body: editBody } },
            {
                onSuccess: () => setIsEditing(false),
                onError: (error) => alert(error.message)
            }
        );
    };

    return (
        <li css={s.boardItem}>
            {(board.typeId === 2 || gardenData) && (
                <GardenPreview gardenImgData={gardenData} />
            )}
            {isEditing ? (
                <div css={s.editRow}>
                    <input css={s.editInput} type="text" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                    <button css={s.saveButton} onClick={handleSaveClick}>저장</button>
                    <button css={s.cancelButton} onClick={() => setIsEditing(false)}>취소</button>
                </div>
            ) : (
                <>
                    <p css={s.boardBody}>{board.body}</p>
                    <div css={s.boardMetaRow}>
                        <span>좋아요: {board.like || 0}</span>

                        {/* 직관적인 하트 텍스트 변경 */}
                        <button css={s.likeButton} onClick={handleLikeToggle}>
                            {isLiked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
                        </button>

                        <span>작성일: {board.createdAt}</span>

                        {currentUserId === board.userId && (
                            <div css={s.boardActions}>
                                <button css={s.actionButton} onClick={() => setIsEditing(true)}>수정</button>
                                <button css={[s.actionButton, s.dangerAction]} onClick={() => handleDeleteOnClick(board.id, board.userId)}>삭제</button>
                            </div>
                        )}
                    </div>
                    <div css={s.commentSection}>
                        <p css={s.commentTitle}>댓글</p>
                        <CommentRegister boardId={board.id} user={user} />
                        <CommentSelect boardId={board.id} currentUserId={currentUserId} />
                    </div>
                </>
            )}
        </li>
    );
}

//댓글 출력
function CommentSelect({ boardId }) {
    const commentQuery = useComment(boardId);
    const comments = commentQuery.data?.body || [];

    const user = useMe();
    const currentUserId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const { mutate: deleteComment } = useCommentDeleteMutation();
    const { mutate: updateComment } = useCommentPutMutation();

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentBody, setEditCommentBody] = useState("");

    const handleDeleteComment = (commentId, commentWriterId) => {
        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (currentUserId !== commentWriterId) {
            alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
            return;
        }
        if (confirm("정말 이 댓글을 삭제하시겠습니까?")) {
            deleteComment({
                boardId: boardId,
                userId: currentUserId,
                id: commentId
            });
        }
    }

    // 수정 버튼
    const handleCommentEditStart = (comment) => {
        setEditingCommentId(comment.id);
        setEditCommentBody(comment.body)
    };

    // 저장 버튼
    const handleCommentSave = () => {
        if (!editCommentBody.trim()) {
            alert("댓글 내용을 입력해 주세요.");
            return;
        }
        const modifyCommentDto = {
            id: editingCommentId,
            userId: currentUserId,
            boardId: boardId,
            body: editCommentBody
        };
        updateComment(
            { userId: currentUserId, data: modifyCommentDto },
            {
                onSuccess: () => {
                    setEditingCommentId(null);
                    setEditCommentBody("");
                },
                onError: (error) => {
                    alert(error.message);
                }
            }
        );
    };
    //댓글 수정 취소 버튼
    const handleCommentCancel = () => {
        setEditingCommentId(null);
        setEditCommentBody("");
    }

    return (
        <div>
            <ul css={s.commentList}>
                {comments.map((comment, index) => (
                    <li css={s.commentItem} key={comment.id ?? `comment-fallback-${index}`}>
                        {editingCommentId === comment.id ? (
                            <div css={s.editRow}>
                                <input css={s.editInput} type="text"
                                    value={editCommentBody}
                                    onChange={(e) => setEditCommentBody(e.target.value)}
                                />
                                <button css={s.saveButton} onClick={handleCommentSave}>저장</button>
                                <button css={s.cancelButton} onClick={handleCommentCancel}>취소</button>
                            </div>
                        ) : (
                            <>
                                {comment.body}
                                {currentUserId === comment.userId && (
                                    <div css={s.commentActions}>
                                        <button css={s.actionButton} onClick={() => handleCommentEditStart(comment)}>수정</button>
                                        <button css={[s.actionButton, s.dangerAction]} onClick={() => handleDeleteComment(comment.id, comment.userId)}>
                                            삭제
                                        </button>
                                    </div>
                                )}

                            </>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    )
}

//댓글 작성
function CommentRegister({ boardId, user }) {
    const { mutate: registerComment, isLoading } = useCommentRegisterMutation();

    const [inputComment, setInputComment] = useState({
        boardId: boardId || "",
        userId: "",
        body: "",
    });

    useEffect(() => {
        const uid = user?.data?.body?.linkedAccounts?.[0]?.uid;
        if (uid) {
            setInputComment((prev) => ({
                ...prev,
                userId: uid,
            }));
        }
    }, [user]);

    const handleCommentInputChange = (e) => {
        setInputComment((prev) => ({
            ...prev,
            body: e.target.value,
        }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!inputComment.userId) {
            alert("로그인 정보가 유효하지 않습니다. 다시 시도해 주세요.");
            return;
        }

        if (!inputComment.body.trim()) {
            alert("댓글을 입력해주세요!");
            return;
        }

        registerComment(inputComment, {
            onSuccess: () => {
                setInputComment((prev) => ({
                    ...prev,
                    body: "",
                }));
                alert("댓글이 등록되었습니다.");
            }
        });
    };

    return (
        <div className="comment-register-container">
            <form css={s.commentForm} onSubmit={handleCommentSubmit} >
                <input
                    css={s.commentInput}
                    type="text"
                    value={inputComment.body}
                    onChange={handleCommentInputChange}
                    placeholder="댓글을 남겨보세요."

                />
                <button css={s.commentSubmit} type="submit" >
                    입력
                </button>
            </form>
        </div>
    )
}

// 정원 데이터 시각화
// height 매개변수를 기본값 "200px"로 설정하여 받습니다.
function GardenPreview({ gardenImgData, height = "200px" }) {
    const { data: directoryData } = useFlowerDirectoies();

    if (!gardenImgData) return null;

    let parsedData = null;
    try {
        if (typeof gardenImgData === "string") {
            const cleanData = gardenImgData.trim();
            if (!cleanData.startsWith("{") && !cleanData.startsWith("[")) {
                return null;
            }
            parsedData = JSON.parse(cleanData);
            if (typeof parsedData === "string" && (parsedData.startsWith("{") || parsedData.startsWith("["))) {
                parsedData = JSON.parse(parsedData);
            }
        } else if (typeof gardenImgData === "object") {
            parsedData = gardenImgData;
        }
    } catch (error) {
        console.error("정원 JSON 파싱 오류:", error);
        return null;
    }

    const flowers = parsedData?.freeformFlowers || [];
    if (!Array.isArray(flowers) || flowers.length === 0) return null;

    const flowerMap = Object.fromEntries(
        (directoryData?.body || []).map((f) => [f.id, f])
    );

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: height, // 💡 전달받은 height를 동적으로 대입
            background: "radial-gradient(130px 130px at 80% 16%, #fcf2bf, transparent 72%), linear-gradient(180deg,#d7eef6 0%,#e6f3df 40%,#cfe6b0 64%,#b6d78d 100%)",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "12px",
            border: "1px solid #e6f3df",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                {flowers.map((item, index) => {
                    const flowerDef = flowerMap[item.flower];
                    if (!flowerDef) return null;

                    const x = Number(item.x) || 0;
                    const y = Number(item.y) || 0;

                    return (
                        <image
                            key={item.id || index}
                            href={flowerImgUrl(flowerDef.flowerImg)}
                            x={x - 6}
                            y={y - 6}
                            width="12"
                            height="12"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    );
                })}
            </svg>
        </div>
    );
}
