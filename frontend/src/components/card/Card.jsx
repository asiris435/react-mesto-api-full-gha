import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LikeButton from "../likeButton/LikeButton.jsx";

function Card ({ card, onCardClick, onClickDelete }) {
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <li className="elements__card">
            <img 
                className="elements__item" 
                src={card.link} 
                alt={`Изображение ${card.name}`} 
                onClick={() => onCardClick({name: card.name, link: card.link})}
            />
            {currentUser._id === card.owner._id && <button aria-label="Delete" type="button" className="elements__delete-button" onClick={() => onClickDelete(card._id)}/>}
            <div className="elements__groupe">
                <h2 className="elements__title">{card.name}</h2>
                <LikeButton likes={card.likes} myId={currentUser._id} cardId={card._id}/>
            </div>
        </li>
    );
}

export default Card;