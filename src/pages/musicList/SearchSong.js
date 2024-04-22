import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./SearchSong.css";
import ConfirmationModal from "../modal/ConfirmationModal";

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
    const [selectedSong, setSelectedSong] = useState(null); // selectedSong 상태 변수 추가


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
        setShowModal(true);
        // const confirmMessage = "選択した曲を送信しますか？";
        // if (window.confirm(confirmMessage)) {
        //     sendSongToServer(selectedSong);
        // } else {
        //     navigate("/");
        // }
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
                alert("リクエスト承りました💖");
            } else {
                throw new Error("もう一度やり直してください🚫");
            }

        } catch(error){
            console.error("Error adding song to playlist: ", error);
        }
    }

    const handleBack = () => {
        navigate("/");
    };

    return (
        <>
            <ConfirmationModal
                message="選択した曲を送信しますか？"
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
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
