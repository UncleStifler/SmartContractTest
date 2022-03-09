// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donations {
    address payable public owner;
    mapping(address => uint) public donations;

    constructor() {
        owner = payable(msg.sender);
    }

    function donate() public payable {
        // Make a donation, you can add an amount if necessary
        if (!inDonaters(msg.sender)) {
            donations[msg.sender] = msg.value;
        }
        else {
            donations[msg.sender] += msg.value;
        }
    }

    function transfer(address payable _addressUse, uint _amount) external {
        // balance amount transfer. The function is available to the owner only
        require(msg.sender == owner, "You have no permission to get donates");
        _addressUse.transfer(_amount);
    }

    function inDonaters(address _addressUse) public view returns (bool) {
        // has the patron already donated?
        return donations[_addressUse] > 0;
    }

    function getDonates(address _addressUse) public view returns (uint) {
        // how much did anyone donate
        return donations[_addressUse];
    }

    function currentBalance() public view returns (uint256) {
        // to get total balance of owner account
        return address(this).balance;
    }
}