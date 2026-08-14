/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router";
import { useRankShareBoard } from "../../../hooks/queries/useShareboard";
import { useMe } from "../../../hooks/queries/useUser";
import { useSeedRecord } from "../../../hooks/queries/useSeedRecord";
import * as s from "./styles";
import Calendar from "./Calendar";

function RightBar() {
    const location = useLocation();
    const isShareBoard = location.pathname.startsWith("/shareboard");

    const meQuery = useMe();
    const userId = meQuery.data?.body?.linkedAccounts?.[0]?.uid;
    const seedRecordsQuery = useSeedRecord(userId);

    const rankBoardQuery = useRankShareBoard();
    const ranks = rankBoardQuery.data?.body || [];

    // 오늘의 기록에서 AI 코멘트 가져오기
    const todayStr = new Date().toLocaleDateString("sv-SE");
    const allSeedRecords = seedRecordsQuery.data?.body || [];
    const todayRecord = allSeedRecords.find(record =>
        record?.createdDate && record.createdDate.startsWith(todayStr)
    );
    const aiComment = todayRecord?.aiComment || "아직 오늘의 기록이 없어요. 한마디를 남겨보세요 🌱";

    return (
        <aside css={s.sidebar}>
            {isShareBoard ? (
                <div css={s.section}>
                    <h3 css={s.title}>인기 순위</h3>
                    <ul css={s.rankList}>
                        {ranks.map((rank, index) => (
                            <li css={s.rankItem} key={rank.id}>
                                <span css={s.rankPosition}><strong>{index + 1}위</strong></span>
                                <span css={s.rankBody}>{rank.body}</span>
                                <span css={s.rankLike}>❤️{rank.like}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                    <div css={s.section}>
                        <h3 css={s.title}>내가 지난 주 피운 꽃</h3>
                        <div css={s.contentPlaceholder}>꽃 피움 기록</div>
                    </div>
                    
                    <div css={s.section}>
                        <h3 css={s.title}>오늘의 위로 한마디</h3>
                        <div css={s.contentPlaceholder}>{aiComment}</div>
                    </div>
                </>
            )}

            <div css={s.section}>
                <h3 css={s.title}>캘린더</h3>
                <Calendar />
            </div>
        </aside>
    );
}

export default RightBar;