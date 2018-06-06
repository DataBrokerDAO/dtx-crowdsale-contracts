const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    [
      '0x92097a7D9782981BCE907A693595324506CaA183',
      '0x15f05c127550b08d12de180fc06904aa0252e986',
    ],
    [web3.toWei(1560), web3.toWei(2073.618208)],
    [web3.toWei(0), web3.toWei(0)],
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
