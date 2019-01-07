const TokenSale = artifacts.require('TokenSale')
const { forEachSeries } = require('p-iteration')

async function performMigration(deployer, network, accounts) {
  // if (network !== 'development') {
  const DeployedTokenSale = await TokenSale.deployed()
  const DTXBatches = []
  let DTXHoldersWei = {}
  let counter = 1
  Object.keys(Drops).forEach(address => {
    if (counter % 50 === 0) {
      DTXBatches.push(DTXHoldersWei)
      DTXHoldersWei = {}
    }

    DTXHoldersWei[address] = web3.utils.toWei(Drops[address].toString())

    counter++
    if (Object.keys(Drops).length === counter) {
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
  })
}

const Drops = {
  '0x36d07543184b357febd076d751a89d32198F5B11': 280,
  '0x34A85a4fa5e1c0960389344514E4E2eD4a24F46C': 280,
  '0xb8a532d7d07Bf1828bBB343B97963E87C037f55A': 280,
  '0x0Aebf1EeB6dA88257dda008b6aeC0e2EBD3AA429': 280,
  '0xfb8dE0B8A693c95111AE36Ab3BBC5EC604966B98': 280,
  '0x098089d422A46028d44423b8c64b391829A267B2': 280,
  '0xC48D6FBc37658467fFFf42176A472358504fB97d': 280,
  '0x76082816448AaF85cBC35f8D14d58c500608EAd5': 280,
  '0x5BCB3244d209bCC0D6cf816C79f0CAAB39FB17bE': 280,
  '0x953f4bF39246c866a261fD88a6f232Bb64Df45e6': 280,
  '0x5DeCb2a25B1f4E16E1D3Aa9d3B57808b54549D9f': 280,
  '0x81794492df8200E5380cDb623a9955f89FC1C82b': 280,
  '0x3ad6f4a0D9D11EF4566B86DaD6545FCdf4aE3541': 280,
  '0xDBb51d32aB2149CF6C3a41a0e2Ccbc0c0B2B3e35': 280,
  '0xeECF5a19518aC37eb58b3696A46BE0605FcFDE91': 280,
  '0xD31c92C091F62BA6057034544191b56f0f51A22a': 280,
  '0xe22c665625439A94932410cDE78e21446Ca44eeE': 280,
  '0xe2e0519a6Df42AfeCb8CD0695f61723fe7a1e667': 280,
  '0x4e1f30c4d930D5bf2FC7BDa47bBDA5d3e1AD3619': 280,
  '0x545859a35843d2B8842750605d1c3852Bb9FfF4D': 280,
  '0x30506686bCB1e915D387Ac3A00faDb33Cb9F72BE': 280,
  '0x1463aec704352219e6dBb99Fe56aEbde83411A46': 280,
  '0xBa0a9126b492214fd5322dfE2b323043d41f5846': 280,
  '0xBc7D4348e0b66d11013D96E5933A4E90BD1B7Fd1': 280,
  '0x59134122c6Fc1Bc87F00f621f6c07128a7e79EFf': 280,
  '0xF7c90Fb0a6f47A2b3208A5a2261B3b6f87728BE2': 280,
  '0x111b9Ad8d7Bb422D995aF66B81e9D1eD35d269C4': 280,
  '0x5C6537Bb8a3B9cC40a9f85D9CD502809562B687B': 280,
  '0xeEcf56bfB156d50Fa92A131000f3076733FFE7B5': 280,
  '0x17ecb8F9a778eB1F979224a5Af65596B6c48AC87': 280,
  '0xBDAc8799576b6F4faaD399B86b231b815797E6F4': 280,
  '0x9E7c4A95C09bcA1c8F688632DcE8Ed9409Ca7deE': 280,
  '0x60012fc04a2188356e48860722D5b720933E40c1': 280,
  '0xb77153890a3262c9865542e4b346a277d4eb49d9': 280,
  '0xC2515C87B0E1E6a0E41A4f27179D62362b1e7Dcf': 280,
  '0x04e3CdC867C9cB9DD4C2Ef3061078C5c756FFFbc': 280,
  '0xd38558D260F86b28063647eC509591f2FaA139B7': 280,
  '0xeF48725d553A22166eF7102e52694d9C8484b97b': 280,
  '0xcDb3BBAABcDcCAfab8EC6100381ca86fB7BD4aC7': 280,
  '0x0a51f97c8d35c873b4080a704f81b35fe4ebec15': 280,
  '0xA42Ca72c07E626Cc83081a9e8d15BDc563fAa0B5': 280,
  '0xDa453b29175f2ab0617d9E977d39F710ab98EC51': 280,
  '0x3244410Cdf94F084ebd8Ba3F86171303eF0CcBa3': 280,
  '0xa49cDe4AB991366B0dDd37f59fCf1bE60582a6b1': 280,
  '0x7908501F97e100d8534d6Fb8f91EF82A0f58293B': 280,
  '0xd077589AC1E24350Af467105f7d67816986026Da': 280,
  '0xf3ca20c2f60d9ceab8596e2bae7daedba47aeea6': 280,
  '0xd0F4B496C69A751685850b1F751593E33C30EfC1': 280,
  '0x3774e58451fD3F355861B2923b8BfE2F3D3Caf00': 280,
  '0x76dfD194d39585d124a12127d8823B60A27E5bA7': 280,
  '0xc6DcBe8C48Cc303e52d14274Eba533DA762bAbed': 280,
  '0x174FDcb6Fa1e594838bA0C796702Bc6E06cf6b02': 280,
  '0x9Ae39EA86D48F898be637eC35C9390610c5ca713': 280,
  '0x186c813EA986525B876d5F615d53f0ce4C190d66': 280,
  '0x9cA8645eBD2D511b309616eFe03b17a33b0F6bB3': 280,
  '0x7c723B5C6617B480288AD309BbEF9b1F6bd87797': 280,
  '0xd0ECC5057C9914C31305168a55C6eE12B6Dfc585': 280,
  '0xfA706803cEca9d248e9D8B221F3E936f6039764B': 280,
  '0x749142b965c2294b1A527aFae8C01650D689a691': 280,
  '0x525CDcdc34b8332f14b95C1a33c80225412a0e80': 280,
  '0xD888494254E0f069226e8A68616bE11D9907B8bE': 280,
  '0x53423368C2cDB4455BB0CAfb0B75B37986B5174C': 280,
  '0x7Beb3D8637d839709d8E0Fc4AC2D22161711Aa55': 280,
  '0xEA57B47e34dDcf7F3a05bb5e62dE06fbB750c02E': 280,
  '0x9fC6dc385364D4b38d4cC9002b934b60F77ee880': 280,
  '0xb6980e415351Ba38567f3C7432719492e093207c': 280,
  '0xcC7F29f4064e02003998A1a1948506238984B7C3': 280,
  '0xC36816bf42035781250505B0E5665E9273D8570A': 280,
  '0xb9323007358ea300b4643D78Bd51Ae6c9Db5b858': 280,
  '0x5067079Aa3Ff20102Afe8dC75a2Ebcb920598344': 280,
  '0x7785f34e22F60c49B4Aa305b2285B0fa9df6d96d': 280,
  '0x9653b76B40c37D2bf57F180cf3d071Df5aeFAf14': 280,
  '0xAEa48F201A533AcC17b4cE1b9964dBeAC0eD0577': 280,
  '0x56cE095Ba695952BF712DA604B189F65C6Ae83fD': 280,
  '0xE6dacdF836B6b1132eb3F20eE7E5e60CF8A06Ac2': 280,
  '0x19205D437995E0332a8af877615b31D4D604bBEf': 280,
  '0xa03Ccf641b5d5ECdB39dC6bCC6a7C3cA7eD96f7B': 280,
  '0x86A3956A359Bb7C2a9aad0b631fCCd3e1b3dE66A': 280,
  '0x40Ae183B2BD4ad6ee065C8fb4921064618806b10': 280,
  '0x6758eA29642Ca52057Ea90c5db8CAe772835C65e': 280,
  '0x702FA0fa9bf4c772C5F680858Ed1DcECBE99a559': 280,
  '0xf9Dc5DE617C14D43dF4FA42AEE1871b25f3b695E': 280,
  '0x5DbaAAE32DBaE94485d76F2C0D1CC603494b02f9': 280,
  '0xdAB053598e28AdC13702Dd4334FE4064E8D71A2b': 280,
  '0xDB3Ae24D6D9659401F445a51bE92a202Fa95b3B9': 280,
  '0xBE7D69B9aeC64673f2cCdb97c24bDaCaFEAAf2a7': 280,
  '0x545664097e6732c1A48Eb5CF7999E8a8C85Ce138': 280,
  '0xCf9A40aAA056773F8f627a9D5b836158Cb6e7280': 280,
  '0x41F068F42fFcf64E9F75C3d47106B5e74bdcAB91': 280,
  '0xCE70eF7b1075Be0e61AE07f315Bb9663Dd91C3a6': 280,
  '0x6692c5Aab1A7Ef3df56A485A314Ec8D1d705B454': 280,
  '0xbb45D1436f9BA67A55feA5E29E759f5ce69e4D62': 280,
  '0x2dd25D64700aA61c9D710e384E635Fe49aA5A76F': 280,
  '0x2f2C250FAd753D0A858e1De4B78cBF2C2da23DE9': 280,
  '0x064483600d1950777dBF2154dBeD3d6985A4d203': 280,
  '0xC0289797dd5Bf9E6F07bFc743ed73c7C52c10D4b': 280,
  '0x1cF1b431915749aceFf36073C80a8a0148a8F797': 280,
  '0x4b36b4542EE73F8Df3Ea75Bb8432fbd7032Aba67': 280,
  '0x0a406bA95d0C835E83Acc3ccD334C4B70dE43e99': 280,
  '0xd93d33eF767A15aB8f8Aa507BA74839E4E968aeC': 280,
  '0x5462acA6AA800EC6202D22B850c181f97e3F53Dd': 280,
  '0x229DE21D9C2F3D04EE889bAC739E9801e499c4b9': 280,
  '0x936d9f39153d25FC1c8374a36744EBC93E9E5166': 280,
  '0x4A3c0fd9a727a3245572c7771c02d4E05C7bFC7B': 280,
  '0x5f80BC8EBd5C86d944e1c2F3FE6b96f0EeEF9F8f': 280,
  '0xA0b3E1ED22544a56c4B91722A12300f4e3159d99': 280,
  '0x2DC4C79206fFCAEB80Df51526a4E01334fac9Af1': 280,
  '0xF9E044c896f44dC8c652156570738308C61A05a7': 280,
  '0xc18BE8413791901e7F6b2e18529e234e093BDAA7': 280,
  '0x5c7cc268dB3b6e7245FE285Dbc628415373feC0B': 280,
  '0x8D4f3A254A74Ed74efc6fc930F151fa6FcD28580': 280,
  '0xaF3E98d1fcDED2231bc50E9f3f73c94190F43B02': 280,
  '0x2a85B02a051B0E4Ba1C7160087854618941adF40': 280,
  '0x057B2b507531A01bdF3Bf882F770B9ce40414cA8': 280,
  '0xb20B0fF24601d3E531C8052820292Cd3aEe94d3e': 280,
  '0x5895302F4E80195948660e9Cc240bacbA161C8d4': 280,
  '0x2A18136F3766a8AaDf181B711E035D85AD00B47C': 280,
  '0xd97B808c65847892696C602F9D298BDFa6Ab39d4': 280,
  '0x19C6eF4d74b3B4ec72B7c8C81f4071c355AaF49A': 280,
  '0x9f90a72FA874eF0Fc78175C288120b62411704A3': 280,
  '0x3D1268bc618eB10DdbdcAa76ae9b6165A97c226b': 280,
  '0x06bF079964a643D4c8C1D2C5581eC2920Bc401e2': 280,
  '0x88B5e88014e4c6Bc30E872ACcA4febFDB3B7531c': 280,
  '0x17485D6B8ab3e993D6CdCFd1279A81C35645D196': 280,
  '0x4bf650a9ffCbf1b1BEA3342e65C192Be8e93315d': 280,
  '0xFbd0F3A4C51E94cf257EfBfb818202a5AcB9f747': 280,
  '0x718dAa8C68dC3198f145DC203be11293179CAE70': 280,
  '0xB94699f7B944971CcC47fA40Ac310FB465381091': 280,
  '0x03A263922433d40014E1476D78F0cB5f9DA7cd54': 280,
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
