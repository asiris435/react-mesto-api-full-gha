function ImagePopup ({ card, isOpen, onClose }) {
  return (
    <section
      aria-label="Place-image"
      className={`popup popup_theme_dark ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__place-image">
        <img 
          className="popup__place-item" 
          src={card.link ? card.link : "#"} 
          alt={card.name ? `Изображение ${card.name}` : "#"} 
        />
        <p className="popup__place-title">{card.name}</p>
        <button aria-label="Close" type="button" className="popup__close" onClick={onClose}/>
      </div>
    </section>
  );
}

export default ImagePopup;