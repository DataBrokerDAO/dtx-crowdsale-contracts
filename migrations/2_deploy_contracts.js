const walletAddress = '0xb682943fa0408f74e87c53f405d394d9a8b715ae'
const timejump = 3600

const Promise = require('bluebird')
const moment = require('moment')
const MiniMeTokenFactory = artifacts.require('MiniMeTokenFactory')
const MultiSigWalletWithDailyLimit = artifacts.require(
  'MultiSigWalletWithDailyLimit'
)
const DTXToken = artifacts.require('DTXToken')
const TokenSale = artifacts.require('TokenSale')

async function performMigration(deployer, network, accounts) {
  // Deploy the MiniMeTokenFactory, this is the factory contract that can create clones of the token
  await deployer.deploy(MiniMeTokenFactory)

  // Use or deploy the MultiSigWallet that will collect the ether
  let Wallet
  const getCode = Promise.promisify(web3.eth.getCode)
  const code = await getCode(walletAddress)
  if (!code || code.replace('0x', '').replace(/0/g, '') === '') {
    await deployer.deploy(
      MultiSigWalletWithDailyLimit,
      [
        '0x52B8398551BB1d0BdC022355897508F658Ad42F8', // Roderik
        '0x16D0af500dbEA4F7c934ee97eD8EBF190d648de1', // Matthew
        '0x8A69583573b4F6a3Fd70b938DaFB0f61F3536692', // Jonathan
      ],
      2,
      web3.toWei(100, 'ether')
    )
    Wallet = await MultiSigWalletWithDailyLimit.deployed()
  } else {
    Wallet = await MultiSigWalletWithDailyLimit.at(walletAddress)
  }

  // Deploy the actual DataBrokerDaoToken, the controller of the token is the one deploying. (Roderik)
  await deployer.deploy(DTXToken, MiniMeTokenFactory.address)

  const startPresaleTime = moment('2018-03-19 16:00:00+01:00').unix()
  const endPresaleTime = moment('2018-04-26 15:59:59+01:00').unix()
  const startDayOneTime = moment('2018-04-26 16:00:00+01:00').unix()
  const endDayOneTime = moment('2018-04-27 15:59:59+01:00').unix()
  const startTime = moment('2018-04-27 16:00:00+01:00').unix()
  const endTime = moment('2018-05-26 16:00:00+01:00').unix()

  if (network === 'mainnet') {
    // Deploy the TokenSale, again owned by the one deploying (Roderik)
    await deployer.deploy(
      TokenSale,
      startPresaleTime,
      endPresaleTime,
      startDayOneTime,
      endDayOneTime,
      startTime,
      endTime,
      Wallet.address,
      DTXToken.address
    )
  } else {
    const getBlock = Promise.promisify(web3.eth.getBlock)
    const { timestamp } = await getBlock('latest')
    // Deploy the Token Sale, again owned by the one deploying (Roderik)
    await deployer.deploy(
      TokenSale,
      timestamp + timejump,
      timestamp + timejump * 2,
      timestamp + timejump * 3,
      timestamp + timejump * 4,
      timestamp + timejump * 5,
      timestamp + timejump * 6,
      Wallet.address,
      DTXToken.address
    )
  }

  // Set the controller of the token to the early token sale
  const DeployedDTXToken = await DTXToken.deployed()
  await DeployedDTXToken.changeController(TokenSale.address)
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
