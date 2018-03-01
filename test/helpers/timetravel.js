const timetravel = s => {
  return new Promise((resolve, reject) => {
    const id = new Date().getTime()
    web3.currentProvider.sendAsync(
      {
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [s],
        id,
      },
      function(err) {
        if (err) return reject(err)
        web3.currentProvider.sendAsync(
          {
            jsonrpc: '2.0',
            method: 'evm_mine',
            id: id + 1,
          },
          (err2, res) => {
            return err2 ? reject(err2) : resolve(res)
          }
        )

        resolve()
      }
    )
  })
}

const blocktravel = async (s, accounts) => {
  for (let i = 0; i < s; i++) {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: 1,
    })
  }
}

module.exports = {
  timetravel,
  blocktravel,
}
