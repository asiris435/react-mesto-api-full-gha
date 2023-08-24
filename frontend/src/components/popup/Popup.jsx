function Popup ({ name, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={onClose}>
            <div
                className={`${name === "placeImage" ? "popup__place-image" : "popup__container"} ${name === "resultLogin" ? "popup__container_type_login" : ""}`}
                onMouseDown={(event) => event.stopPropagation()}>
                <button aria-label="Close" type="button" className="popup__close" onClick={onClose}/>
                {children}
            </div>
        </div>
    );
}

export default Popup;