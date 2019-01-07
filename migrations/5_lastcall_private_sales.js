const TokenSale = artifacts.require('TokenSale')
const { forEachSeries } = require('p-iteration')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  // if (network !== 'development') {
  const DeployedTokenSale = await TokenSale.deployed()
  const DTXBatches = []
  let DTXHoldersWei = {}
  let counter = 1
  Object.keys(LastCallHolders).forEach(address => {
    if (counter % 50 === 0) {
      DTXBatches.push(DTXHoldersWei)
      DTXHoldersWei = {}
    }
    if (Array.isArray(LastCallHolders[address])) {
      DTXHoldersWei[address] = 0
      let sum = 0
      LastCallHolders[address].forEach(amount => {
        sum += amount
      })
      DTXHoldersWei[address] = web3.utils.toWei((sum * 4000).toString())
    } else {
      DTXHoldersWei[address] = web3.utils.toWei(
        (LastCallHolders[address] * 4000).toString()
      )
    }
    // DTXHoldersWei[address] = DTXHoldersWei[address]
    counter++
    if (Object.keys(LastCallHolders).length === counter) {
      DTXBatches.push(DTXHoldersWei)
    }
  })
  const lockup = moment('2018-06-23 16:00:00+01:00').unix()
  await forEachSeries(DTXBatches, async batch => {
    const bonus = []
    Object.values(batch).forEach(amount =>
      bonus.push(
        web3.utils.toWei(
          (web3.utils.fromWei(amount.toString()) * 2400).toString()
        )
      )
    )
    await DeployedTokenSale.handleExternalBuyers(
      Object.keys(batch),
      Object.values(batch),
      bonus,
      new Array(Object.values(batch).length).fill(lockup)
    )
  })
}

const LastCallHolders = {
  '0x303389a6ba8410bee19e71f014c49c56de971f2f': 39.01,
  '0x017165b5fa5d3f3560ee1d6da619bb1ca5fafd46': 25,
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
