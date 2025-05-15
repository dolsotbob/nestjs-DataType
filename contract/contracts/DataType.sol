// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DataType {
    uint256 public positiveNumber = 100;
    int256 public negativeNumber = -50;
    bool public isActive = true;

    address payable public wallet =
        payable(0x0000000000000000000000000000000000000000);
    address payable public recipient;

    bytes32 public fixedData = "0xabcdef123456";
    bytes public dynamicData;

    enum State {
        Created,
        Active,
        Inactive
    }
    State public currentState = State.Active;

    constructor(address _recipient) {
        recipient = payable(_recipient);
    }

    function setPositiveNumber(uint256 _positiveNumber) public {
        positiveNumber = _positiveNumber;
    }

    function setNegativeNumber(int256 _negativeNumber) public {
        negativeNumber = _negativeNumber;
    }

    function toggleActive() public {
        isActive = !isActive;
    }

    function setWallet(address _newWallet) public {
        wallet = payable(_newWallet);
        recipient = payable(_newWallet);
    }

    function setFixedData(bytes32 _fixedData) public {
        fixedData = _fixedData;
    }

    function setDynamicData(bytes memory _dynamicData) public {
        dynamicData = _dynamicData;
    }

    function getDynamicDataLength() public view returns (uint) {
        return dynamicData.length;
    }

    function setState(State _state) public {
        require(
            _state == State.Created ||
                _state == State.Active ||
                _state == State.Inactive,
            "Invalid state"
        );
        currentState = _state;
    }

    function getDetails()
        public
        view
        returns (
            uint256,
            int256,
            bool,
            address,
            address,
            bytes32,
            bytes memory,
            State
        )
    {
        return (
            positiveNumber,
            negativeNumber,
            isActive,
            wallet,
            recipient,
            fixedData,
            dynamicData,
            currentState
        );
    }
}
