// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@account-abstraction/contracts/samples/SimpleAccount.sol";

contract SimpleSocialRecoveryAccount is SimpleAccount, EIP712 {
  using ECDSA for bytes32;

  struct RecoveryMessage {
    uint96 nonce;
    address to;
  }

  event SocialRecoveryAddressAdded(address indexed _address);
  event SocialRecoveryAddressRemoved(address indexed _address);

  bytes32 public constant RECOVERY_TYPEHASH =
    keccak256("RecoveryMessage(uint96 nonce,address to)");
  uint256 public recoverySigAmount = 3;
  mapping(address => bool) socialRecoveryAddresses;
  mapping(address => uint256) usedNonces;

  constructor(
    IEntryPoint anEntryPoint
  ) SimpleAccount(anEntryPoint) EIP712("SampleSocialRecoveryAccount", "1") {}

  function initialize(
    address owner,
    address[] memory addresses
  ) public initializer {
    for (uint256 i = 0; i < addresses.length; i++) {
      socialRecoveryAddresses[addresses[i]] = true;
      emit SocialRecoveryAddressAdded(addresses[i]);
    }
    super.initialize(owner);
  }

  function recoverAddress(
    RecoveryMessage memory message,
    bytes memory signature
  ) public view returns (address) {
    bytes32 digest = _hashTypedDataV4(
      keccak256(abi.encode(RECOVERY_TYPEHASH, message.nonce, message.to))
    );
    return digest.recover(signature);
  }

  function socialRecovery(
    RecoveryMessage[] calldata messages,
    bytes[] calldata signatures
  ) external {
    require(
      messages.length == signatures.length,
      "messages and signatures length mismatch"
    );
    require(
      messages.length >= recoverySigAmount,
      "messages length must be greater than or equal to recoverySigAmount"
    );

    for (uint256 i = 0; i < messages.length; i++) {
      require(
        socialRecoveryAddresses[recoverAddress(messages[i], signatures[i])],
        "Invalid signature"
      );
      require(
        usedNonces[recoverAddress(messages[i], signatures[i])] <
          messages[i].nonce,
        "Nonce already used"
      );
      usedNonces[recoverAddress(messages[i], signatures[i])] = messages[i]
        .nonce;
    }
  }

  function setRecoverySigAmount(uint256 _amount) external {
    require(socialRecoveryAddresses[msg.sender], "Not a recovery address");
    recoverySigAmount = _amount;
  }

  function addSocialRecoveryAddress(address _address) external {
    require(socialRecoveryAddresses[msg.sender], "Not a recovery address");
    require(!socialRecoveryAddresses[_address], "Already a recovery address");
    socialRecoveryAddresses[_address] = true;
    emit SocialRecoveryAddressAdded(_address);
  }

  function removeSocialRecoveryAddress(address _address) external {
    require(socialRecoveryAddresses[msg.sender], "Not a recovery address");
    require(socialRecoveryAddresses[_address], "Not a recovery address");
    socialRecoveryAddresses[_address] = false;
    emit SocialRecoveryAddressRemoved(_address);
  }
}
