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
                    searchResults: searchResults || []
                });
            } else {
                throw new Error("Failed to fetch search results");
            }
        } catch(error){
            console.error("Error fetching search results: ", error);
        }
    }

    const handleSongClick = (selectedSong) => {
        // 클릭된 곡 정보를 서버로 전송
        sendSongToServer(selectedSong);
    }

    const sendSongToServer = async (selectedSong) => {
        try {
            const response = await fetch("/api/addToPlaylist", {
                method: "POST",
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
                    <Button variant="primary" type="submit" className="w-100">
                        検索
                    </Button>
                </Form>
                <div className="youtube-container">
                    <h2>検索結果</h2>
                    <ul>
                        {formData.searchResults.map((item, index) => (
                            <li key={index} onClick={() => handleSongClick(item)}>
                                <div>
                                    {/* 유튜브 섬네일 이미지 표시 */}
                                    <img src={item.snippet.thumbnails.default.url} alt="Thumbnail" />
                                </div>
                                <div>
                                    {/* 검색 결과 제목 표시 */}
                                    <p>{item.snippet.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PostSong;
