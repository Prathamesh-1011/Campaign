import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

const RequestIndex = ({ requests, requestCount, approversCount }) => {
  const router = useRouter();
  const { address } = router.query;

  const renderRows = () => {
    return requests.map((request, index) => (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={address}
        approversCount={approversCount}
      />
    ));
  };

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary style={{ marginBottom: "10px" }}>Add Request</Button>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            {/* <Table.HeaderCell>Finalize</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRows()}</Table.Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

// Fetching data server-side
RequestIndex.getInitialProps = async (context) => {
  const { address } = context.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((_, index) => campaign.methods.requests(index).call())
  );

  return { address, requests, requestCount, approversCount };
};

export default RequestIndex;
