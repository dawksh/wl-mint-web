import { Box, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import WLMint from "../utils/WhitelistMint.json";
import { Biconomy } from "@biconomy/mexa";
import { ethers } from "ethers";
import Head from "next/head";

declare const window: any;

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);

	const { data } = useAccount();
	let provider: ethers.providers.Provider;

	let biconomy: any;
	let biconomyProvider: any;
	let contract: any;

	useEffect(() => {
		if (window.ethereum != "undefined") {
			provider = new ethers.providers.Web3Provider(window.ethereum);
			biconomy = new Biconomy(provider, {
				apiKey: process.env.NEXT_PUBLIC_BICO_API as string,
				debug: false,
			});
			biconomyProvider = new ethers.providers.Web3Provider(biconomy);
		} else {
			alert("Ethereum enviornment not found");
		}
	});

	const mint = async () => {
		if (data?.address) {
			setLoading(true);
			const signer = biconomyProvider.getSigner();
			contract = new ethers.Contract(
				"0xd6C57F0c8fEbc752a7b202229E74A0cEac676d87",
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
				alert("An error occured, check console");
				setLoading(false);
			}
		} else {
			alert("Connect wallet first");
		}
	};

	return (
		<Box p={6}>
			<Head>
				<title>NFT Drop $DK</title>
			</Head>
			<Flex
				justifyContent={"center"}
				alignItems="center"
				direction={"column"}
				background={"whiteAlpha.100"}
				rounded={6}
				p={8}
				minHeight={"20rem"}
				minWidth={"25rem"}
			>
				<Text mb={4}>
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
