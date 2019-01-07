const BountyVault = artifacts.require('BountyVault')
const DTXToken = artifacts.require('DTXToken')

async function performMigration(deployer, network, accounts) {
  const DeployedDTXToken = await DTXToken.deployed()
  await deployer.deploy(BountyVault, DeployedDTXToken.address)
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
