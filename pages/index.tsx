import { Box, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContract, useProvider, useSigner } from "wagmi";
import WLMint from "../utils/WhitelistMint.json";
import { Biconomy } from "@biconomy/mexa";
import { ethers } from "ethers";

declare const window: any;

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);

	// const { data: signer } = useSigner();
	let provider: ethers.providers.Provider;

	let biconomy: any;
	let biconomyProvider: any;
	let contract: any;

	useEffect(() => {
		if (window.ethereum !== "undefined") {
			provider = new ethers.providers.Web3Provider(window.ethereum);
			biconomy = new Biconomy(provider, {
				apiKey: "a86UV8aKm.b5d04fac-a2f3-442e-9dd8-5bb58f1614c2",
				debug: false,
			});
			biconomyProvider = new ethers.providers.Web3Provider(biconomy);
		}
	});

	const mint = async () => {
		setLoading(true);
		const signer = biconomyProvider.getSigner();
		contract = new ethers.Contract(
			"0xd3Ca0B0eA48A7a9943C7b0A44ECE57CedDC58D1b",
			WLMint.abi,
			signer
		);
		try {
			let txn = await contract.mint({
				gasPrice: 25,
				gasLimit: 9000000,
			});
			console.log(txn);
			setLoading(false);
			alert(`Txn completed with txn hash: ${txn.hash}`);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	return (
		<Box p={6}>
			<Flex
				justifyItems={"center"}
				alignItems="center"
				direction={"column"}
				background={"whiteAlpha.100"}
				rounded={6}
				p={8}
				minHeight={"20rem"}
				minWidth={"25rem"}
			>
				<Text m={4}>
					Click the Mint button below to mint one of a kind $DK ERC721
					token for free (not even gas!)
				</Text>
				<Button mt={4} isLoading={loading} onClick={mint}>
					Mint
				</Button>
			</Flex>
		</Box>
	);
};

export default Home;
