// const HomeBridge = artifacts.require('HomeBridge')
// const config = require('../bridge-config')
// const HDWalletProvider = require('truffle-hdwallet-provider')

async function performMigration(deployer, network, accounts) {
  // const validators = config.validatorSeeds.map(seedToAddress)
  // await deployer.deploy(HomeBridge, config.requiredValidators, validators)
  // await sleep(30000)
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

module.exports = function(deployer, network, accounts) {
  deployer
    .then(function() {
      return performMigration(deployer, network, accounts)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}

// function seedToAddress(seed) {
//   const provider = new HDWalletProvider(seed)
//   return provider.getAddresses()[0]
// }
