import { useEffect, useState } from "react";
import { useMe } from "../../hooks/queries/useUser";
import { useComment, useShareBoard } from "../../hooks/queries/useShareboard";
import { useCommentRegisterMutation, useShareBoardResisterMutation } from "../../hooks/mutations/useShareBoard";


function ShareBoardPage() {
    //게시글
    const boardQuery = useShareBoard();
    const boards = boardQuery.data?.body || [];

    const { mutate: registerShareBoard, isPending} = useShareBoardResisterMutation();
    
    //본인인증?
    const user = useMe();
    console.log(user);
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

    const handleBoardInputChange = (e) => {
        setInputSeedRecord((prev) =>({
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
                <p>게시글 출력</p>
            </div>
            <ul>
                {boards.map((board) => (
                <li key={board.id}>
                    <p>{board.body}</p>
                    <div>
                        <span>좋아요: {board.like || 0}</span>
                        <span>작성일: {board.createdAt}</span>
                    </div>
                    <div>
                        <p>댓글</p>
                        <CommentRegister boardId={board.id} user={user} />
                        <CommentSelect boardId={board.id} />
                    </div>
                    <hr />
                </li>
            ))}
                
            </ul>
        </>
    );
}


export default ShareBoardPage;

//댓글 출력
function CommentSelect({boardId}) {
    const commentQuery = useComment(boardId);
    const comments = commentQuery.data?.body || [];

    return(
        <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.body}
                    </li>
                ))}
            </ul>
        </div>
    )
}

//댓글 작성
function CommentRegister({boardId, user}) {
    const {mutate: registerComment, isLoading } = useCommentRegisterMutation();

    const [ inputComment, setInputComment ] = useState({
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
    },[user?.data]);

    const handleCommentInputChange =(e) => {
        setInputComment((prev) => ({
            ...prev,
            body: e.target.value,
        }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if(!inputComment.body.trim()) {
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