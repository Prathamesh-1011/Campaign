import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import getCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default function ContributeForm({ address }) {
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const campaign = getCampaign(address);  // Use the correct function to get the campaign contract
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether")
            });
            this.props.router.push("/campaigns/${address}"); // Redirect to the campaign page after successful contribution

            setValue(""); // Reset input after successful contribution
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
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            {/* <Message error header="Oops!" content={errorMessage} /> */}
            <Button primary loading={loading}>Contribute!</Button>
        </Form>
    );
}
