import { useEffect, useState } from "react";
import { useMe } from "../../hooks/queries/useUser";
import { useComment, useShareBoard } from "../../hooks/queries/useShareboard";
import { useCommentDeleteMutation, useCommentPutMutation, useCommentRegisterMutation, useLikeDownMutation, useLikeUpMutation, useShareBoardDeleteMutation, useShareBoardPutMutation, useShareBoardResisterMutation } from "../../hooks/mutations/useShareBoard";
import { data } from "react-router";


function ShareBoardPage() {
    //수정중 게시글 ID 기억 상태
    const [editingBoardId, setEditingBoardId] = useState(null);
    // 게시글 수정 입력갑 임시저장 할 상태값
    const [editBody, setEditBody] = useState("");
    //좋아요 누른 게시글 ID 객체형태로 저장
    const [likedBoards, setLikedBoards] = useState({});


    const boardQuery = useShareBoard();
    const boards = boardQuery.data?.body || [];
    const user = useMe();
    const { mutate: registerShareBoard, isPending } = useShareBoardResisterMutation();
    const { mutate: deleteBoard } = useShareBoardDeleteMutation();
    const { mutate: updateBoard } = useShareBoardPutMutation();
    const { mutate: likeUp } = useLikeUpMutation();
    const { mutate: likeDown } = useLikeDownMutation();
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

    // 수정버튼
    const handleEditStartOnClick = (board) => {
        setEditingBoardId(board.id);
        setEditBody(board.body)
    }
    //저장버튼
    const handleSaveOnClick = () => {
        if (!editBody.trim()) {
            alert("내용을 입력해 주세요.");
            return;
        }
        const modifyDto = {
            id: editingBoardId,
            userId: currentUserId,
            body: editBody
        };

        updateBoard(
            { userId: currentUserId, data: modifyDto },
            {
                onSuccess: () => {
                    setEditingBoardId(null); //수정 성공시 입력창 닫기
                    setEditBody(""); //임시저장 상태 초기화
                },
                onError: (error) => {
                    alert(error.message);
                }
            }
        );
    };

    //수정 취소 버튼
    const handleCancelOnClick = () => {
        setEditingBoardId(null);
    }
    // 좋아요 증감
    const handleLikeToggleOnClick = (boardId) => {
        if(!currentUserId) {
            alert("로그인이 필요합니다.");
            return;
        }
        const reqData = {
            id: boardId,
            userId: currentUserId
        };
        
        // 게시글을 좋아요 여부 확인
        const isCurrentlyLiked = !!likedBoards[boardId];
        

        if(isCurrentlyLiked) {
            likeDown(
                { id: boardId, data: reqData},
                {
                    onSuccess: () => {
                        setLikedBoards(prev => ({
                            ...prev,
                            [boardId]: false
                        }));
                    }
                }
            );
        } else {
            likeUp(
                {id: boardId, data: reqData},
                {
                    onSuccess: () => {
                        setLikedBoards(prev => ({
                            ...prev,
                            [boardId]: true
                        }));
                    }
                }
            );
        }

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
                <p>게시글 출력</p>
            </div>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>
                        <p>{board.body}</p>
                        {editingBoardId === board.id ? (
                            <>
                                <div>
                                    <input type="text" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                                </div>
                                <div>
                                    <button onClick={handleSaveOnClick}>저장</button>
                                    <button onClick={handleCancelOnClick}>취소</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <span>좋아요: {board.like || 0}</span>
                                    <button onClick={() => handleLikeToggleOnClick(board.id)}>
                                        {!!likedBoards[board.id] ? "❤️ 좋아요 취소" : "🤍 좋아요"}
                                    </button>
                                    <span>작성일: {board.createdAt}</span>
                                    <button onClick={() => handleDeleteOnClick(board.id, board.userId)}>삭제</button>
                                </div>
                                <div>
                                    <button onClick={() => handleEditStartOnClick(board)}>수정</button>
                                </div>
                                <div>
                                    <p>댓글</p>
                                    <CommentRegister boardId={board.id} user={user} />
                                    <CommentSelect boardId={board.id} />
                                </div>
                            </>
                        )}
                        <hr />
                    </li>
                ))}

            </ul>
        </>
    );
}


export default ShareBoardPage;

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
    }, [user?.data]);

    const handleCommentInputChange = (e) => {
        setInputComment((prev) => ({
            ...prev,
            body: e.target.value,
        }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
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