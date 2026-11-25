import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Offer from "./pages/Offer/Offer";
import SignUp from "./pages/SignUp/SignUp";
import Cookies from "js-cookie";
import Login from "./pages/LogIn/LogIn";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);

  return (
    <>
      <Router>
        <Header
          userToken={userToken}
          setUserToken={setUserToken}
          title={title}
          setTitle={setTitle}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home title={title} priceMin={priceMin} priceMax={priceMax} />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<SignUp setUserToken={setUserToken} />}
          />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
          <Route path="/publish" element={<Publish userToken={userToken} />} />
          <Route path="/payment" element={<Payment userToken={userToken} />} />
          <Route
            path="*"
            element={
              <main>
                <div className="container">
                  <p>Vous n'avez rien à faire ici !</p>
                </div>
              </main>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
