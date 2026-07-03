import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function OAuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            navigate("/mypage", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [searchParams, navigate]);

    return null;
}

export default OAuthCallbackPage;
