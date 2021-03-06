const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

module.exports = async function(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    [DeployedTokenSale.address],
    [web3.utils.toWei('2000')],
    [web3.utils.toWei('0')],
    [lockup]
  )
}
