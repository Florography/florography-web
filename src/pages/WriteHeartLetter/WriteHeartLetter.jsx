import { useEffect, useRef, useState } from "react";
import { createWrite, updateWrite } from "../../api/heartletterApi";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";
import { useNavigate } from "react-router";

function getThemeBgColor(themeId) {
    switch (Number(themeId)) {
        case 1:
            return "#fff0f5"; // 핑크
        case 2:
            return "#f3e5f5"; // 보라
        case 3:
            return "#fffde7"; // 옐로우
        case 4:
            return "#e1f5fe"; // 블루
        default:
            return "#ffffff"; // 기본 (흰색)
    }
}

function WriteHeartLetter({ existingData, todayWrtie, userId, onSaveSuccess }) {

    const user = useMe();
    const currentUserId = user.data?.body?.linkedAccounts?.[0]?.uid;
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const [inputWrite, setInputWrite] = useState({
        userId: "",
        title: "",
        recipient: "",
        body: "",
        paper_theme: 0,
        font_size: 16,
    });

    useEffect(() => {
        if (currentUserId) {
            setInputWrite((prev) => ({
                ...prev,
                userId: currentUserId,
            }))
        }
    }, [currentUserId]);

    useEffect(() => {
        if (todayWrtie) {
            const initalBody = todayWrtie.body || "";
            setInputWrite({
                userId: todayWrtie.userId || currentUserId,
                title: todayWrtie.title || "",
                recipient: todayWrtie.recipient || "",
                body: todayWrtie.body,
                paper_theme: todayWrtie.paper_theme !== undefined ? Number(todayWrtie.paper_theme) : 2,
                font_size: todayWrtie.font_size !== undefined ? Number(todayWrtie.font_size) : 16
            })

            if (editorRef.current) {
                editorRef.current.innerHTML = initalBody;
            }
        }
    }, [todayWrtie, currentUserId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputWrite((prev) => ({
            ...prev,
            [name]: name === "paper_theme" ? Number(value) : value,
        }));
    };

    const handleEditorInput = () => {
        if (editorRef.current) {
            setInputWrite((prev) => ({
                ...prev,
                body: editorRef.current.innerHTML,
            }));
        }
    }

    const applyFormat = (command, value = null) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false, value);
            handleEditorInput();
        }
    }

    const handleFontSize = (delta) => {
        setInputWrite((prev) => ({
            ...prev,
            font_size: Math.max(12, Math.min(40, prev.font_size + delta)),
        }));
    }

    const handleSaveOnClick = async () => {
        console.log(inputWrite);
        const targetUserId = inputWrite.userId || currentUserId;

        if (!targetUserId) {
            alert("사용자 인증 정보 불러오는 중입니다.")
            return;
        }
        if (!inputWrite.title.trim()) {
            alert("제목을 입력해주세요.")
            return;
        }
        if (!inputWrite.body.trim()) {
            alert("마음의 편지 내용을 작성해주세요.");
            return;
        }

        const payload = {
            userId: inputWrite.userId,
            title: inputWrite.title,
            recipient: inputWrite.recipient,
            body: inputWrite.body,
            paper_theme: Number(inputWrite.paper_theme),
            paperTheme: Number(inputWrite.paper_theme),
            font_size: Number(inputWrite.font_size),
            fontSize: Number(inputWrite.font_size)
        };

        console.log("전송할 Payload:", payload); // 백엔드로 넘어가는 값 확인용 로그

        try {
            const response = todayWrtie
                ? await updateWrite(payload)
                : await createWrite(payload);

            if (response) {
                console.log("DB", response);
                alert(todayWrtie ? "편지가 수정되었습니다." : "편지가 편지를 보냈어요. 💌");
                if (onSaveSuccess) onSaveSuccess(response);
                navigate("/heartletter/letters");
            }
        } catch (error) {
            console.error("Db 저장 중 오류 발생: ", error);
            if (error.response?.status === 401) {
                alert("로그인이 만료되었습니다.")
            } else {
                alert("저장에 실패했습니다.");
            }
        }
    };

    return (
        <div css={s.container}>
            {/* Header 영역 */}
            <header css={s.header}>
                <div>
                    <h2 css={s.headerTitle}>{todayWrtie ? "💌 마음의 편지 수정" : "💌 마음의 편지 작성"}</h2>
                    <p css={s.headerDesc}>전하고 싶은 마음을 편지에 담아보세요.</p>
                </div>
                <div>
                    <button css={s.submitButton} onClick={handleSaveOnClick}>
                        ✍️ {todayWrtie ? "수정" : "작성 완료"}
                    </button>
                </div>
            </header>

            <hr css={s.divider} />

            <div css={s.toolRow}>
                <div css={s.themeGroup}>
                    <label>🎨 테마 · 편지지</label>
                    <select 
                        css={s.themeSelect}
                        name="paper_theme" 
                        value={inputWrite.paper_theme} 
                        onChange={handleInputChange}
                    >
                        <option value={0}>기본</option>
                        <option value={1}>파스텔 핑크</option>
                        <option value={2}>파스텔 보라</option>
                        <option value={3}>파스텔 옐로우</option>
                        <option value={4}>파스텔 블루</option>
                    </select>
                </div>
                {/* 텍스트 서식 버튼 */}
                <div css={s.formatGroup}>
                    <span css={s.formatLabel}>서식</span>
                    <button css={s.formatButton} type="button" onClick={() => applyFormat("bold")}>
                        <b>B</b>
                    </button>
                    <button css={s.formatButton} type="button" onClick={() => applyFormat("italic")}>
                        <i>I</i>
                    </button>
                    <button css={s.formatButton} type="button" onClick={() => applyFormat("underline")}>
                        <u>U</u>
                    </button>
                </div>
                {/* 폰트 크기 조절 */}
                <div css={s.sizeGroup}>
                    <span>크기</span>
                    <button css={s.sizeButton} type="button" onClick={() => handleFontSize(-2)}>-</button>
                    <span>{inputWrite.font_size}px</span>
                    <button css={s.sizeButton} type="button" onClick={() => handleFontSize(2)}>+</button>
                </div>
            </div>
            {/* 입력 영역 */}
            <div css={s.inputRow}>
                <input 
                    css={s.textInput}
                    type="text" 
                    name="recipient"
                    placeholder="받는 사람 (예: 사랑하는 부모님께)"
                    value={inputWrite.recipient}
                    onChange={handleInputChange}
                />
                <input 
                    css={s.textInput}
                    type="text" 
                    name="title"
                    placeholder="편지 제목을 입력하세요."
                    value={inputWrite.title}
                    onChange={handleInputChange}
                />
            </div>
            {/* 2단 구성: 작성창 & 👁 실시간 미리보기 */}
            <div css={s.editorGrid}>
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    suppressContentEditableWarning={true}
                    css={s.editorPane}
                    style={{
                        fontSize: `${inputWrite.font_size}px`,
                        textAlign: inputWrite.textAlign,
                        backgroundColor: getThemeBgColor(inputWrite.paper_theme),
                    }}
                />
                {/* 미리보기 창 */}
                <div css={s.previewPane}
                >
                    <h3 css={s.previewHeading}>👁 미리보기</h3>
                    <hr css={s.divider} />
                    <h4 css={s.previewTo}>To. {inputWrite.recipient || "받는 사람"}</h4>
                    <h5 css={s.previewTitle}>{inputWrite.title || "제목 없음"}</h5>
                    
                    {/* HTML 서식이 포함된 미리보기 출력 */}
                    <div
                        css={s.previewBody}
                        style={{
                            fontSize: `${inputWrite.font_size}px`,
                            textAlign: inputWrite.textAlign,
                            wordBreak: "break-word",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: inputWrite.body || "작성된 내용이 실시간으로 표시됩니다.",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default WriteHeartLetter;