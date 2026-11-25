import "./index.css";
import Button from "../Button/Button";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ infos }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (!elements) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(submitError.message);
      return;
    }

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
      {
        title: infos.title,
        amount: infos.amount * 1.3, // le prix indiqué dans l'annonce + les taxes
      },
    );

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements,
      clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirection
      redirect: "if_required",
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // On a fini de charger
    setIsLoading(false);
  };
  return completed ? (
    <p>Vous avez bien finalisé l'achat de {infos.title} ! Félicitations 🎉 !</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <section>
        <div>
          <h1>Résumé de la commande</h1>
          <div>
            <p>Commande</p>
            <p>{infos.amount} €</p>
          </div>
          <div>
            <p>Frais de protection acheteur</p>
            <p>{(infos.amount * 0.1).toFixed(2)} €</p>
          </div>
          <div>
            <p>Frais de port</p>
            <p>{(infos.amount * 0.2).toFixed(2)} €</p>
          </div>
        </div>
        <div>
          <div>
            <p>Total</p>
            <p>{(infos.amount * 1.3).toFixed(2)} €</p>
          </div>
        </div>
        <div>
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir {infos.title}.
            Vous allez payer {(infos.amount * 1.3).toFixed(2)} € (frais de
            protection et frais de port inclus).
          </p>
        </div>
      </section>
      <PaymentElement />
      <Button
        className="green-button big-button"
        text="Pay"
        disabled={!stripe || !elements || isLoading}
      />
      {errorMessage && <p className="red">{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
