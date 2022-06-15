import { Box, Flex, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
	return (
		<Box>
			<Flex
				direction={"row"}
				alignItems="center"
				justifyContent={"space-between"}
				p={6}
			>
				<Heading>Daksh Drop</Heading>
				<ConnectButton />
			</Flex>
		</Box>
	);
}

export default Navbar;
