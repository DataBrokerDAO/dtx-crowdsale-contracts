const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()

  const startPresaleTime = moment('2018-03-19 16:00:00+01:00').unix()
  const endPresaleTime = moment('2018-04-26 15:59:59+01:00').unix()
  const startDayOneTime = moment('2018-04-26 16:00:00+01:00').unix()
  const endDayOneTime = moment('2018-04-27 15:59:59+01:00').unix()
  const startTime = moment('2018-04-27 16:00:00+01:00').unix()
  const endTime = moment('2018-05-26 16:00:00+01:00').unix()

  await DeployedTokenSale.updateDates(
    startPresaleTime,
    endPresaleTime,
    startDayOneTime,
    endDayOneTime,
    startTime,
    endTime
  )
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
