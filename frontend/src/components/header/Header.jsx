import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";

function Header ({ name, userEmail, setLoggedIn }) {

function onSignOut () {
  localStorage.removeItem("jwt");
  setLoggedIn(false);
}

  return (
    <header className="header root__section-header">
      <img
        className="header__logo"
        src={logo}
        alt="изображение логотипа"
      />
      {name === "signup" || name === "signin" ?
        <Link to={name === "signup" ? "/sign-in" : "/sign-up"} className="header__link">
          {name === "signup" ? "Войти" : "Регистрация"}
        </Link>
        :
        <>
          <div className="header__nav-container">
            <p className="header__email">{userEmail}</p>
            <Link to={"/sign-in"} className="header__unlogin" onClick={onSignOut}>Выйти</Link>
          </div>
        </>
      }
    </header>
  );
}

export default Header;