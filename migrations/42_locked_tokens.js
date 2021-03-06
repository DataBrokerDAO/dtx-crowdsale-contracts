const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

module.exports = async function(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0x52B8398551BB1d0BdC022355897508F658Ad42F8'],
    [web3.utils.toWei('1')],
    [web3.utils.toWei('0')],
    [lockup]
  )
}
