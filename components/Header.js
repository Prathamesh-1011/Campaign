import Link from "next/link";
import React from "react";
import { Menu } from "semantic-ui-react";

export default function Header() {
    return (
        <Menu style={{ marginTop: "10px" }}>
            <Menu.Item>
                <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                    DeFi-Campaign
                </Link>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                        Campaigns
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/campaigns/new" style={{ textDecoration: "none", color: "inherit" }}>
                        +
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
