import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import Main from "./main/Main.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedComponent from "./protectedComponent/ProtectedComponent.jsx";
import SendingContext from "../contexts/SendingContext.js";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";
import { registration, authorization, getUserData } from "../utils/auth.js";


function App () {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isResultLoginPopupOpen, setIsResultLoginPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccessful, setIsSaccessful] = useState(false);

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeletePopupClick (cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsResultLoginPopupOpen(false);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDelete (event) {
    event.preventDefault();
    setIsSending(true);
    api.deleteCard(deleteCardId, localStorage.jwt)
    .then(() => {
      setCards(cards.filter((item) => {
        return item._id !== deleteCardId;
      }));
      closeAllPopups();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleUpdateUser (userData, reset) {
    setIsSending(true);
    api.setUserInfo(userData, localStorage.jwt)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar (userData, reset) {
    setIsSending(true);
    api.setUserAvatar(userData, localStorage.jwt)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit (userData, reset) {
    setIsSending(true);
    api.addPhoto(userData, localStorage.jwt)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleRegistration (password, email) {
    setIsSending(true);
    registration(password, email)
    .then(() => {
      setIsResultLoginPopupOpen(true);
      setIsSaccessful(true);
      window.scrollTo(0, 0);
      navigate("/sign-in");
    })
    .catch((err) => {
      setIsResultLoginPopupOpen(true);
      setIsSaccessful(false);
      console.error(err);
    })
    .finally(() => setIsSending(false));
  }

  function handleLogin (password, email) {
    setIsSending(true);
    authorization(password, email)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setUserEmail(email);
      setLoggedIn(true);
      window.scrollTo(0, 0);
      navigate("/");
    })
    .catch((err) => {
      setIsResultLoginPopupOpen(true);
      setIsSaccessful(false);
      console.error(err);
    })
    .finally(() => setIsSending(false));
  }

  useEffect (() => {
    if (loggedIn) {
    setIsLoading(true);
    Promise.all([api.getUserProfileInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserData(jwt)
      .then((res) => {
        setUserEmail(res.email);
        setLoggedIn(true);
      })
      .catch((err) => console.error(err));
    } else {
      setLoggedIn(false);
    }
  }

  useEffect (() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <div className="root">

          <SendingContext.Provider value={isSending}>
            <Routes>
              <Route path="/" element={<ProtectedRoute
                element={ProtectedComponent}
                setLoggedIn={setLoggedIn}
                userEmail={userEmail}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                isLoading={isLoading}
                onClickDelete={handleDeletePopupClick}
                loggedIn={loggedIn} />
              } />
              <Route path="/sign-up" element={
                <>
                  <Header name="signup" />
                  <Main name="signup" handleRegistration={handleRegistration} />
                </>
              } />
              <Route path="/sign-in" element={
                loggedIn ? <Navigate to={"/"} /> :
                <>
                  <Header name="signin" />
                  <Main name="signin" handleLogin={handleLogin} />
                </>
              } />
              <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
          </SendingContext.Provider>

          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            textButton="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            isSending={isSending}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="resultLogin"
            isSuccessful={isSuccessful}
            isOpen={isResultLoginPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
