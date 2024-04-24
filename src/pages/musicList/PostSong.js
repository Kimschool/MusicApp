import React, { useState } from "react";
import "./PostSong.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostSong = () => {
    const [formData, setFormData] = useState({
        song: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/search", { state: { song: formData.song } });
    };

    return (
        <div className="center-form">
            <h1 className="mochiy-pop-one-regular">音楽リクエスト🎵</h1>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="formBasicName" autoComplete="off">
                    <Form.Control
                        type="text"
                        name="song"
                        placeholder="👉ここから入力👈"
                        value={formData.song}
                        onChange={handleInputChange}
                    />
                    <Form.Text className="mochiy-pop-one-regular" style={{color:"yellow"}}>
                        あなたの好きな曲を入れてください！
                    </Form.Text>
                </Form.Group>
                <Button type="submit" className="w-100" disabled={!formData.song}>
                    検索
                </Button>
            </Form>
        </div>
    );
};

export default PostSong;