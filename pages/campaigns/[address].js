import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import getCampaign from "../../ethereum/campaign";
import { Card, Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";
import { Button } from "semantic-ui-react";

const CampaignShow = () => {
  const router = useRouter();
  const { address } = router.query;

  const [campaignData, setCampaignData] = useState({
    minimumContribution: "",
    balance: "",
    requestsCount: "",
    approversCount: "",
    manager: ""
  });

  useEffect(() => {
    if (address) {
      const fetchCampaignDetails = async () => {
        try {
          const campaign = getCampaign(address);
          const summary = await campaign.methods.getSummary().call();

          console.log("Contract Summary:", summary);

          setCampaignData({
            minimumContribution: summary[0].toString(),
            balance: web3.utils.fromWei(summary[1], "ether"),
            requestsCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4]
          });
        } catch (error) {
          console.error("Error fetching campaign data:", error);
        }
      };

      fetchCampaignDetails();
    }
  }, [address]);

  const renderCards = () => {
    const { minimumContribution, balance, requestsCount, approversCount, manager } = campaignData;

    const items = [
      {
        header: manager || "Loading...",
        meta: "Address of Manager",
        description: "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution || "0",
        meta: "Minimum Contribution (wei)",
        description: "You must contribute at least this much wei to become an approver."
      },
      {
        header: requestsCount || "0",
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the contract. Requests must be approved by approvers."
      },
      {
        header: approversCount || "0",
        meta: "Number of Approvers",
        description: "Number of people who have already donated to this campaign."
      },
      {
        header: balance || "0",
        meta: "Campaign Balance (ether)",
        description: "The amount of money this campaign has left to spend."
      }
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h1>Campaign Details</h1>
      <Grid>
          <Grid.Column width={10}>{renderCards()}
            <Link href={`/campaigns/${address}/requests`} passHref>
              <Button primary style={{ marginTop: "20px" }}>View Requests</Button>
            </Link>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid>   
    </Layout>
  );
};

export default CampaignShow;
