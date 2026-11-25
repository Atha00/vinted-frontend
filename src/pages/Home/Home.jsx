import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ title, priceMin, priceMax }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
      if (title) {
        filters += `?title=${title}`;
      }
      if (priceMin) {
        if (filters) {
          filters += `&priceMin=${priceMin}`;
        } else {
          filters += `?priceMin=${priceMin}`;
        }
      }
      if (priceMax) {
        if (filters) {
          filters += `&priceMax=${priceMax}`;
        } else {
          filters += `?priceMax=${priceMax}`;
        }
      }
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers${filters}`,
        );
        //   console.log(response.data); // OK
        console.log("data useEffect");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, priceMax, priceMin]);

  return (
    <main className="home">
      <div className="container">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <section>
            {data.offers.map((element) => {
              //   console.log(element);
              //  {
              //     "_id": "6afd8f6313175474fd24fada",
              //     "product_name": "Jersey cuello romantico Springfield",
              //     "product_description": "Jersey de punto suave de Springfield. Color beige. Cuello bebe o romántico. Talla M.",
              //     "product_price": 28,
              //     "product_details": [
              //         {
              //             "MARQUE": "SPRINGFIELD "
              //         },
              //         {
              //             "TAILLE": "M / 38 / 10"
              //         },
              //         {
              //             "ÉTAT": "NEUF AVEC ÉTIQUETTE"
              //         },
              //         {
              //             "COULEUR": "BEIGE"
              //         },
              //         {
              //             "EMPLACEMENT": "MALAGA, ESPAÑA"
              //         }
              //     ],
              //     "product_pictures": [
              //         {
              //             "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1795002211/api/vinted-v2/offers/6afd8f6313175474fd24fada/s4hgwcxybfsuzwxyyixx.jpg",
              //         }
              //     ],
              //     "owner": {
              //         "account": {
              //             "username": "Emiliano_Spinka92",
              //             "avatar": {
              //                 "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1795002145/api/vinted-v2/users/6afd8f2113175474fd24fab5/avatar.png",
              //             }
              //         },
              //         "_id": "6afd8f2113175474fd24fab5"
              //     },
              //     "product_image": {
              //         "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1795002211/api/vinted-v2/offers/6afd8f6313175474fd24fada/preview.jpg",
              //     },
              //     "product_date": "2026-11-18T11:43:31.041Z",
              //     "__v": 0
              // }
              return (
                <article key={element._id}>
                  <div>
                    {element.owner.account.avatar && (
                      <img
                        src={element.owner.account.avatar.secure_url}
                        alt="avatar"
                        className="avatar"
                      />
                    )}

                    <span>{element.owner.account.username}</span>
                  </div>
                  {/* <Link to={"/offer/" + element._id}> */}
                  <Link to={`/offer/${element._id}`} className="article-link">
                    <img
                      src={element.product_image.secure_url}
                      alt="aperçu de l'offre"
                    />
                    <p>{element.product_price} €</p>
                    {element.product_details.map((detailObject, index) => {
                      return detailObject.TAILLE ? (
                        <p key={detailObject.TAILLE + index}>
                          {detailObject.TAILLE}
                        </p>
                      ) : (
                        detailObject.MARQUE && (
                          <p key={detailObject.MARQUE + index}>
                            {detailObject.MARQUE}
                          </p>
                        )
                      );
                    })}
                  </Link>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
