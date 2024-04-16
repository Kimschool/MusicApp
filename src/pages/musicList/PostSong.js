import { useState } from "react";
import "./PostSong.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


// HTML 엔티티를 디코딩하는 함수
function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}
const PostSong = () => {
    const [formData, setFormData] = useState({
        song: "",
        searchResults: [] // Initialize search results as an empty array
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const searchQuery = encodeURIComponent(formData.song); // Encode search query
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=AIzaSyBGiZzA7476f7x48yp25UYKYn_IoxC6XjU&part=snippet&maxResults=3`,{
                method: "GET",
            });

            if(response.ok) {
                const data = await response.json();
                // 디코딩하여 제목을 정상적으로 표시
                const searchResults = data.items.map(item => ({
                    ...item,
                    snippet: {
                        ...item.snippet,
                        title: decodeHTMLEntities(item.snippet.title)
                    }
                }));
                setFormData({
                    ...formData,
                    searchResults: searchResults || [],
                    isSearchVisible: true
                });
            } else {
                throw new Error("Failed to fetch search results");
            }
        } catch(error){
            console.error("Error fetching search results: ", error);
        }
    }

    const handleSongClick = (selectedSong) => {
        // 알림창을 표시하여 사용자의 선택을 받음
        const confirmMessage = "選択した曲を送信しますか？";
        if (window.confirm(confirmMessage)) {
            // "はい" 버튼을 누른 경우
            sendSongToServer(selectedSong);
        } else {
            // "いいえ" 버튼을 누른 경우
            // 검색 화면으로 돌아가기 위해 navigate 함수를 사용하여 홈 화면으로 이동
            navigate("/");
        }
    }


    const sendSongToServer = async (selectedSong) => {
        try {
            const response = await fetch("http://localhost:8080/api/addToPlaylist", {
                method: "POST",
                mode: "cors", // CORS 요청을 보냄
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ song: selectedSong })
            });

            if(response.ok) {
                alert("Song added to playlist successfully!");
            } else {
                throw new Error("Failed to add song to playlist");
            }
        } catch(error){
            console.error("Error adding song to playlist: ", error);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Request your favorite song!!</h1>
                <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <Form.Group controlId="formBasicName" autoComplete="off">
                        <Form.Control
                            type="text"
                            name="song"
                            placeholder="曲を入力してください"
                            value={formData.song}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" disabled={!formData.song}>
                        検索
                    </Button>
                </Form>
                <div className={`youtube-container ${formData.isSearchVisible ? 'visible' : ''}`}>
                    <h2>検索結果</h2>
                    <ul>
                        {formData.searchResults.map((item, index) => (
                            <div key={index} onClick={() => handleSongClick(item)}>
                                <div>
                                    {/* 유튜브 섬네일 이미지 표시 */}
                                    <img src={item.snippet.thumbnails.default.url} alt="Thumbnail"/>
                                </div>
                                <div>
                                    {/* 검색 결과 제목 표시 */}
                                    <p>{item.snippet.title}</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PostSong;
