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
      bonus.push(web3.toWei(web3.fromWei(amount) * 3400))
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
  '0x325424b6dd000e1d07edb646f235a34293fbf2e6': 48.2,
  '0x2fa9e3da421962ee6f66de60e66cc0cafb37c721': 12.81,
  '0x5d48992bc182729fe696348765d7f7ce8960cb62': [14, 1],
  '0xcdac62b896892037c42feb88159b549e590558ba': 6.8,
  '0x7f1f5ec3d5211a0225d49309ef729e86fd07b0be': 5.065,
  '0x8b34afd3d33cf3affadaffc3fb6040f5a6d8cf94': 13.7787335,
  '0x4cc59ca353bc69ea83035b095292c24d613ebea9': 20,
  '0xf7af86e58b6cf65c16cd6a909c547a8d2db6bda7': [1.499139, 0.999139],
  '0xc5b4e3ed8b30bf691bfda2d1604080a6781d0fc3': 35,
  '0x8c38e5c7b14744cc6d451d6aedc5a8acba2db907': 51.2,
  '0x974ee08ed54a775a07771554fe73710b00ab4a9e': 20,
  '0x480c5b3fcbb5d20550cf66b4446549a32958c1cc': [6.35, 5.7],
  '0x09e22868c6843e7f1fc163c8634f30fe9d39cd7b': 10.4,
  '0x39ecbabcf8a9d35b11040f45d602828c11b671f4': [10, 22],
  '0x647fbf4c03f487ac1132bfa6f40a401d34bd2234': 2,
  '0x805c120e9836e623b83dc5938c62f95ffc5fce70': 16.86,
  '0x8798a672b25fa60d9c2a3a14b3a5a7a2210b0d90': 10,
  '0xe3e92de31c9d4c39217d6050cec4ce012bf9c936': 3.721762551,
  '0x827a88c8c372903e3a692d86734a325a213dddb9': 11.10732091,
}

module.exports = function(deployer, network, accounts) {
  deployer
    .then(function() {
      //return performMigration(deployer, network, accounts)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}
