const TokenSale = artifacts.require('TokenSale')
const DTXToken = artifacts.require('DTXToken')
const moment = require('moment')

module.exports = async function(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  const DeployedDTXToken = await DTXToken.deployed()

  const totalSupply = await DeployedDTXToken.totalSupply()
  const maxSupply = await DeployedTokenSale.MAX_TOKENS()
  const lockedTokens = await DeployedTokenSale.lockedTokens()
  const final = maxSupply.sub(totalSupply).sub(lockedTokens)

  await DeployedTokenSale.handleExternalBuyers(
    ['0xb682943fa0408f74e87c53f405d394d9a8b715ae'],
    [final],
    [web3.utils.toWei('0')],
    [lockup]
  )

  const totalSupplyAfter = await DeployedDTXToken.totalSupply()
  console.log(totalSupplyAfter.toString())
}
