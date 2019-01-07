const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0xFee4Ae2AdFc648AfDe92a4087Fd7B7c6980149ba'],
    [web3.utils.toWei('273041.55')],
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
