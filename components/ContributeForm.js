import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router"; // ✅ Use Next.js router for navigation
import getCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default function ContributeForm({ address }) {
    const [value, setValue] = useState("");
    const [receiverChain, setReceiverChain] = useState(""); // ✅ Added field for receiver campaign address
    const [chainSelector, setChainSelector] = useState(""); // ✅ Added field for chain selector
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // ✅ Use Next.js router

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const campaign = getCampaign(address);
            const accounts = await web3.eth.getAccounts();

            if (receiverChain && chainSelector) {
                // ✅ Cross-Chain Contribution
                await campaign.methods.crossChainContribute(receiverChain, chainSelector).send({
                    from: accounts[0],
                    value: web3.utils.toWei(value, "ether")
                });
            } else {
                // ✅ Normal Contribution
                await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: web3.utils.toWei(value, "ether")
                });
            }

            router.push(`/campaigns/${address}`); // ✅ Redirect to campaign page after success
            setValue(""); // ✅ Reset input
            setReceiverChain("");
            setChainSelector("");
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input 
                    value={value} 
                    onChange={(event) => setValue(event.target.value)}
                    label="ETH"
                    labelPosition="right"
                />
            </Form.Field>

            <Form.Field>
                <label>Receiver Campaign Address (Optional for Cross-Chain)</label>
                <Input 
                    value={receiverChain} 
                    onChange={(event) => setReceiverChain(event.target.value)}
                    placeholder="Enter the receiver campaign address"
                />
            </Form.Field>

            <Form.Field>
                <label>Chain Selector (Optional for Cross-Chain)</label>
                <Input 
                    value={chainSelector} 
                    onChange={(event) => setChainSelector(event.target.value)}
                    placeholder="Enter destination chain selector"
                />
            </Form.Field>

            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                {receiverChain && chainSelector ? "Contribute Cross-Chain" : "Contribute"}
            </Button>
        </Form>
    );
}
