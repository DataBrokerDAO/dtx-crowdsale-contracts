const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')
const BountyVault = artifacts.require('BountyVault')
const DTXToken = artifacts.require('DTXToken')
const bountyPayouts = require('../bounty')
const BigNumber = require('bignumber.js')

async function performMigration(deployer, network, accounts) {
  const DeployedDTXToken = await DTXToken.deployed()
  await deployer.deploy(BountyVault, DeployedDTXToken.address)
  await sleep(10000)
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
