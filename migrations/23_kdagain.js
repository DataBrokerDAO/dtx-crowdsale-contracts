const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const lockup = moment('2018-04-23 16:00:00+01:00').unix()
  const DeployedTokenSale = await TokenSale.deployed()
  await DeployedTokenSale.handleExternalBuyers(
    [
      '0x9b4aa69638f8d19b5105ddb592e2f7ae609c9118',
      '0xCf88f6e099f53faba1EbeAA5e1a09855007e2A42',
      '0x2bDb74B981b03B021c6FF71Fb27DFa571b2dF0AC',
    ],
    [
      web3.utils.toWei('176000'),
      web3.utils.toWei(((112000 / 35) * 20).toString()),
      web3.utils.toWei(((112000 / 35) * 15).toString()),
    ],
    [web3.utils.toWei('0'), web3.utils.toWei('0'), web3.utils.toWei('0')],
    [lockup, lockup, lockup]
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
