const TokenSale = artifacts.require('TokenSale')
const moment = require('moment')

module.exports = async function(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()
  const lockup = moment('2019-01-01 00:00:00+01:00').unix()

  const calculated = {}

  Object.keys(addresses).forEach(address => {
    if (Array.isArray(addresses[address].ethAmount)) {
      addresses[address].payout = 0
      let sum = 0
      addresses[address].ethAmount.forEach(amount => {
        sum += amount
      })
      calculated[address] = web3.utils.toWei(
        (
          sum * addresses[address].tokenBonus * 2 +
          (doubleSafeguard[address.toLowerCase()]
            ? doubleSafeguard[address.toLowerCase()]
            : 0)
        ).toString()
      )
    } else {
      calculated[address] = web3.utils.toWei(
        (
          addresses[address].ethAmount * addresses[address].tokenBonus * 2 +
          (doubleSafeguard[address.toLowerCase()]
            ? doubleSafeguard[address.toLowerCase()]
            : 0)
        ).toString()
      )
    }
  })

  console.log(calculated)

  await DeployedTokenSale.handleExternalBuyers(
    Object.keys(calculated),
    new Array(Object.values(calculated).length).fill(0),
    Object.values(calculated),
    new Array(Object.values(calculated).length).fill(lockup)
  )
}

const doubleSafeguard = {
  '0x303389a6ba8410bee19e71f014c49c56de971f2f': 200651.836,
  '0x017165b5fa5d3f3560ee1d6da619bb1ca5fafd46': 199768.51,
  '0x639cec09a3ad0dedc2951adb00c43a43160273c3': 771540,
  '0x325424b6dd000e1d07edb646f235a34293fbf2e6': 247921.52,
  '0x2fa9e3da421962ee6f66de60e66cc0cafb37c721': 65889.516,
  '0x5d48992bc182729fe696348765d7f7ce8960cb62': 77154,
  '0xcdac62b896892037c42feb88159b549e590558ba': 34976.48,
  '0x7f1f5ec3d5211a0225d49309ef729e86fd07b0be': 26052.334,
  '0x8b34afd3d33cf3affadaffc3fb6040f5a6d8cf94': 70872.2936306,
  '0x4cc59ca353bc69ea83035b095292c24d613ebea9': 102872,
  '0xf7af86e58b6cf65c16cd6a909c547a8d2db6bda7': 12850.1427208,
  '0xc5b4e3ed8b30bf691bfda2d1604080a6781d0fc3': 180026,
  '0x8c38e5c7b14744cc6d451d6aedc5a8acba2db907': 263352.32,
  '0x974ee08ed54a775a07771554fe73710b00ab4a9e': 102872,
  '0x480c5b3fcbb5d20550cf66b4446549a32958c1cc': 61980.38,
  '0x09e22868c6843e7f1fc163c8634f30fe9d39cd7b': 53493.44,
  '0x39ecbabcf8a9d35b11040f45d602828c11b671f4': 164595.2,
  '0x647fbf4c03f487ac1132bfa6f40a401d34bd2234': 10287.2,
  '0x805c120e9836e623b83dc5938c62f95ffc5fce70': 86721.096,
  '0x8798a672b25fa60d9c2a3a14b3a5a7a2210b0d90': 51436,
  '0xe3e92de31c9d4c39217d6050cec4ce012bf9c936': 19143.2578573236,
  '0x827a88c8c372903e3a692d86734a325a213dddb9': 57131.615832676,
  '0x8d9ac4b2f8f74c4bbc98ed88cd3b411cf4401c5a': 64246.52,
  '0x16d0af500dbea4f7c934ee97ed8ebf190d648de1': 48000,
  '0x52b8398551bb1d0bdc022355897508f658ad42f8': 1227.2,
}

