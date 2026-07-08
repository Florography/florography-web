import { useEffect, useState } from "react";
import * as s from "./styles";
import { axiosInstance } from "../../api/axiosInstance";
import { useHeartLetters } from "../../hooks/queries/useHeartLetter";
import axios from "axios";
import { useMe } from "../../hooks/queries/useUser";

function HeartLetterPage() {
    const user = useMe();

    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const { data: letters, isLoading, isError, error } = useHeartLetters(userId);

    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>
    }

    if (isError) {
        return <div>데이터를 가져오는데 실패했습니다: {error.message}</div>
    }

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {letters && Array.isArray(letters) ? (
                    letters.map((heartletter, index) => (
                        // userID 뒤에 고유한 index를 붙여서 식별자를 유일하게 만들기 위함
                        <li key={`${heartletter.userId}-${index}`} css={s.letterList}>
                            <span>{heartletter.createdAt}</span>
                            <span>{heartletter.title}</span>
                            <span>받는 마음: {heartletter.recipient}</span>
                        </li>
                    ))
                ) : (
                    <li>표시할 데이터가 없습니다.</li>
                )}
            </ul>
        </div>
    );
}     
export default HeartLetterPage;

