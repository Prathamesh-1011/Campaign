// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainCampaign is CCIPReceiver {
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
    IRouterClient public router;

    event ContributionReceived(address contributor, uint amount, uint64 sourceChain);
    event RequestCreated(uint indexed requestId, string description, uint value, address recipient);
    event RequestApproved(uint indexed requestId, address approver);
    event RequestFinalized(uint indexed requestId, address recipient, uint value);

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    constructor(uint minimum, address creator, address _router) CCIPReceiver(_router) {
        manager = creator;
        minimumContribution = minimum;
        router = IRouterClient(_router);
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Contribution is below minimum");

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }

        emit ContributionReceived(msg.sender, msg.value, 0);
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

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address contributor, uint amount) = abi.decode(message.data, (address, uint));
        if (!approvers[contributor]) {
            approvers[contributor] = true;
            approversCount++;
        }
        emit ContributionReceived(contributor, amount, message.sourceChainSelector);
    }

    function crossChainContribute(address receiverChainAddress, uint64 destinationChainSelector) external payable {
        require(msg.value >= minimumContribution, "Contribution is below minimum");

        bytes memory data = abi.encode(msg.sender, msg.value);

        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiverChainAddress),
            data: data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: bytes(""),
            feeToken: address(0)
        });

        router.ccipSend(destinationChainSelector, evm2AnyMessage);

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }

        emit ContributionReceived(msg.sender, msg.value, 0);
    }
}