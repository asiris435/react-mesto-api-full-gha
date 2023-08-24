import Header from "../header/Header";
import Main from "../main/Main";


function ProtectedComponent ({ userEmail, setLoggedIn, ...props }) {
    return (
        <>
            <Header userEmail={userEmail} setLoggedIn={setLoggedIn} />
            <Main name="main" {...props} />
        </>
    );
}

export default ProtectedComponent;