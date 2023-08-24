import { useRef } from "react";
import useFormValidation from "../../hooks/useFormValidation.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const input = useRef();
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

  function resetAfterClose () {
    onClose();
    reset();
  }

  function handleSubmit (event) {
    event.preventDefault();
    onUpdateAvatar({ linkAvatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetAfterClose}
      isSending={isSending}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        ref={input}
        name="linkAvatar"
        id="input-linkAvatar"
        type="url"
        placeholder="Ссылка на картинку"
        className={`popup__input-text ${isInputValid.linkAvatar === undefined || isInputValid.linkAvatar ? "" : "popup__input-text_invalid"}`}
        required
        value={values.linkAvatar ? values.linkAvatar : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span
        id="input-linkAvatar-error"
        className="popup__error popup__error_visible">
          {errors.linkAvatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;