const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    [
      '0x2a315AaE3C4aBaD802d69C03Cd0A0C87A011E124',
      '0x2A97D55579cc55D270E3e7d528538146a03DE858',
    ],
    [web3.utils.toWei('269541'), web3.utils.toWei('134771.5')],
    [web3.utils.toWei('0'), web3.utils.toWei('0')],
    [lockup, lockup]
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
