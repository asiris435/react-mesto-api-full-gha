import { useEffect, useState } from "react";
import api from "../../utils/api.js";

function LikeButton ({ likes, myId, cardId }) {
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(likes.length);

    function handleCardLike () {
        if (isLiked) {
            api.deleteLike(cardId, localStorage.jwt)
            .then((res) => {
                setIsLiked(false);
                setCount(res.likes.length);
            })
            .catch((err) => console.error(err));
        } else {
            api.addLike(cardId, localStorage.jwt)
            .then((res) => {
                setIsLiked(true);
                setCount(res.likes.length);
            })
            .catch((err) => console.error(err));
        }
    }

    useEffect(() => {
        setIsLiked(likes.some(item => myId === item._id));
    }, [likes, myId])

    return (
        <>
            <button aria-label="Like" type="button" className={`elements__like-button ${isLiked ? "elements__like-button_active" : ""}`} onClick={handleCardLike}/>
            <span className="elements__counter">{count}</span>
        </>
    );
}

export default LikeButton;
