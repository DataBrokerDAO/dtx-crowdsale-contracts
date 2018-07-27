const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')
const BountyVault = artifacts.require('BountyVault')
const DTXToken = artifacts.require('DTXToken')
const bountyPayouts = require('../bounty')
const BigNumber = require('bignumber.js')

async function performMigration(deployer, network, accounts) {
  await sleep(10000)
  // const DeployedDTXToken = await DTXToken.deployed()
  // await deployer.deploy(BountyVault, DeployedDTXToken.address)
  // await sleep(10000)
  let recipients = []
  let amounts = []
  let counter = 0
  const batch = []
  bountyPayouts.forEach(bounty => {
    if (/^(0x)?[0-9a-f]{40}$/i.test(bounty.address)) {
      if (counter !== 0 && counter % 200 === 0) {
        batch.push({ recipients, amounts })
        recipients = []
        amounts = []
      }
      recipients.push(bounty.address)
      amounts.push(web3.toWei(bounty.amount))
      counter++
    }
  })
  if (recipients.length > 0) {
    batch.push({ recipients, amounts })
    recipients = []
    amounts = []
  }
  const DeployedBountyVault = await BountyVault.deployed()
  for (let i = 0; i < batch.length; i++) {
    await DeployedBountyVault.allocateTokens(
      batch[i].recipients,
      batch[i].amounts
    )
    await sleep(30000)
  }
  const totalAllocated = await DeployedBountyVault.allocatedTotal()
  console.log(web3.fromWei(totalAllocated).toString())

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
