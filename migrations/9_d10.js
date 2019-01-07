const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0x26C9899eA2F8940726BbCC79483F2ce07989314E'],
    [web3.utils.toWei('161725.067385445')],
    [web3.utils.toWei('0')],
    [lockup]
  )
}

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
