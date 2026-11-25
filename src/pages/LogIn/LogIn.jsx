import LogInput from "../../components/LogInput/LogInput";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Cookies from "js-cookie";
import Button from "../../components/Button/Button";

const Login = ({ setUserToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location login =>", location);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // récupérer les values des input
    // console.log(password, email); // vérif des infos
    try {
      // les ajouter à une requête axios
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
      );
      console.log(response.data);
      // constater la réponse
      // si celle-ci contient un token
      if (response.data.token) {
        // on le stock dans les cookies
        Cookies.set("userToken", response.data.token, { expires: 14 });
        // on actualise le state userToken (pour l'affichage du header) :
        setUserToken(response.data.token);
        // puis on redirige l'utilisateur vers home
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      // sinon, on affiche un message d'erreur
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(error.message);
    }
  };

  return (
    <main className="login">
      <div className="container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <LogInput
            value={email}
            setValue={setEmail}
            type="email"
            placeholder="Email"
            id="email"
          />
          <LogInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Mot de passe"
            id="password"
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Button text="Se connecter" className="big-button blue-button" />
        </form>
        {location.state ? (
          <Link
            to="/signup"
            className="switch"
            state={{ from: location.state.from }}
          >
            Pas encore de compte ? Inscris-toi !
          </Link>
        ) : (
          <Link to="/signup" className="switch">
            Pas encore de compte ? Inscris-toi !
          </Link>
        )}
      </div>
    </main>
  );
};

export default Login;
