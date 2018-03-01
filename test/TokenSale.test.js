const TokenSale = artifacts.require('TokenSale')
const DTXToken = artifacts.require('DTXToken')
const MultiSigWalletWithDailyLimit = artifacts.require(
  'MultiSigWalletWithDailyLimit'
)
const timejump = 3600
const { timetravel } = require('./helpers/timetravel')
const Promise = require('bluebird')

contract('TokenSale', async accounts => {
  it('should fail when trying to send ether before startPresaleTime', async () => {
    console.log(accounts)
    const sale = await TokenSale.deployed()
    try {
      await sale.sendTransaction({
        from: accounts[1],
        value: web3.toWei(1, 'ether'),
      })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('should work when trying to send ether after startPresaleTime and before endPresaleTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    await sale.sendTransaction({
      from: accounts[1],
      value: web3.toWei(11, 'ether'),
    })
    const balance = await token.balanceOf(accounts[1])
    assert.equal(balance.toNumber(), web3.toWei(66000))
  })

  it('should fail when trying to send too little ether during the presale', async () => {
    const sale = await TokenSale.deployed()
    try {
      await sale.sendTransaction({
        from: accounts[1],
        value: web3.toWei(1, 'ether'),
      })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('should fail when trying to send ether after endPresaleTime and before startDayOneTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    try {
      await sale.sendTransaction({
        from: accounts[1],
        value: web3.toWei(1, 'ether'),
      })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('should work when trying to send ether after startDayOneTime and before endDayOneTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    await sale.sendTransaction({
      from: accounts[2],
      value: web3.toWei(1, 'ether'),
    })
    const balance = await token.balanceOf(accounts[2])
    assert.equal(balance.toNumber(), web3.toWei(4400))
    await sale.sendTransaction({
      from: accounts[0],
      value: web3.toWei(1, 'ether'),
    })
  })

  it('should fail when trying to send ether after endDayOneTime and before startTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    try {
      await sale.sendTransaction({
        from: accounts[1],
        value: web3.toWei(1, 'ether'),
      })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('should work when trying to send ether after startTime and before endTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    await sale.sendTransaction({
      from: accounts[3],
      value: web3.toWei(1, 'ether'),
    })
    const balance = await token.balanceOf(accounts[3])
    assert.equal(balance.toNumber(), web3.toWei(4000))
  })

  it('should be able to do a proxy payment', async () => {
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    await sale.proxyPayment(accounts[7], {
      from: accounts[3],
      value: web3.toWei(1, 'ether'),
    })
    const balance = await token.balanceOf(accounts[7])
    assert.equal(balance.toNumber(), web3.toWei(4000))
  })

  it('should fail when trying to send ether after endTime', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    try {
      await sale.sendTransaction({
        from: accounts[1],
        value: web3.toWei(1, 'ether'),
      })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('can pauze and unpauze the sale', async () => {
    const sale = await TokenSale.deployed()
    const pausedBefore = await sale.paused()
    assert.isNotOk(pausedBefore)
    await sale.pauseContribution()
    const pausedBetween = await sale.paused()
    assert.isOk(pausedBetween)
    await sale.resumeContribution()
    const pausedAfter = await sale.paused()
    assert.isNotOk(pausedAfter)
  })

  it('can register private sales', async () => {
    const sale = await TokenSale.deployed()
    const getBlock = Promise.promisify(web3.eth.getBlock)
    const { timestamp } = await getBlock('latest')
    await sale.handleExternalBuyers(
      [accounts[5], accounts[2]],
      [web3.toWei(4000), web3.toWei(5000)],
      [web3.toWei(3000), web3.toWei(2000)],
      [timestamp + timejump, timestamp + timejump + timejump]
    )
  })

  it('can finalise the sale', async () => {
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    const vault = await MultiSigWalletWithDailyLimit.deployed()
    await sale.finalizeSale()
    const balance = await token.balanceOf(vault.address)
    const totalIssued = await sale.totalIssued()
    const totalIssuedEarlySale = await sale.totalIssuedEarlySale()
    const locked = 67500000

    assert.equal(
      225000000,
      new web3.BigNumber(locked)
        .plus(web3.fromWei(totalIssuedEarlySale))
        .plus(web3.fromWei(totalIssued))
        .plus(web3.fromWei(balance))
        .toNumber()
    )
  })

  it('can claim unlocked tokens', async () => {
    await timetravel(timejump)
    const sale = await TokenSale.deployed()
    const token = await DTXToken.deployed()
    let balance = await token.balanceOf(accounts[5])
    assert.equal(balance.toNumber(), web3.toWei(4000))
    await sale.claimLockedTokens(accounts[5])
    balance = await token.balanceOf(accounts[5])
    assert.equal(balance.toNumber(), web3.toWei(7000))
  })

  it('cannot claim locked tokens', async () => {
    const sale = await TokenSale.deployed()
    try {
      await sale.claimLockedTokens(accounts[2])
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('can check when a token transfer happens before its transferable', async () => {
    const token = await DTXToken.deployed()
    await token.transfer(accounts[6], web3.toWei(10))
    try {
      await token.transfer(accounts[6], web3.toWei(10), { from: accounts[1] })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('can check when a token approve happens before its transferable', async () => {
    const token = await DTXToken.deployed()
    await token.approve(accounts[6], web3.toWei(10))
    try {
      await token.approve(accounts[6], web3.toWei(10), { from: accounts[1] })
    } catch (error) {
      const revert = error.message.includes('revert')
      if (!revert) {
        console.log(error)
      }
      assert.isOk(revert)
    }
  })

  it('can control if the token is transferable', async () => {
    const sale = await TokenSale.deployed()
    assert.isNotOk(await sale.transferable())
    await sale.makeTransferable()
    assert.isOk(await sale.transferable())
  })

  it('can check when a token transfer happens after its transferable', async () => {
    const token = await DTXToken.deployed()
    await token.transfer(accounts[6], web3.toWei(10))
    await token.transfer(accounts[6], web3.toWei(10), { from: accounts[1] })
  })

  it('can check when a token approval happens after its transferable', async () => {
    const token = await DTXToken.deployed()
    await token.approve(accounts[6], 0)
    await token.approve(accounts[6], web3.toWei(10))
    await token.approve(accounts[6], web3.toWei(10), { from: accounts[1] })
  })

  it('can change the token controller', async () => {
    const sale = await TokenSale.deployed()
    await sale.changeTokenController('0x0')
  })
})
