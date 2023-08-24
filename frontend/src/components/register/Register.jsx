import useFormValidation from "../../hooks/useFormValidation.js";
import LoginSection from "../loginSection/LoginSection.jsx";
import SendingContext from "../../contexts/SendingContext.js";
import { useContext } from "react";

function Register ({ name, handleRegistration }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation();
    const isSending = useContext(SendingContext); 
 
     function onRegister (event) {
         event.preventDefault();
         handleRegistration( values.password, values.email);
     }
 
     return (
         <LoginSection name={name} onSubmit={onRegister} isValid={isValid}>
             <input 
                 name="email"
                 type="email"
                 placeholder={"Email"}
                 className={`form__input-text ${isInputValid.email === undefined || isInputValid.email ? "" : "form__input-text_invalid"}`}
                 value={values.email || ""}
                 onChange={handleChange}
                 disabled={isSending}
             />
             <span
              id="input-email-error"
              className="form__error">
                {errors.email}
             </span>
             <input 
                 name="password"
                 type="password"
                 placeholder={"Пароль"}
                 className={`form__input-text ${isInputValid.password === undefined || isInputValid.password ? "" : "form__input-text_invalid"}`}
                 minLength={3}
                 value={values.password || ""}
                 onChange={handleChange}
                 disabled={isSending}
             />
             <span
              id="input-password-error"
              className="form__error">
                {errors.password}
             </span>
         </LoginSection>
     );
 }

export default Register;