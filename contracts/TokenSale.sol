pragma solidity ^0.4.21;

import "./DTXToken.sol";
import "./external/SafeMath.sol";
import "./external/Controlled.sol";
import "./external/ERC20Token.sol";


contract TokenSale is TokenController, Controlled {

  using SafeMath for uint256;

  // In UNIX time format - http://www.unixtimestamp.com/
  uint256 public startPresaleTime;
  uint256 public endPresaleTime;
  uint256 public startDayOneTime;
  uint256 public endDayOneTime;
  uint256 public startTime;
  uint256 public endTime;

  // the purchase rates
  uint256 constant public TOKENS_PER_ETHER_EARLYSALE = 6400;
  uint256 constant public TOKENS_PER_ETHER_PRESALE = 6000;
  uint256 constant public TOKENS_PER_ETHER_DAY_ONE = 4400;
  uint256 constant public TOKENS_PER_ETHER = 4000;

  // max amount of 225 million tokens, in their smallest denomination
  uint256 constant public MAX_TOKENS = 225000000 * 10**18;

  // hard cap of 108 million tokens, in their smallest denomination
  uint256 constant public HARD_CAP = 108000000 * 10**18;

  // tokens locked for 3 years
  uint256 public lockedTokens;

  // total amount of tokens issues
  uint256 public totalIssued;

  // total amount of tokens locked in vesting
  uint256 public totalVested;

  // total amount of tokens issues
  uint256 public totalIssuedEarlySale;

  // the tokencontract for the DataBrokerDAO
  DTXToken public tokenContract;

  // the funds end up in this address
  address public vaultAddress;

  // is the token sale paused
  bool public paused;

  // is the token sale finalized
  bool public finalized;

  // are the tokens transferable
  bool public transferable;

  // listing of addresses with allowances
  mapping(address => Vesting) vestedAllowances;

  struct Vesting {
    uint256 amount;
    uint256 cliff;
  }

  /// @dev the constructor
  function TokenSale(
    uint256 _startPresaleTime,
    uint256 _endPresaleTime,
    uint256 _startDayOneTime,
    uint256 _endDayOneTime,
    uint256 _startTime,
    uint256 _endTime,
    address _vaultAddress,
    address _tokenAddress
  ) public {
    // are the dates in the future
    require(_startPresaleTime > now);
    require(_endPresaleTime > now);
    require(_startDayOneTime > now);
    require(_endDayOneTime > now);
    require(_startTime > now);
    require(_endTime > now);
    // are the end dates after the start dates
    require(_endPresaleTime >= _startPresaleTime);
    require(_endDayOneTime >= _startDayOneTime);
    require(_endTime >= _startTime);
    // are the phases in the right order
    require(_startTime >= _endDayOneTime);
    require(_startDayOneTime >= _endPresaleTime);
    // dates are correct, set them!
    startPresaleTime = _startPresaleTime;
    endPresaleTime = _endPresaleTime;
    startDayOneTime = _startDayOneTime;
    endDayOneTime = _endDayOneTime;
    startTime = _startTime;
    endTime = _endTime;
    // make sure the the vault is there
    require(_vaultAddress != 0x0);
    vaultAddress = _vaultAddress;
    // make sure the token is there
    require(_tokenAddress != 0x0);
    tokenContract = DTXToken(_tokenAddress);
    // calculate the amount of tokens we need to lock up
    lockedTokens = MAX_TOKENS.div(100).mul(30);
    // set some stating flags
    paused = false;
    finalized = false;
    transferable = false;
  }

  /// @dev The fallback function is called when ether is sent to the contract, it
  /// simply calls `doPayment()` with the address that sent the ether as the
  /// `_owner`. Payable is a required solidity modifier for functions to receive
  /// ether, without this modifier functions will throw if ether is sent to them
  function () public payable notPaused {
    doPayment(msg.sender);
  }

  /// @notice `proxyPayment()` allows the caller to send ether to the TokenSale and
  /// have the tokens created in an address of their choosing
  function proxyPayment(address _owner) public payable notPaused returns(bool success) {
    return doPayment(_owner);
  }

  /// @notice Notifies the controller about a transfer, for this TokenSale all
  /// transfers are allowed by default and no extra notifications are needed
  function onTransfer(address _from, address /*_to*/, uint /*_amount*/) public returns(bool success) {
    if ( _from == controller || _from == address(this) ) {
      return true;
    }
    return transferable;
  }

  /// @notice Notifies the controller about an approval, for this TokenSale all
  /// approvals are allowed by default and no extra notifications are needed
  function onApprove(address _owner, address /*_spender*/, uint /*_amount*/) public returns(bool success) {
    if ( _owner == controller || _owner == address(this) ) {
      return true;
    }
    return transferable;
  }

  /// @dev setter for the transferable flag
  function makeTransferable() public onlyController {
    transferable = true;
  }

  /// @dev update method for all the dates
  function updateDates(
    uint256 _startPresaleTime,
    uint256 _endPresaleTime,
    uint256 _startDayOneTime,
    uint256 _endDayOneTime,
    uint256 _startTime,
    uint256 _endTime) public onlyController {
    startPresaleTime = _startPresaleTime;
    endPresaleTime = _endPresaleTime;
    startDayOneTime = _startDayOneTime;
    endDayOneTime = _endDayOneTime;
    startTime = _startTime;
    endTime = _endTime;
  }

  /// @dev utility function to allow the owner to handle the early sale purchases
  function handleEarlySaleBuyers(address[] _recipients, uint256[] _ethAmounts) public onlyController {
    // only run if the sale is not finalised yet
    require(!finalized);
    // loop over all recipients, use smallish lists in regards to gas costs (TBD)
    for (uint256 i = 0; i < _recipients.length; i++) {
      // use the fixed conversion rate from ETH to DTX
      uint256 tokensToIssue = TOKENS_PER_ETHER_EARLYSALE.mul(_ethAmounts[i]);
      // keep a separate counter to have a complete records on DTX issued
      totalIssuedEarlySale = totalIssuedEarlySale.add(tokensToIssue);
      // Creates an equal amount of tokens as ether sent. The new tokens are created in the address of the recipient
      require(tokenContract.generateTokens(_recipients[i], tokensToIssue));
    }
  }

  /// @dev utility function to allow the owner to handle private and bitcoin buyers
  function handleExternalBuyers(
    address[] _recipients,
    uint256[] _free,
    uint256[] _locked,
    uint256[] _cliffs
  ) public onlyController {
    // only run if the sale is not finalised yet
    require(!finalized);
    // loop over all recipients, use smallish lists in regards to gas costs (TBD)
    for (uint256 i = 0; i < _recipients.length; i++) {
      // these tokens count for the hard cap limit, but they are guaranteed to succeed so no hardcap check.
      totalIssued = totalIssued.add(_free[i]);
      // Creates an equal amount of tokens as ether sent. The new tokens are created in the address of the recipient
      require(tokenContract.generateTokens(_recipients[i], _free[i]));
      // locks the rest until the cliff is reached
      vestedAllowances[_recipients[i]] = Vesting(_locked[i], _cliffs[i]);
      totalVested.add(_locked[i]);
      require(lockedTokens.add(totalVested.add(totalIssued.add(totalIssuedEarlySale))) <= MAX_TOKENS);
    }
  }

  /// @dev `doPayment()` is an internal function that sends the ether that this
  ///  contract receives to the `vault` and creates tokens in the address of the
  ///  `_owner` assuming the TokenSale is still accepting funds
  function doPayment(address _owner) internal returns(bool success) {
    // there is no reason to check anything if there is no ETH being sent
    require(msg.value > 0);

    // if this contract is not the controller, we can fail immediately
    require(tokenContract.controller() == address(this));

    // check in what period we are
    bool isPresale = startPresaleTime <= now && endPresaleTime >= now;
    bool isDayOne = startDayOneTime <= now && endDayOneTime >= now;
    bool isSale = startTime <= now && endTime >= now;

    // check if we are in one of the sale periods
    require(isPresale || isDayOne || isSale);

    // check the minimum for the presale phase
    if (isPresale) {
      require(msg.value >= 10 ether);
    }

    // figure out the rate for this period.
    uint256 tokensPerEther = TOKENS_PER_ETHER;
    if (isPresale) {
      tokensPerEther = TOKENS_PER_ETHER_PRESALE;
    }
    if (isDayOne) {
      tokensPerEther = TOKENS_PER_ETHER_DAY_ONE;
    }

    // calculate the tokens to issue (since the decimals match, we just need to multiply the wei amounts)
    uint256 tokensToIssue = tokensPerEther.mul(msg.value);

    // have we reached the max contribution
    require(totalIssued.add(tokensToIssue) <= HARD_CAP);
    require(tokensToIssue.add(lockedTokens.add(totalVested.add(totalIssued.add(totalIssuedEarlySale)))) <= MAX_TOKENS);

    // Track how much the TokenSale has collected
    totalIssued = totalIssued.add(tokensToIssue);

    // Send the ether to the vault
    vaultAddress.transfer(msg.value);

    // Creates an equal amount of tokens as ether sent. The new tokens are created in the `_owner` address
    require(tokenContract.generateTokens(_owner, tokensToIssue));

    return true;
  }

  /// @dev Allow the owner of TokenSale to change the controller of the token
  function changeTokenController(address _newController) public onlyController {
    tokenContract.changeController(_newController);
  }

  /// @notice `finalizeSale()` ends the TokenSale. It will generate the platform and team tokens
  ///  and set the controller to the referral fee contract.
  /// @dev `finalizeSale()` can only be called after the end of the funding period or if the maximum amount is raised.
  function finalizeSale() public onlyController {
    // either the end time is passed, or the hard cap is reached
    require(now > endTime || totalIssued >= HARD_CAP);

    // we should only do this function once since it generates tokens
    require(!finalized);

    vestedAllowances[vaultAddress] = Vesting(lockedTokens, now + 3 years);

    // calculate how many tokens are left if we subtract all the issued amounts
    uint256 leftoverTokens = MAX_TOKENS.sub(lockedTokens).sub(totalIssued).sub(totalIssuedEarlySale).sub(totalVested);

    // generate that left over amount in the vault address
    require(tokenContract.generateTokens(vaultAddress, leftoverTokens));
    require(tokenContract.generateTokens(address(this), lockedTokens.add(totalVested)));

    finalized = true;
  }

  function claimLockedTokens(address _owner) public {
    require(vestedAllowances[_owner].cliff > 0 && vestedAllowances[_owner].amount > 0);
    require(now >= vestedAllowances[_owner].cliff);
    uint256 amount = vestedAllowances[_owner].amount;
    vestedAllowances[_owner].amount = 0;
    require(tokenContract.transfer(_owner, amount));
  }

  /// @notice Pauses the contribution if there is any issue
  function pauseContribution() public onlyController {
    paused = true;
  }

  /// @notice Resumes the contribution
  function resumeContribution() public onlyController {
    paused = false;
  }

  modifier notPaused() {
    require(!paused);
    _;
  }
}
