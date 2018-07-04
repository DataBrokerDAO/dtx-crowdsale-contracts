const TokenSale = artifacts.require('TokenSale')

async function performMigration(deployer, network, accounts) {
  // if (network !== 'development') {
  const DeployedTokenSale = await TokenSale.deployed()

  const calculatedPreSalePriceRise = {}

  Object.keys(PreSalePriceRise).map(
    key => (calculatedPreSalePriceRise[key] = web3.toWei(PreSalePriceRise[key]))
  )

  await DeployedTokenSale.handleExternalBuyers(
    Object.keys(calculatedPreSalePriceRise),
    Object.values(calculatedPreSalePriceRise),
    new Array(Object.values(calculatedPreSalePriceRise).length).fill(0),
    new Array(Object.values(calculatedPreSalePriceRise).length).fill(0)
  )
}

module.exports = function(deployer, network, accounts) {
  deployer
    .then(function() {
      //return performMigration(deployer, network, accounts)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}

const amount = (661.45 - 555.55) * 4000

const PreSalePriceRise = {
  '0xB8D5389Cbe17fCF35748966A33A9F7b18e385a83': amount,
}
