import { Link } from "react-router-dom";
import Form from "../form/Form";

function LoginSection ({ name, children, isValid, onSubmit }) {
    return (
        <section className="form">
            <div className="form__container">
                <h3 className="form__title">{name === "signup" ? "Регистрация" : "Вход"}</h3>
                <Form 
                    name={name}
                    textButton={name === "signup" ? "Зарегистрироваться" : "Войти"}
                    children={children}
                    isValid={isValid}
                    onSubmit={onSubmit}
                />
                {name === "signup" && <p className="form__subtitle">Уже зарегистрированы? <Link to={"/sign-in"} className="form__subtitle_link">Войти</Link></p>}
            </div>
        </section>
    );
}

export default LoginSection;