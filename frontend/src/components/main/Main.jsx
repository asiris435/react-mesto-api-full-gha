import { useContext } from "react";
import Card from "../card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator.jsx";
import Register from "../register/Register.jsx";
import Login from "../login/Login.jsx";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, isLoading, onClickDelete, name, handleRegistration, handleLogin }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {name === "main" ?
        <> 
          <section className="profile content__section-profile">
          <button onClick={onEditAvatar}
            aria-label="Update avatar"
            type="button"
            className="profile__avatar-button"
          >
            <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : "#"} alt="Изображение" />
          </button>
          <div className="profile__info">
            <div className="profile__info-groupe">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ""}</h1>
              <button onClick={onEditProfile}
                aria-label="Edit profile"
                type="button"
                className="profile__edit-button"
              />
            </div>
            <p className="profile__job">{currentUser.about ? currentUser.about : ""}</p>
          </div>
          <button onClick={onAddPlace}
            aria-label="Add a foto"
            type="button"
            className="profile__add-button"
          />
          </section>
          <section aria-label="photo gallery" className="elements">
            <ul className="elements__list">
              {isLoading ? <LoadingIndicator /> : cards.map((data) => {
                return (
                  <Card card={data} key={data._id} onCardClick={onCardClick} onClickDelete={onClickDelete}/>
                );
              })}
            </ul>
          </section>
        </>
      :
      name === "signup" ?
        <Register name={name} handleRegistration={handleRegistration} />
        :
        <Login  name={name} handleLogin={handleLogin} />
      }
    </main>
  );
}

export default Main;