import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function loadCampaigns() {
      if (factory) {
        const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(deployedCampaigns);
      }
    }
    loadCampaigns();
  }, []);

  const renderCampaigns = () => {
    return campaigns.map((address) => ({
      header: address,
      description: (
        <Link href={`/campaigns/${address}`} key={address}>
          View Campaign
        </Link>
      ),
      fluid: true,
    }));
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <Button floated="right" content="Create Campaign" icon="add circle" primary />
        </Link>
        <Card.Group items={renderCampaigns()} />
      </div>
    </Layout>
  );
};

export default CampaignIndex;
