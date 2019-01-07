const BountyVault = artifacts.require('BountyVault')
const bountyPayouts = require('../bounty')

async function performMigration(deployer, network, accounts) {
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
      amounts.push(web3.utils.toWei(bounty.amount.toString()))
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
  }
  const totalAllocated = await DeployedBountyVault.allocatedTotal()
  console.log(web3.utils.fromWei(totalAllocated.toString()).toString())
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
