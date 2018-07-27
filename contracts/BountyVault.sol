pragma solidity ^0.4.21;

import "./DTXToken.sol";
import "./external/SafeMath.sol";
import "./external/Ownable.sol";


contract BountyVault is Ownable {

  using SafeMath for uint256;

  // the tokencontract for the DataBrokerDAO
  DTXToken public tokenContract;

  uint256 public allocatedTotal;

  // the list of addresses and how much they have earned.
  mapping(address => uint256) public balances;

  /// @dev the constructor
  constructor(
    address _tokenAddress
  ) public {
    tokenContract = DTXToken(_tokenAddress);
  }

  /// @dev Withdraws the tokens
  function withdrawTokens() public {
    uint256 amount = balances[msg.sender];
    require(amount > 0, "You have no tokens left");
    balances[msg.sender] = 0;
    require(tokenContract.transfer(msg.sender, amount), "Token transfer failed");
  }

  /// @dev utility function to allow the owner to allocate tokens
  function allocateTokens(address[] _recipients, uint256[] _amounts) public onlyOwner {
    for (uint256 i = 0; i < _recipients.length; i++) {
      balances[_recipients[i]] = balances[_recipients[i]].add(_amounts[i]);
      allocatedTotal = allocatedTotal.add(_amounts[i]);
    }
  }
}
