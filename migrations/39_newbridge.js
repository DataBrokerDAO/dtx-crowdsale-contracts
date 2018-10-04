const HomeBridge = artifacts.require('HomeBridge')
const config = require('../bridge-config')
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = async (deployer, network, accounts) => {
  // const validators = config.validatorSeeds.map(seedToAddress)
  // await deployer.deploy(HomeBridge, config.requiredValidators, validators)
  // await sleep(30000)
}

function seedToAddress(seed) {
  const provider = new HDWalletProvider(seed)
  return provider.getAddresses()[0]
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
