import React from "react"
import * as near from 'near-api-js';

const Buy = ({ token, price, owner }) => {
  // Create an scoped async function in the hook
  const [showButton, setShowButton] = React.useState()

  React.useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()
    && window.walletConnection.getAccountId() !== owner) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  },[owner]);

  const buy = () => {
    if (window.walletConnection.isSignedIn()) {
      const data = { "token_id": `${token}` }
      window.contract.buy_token(data, undefined, near.utils.format.parseNearAmount(price.toString()))
    }
  };

  if (showButton) {
    return (
      <span> <button onClick={buy}> Acquista!</button></span>
    )
  } else {
    return (``)
  }
};

export default Buy