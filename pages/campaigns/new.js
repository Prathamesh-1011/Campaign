import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

const NewCampaign = () => {
    const [minimumContribution, setMinimumContribution] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribution).send({
                from: accounts[0],
            });

            router.push("/");
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h3>Create a New Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={(event) => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                {/* <Message error header="Oops!" content={errorMessage} /> */}
                <Button primary loading={loading}>Create!</Button>
            </Form>
        </div>
    );
};

export default NewCampaign;
