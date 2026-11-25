import "./index.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`,
        );
        console.log("offer data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);
  return (
    <main className="offer">
      <div className="container">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <img src={data.product_image.secure_url} alt="aperçu de l'image" />
            <aside>
              <section className="top-aside">
                <p>{data.product_price} €</p>
                {data.product_details.map((element, index) => {
                  // console.log("map =>", element); // {EMPLACEMENT: 'PARIS, FRANCE'}
                  const currentKey = Object.keys(element)[0]; // EMPLACEMENT
                  return (
                    <div key={currentKey + index}>
                      <span>{currentKey}</span>
                      <span>{element[currentKey]}</span>
                    </div>
                  );
                })}
              </section>
              <section className="bottom-aside">
                <h1>{data.product_name}</h1>
                <p>{data.product_description}</p>
                <div className="owner">
                  {data.owner.account.avatar && (
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt="profil owner"
                    />
                  )}
                  <p>{data.owner.account.username}</p>
                </div>
                <Link
                  to="/payment"
                  state={{
                    amount: data.product_price,
                    title: data.product_name,
                    id: data._id,
                  }}
                >
                  <Button className="big-button blue-button" text="Acheter" />
                </Link>
              </section>
            </aside>
          </>
        )}
      </div>
    </main>
  );
};

export default Offer;
