import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });

      alert("Approval successful!");
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  onFinalize = async () => {
    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });

      alert("Finalization successful!");
    } catch (error) {
      console.error("Finalization failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;

    // Convert BigInt to Number
    const approversCountNum = Number(approversCount);
    const approvalCountNum = Number(request.approvalCount);

    const readyToFinalize = approvalCountNum > approversCountNum / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value.toString(), "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {approvalCountNum}/{approversCountNum}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        {/* <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell> */}
      </Row>
    );
  }
}

export default RequestRow;
