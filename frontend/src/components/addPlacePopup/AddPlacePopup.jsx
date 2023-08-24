import useFormValidation from "../../hooks/useFormValidation.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isSending }) {
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

    function resetAfterClose () {
        onClose();
        reset();
    }

    function handleSubmit (event) {
        event.preventDefault();
        onAddPlace({ title: values.title, link: values.link }, reset);
    }

    return (
        <PopupWithForm
            name="add-photo"
            title="Новое место"
            textButton="Создать"
            isOpen={isOpen}
            onClose={resetAfterClose}
            isValid={isValid} 
            isSending={isSending}
            onSubmit={handleSubmit} 
        >
            <input
              name="title"
              id="input-place"
              type="text"
              placeholder="Название"
              className={`popup__input-text ${isInputValid.title === undefined || isInputValid.title ? "" : "popup__input-text_invalid"}`}
              required
              minLength={2}
              maxLength={30}
              value={values.title ? values.title : ""}
              disabled={isSending}
              onChange={handleChange}
            />
            <span
              id="input-place-error"
              className="popup__error popup__error_visible">
                {errors.title}
            </span>
            <input
              name="link"
              id="input-link"
              type="url"
              placeholder="Ссылка на картинку"
              className={`popup__input-text ${isInputValid.link === undefined || isInputValid.link ? "" : "popup__input-text_invalid"}`}
              required
              value={values.link ? values.link : ""}
              disabled={isSending}
              onChange={handleChange}
            />
            <span
              id="input-link-error"
              className="popup__error popup__error_visible">
                {errors.link}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;