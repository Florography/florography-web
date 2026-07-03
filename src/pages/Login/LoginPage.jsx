/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const API_BASE = "http://localhost:8080";

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const containerStyle = css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
                circle at 30% 40%,
                rgba(167, 139, 250, 0.08) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 70% 60%,
                rgba(244, 114, 182, 0.06) 0%,
                transparent 50%
            );
        pointer-events: none;
    }
`;

const cardStyle = css`
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 420px;
    backdrop-filter: blur(20px);
    animation: ${fadeIn} 0.6s ease-out;
`;

const logoStyle = css`
    text-align: center;
    margin-bottom: 2.5rem;
`;

const logoText = css`
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.03em;
    animation: ${float} 3s ease-in-out infinite;
`;

const subtitleStyle = css`
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85rem;
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
`;

const dividerStyle = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.25);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
    }
`;

const btnBase = css`
    width: 100%;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin-bottom: 0.85rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
`;

const googleBtn = css`
    ${btnBase};
    background: #fff;
    color: #1f1f1f;

    &:hover {
        background: #f8f8f8;
    }
`;

const naverBtn = css`
    ${btnBase};
    background: #03c75a;
    color: #fff;

    &:hover {
        background: #02b351;
    }
`;

const kakaoBtn = css`
    ${btnBase};
    background: #fee500;
    color: #191919;

    &:hover {
        background: #fdd800;
    }
`;

const footerStyle = css`
    margin-top: 2rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.7rem;
    letter-spacing: 0.05em;
`;

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/mypage", { replace: true });
        }
    }, [navigate]);

    const handleLogin = (provider) => {
        window.location.href = `${API_BASE}/oauth2/authorization/${provider}`;
    };

    return (
        <div css={containerStyle}>
            <div css={cardStyle}>
                <div css={logoStyle}>
                    <div css={logoText}>🌸 Florography</div>
                    <div css={subtitleStyle}>소셜 계정으로 시작하기</div>
                </div>

                <div css={dividerStyle}>소셜 로그인</div>

                <button css={googleBtn} onClick={() => handleLogin("google")}>
                    <svg viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google로 계속하기
                </button>

                <button css={naverBtn} onClick={() => handleLogin("naver")}>
                    <svg viewBox="0 0 24 24">
                        <path
                            fill="#fff"
                            d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"
                        />
                    </svg>
                    Naver로 계속하기
                </button>

                <button css={kakaoBtn} onClick={() => handleLogin("kakao")}>
                    <svg viewBox="0 0 24 24">
                        <path
                            fill="#191919"
                            d="M12 3c5.8 0 10.5 3.66 10.5 8.17 0 4.52-4.7 8.18-10.5 8.18-.87 0-1.72-.08-2.54-.24l-4.24 2.89.91-4.14C3.57 16.18 1.5 13.88 1.5 11.17 1.5 6.66 6.2 3 12 3z"
                        />
                    </svg>
                    Kakao로 계속하기
                </button>

                <div css={footerStyle}>
                    계정 연동 테스트 페이지 • Dev Only
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
