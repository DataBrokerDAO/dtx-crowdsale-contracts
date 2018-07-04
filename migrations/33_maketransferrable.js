const TokenSale = artifacts.require('TokenSale')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.makeTransferable()
  await sleep(30000)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
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
