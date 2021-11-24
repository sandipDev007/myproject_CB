/* eslint-disable eqeqeq */
import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  render() {
    const onSuccess = payment => {
      console.log("Payment successful!", payment);
      console.log(payment.paid);
      sessionStorage.setItem("paid", payment.paid);
      sessionStorage.setItem("payerID", payment.payerID);
      sessionStorage.setItem("paymentID", payment.paymentID);

      if (payment.paid == "true") {
        this.props.history.push("/exapp");
      }
    };

    const onCancel = data => {
      console.log("Payment cancelled!", data);
    };

    const onError = err => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = sessionStorage.getItem("amount");


console.log(sessionStorage.getItem("amount"))

    const client = {
      sandbox:
        "AZcAaqYEmEKtcEdnVRAJytGhaZKKZJuQdOrq1v95vHcHZaUUIvpp6CP1AZnQpx8ZkwoNQUcnX2UB4fYO"
    };

    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        callback
      />
    );
  }
}
