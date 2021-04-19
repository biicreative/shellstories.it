import React from "react"
import * as BN from "bn.js"

function convertNearToYocto(near) {
  const milliNear = near * 1000
  return new BN(10, 10)
    .pow(new BN(21, 10))
    .mul(new BN(milliNear, 10))
    .toString()
}

const Sell = ({ token, price, owner }) => {
  // Create an scoped async function in the hook
  const [showButton, setShowButton] = React.useState()
  const [newPrice, setNewPrice] = React.useState(price)

  React.useEffect(() => {
    if (
      window.walletConnection.isSignedIn() &&
      window.walletConnection.getAccountId() === owner
    ) {
      setShowButton(true)
    }
  }, [owner])

  const sell = () => {
    if (window.walletConnection.isSignedIn()) {
      const data = {
        token_id: `${token}`,
        price: `${convertNearToYocto(newPrice)}`,
      }
      window.contract.sell_token(data).then(() => {
        window.location.replace(
          window.location.origin + window.location.pathname
        )
      })
    }
  }

  if (showButton) {
    return (
      <div>
        <input
          type="text"
          value={newPrice}
          width="20"
          onChange={e => setNewPrice(e.target.value)}
        />{" "}
        NEAR {``}
        <button onClick={sell}>VENDILO</button>
      </div>
    )
  } else {
    return (
      <span>
        PROPRIETARIO: <strong>{owner}</strong>
      </span>
    )
  }
}

export default Sell
