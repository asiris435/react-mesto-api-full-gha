import { useContext } from "react";
import SendingContext from "../../contexts/SendingContext";


function Form ({ name, textButton, children, onSubmit, isValid }) {
    const isSending = useContext(SendingContext);
    
    return (
        
        <form noValidate name={name} onSubmit={onSubmit} className="form__input">
            {children}
            {name === "signin" || name === "signup" ?
             <button type="submit" className={`form__submit-button ${isSending ? "form__submit-button_loading" : ""} ${isValid ? "" : "form__submit-button_invalid"}`}>
                {isSending ? "" : textButton || "Сохранить"}
             </button>
             :
             <button type="submit" className={`popup__submit-button ${isSending ? "popup__submit-button_loading" : ""} ${isValid ? "" : "popup__submit-button_invalid"}`}>
                {isSending ? "" : textButton || "Сохранить"}
             </button> }
        </form>
    );
}

export default Form;