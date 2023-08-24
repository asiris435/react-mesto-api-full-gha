import Popup from "../popup/Popup";

function InfoTooltip ({ name, isSuccessful, isOpen, onClose }) {
    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className={`popup__login-image ${!isSuccessful ? "popup__login-image_type_error" : ""}`}/>
            <h3 className="popup__login-text">{isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
        </Popup>
    );
}

export default InfoTooltip;