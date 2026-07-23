import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as s from "./styles"

const FEATURES = [
    {
        icon: "🌱",
        title: "씨앗심기",
        desc: "긴 일기 대신 부담 없는 오늘의 한 문장 기록. 한 문장은 식물에게 주는 시원한 물 한 번으로 연결됩니다.",
    },
    {
        icon: "✉️",
        title: "꽃에게 전하는 속마음",
        desc: "미래의 나, 고마운 사람 등 대상을 지정해 쓰는 감정 편지. 표현의 깊이에 따라 특별한 꽃이 개화합니다.",
    },
    {
        icon: "💐",
        title: "주간 꽃 컬렉션",
        desc: "한 주간 채워진 감정 흐름 분석을 통해 매주 고유한 20종의 꽃 컬렉션을 수집하고 정원을 꾸밉니다.",
    },
    {
        icon: "🧪",
        title: "영양제와 위로",
        desc: "부정적인 감정으로 시든 식물은 따뜻한 위로의 글귀와 회복 미션(영양제)을 통해 다시 치유될 수 있습니다.",
    },
];

const PLACEHOLDERS = {
    seed: "예시: 오늘은 생각보다 괜찮은 하루였다. 비 오는 냄새가 참 좋았어.",
    letter:
        "과거의 나, 미래의 나, 혹은 고마운 사람에게 전하고 싶은 속마음 편지를 깊게 채워보세요.",
};

const DEFAULT_STATUS = "새싹이 자라날 준비를 합니다";
const DEFAULT_RESULT = "텍스트를 입력하고 버튼을 누르면 AI 심리 분석이 시작됩니다.";

function InformationPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("seed");
    const [moodInput, setMoodInput] = useState("");
    const [plantIcon, setPlantIcon] = useState("🌱");
    const [gardenStatus, setGardenStatus] = useState(DEFAULT_STATUS);
    const [analysisResult, setAnalysisResult] = useState(DEFAULT_RESULT);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/mypage", { replace: true });
        }
    }, [navigate]);

    const handleSwitchTab = (nextMode) => {
        setMode(nextMode);
        setMoodInput("");
    };

    const handleAnalyze = () => {
        const inputText = moodInput.trim();
        if (!inputText) {
            alert("마음을 한 줄 이상 기록해 주세요!");
            return;
        }

        let emotion = "무난";
        if (
            inputText.includes("우울") ||
            inputText.includes("힘들") ||
            inputText.includes("지친")
        ) {
            emotion = "지침";
        } else if (
            inputText.includes("기쁜") ||
            inputText.includes("좋았") ||
            inputText.includes("행복") ||
            inputText.includes("괜찮은")
        ) {
            emotion = "기쁨/감사";
        }

        if (mode === "seed") {
            if (emotion === "기쁨/감사") {
                setPlantIcon("🌿");
                setGardenStatus("초록 잎이 싱그럽게 자라났어요!");
                setAnalysisResult(
                    "💡 AI 분석 결과: 긍정적인 에너지가 가득 담긴 문장입니다. 정원에 맑은 물이 전해졌습니다."
                );
            } else if (emotion === "지침") {
                setPlantIcon("🥀");
                setGardenStatus("조금 시무룩해진 식물");
                setAnalysisResult(
                    "💡 AI 분석 결과: 지친 감정이 감지되었습니다. 위로의 영양제 미션을 통해 식물을 다시 깨워주세요."
                );
            } else {
                setPlantIcon("🌱");
                setGardenStatus("차근차근 자라는 중");
                setAnalysisResult(
                    "💡 AI 분석 결과: 평온한 일상의 문장입니다. 물 주기가 완료되어 내일 더 자라납니다."
                );
            }
        } else {
            setPlantIcon("🌸");
            setGardenStatus("속마음의 특별한 꽃 개화!");
            setAnalysisResult(
                "💡 AI 분석 결과: 진심 어린 편지가 도달하여 정원에 고유한 [감사의 꽃]이 피어났습니다. 주간 컬렉션에 저장됩니다."
            );
        }
    };

    const goToLogin = () => navigate("/login");

    return (
        <div css={s.page}>
            <header css={s.header}>
                <div css={s.logo}>florography</div>
                <nav css={s.nav}>
                    <a css={s.navLink} href="#features">핵심기능</a>
                    <a css={s.navLink} href="#playground">체험하기</a>
                </nav>
            </header>

            <section css={s.hero}>
                <p css={s.heroEyebrow}>마음을 키우는 정원</p>
                <h1 css={s.heroTitle}>
                    당신의 마음에 물을 주세요,
                    <br />
                    감정이 꽃피는 곳
                </h1>
                <p css={s.heroDesc}>
                    매일 작성하는 작은 기록들은 하나의 생명이 되어 천천히
                    성장합니다. AI 감정 분석을 통해 나만의 비밀 정원을 가꾸는
                    게이미피케이션 멘탈케어 서비스를 만나보세요.
                </p>
                <button css={s.heroCta} onClick={goToLogin}>
                    정원 가꾸러 가기
                </button>
            </section>

            <main css={s.main} id="features">
                <section>
                    <h2 css={s.sectionTitle}>서비스 핵심 기능</h2>

                    <div css={s.featuresGrid}>
                        {FEATURES.map((feature) => (
                            <div css={s.featureCard} key={feature.title}>
                                <span css={s.featureIcon}>{feature.icon}</span>
                                <h4 css={s.featureTitle}>{feature.title}</h4>
                                <p css={s.featureDesc}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2
                        css={s.sectionTitle}
                        id="playground"
                    >
                        감정 가드닝 미리보기
                    </h2>

                    <div css={s.playgroundGrid}>
                        <div css={s.playCard}>
                            <h3 css={s.playCardTitle}>오늘의 마음 기록하기</h3>
                            <p css={s.playCardDesc}>
                                오늘 하루 느꼈던 마음이나 전하고 싶은 속마음을
                                적어보세요. AI가 감정을 분석해 식물을 변화시킵니다.
                            </p>

                            <div css={s.tabRow}>
                                <button
                                    css={s.tabButton(mode === "seed")}
                                    onClick={() => handleSwitchTab("seed")}
                                >
                                    🌱 씨앗심기 (한 문장)
                                </button>
                                <button
                                    css={s.tabButton(mode === "letter")}
                                    onClick={() => handleSwitchTab("letter")}
                                >
                                    ✉️ 속마음 편지
                                </button>
                            </div>

                            <textarea
                                css={s.textarea}
                                placeholder={PLACEHOLDERS[mode]}
                                value={moodInput}
                                onChange={(e) => setMoodInput(e.target.value)}
                            />
                            <button css={s.analyzeButton} onClick={handleAnalyze}>
                                기록하고 물 주기
                            </button>
                        </div>

                        <div css={s.resultCard}>
                            <div css={s.resultStatus}>
                                <span css={s.resultIcon}>{plantIcon}</span>
                                <span css={s.resultStatusText}>
                                    {gardenStatus}
                                </span>
                            </div>
                            <div css={s.resultText}>{analysisResult}</div>
                        </div>
                    </div>
                </section>
            </main>

            <footer css={s.footer}>
                <p css={s.footerQuote}>
                    "기록하는 감정에서, 성장하는 감정으로."
                </p>
                <p css={s.footerCopy}>
                    &copy; 2026 florography. All 팀원 4인 | Mental Care +
                    Gamification.
                </p>
            </footer>
        </div>
    );
}

export default InformationPage;
