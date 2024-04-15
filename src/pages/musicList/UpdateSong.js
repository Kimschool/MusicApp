import './UpdateSong.css';
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";

const UpdateSong = () =>{
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        song: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchMusicList = async () =>{
            try{
                const response = await fetch(`http://localhost:8080/api/musicList/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch(error){
                console.error("Error fetching user: ", error.message);
            }
        }
        fetchMusicList();
    },[id]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        console.log(formData);

        try{
            // eslint-disable-next-line no-template-curly-in-string
            const response = await fetch(`http://localhost:8080/api/musicList/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("User updated: ", data);

            navigate(`/`)
        } catch(error){
            console.error("Error updating user: ", error.message);
        }
    }

    return(
        <>
            <div className="center-form">
                <h1>Edit MusicList</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName" autoComplete="off">
                        <Form.Control
                            type="text"
                            name="singer"
                            placeholder="歌手のお名前を入力してください"
                            defaultValue={formData.singer}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName" autoComplete="off">
                        <Form.Control
                            type="title"
                            name="title"
                            placeholder="タイトルを入力してください"
                            defaultValue={formData.title}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        検索
                    </Button>
                </Form>
                <div className="youtube-container">
                    <h2>検索結果</h2>
                    {/*ユーチューブのAPIを入れる*/}
                    {/*<div className="youtube-video">*/}
                    {/*    <iframe*/}
                    {/*        width="859"*/}
                    {/*        height="483"*/}
                    {/*        src="https://www.youtube.com/embed/P9tKTxbgdkk"*/}
                    {/*        title="TXT (투모로우바이투게더) 'Sugar Rush Ride' Official MV"*/}
                    {/*        frameBorder="0"*/}
                    {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*        referrerPolicy="strict-origin-when-cross-origin"*/}
                    {/*        allowFullScreen*/}
                    {/*    ></iframe>*/}
                    {/*</div>*/}
                    <Button variant="primary" className="btn-request">
                        修正
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UpdateSong;