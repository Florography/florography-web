import { useEffect, useState } from "react";
import { useMe } from "../../hooks/queries/useUser";
import { useBoardLike, useComment, useRankShareBoard, useShareBoard } from "../../hooks/queries/useShareboard";
import { useBoardLikeDeleteMutation, useBoardLikeRegisterMutation, useCommentDeleteMutation, useCommentPutMutation, useCommentRegisterMutation, useLikeDownMutation, useLikeUpMutation, useShareBoardDeleteMutation, useShareBoardPutMutation, useShareBoardResisterMutation } from "../../hooks/mutations/useShareBoard";
import { data } from "react-router";


function ShareBoardPage() {

    //게시판
    const boardQuery = useShareBoard();
    const boards = boardQuery.data?.body || [];
    //인기순위
    const rankBoardQuery = useRankShareBoard();
    const ranks = rankBoardQuery.data?.body || [];

    const user = useMe();
    const { mutate: registerShareBoard, isPending } = useShareBoardResisterMutation();
    const { mutate: deleteBoard } = useShareBoardDeleteMutation();
    const { mutate: updateBoard } = useShareBoardPutMutation();

    //본인글만 보기 필터상태관리
    const [isOnlyMyPosts, setIsOnlyMyPosts] = useState(false);

    //본인인증?
    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: "",
        body: "",
        like: 0,
        typeId: 1,
    });

    useEffect(() => {
        const uid = user.data?.body?.linkedAccounts?.[0]?.uid;

        if (uid) {
            setInputSeedRecord((prev) => ({
                ...prev,
                userId: uid,
            }));
        }
    }, [user.data]); // user.data가 들어오거나 변경될 때마다 실행

    // 현재 로그인한 유저 uid 구하기 
    const currentUserId = user.data?.body?.linkedAccounts?.[0]?.uid;

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

    const handleBoardOnClick = () => {
        if (!inputSeedRecord.body.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        if (!inputSeedRecord.userId) {
            alert("로그인 정보가 없거나 유저 ID를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
            console.error("🚨 현재 전송 시도하려는 유저 데이터 상태:", inputSeedRecord);
            return;
        }

        registerShareBoard(inputSeedRecord, {
            onSuccess: () => {
                setInputSeedRecord((prev) => ({
                    ...prev,
                    body: "",
                }));
            }
        });
    };


    return (
        <>
            <div>
                <p>게시글 작성</p>
                <input type="text"
                    value={inputSeedRecord.body}
                    onChange={handleBoardInputChange}
                    placeholder="오늘의 한마디를 나눠보세요."
                />
                <button onClick={handleBoardOnClick} >공유</button>
            </div>
            <div>
                <button onClick={handleToggleFilter}>
                    {isOnlyMyPosts ? "전체 글 보기" : "내가 쓴 글만 보기"}
                </button>
            </div>
            <div>
                <p>게시글 출력</p>
            </div>
            <ul>
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
                ): (
                    <p>
                        {isOnlyMyPosts ? "내가 작성한 글이 없습니다." : "등록된 게시글이 없습니다."}
                    </p>
                )}
            </ul>
            
            <div>
                <p>인기순위</p>
            </div>
            <ul>
                {ranks.map((rank, index) => (
                    <li key={rank.id}>
                        <span><strong>{index + 1}위</strong></span>
                        <span>{rank.body}</span>
                    </li>
                ))}
            </ul>
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
        <li>
            {isEditing ? (
                <>
                    <input type="text" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                    <button onClick={handleSaveClick}>저장</button>
                    <button onClick={() => setIsEditing(false)}>취소</button>
                </>
            ) : (
                <>
                    <p>{board.body}</p>
                    <span>좋아요: {board.like || 0}</span>

                    {/* 직관적인 하트 텍스트 변경 */}
                    <button onClick={handleLikeToggle}>
                        {isLiked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
                    </button>

                    <span>작성일: {board.createdAt}</span>

                    {currentUserId === board.userId && (
                        <>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                            <button onClick={() => handleDeleteOnClick(board.id, board.userId)}>삭제</button>
                        </>
                    )}
                    <div>
                        <p>댓글</p>
                        <CommentRegister boardId={board.id} user={user} />
                        <CommentSelect boardId={board.id} currentUserId={currentUserId} />
                    </div>
                </>
            )}
            <hr />
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
            <ul>
                {comments.map((comment, index) => (
                    <li key={comment.id ?? `comment-fallback-${index}`}>
                        {editingCommentId === comment.id ? (
                            <>
                                <input type="text"
                                    value={editCommentBody}
                                    onChange={(e) => setEditCommentBody(e.target.value)}
                                />
                                <button onClick={handleCommentSave}>저장</button>
                                <button onClick={handleCommentCancel}>취소</button>
                            </>
                        ) : (
                            <>
                                {comment.body}
                                {currentUserId === comment.userId && (
                                    <>
                                        <button onClick={() => handleCommentEditStart(comment)}>수정</button>
                                        <button onClick={() => handleDeleteComment(comment.id, comment.userId)}>
                                            삭제
                                        </button>
                                    </>
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
            <form onSubmit={handleCommentSubmit} >
                <input
                    type="text"
                    value={inputComment.body}
                    onChange={handleCommentInputChange}
                    placeholder="댓글을 남겨보세요."

                />
                <button type="submit" >
                    입력
                </button>
            </form>
        </div>
    )
}