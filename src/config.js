const nearConfig = (env) => {
  switch (env) {

  case 'mainnet':
    return {
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      contractName: 'nft.shellstories',
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      explorerUrl: 'https://explorer.mainnet.near.org',
    }
  case 'production':
  case 'development':
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: 'nft.shellstories.testnet',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
  default:
    throw Error(`Unconfigured environment '${env}'`)
  }
}

export default nearConfig
