import { useState } from "react";
import { useNavigate } from "react-router";

function LeftBar() {
    const tabList = [
        {name: "홈", path: "/home"},
        {name: "속마음 편지", path: "/heartletter"},
        {name: "공유 게시판", path: "/shareboard"},
        {name: "꽃 도감", path: "/flowers"},
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

    return (
        <>
            <div>글 쓰기</div>
            <ul>
                {tabList.map((tab, index) => (
                    <div key={index}>
                    <li key={index} onClick={() => handleTabClick(tab.path)}>
                        {tab.name}
                    </li>
                    {
                        tab.path === "/heartletter" && heartLetterToggle && (
                            <ul>
                                <li onClick={() => navigate("/heartletter/seedrecord")}>나의 한마디</li>
                                <li onClick={() => navigate("/heartletter/letters")}>내가 쓴 편지</li>
                            </ul>
                        )
                    }
                    </div>
                ))
                }
            </ul>
        </>
    )
}

export default LeftBar;