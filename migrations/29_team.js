const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()

  const lockup = moment('2018-12-16 00:00:00+01:00').unix()

  const calculatedTeamAddresses = {}

  Object.keys(TeamAddresses).map(
    key =>
      (calculatedTeamAddresses[key] = web3.utils.toWei(
        TeamAddresses[key].toString()
      ))
  )

  await DeployedTokenSale.handleExternalBuyers(
    Object.keys(calculatedTeamAddresses),
    new Array(Object.values(calculatedTeamAddresses).length).fill(0),
    Object.values(calculatedTeamAddresses),
    new Array(Object.values(calculatedTeamAddresses).length).fill(lockup)
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

const TeamAddresses = {
  '0xD5ED9d7fCc186343dD35d2e2b3E730e7406C8219': 250000, // P
  '0x13F446d5AA08e42Bb4499cCBB8c3573aa79760B0': 250000, // F
  '0x766773fC73151afC7EF53A2ea3c928e5b761C199': 250000, // V
  '0x3c5f5726ec0e33c0911bcad911222c39f1705515': 250000, // E
  '0xf56279e975152e5663775322f61f2770649f23af': 250000, // A
  '0x2e37420bc305f1c1db2036676531b507257ab166': 250000, // S
  '0x3dc0FCC66b71648C09Fabb07c39AF9347AE913dd': 250000, // Ca
  '0x2db0380924550eae6a393f56f6ac39eea21e9c03': 250000, // Ch
  '0xf682a2b6a7FC06f58813f9A814c8FCba56402919': 250000, // T
  '0x16D0af500dbEA4F7c934ee97eD8EBF190d648de1': 250000, // M
  '0x52b8398551bb1d0bdc022355897508f658ad42f8': 250000, // R
}
