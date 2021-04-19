import React from "react"
import * as BN from "bn.js"
import Buy from "./buy"
import Sell from "./sell"

function convertYoctoToNear(yocto) {
  return (
    new BN(yocto, 10).div(new BN(10, 10).pow(new BN(21, 10))).toString() / 1000
  )
}

const NFT = ({ token, title, url }) => {
  // Create an scoped async function in the hook
  const [tokenPrice, setTokenPrice] = React.useState(0)
  const [tokenOwner, setTokenOwner] = React.useState("")

  React.useEffect(() => {
    if (window.walletConnection) {
      const data = { token_id: `${token}` }
      window.contract.get_token_price(data).then(price => {
        setTokenPrice(convertYoctoToNear(price))
      })
      window.contract.get_token_owner(data).then(owner => {
        setTokenOwner(owner)
      })
    }
  })

  return (
    <div>
      <p style={{ float: `left` }}>NFT</p>
      <p style={{ float: `right` }}>0{token}</p>
      <div
        style={{
          textAlign: `center`,
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: `50%`,
        }}
      >
        <img style={{ maxWidth: `100%` }} src={url} alt={title} />
        <p>
          <strong>{title}</strong>
        </p>
      </div>
      <div style={{ marginTop: `10px` }}>
        {tokenPrice > 0 && (
          <p style={{ float: `left` }}>
            <span>
              PREZZO: <strong>{tokenPrice}NEAR</strong>
            </span>
            <Buy token={token} price={tokenPrice} owner={tokenOwner} />
          </p>
        )}
        <p style={{ float: `right` }}>
          <Sell token={token} price={tokenPrice} owner={tokenOwner} />
        </p>
        <p style={{ clear: `both` }}></p>
      </div>
    </div>
  )
}

export default NFT
