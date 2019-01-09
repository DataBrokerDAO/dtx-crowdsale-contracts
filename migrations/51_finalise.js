const TokenSale = artifacts.require('TokenSale')
const DTXToken = artifacts.require('DTXToken')

module.exports = async function(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()
  const DeployedDTXToken = await DTXToken.deployed()
  console.log((await DeployedDTXToken.totalSupply()).toString())

  await DeployedTokenSale.finalizeSale()

  console.log((await DeployedDTXToken.totalSupply()).toString())
}
