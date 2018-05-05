const debug = require('debug')('migrations:initial_migrations')
const Migrations = artifacts.require('Migrations.sol')

module.exports = function(deployer, network, accounts) {
  debug('Deploying the Migrations contract')
  deployer.deploy(Migrations)
}
