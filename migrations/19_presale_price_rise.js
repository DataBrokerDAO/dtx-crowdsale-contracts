const TokenSale = artifacts.require('TokenSale')

async function performMigration(deployer, network, accounts) {
  // if (network !== 'development') {
  const DeployedTokenSale = await TokenSale.deployed()

  const calculatedPreSalePriceRise = {}

  Object.keys(PreSalePriceRise).map(
    key => (calculatedPreSalePriceRise[key] = web3.toWei(PreSalePriceRise[key]))
  )

  await DeployedTokenSale.handleExternalBuyers(
    Object.keys(calculatedPreSalePriceRise),
    Object.values(calculatedPreSalePriceRise),
    new Array(Object.values(calculatedPreSalePriceRise).length).fill(0),
    new Array(Object.values(calculatedPreSalePriceRise).length).fill(0)
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

const PreSalePriceRise = {
  '0xacbd76b2b8a3c29ca93eacc3b44032b466f156ce': 13724.78,
  '0x3f1f18bb2760c710fa9d42a47eec0af39720bd59': 17155.97 + 45113.62,
  '0x61907a653edc55d5ee4fe25946f7fca10d3208e9': 12718.27,
  '0xfe702837214ff72914b260b5f9ec8ee62f39e37d': 11494.5 + 18757.2,
  '0xd06c98a5939aeb3d49abdf3fc9f2a81912833040': 11723.25,
  '0xf19328e58541979eddb0055aad79a012b13148b6': 17155.97,
  '0x9f10661020cc9abb8a551bb63ffa9df97a16c30d': 17155.97,
  '0x59bbe9f32bd1f516981750586db5e3032d89fe07': 11997.74,
  '0x15a3fdb9f542a9e299ad0efa27bc16a1b08d4b00': 13781.96,
  '0x014e31db44462589a6502611d7b57bdc0071ea96': 22874.63 + 22874.63,
  '0xdac86b70364c3fa4ef9c8c7151539b91f1dc6d46': 11666.06,
  '0x6cbac816f05c8a0084a17fa683f37787354ee7ab': 11505.94 + 29891.58,
  '0xbb1dd4495934627a64b7e7d82feaf4eba4869a8e': 11437.31,
  '0x4aaedd9f2b99066d626d6e86ef41c7dd1fb4a28c': 11437.31 + 21232.58,
  '0x382cd1ff0d43985a821c790d3f54cd22f86fe835': 11437.31 + 10881.03,
  '0xe345aee10f6ed10cda625fcb00a54cde7b0182d8': 11178.51,
  '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0': 11178.51,
  '0xafef7e6c7cc8ee1ce7140fdacee481ed5f219113': 11178.51,
  '0x017165b5fa5d3f3560ee1d6da619bb1ca5fafd46': 11178.51,
  '0xa77e6eaf06dd70414643a8a06be4470b0b7d427c': 11178.51,
  '0x5d4229eb68d8312f845fc7ad497935850874aec7': 10881.03,
  '0x2fe23140dc18139404c53506efe12a3aaed0c72b': 16008.66,
  '0x6b7c1a540b100847ab9504c60b7a5e945b6f7810': 13509.42,
  '0xc4c2dff8ab563e160be688dc5c8fd1735fd1902b': 12976.85,
  '0xcad0cd93c21cd96242a3671478603799e0f18f7b': 25626.7,
  '0x50c4eed59838932736de7cc7ddffa679fe205980': 15881.91,
  '0xa7b92144ec734a7a843730fcdab114543da05031': 70726.41,
  '0xe4451838999d1b7dda2eadbd6d3c65b3f96dc493': 60323.86,
  '0x70dcaae79ce026ae8b5c9283132a72535c732c4d': 61939.6,
  '0x21e059e988a200ddebb0a786058937eeb75d694c': 18895.89,
  '0xddcfdb1dde1b3d05f7d6712d385c197f7a6ef62f': 419488.78,
  '0xdc4dcc9877de8fbe7eac774777a8ae29d5274458': 15636.96,
  '0xf874d912643e6736050c23155b97caca5bc9d46a': 15482.14,
  '0x0dd218a0d85a0e420ba5f6777910b35f41a18319': 9963.86,
  '0xcf9c8fa6b968e828267a8402c021af35a9895707': 4305.85,
  '0x9cfe2efc2e69f40f3d62d78b1053ea448b816da5': 12683.0,
  '0xebff84bbef423071e604c361bba677f5593def4e': 4305.85,
  '0x75efb61b68ff43cf4abbe19081b405b0acf63401': 6137.91,
  '0x16adf380510e8d71cd40556c47a3847caa5b4996': 1629.47,
  '0x0ff7166b43fa35b123a856b71126e28c8578563b': 1613.34,
  '0xe0f6124e2bb68157dce2e87b50c2ac33a48cccd2': 11820.15 + 3792.53 + 4834.09,
  '0x3313a367ed4da087c7725a7a16ab5487cf57f6c8': 16064.32,
  '0xa2d826c44785c82ccec22a2c3a06d0d1475b0ef1': 4250.76,
  '0x716d7541a976573d7abec08232aba8fd0e34d234': 4671.17,
  '0xa94b71815a198e7910d6566e59568e4106c4dd4d': 4246.52,
  '0xd53a06d41f340d9e826115721b222e5f93684852': 4416.38,
  '0x8d9ac4b2f8f74c4bbc98ed88cd3b411cf4401c5a': 4246.52,
  '0x9a56aec59778476b7de4571f0da367bd3d8cbbc1': 4288.98,
}
