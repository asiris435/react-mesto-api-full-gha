import { useContext, useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset, setValue } = useFormValidation();

  function resetAfterClose () {
    onClose();
    reset({ username: currentUser.name, job: currentUser.about });
  }

  function handleSubmit (event) {
    event.preventDefault();
    onUpdateUser({ username: values.username, job: values.job }, reset);
  }

  useEffect(() => {
    setValue("username", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, setValue]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetAfterClose}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmit}
    >
      <input
        name="username"
        id="input-name"
        type="text"
        placeholder="Имя"
        className={`popup__input-text ${isInputValid.username === undefined || isInputValid.username ? "" : "popup__input-text_invalid"}`}
        required
        minLength={2}
        maxLength={40}
        value={values.username ? values.username : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span
        id="input-name-error"
        className="popup__error popup__error_visible">
          {errors.username}
      </span>
      <input
        name="job"
        id="input-job"
        type="text"
        placeholder="О себе"
        className={`popup__input-text ${isInputValid.job === undefined || isInputValid.job ? "" : "popup__input-text_invalid"}`}
        required
        minLength={2}
        maxLength={200}
        value={values.job ? values.job : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span
        id="input-job-error"
        className="popup__error popup__error_visible">
          {errors.job}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;