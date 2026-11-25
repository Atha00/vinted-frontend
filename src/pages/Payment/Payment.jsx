import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP",
);
const Payment = ({ userToken }) => {
  const location = useLocation();
  console.log(location);

  let options;
  if (location.state) {
    options = {
      // Type de transaction
      mode: "payment",
      // Montant de la transaction
      amount: location.state.amount * 100,
      // Devise de la transaction
      currency: "eur",
      // On peut customiser l'apparence ici
      appearance: {},
    };
  }

  return userToken ? (
    <main className="payment">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm infos={location.state} />
      </Elements>
    </main>
  ) : location.state ? (
    <Navigate to="/login" state={{ from: `/offer/${location.state.id}` }} />
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
