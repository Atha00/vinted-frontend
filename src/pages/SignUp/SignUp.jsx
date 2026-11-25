import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LogInput from "../../components/LogInput/LogInput";
import Button from "../../components/Button/Button";

const SignUp = ({ setUserToken }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // récupérer les values des input
    // console.log(username, password, email); // vérif des infos
    try {
      // les ajouter à une requête axios
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsLetter,
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
        navigate("/");
      }
    } catch (error) {
      // sinon, on affiche un message d'erreur
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(error.message);
    }
  };

  return (
    <main className="signup">
      <div className="container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Nom d'utilisateur"
            id="username"
            // autocomplete="off"
          />
          <LogInput
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Email"
            id="email"
            // autocomplete="off"
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <LogInput
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Mot de passe"
            id="password"
          />
          <div className="newsletter">
            <div>
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                checked
                onChange={(event) => {
                  setNewsLetter(event.target.checked);
                }}
              />
              <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <Button text="S'inscrire" className="big-button blue-button" />
        </form>
        <Link to="/login" className="switch">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </div>
    </main>
  );
};

export default SignUp;
