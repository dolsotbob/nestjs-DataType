// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DataType {
    uint256 public positiveNumber = 100;
    int256 public negativeNumber = -50;

    bool public isActive = true;

    address public wallet = address(0);
    address public recipient;

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

    function setPositiveNumber(uint256 _value) public {
        positiveNumber = _value;
    }

    function setNegativeNumber(int256 _value) public {
        negativeNumber = _value;
    }

    function toggleActive() public {
        isActive = !isActive;
    }

    function setWallet(address _address) public {
        wallet = payable(_address);
        recipient = payable(_address);
    }

    function setFixedData(bytes32 _data) public {
        fixedData = _data;
    }

    function setDynamicData(bytes memory _data) public {
        dynamicData = _data;
    }

    function getDynamicDataLength() public view returns (uint256) {
        return dynamicData.length;
    }

    function setState(State _state) public {
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

/*
    과제 흐름
    - Client(Postman) - 요청
    - Server가 요청을 받고 컨트랙트에 데이터를 요청(DataType.controller => DataType.service => Ethers.service)
    - Contract => function이 값을 줌
    - Server가 받은 값은 다시 Client에 전달 
*/
