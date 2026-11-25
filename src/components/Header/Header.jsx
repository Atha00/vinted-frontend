import "./index.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../Button/Button";

const Header = ({
  userToken,
  setUserToken,
  title,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {
  const location = useLocation();
  // console.log("location =>", location);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div className="filters">
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder={"Recherche des articles"}
          />
          {location.pathname === "/" ? (
            <div>
              <label htmlFor="priceMin">Prix minimum</label>
              <input
                type="number"
                id="priceMin"
                value={priceMin}
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
              <label htmlFor="priceMax">Prix maximum</label>
              <input
                type="number"
                id="priceMax"
                value={priceMax}
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="connecting-buttons">
          {userToken ? (
            <Button
              active={() => {
                Cookies.remove("userToken");
                setUserToken(null);
              }}
              text="Se déconnecter"
              className="little-button red-button"
            />
          ) : (
            <>
              <Link to="/signup">
                <Button
                  text="S'inscrire"
                  className="little-button white-button"
                />
              </Link>
              <Link to="/login">
                <Button
                  text="Se connecter"
                  className="little-button white-button"
                />
              </Link>
            </>
          )}
        </div>
        <Link to="/publish">
          <Button
            text="Vends tes articles"
            className="little-button blue-button"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
