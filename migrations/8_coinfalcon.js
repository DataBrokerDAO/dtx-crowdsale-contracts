const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0xece6CA09Db15f4B5fC2F0fbD2605A36b80B5E3d7'],
    [web3.utils.toWei(((15000 / 520) * 4000).toString())],
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
