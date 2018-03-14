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
      DTXHoldersWei[address] = web3.toWei(sum * 4000)
    } else {
      DTXHoldersWei[address] = web3.toWei(LastCallHolders[address] * 4000)
    }
    DTXHoldersWei[address] = DTXHoldersWei[address]
    counter++
    if (Object.keys(LastCallHolders).length === counter) {
      DTXBatches.push(DTXHoldersWei)
    }
  })
  const lockup = moment('2018-08-23 16:00:00+01:00').unix()
  await forEachSeries(DTXBatches, async batch => {
    const bonus = []
    Object.values(batch).forEach(amount =>
      bonus.push(web3.toWei(web3.fromWei(amount) * 3000))
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
  '0x76fd046bbd7e2363a971cc1e752361d6136da01e': 50,
  '0x639cec09a3aD0DEDC2951ADB00C43a43160273c3': 150,
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
