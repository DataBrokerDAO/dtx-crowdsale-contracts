const TokenSale = artifacts.require('TokenSale')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()

  await DeployedTokenSale.handleExternalBuyers(
    Object.keys(Referrer),
    Object.values(Referrer),
    new Array(Object.values(Referrer).length).fill(0),
    new Array(Object.values(Referrer).length).fill(0)
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

const Referrer = {
  '0xafcf5678C4f94d62cbF6e815986F92BB4E8B4008': web3.utils.toWei(
    (1400 + 13800 + 15200).toString()
  ),
  '0xC466c031d9d3a92bD4067845719B81EC1EBD63a7': web3.utils.toWei(
    (602 + 2000).toString()
  ),
  '0x126dfDbD9294483b4735F4620c225D7a1599F550': web3.utils.toWei(
    (102).toString()
  ),
  '0x7597104F5D2fe7C834954fC5B41Ef54eB67D2591': web3.utils.toWei(
    (18 + 8 + 30 + 60 + 2000).toString()
  ),
  '0x9E4D0cE0536492946a9763483B27c3946e9bFF54': web3.utils.toWei(
    (18).toString()
  ),
  '0x9d59Cb960E42D94aAA941ba80EE7f04f6BE92Fa3': web3.utils.toWei(
    (40).toString()
  ),
  '0x313E52ed31703CE0F0239462F6E71AeaE6588462': web3.utils.toWei(
    (12).toString()
  ),
  '0xFbE04874Deca5d57D2F559bE9c8EdAE42900f409': web3.utils.toWei(
    (616).toString()
  ),
  '0x0f8A62Ac50eF1f937ec98FD7CC5395DA35f98551': web3.utils.toWei(
    (20).toString()
  ),
  '0x9e14fe1e57ff05ae1cb51396e2342dcb21daf7f1': web3.utils.toWei(
    (202).toString()
  ),
  '0x7a0794E43FE7C1C8A0Db3CC99C0dd7e5f35BE9aE': web3.utils.toWei(
    (800).toString()
  ),
  '0xE36eC68352A3be847a077D89B3528DE2885f072a': web3.utils.toWei(
    (200).toString()
  ),
  '0xf40d605b2de6747497948ffc3b6a344deb624d09': web3.utils.toWei(
    (34 + 6000 + 2012).toString()
  ),
  '0xe0f6124E2Bb68157DcE2e87B50c2Ac33A48cCcD2': web3.utils.toWei(
    (7566 + 2200 + 5890).toString()
  ),
  '0x4392c4E8d367df1E9A2913Cb1E2807f8bE33531D': web3.utils.toWei(
    (2678).toString()
  ),
  '0xFE702837214fF72914b260B5f9EC8Ee62F39e37d': web3.utils.toWei(
    (44400).toString()
  ),
  '0x6bd768225c2452fa20e9a53b56ad8fe4fdff0e21': web3.utils.toWei(
    (3174).toString()
  ),
  '0x6dedFF980F3B99ED3dE8ddb6a4af8138C29321C1': web3.utils.toWei(
    (2000 + 2098).toString()
  ),
  '0x5F4983E902778855C67EdA4296aF57b7a216b53E': web3.utils.toWei(
    (2000).toString()
  ),
  '0xafcf5678c4f94d62cbf6e815986f92bb4e8b4008': web3.utils.toWei(
    (3280 + 2010).toString()
  ),
}
