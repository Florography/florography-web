import { useState } from "react";
import { useNavigate } from "react-router";
import * as s from "./styles";

function LeftBar() {
    const tabList = [
        {name: "홈", path: "/home"},
        {name: "속마음 편지", path: "/heartletter"},
        {name: "공유 게시판", path: "/shareboard"},
        {name: "꽃 도감", path: "/flowers"},
        {name: "정원", path: "/garden"},
    ]

    const navigate = useNavigate();
    const [heartLetterToggle, setHeartLetterToggle] = useState(false);

    const handleTabClick = (path) => {
        if (path === "/heartletter") {
            setHeartLetterToggle(prev => !prev);
        }
        if (path !== "/heartletter") {
            navigate(path);
        }
    };

    const handleWriteOnClick = () => {
        navigate("/write");
    };

    return (
        <aside css={s.sidebar}>
            <div css={s.writeButton} onClick={handleWriteOnClick}>글 쓰기</div>
            <ul css={s.menu}>
                {tabList.map((tab, index) => (
                    <div css={s.menuItemWrap} key={index}>
                    <li css={s.menuItem} key={index} onClick={() => handleTabClick(tab.path)}>
                        {tab.name}
                    </li>
                    {
                        tab.path === "/heartletter" && heartLetterToggle && (
                            <ul css={s.submenu}>
                                <li css={s.submenuItem} onClick={() => navigate("/heartletter/seedrecord")}>나의 한마디</li>
                                <li css={s.submenuItem} onClick={() => navigate("/heartletter/letters")}>내가 쓴 편지</li>
                            </ul>
                        )
                    }
                    </div>
                ))
                }
            </ul>
        </aside>
    )
}

export default LeftBar;