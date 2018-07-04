const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-10-01 00:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0xd0e9781d36838048A7a1FA4957447a32D3e3B7Ec'],
    [web3.toWei(3334000)],
    [web3.toWei(1666000)],
    [lockup]
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
