const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

module.exports = async function(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    ['0x52b8398551bb1d0bdc022355897508f658ad42f8'],
    [web3.utils.toWei('385640')],
    [web3.utils.toWei('0')],
    [lockup]
  )
}
