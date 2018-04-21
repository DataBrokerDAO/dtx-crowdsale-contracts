const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    [
      '0xddcfdb1dde1b3d05f7d6712d385c197f7a6ef62f',
      '0xcf88f6e099f53faba1ebeaa5e1a09855007e2a42',
    ],
    [web3.toWei(201600), web3.toWei(177633)],
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
