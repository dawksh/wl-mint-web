import { Box, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useContract, useSigner } from "wagmi";
import WLMint from "../utils/WhitelistMint.json";

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);

	const { data: signer, isError, isLoading } = useSigner();
	const contract = useContract({
		addressOrName: "0x8fe4dE01854B1AaE58e75caf7D8A73cC88F75bCd",
		contractInterface: WLMint.abi,
		signerOrProvider: signer,
	});

	const mint = async () => {
		setLoading(true);
		try {
			let txn = await contract.mint();
			console.log(txn);
			setLoading(false);
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