const addresses = {
  '0x303389a6ba8410bee19e71f014c49c56de971f2f': {
    ethAmount: 39.01,
    tokenBonus: 2400,
  },
  '0x017165b5fa5d3f3560ee1d6da619bb1ca5fafd46': {
    ethAmount: 25,
    tokenBonus: 2400,
  },
  // '0x76fd046bbd7e2363a971cc1e752361d6136da01e': {
  //   ethAmount: 50,
  //   tokenBonus: 3000,
  // },
  '0x639cec09a3aD0DEDC2951ADB00C43a43160273c3': {
    ethAmount: 150,
    tokenBonus: 3000,
  },
  '0x325424b6dd000e1d07edb646f235a34293fbf2e6': {
    ethAmount: 48.2,
    tokenBonus: 4000,
  },
  '0x2fa9e3da421962ee6f66de60e66cc0cafb37c721': {
    ethAmount: 12.81,
    tokenBonus: 4000,
  },
  '0x5d48992bc182729fe696348765d7f7ce8960cb62': {
    ethAmount: [14, 1],
    tokenBonus: 4000,
  },
  '0xcdac62b896892037c42feb88159b549e590558ba': {
    ethAmount: 6.8,
    tokenBonus: 4000,
  },
  '0x7f1f5ec3d5211a0225d49309ef729e86fd07b0be': {
    ethAmount: 5.065,
    tokenBonus: 4000,
  },
  '0x8b34afd3d33cf3affadaffc3fb6040f5a6d8cf94': {
    ethAmount: 13.7787335,
    tokenBonus: 4000,
  },
  '0x4cc59ca353bc69ea83035b095292c24d613ebea9': {
    ethAmount: 20,
    tokenBonus: 4000,
  },
  '0xf7af86e58b6cf65c16cd6a909c547a8d2db6bda7': {
    ethAmount: [1.499139, 0.999139],
    tokenBonus: 4000,
  },
  '0xc5b4e3ed8b30bf691bfda2d1604080a6781d0fc3': {
    ethAmount: 35,
    tokenBonus: 4000,
  },
  '0x8c38e5c7b14744cc6d451d6aedc5a8acba2db907': {
    ethAmount: 51.2,
    tokenBonus: 4000,
  },
  '0x974ee08ed54a775a07771554fe73710b00ab4a9e': {
    ethAmount: 20,
    tokenBonus: 4000,
  },
  '0x480c5b3fcbb5d20550cf66b4446549a32958c1cc': {
    ethAmount: [6.35, 5.7],
    tokenBonus: 4000,
  },
  '0x09e22868c6843e7f1fc163c8634f30fe9d39cd7b': {
    ethAmount: 10.4,
    tokenBonus: 4000,
  },
  '0x39ecbabcf8a9d35b11040f45d602828c11b671f4': {
    ethAmount: [10, 22],
    tokenBonus: 4000,
  },
  '0x647fbf4c03f487ac1132bfa6f40a401d34bd2234': {
    ethAmount: 2,
    tokenBonus: 4000,
  },
  '0x805c120e9836e623b83dc5938c62f95ffc5fce70': {
    ethAmount: 16.86,
    tokenBonus: 4000,
  },
  '0x8798a672b25fa60d9c2a3a14b3a5a7a2210b0d90': {
    ethAmount: 10,
    tokenBonus: 4000,
  },
  '0xe3e92de31c9d4c39217d6050cec4ce012bf9c936': {
    ethAmount: 3.721762551,
    tokenBonus: 4000,
  },
  '0x827a88c8c372903e3a692d86734a325a213dddb9': {
    ethAmount: 11.10732091,
    tokenBonus: 4000,
  },
  '0xD5ED9d7fCc186343dD35d2e2b3E730e7406C8219': {
    ethAmount: 0.5,
    tokenBonus: 250000, // P
  },
  '0x13F446d5AA08e42Bb4499cCBB8c3573aa79760B0': {
    ethAmount: 0.5,
    tokenBonus: 250000, // F
  },
  '0x766773fC73151afC7EF53A2ea3c928e5b761C199': {
    ethAmount: 0.5,
    tokenBonus: 250000, // V
  },
  '0x3c5f5726ec0e33c0911bcad911222c39f1705515': {
    ethAmount: 0.5,
    tokenBonus: 250000, // E
  },
  '0xf56279e975152e5663775322f61f2770649f23af': {
    ethAmount: 0.5,
    tokenBonus: 250000, // A
  },
  '0x2e37420bc305f1c1db2036676531b507257ab166': {
    ethAmount: 0.5,
    tokenBonus: 250000, // S
  },
  '0x3dc0FCC66b71648C09Fabb07c39AF9347AE913dd': {
    ethAmount: 0.5,
    tokenBonus: 250000, // Ca
  },
  '0x2db0380924550eae6a393f56f6ac39eea21e9c03': {
    ethAmount: 0.5,
    tokenBonus: 250000, // Ch
  },
  '0xf682a2b6a7FC06f58813f9A814c8FCba56402919': {
    ethAmount: 0.5,
    tokenBonus: 250000, // T
  },
  '0x16D0af500dbEA4F7c934ee97eD8EBF190d648de1': {
    ethAmount: 0.5,
    tokenBonus: 250000, // M
  },
  '0x52b8398551bb1d0bdc022355897508f658ad42f8': {
    ethAmount: 0.5,
    tokenBonus: 250000, // R
  },
}
