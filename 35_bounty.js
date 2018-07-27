const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')
const { forEachSeries } = require('p-iteration')
var BigNumber = require('bignumber.js')
const bountyPayouts = require('../bounty')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()
  const DTXBatches = []
  let DTXHoldersWei = {}
  let counter = 1
  let total = new BigNumber(0)
  bountyPayouts.forEach(bountyPayout => {
    if (counter % 50 === 0) {
      DTXBatches.push(DTXHoldersWei)
      DTXHoldersWei = {}
    }

    let address = 0xb682943fa0408f74e87c53f405d394d9a8b715ae
    if (/^(0x)?[0-9a-f]{40}$/i.test(bountyPayout.address)) {
      address = bountyPayout.address
    }

    if (DTXHoldersWei[address]) {
      DTXHoldersWei[address] = new BigNumber(DTXHoldersWei[address]).plus(
        new BigNumber(web3.toWei(bountyPayout.amount))
      )
    } else {
      DTXHoldersWei[address] = new BigNumber(web3.toWei(bountyPayout.amount))
    }
    total = total.plus(DTXHoldersWei[address])
    counter++
    if (bountyPayouts.length === counter) {
      console.log(111, web3.fromWei(total).toString())
      DTXBatches.push(DTXHoldersWei)
    }
  })
  await forEachSeries(DTXBatches, async batch => {
    await DeployedTokenSale.handleExternalBuyers(
      Object.keys(batch),
      Object.values(batch),
      new Array(Object.values(batch).length).fill(0),
      new Array(Object.values(batch).length).fill(0)
    )
    // await sleep(10000)
  })
  // await sleep(30000)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
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
