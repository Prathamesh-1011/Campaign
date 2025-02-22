// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(address campaignAddress, address manager, uint minimumContribution);

    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));

        emit CampaignCreated(address(newCampaign), msg.sender, minimum);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    mapping(uint => mapping(address => bool)) public approvals;

    event ContributionReceived(address contributor, uint amount);
    event RequestCreated(uint indexed requestId, string description, uint value, address recipient);
    event RequestApproved(uint indexed requestId, address approver);
    event RequestFinalized(uint indexed requestId, address recipient, uint value);

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Contribution is below minimum");

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }

        emit ContributionReceived(msg.sender, msg.value);
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        requests.push(Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        }));

        emit RequestCreated(requests.length - 1, description, value, recipient);
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender], "Only contributors can approve");
        require(!approvals[index][msg.sender], "Already approved");

        Request storage request = requests[index];
        approvals[index][msg.sender] = true;
        request.approvalCount++;

        emit RequestApproved(index, msg.sender);

        // Auto-finalize if approval threshold is met
        if (request.approvalCount > approversCount / 2) {
            _finalizeRequest(index);
        }
    }

    function _finalizeRequest(uint index) internal {
        Request storage request = requests[index];

        require(!request.complete, "Request already completed");

        payable(request.recipient).transfer(request.value);
        request.complete = true;

        emit RequestFinalized(index, request.recipient, request.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (minimumContribution, address(this).balance, requests.length, approversCount, manager);
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
