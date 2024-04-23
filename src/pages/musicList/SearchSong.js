import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./SearchSong.css";
import ConfirmationModal from "../modal/ConfirmationModal";
import AutoModal from "../modal/AutoModal";

// HTML 엔티티를 디코딩하는 함수
function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

const SearchSong = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false); // showModal 상태 변수 추가
    const [autoShowModal, setAutoShowModal] = useState(false); // showModal 상태 변수 추가
    const [selectedSong, setSelectedSong] = useState(null); // selectedSong 상태 변수 추가
    const [modalMessage, setModalMessage] = useState(""); // 모달에 표시할 메시지 상태 변수 추가
    const [countdown, setCountdown] = useState(3); // 카운트 다운 상태 변수 추가


    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchQuery = encodeURIComponent(location.state.song);
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=AIzaSyBGiZzA7476f7x48yp25UYKYn_IoxC6XjU&part=snippet&maxResults=10`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    // 디코딩하여 제목을 정상적으로 표시
                    const decodedResults = data.items.map(item => ({
                        ...item,
                        snippet: {
                            ...item.snippet,
                            title: decodeHTMLEntities(item.snippet.title)
                        }
                    }));
                    setSearchResults(decodedResults);
                } else {
                    throw new Error("Failed to fetch search results");
                }
            } catch (error) {
                console.error("Error fetching search results: ", error);
            }
        };

        fetchData();
    }, [location.state.song]);

    const handleSongClick = (selectedSong) => {
        setSelectedSong(selectedSong);
        setModalMessage("選択した曲を送信しますか？");
        setShowModal(true);
    };

    const handleConfirm = () => {
        // 여기서 선택된 노래를 서버로 보냅니다.
        sendSongToServer(selectedSong);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const sendSongToServer = async (selectedSong) => {
        try {
            const response = await fetch("http://localhost:8080/api/addToPlaylist", {
                method: "POST",
                mode: "cors", // CORS 요청을 보냄
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ song: selectedSong })
            });

            if(response.ok) {
                setModalMessage("リクエスト承りました💖");
                setAutoShowModal(true); // 카운트 다운 시작
            } else {
                setModalMessage("もう一度やり直してください🚫");
                setAutoShowModal(true); // 카운트 다운 시작
            }

        } catch(error){
            console.error("Error adding song to playlist: ", error);
            setModalMessage("もう一度やり直してください🚫");
            setAutoShowModal(true); // 카운트 다운 시작
        } finally {
            setShowModal(true);
            startCountdown(); // 카운트 다운 시작
        }
    }

    const startCountdown = () => {
        let count = 3; // 초기 카운트 다운 값
        setCountdown(count); // 초기값 설정
        
        let timer = setInterval(() => {
            count--; // 현재 카운트 다운 값을 1씩 감소
            setCountdown(count); // 감소된 값을 countdown 상태로 설정
            if (count === 0) { // 카운트 다운이 0이 되면
                clearInterval(timer); // 타이머를 멈추고
                setShowModal(false); // showModal을 false로 설정하여 모달을 닫습니다.
                setAutoShowModal(false); // AutoModal 창도 함께 닫습니다.
            }
        }, 1000);
    };
    


    const handleBack = () => {
        navigate("/");
    };

    return (
        <>
            <ConfirmationModal
                message={`${modalMessage}`}
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
            />
            <AutoModal
                message={`${modalMessage}`}
                show={autoShowModal}
                countdown={`${countdown}秒後自動で閉まります。`}
                onHide={() => setAutoShowModal(false)} // countdown이 0이 되면 AutoModal 창을 닫습니다.
            />
            <div className="center-form2">
                <h1 className="mochiy-pop-one-regular">検索結果</h1>
                <ul>
                    {searchResults.map((item, index) => (
                        <div key={index} onClick={() => handleSongClick(item)}>
                            <div>
                                <img src={item.snippet.thumbnails.default.url} alt="Thumbnail" />
                            </div>
                            <div>
                                <p>{item.snippet.title}</p>
                            </div>
                        </div>
                    ))}
                </ul>
                <Button className="button" onClick={handleBack}>
                    検索ページへ戻る
                </Button>
            </div>
        </>
    );
};

export default SearchSong;
