import React from "react"
import { graphql } from "gatsby"
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import nearConfig from '../config'
import { login, logout } from '../utils'
import Blog from "../components/main"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const config = nearConfig(process.env.NODE_ENV || 'development')

const Index = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [contractInit, setContractInit] = React.useState()

  React.useEffect(() => {
    async function initNear() {
      // Initialize connection to the NEAR network
      const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'nearlib:keystore:') } }, config))

      // Initializing Wallet based Account.
      const wallet = new WalletConnection(near, null);
      window.walletConnection = wallet;

      // Initializing our contract APIs by contract name and configuration
      window.contract = new Contract(wallet.account(), config.contractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['get_token_owner','get_token_price'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['buy_token', 'sell_token'],
      })
      setContractInit(true);
    }
    initNear();
  });

  if (!contractInit) {
    return ( <h1>Loading...</h1>)
  } else {
    // if not signed in, return early with sign-in prompt
    if (!window.walletConnection.isSignedIn()) {
      return (
        <Layout location={location} title={siteTitle}>
          <SEO title="All posts" />
          <Bio />
          <div style={{ border: `thin dashed black`, padding: `0.25em` }}>
            <p>Le storie di questo blog sono associate a token NFT della blockchain NEAR!
              <br />Per utilizzare la blockchain NEAR devi effettuare l'accesso. Il pulsante in basso ti consentirà di accedere al NEAR Wallet e acquistare i token.</p>
            <p style={{ textAlign: 'center' }}>
              <button onClick={login}>Accedi</button>
            </p>
          </div>
          <Blog data={data} />
        </Layout>
      )
    } else {
      return (
        <Layout location={location} title={siteTitle}>
          <SEO title="All posts" />
          <Bio />
          <p style={{ textAlign: 'center' }}>
            <button onClick={logout}>Sign out</button>
          </p>
          <Blog data={data} />
        </Layout>
      )
    }
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          nft
          token
        }
      }
    }
  }
`
