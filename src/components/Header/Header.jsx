import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMe } from "../../hooks/queries/useUser";

function Header() {
    const navigate = useNavigate();
    const me = useMe();

    console.log(me);

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleProfileClick = () => {
        navigate("/mypage");
    };

    return (
        <>
            <div css={s.header}>
                <div css={s.headerContent}>
                    <div css={s.logo} onClick={handleLogoClick}>
                        florography
                    </div>
                    <div css={s.spacer}></div>
                    <div css={s.profile} onClick={handleProfileClick}>
                        프로필
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;