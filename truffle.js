const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    development: {
      host: 'localhost',
      network_id: '*',
      port: 7545,
      gasPrice: 3000000000,
    },
    mintnet: {
      provider: new HDWalletProvider(
        process.env.ETHEREUM_DEPLOYER_SEED,
        'https://mintnet.settlemint.com'
      ),
      gasPrice: 0x00,
      network_id: '8995',
    },
    minttestnet: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://minttestnet.settlemint.com'
        )
      },
      gasPrice: 0x00,
      network_id: '8996',
    },
    mintdemonet: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://mintdemonet.settlemint.com'
        )
      },
      gasPrice: 0x00,
      network_id: '8997',
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://kovan.infura.io/'
        )
      },
      network_id: '42',
      gas: 4700000,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://ropsten.infura.io/'
        )
      },
      network_id: '3',
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://rinkeby.infura.io/'
        )
      },
      network_id: '4',
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(
          process.env.ETHEREUM_DEPLOYER_SEED,
          'https://mainnet.infura.io/'
        )
      },
      network_id: '1',
      gasPrice: 3000000000,
      // gas: 4700000,
      // gasPrice: 0x01
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555, // <-- Use port 8555
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
    },
  },
}
