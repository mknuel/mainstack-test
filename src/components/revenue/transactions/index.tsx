import React, { useState } from "react";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Transaction from "./transaction";
import { ITransaction } from "@/types";
import { ArrowDownIcon, DownloadIcon } from "@/components/icons";
import { color } from "framer-motion";
import FilterDrawer from "@/components/ui/FilterDrawer";
const dummy: ITransaction[] = [
	{
		type: "credit",
		title: "Freelance Payment",
		subtitle: "Upwork",
		amount: 1200,
		date: "Mar 28, 2025",
		status: "success",
	},
	{
		type: "debit",
		title: "Netflix Subscription",
		subtitle: "Netflix Inc.",
		amount: 15,
		date: "Mar 27, 2025",
		status: "failed",
	},
	{
		type: "credit",
		title: "Stock Dividend",
		subtitle: "Robinhood",
		amount: 300,
		date: "Mar 25, 2025",
		status: "pending",
	},
	{
		type: "debit",
		title: "Grocery Shopping",
		subtitle: "Walmart",
		amount: 85,
		date: "Mar 24, 2025",
		status: "success",
	},
];
export default function Transactions() {
	const [open, setOpen] = useState<boolean>(true);
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Box py={10}>
			<FilterDrawer isOpen={open} handleClose={handleClose} />
			<Flex
				justifyContent={"space-between"}
				w="full"
				borderBottom={"1px solid #EFF1F6"}
				pb={6}>
				<VStack w="full">
					<Text
						textAlign="left"
						w="full"
						fontSize={"24px"}
						fontWeight="bold"
						lineHeight={1}>
						24 Transactions
					</Text>
					<Text w="full" fontSize={"sm"}>
						Your transactions for the last 7 days
					</Text>
				</VStack>
				<HStack>
					<Button
						bg="#EFF1F6"
						color={"#131316"}
						borderRadius={"100px"}
						px={5}
						py={3}
						fontWeight={600}
						height={"48px"}
						lineHeight={1}
						onClick={() => setOpen(true)}
						fontSize="md">
						Filter
						<ArrowDownIcon size={"xs"} />
					</Button>
					<Button
						display="flex"
						alignItems="center"
						justifyContent="center"
						bg="#EFF1F6"
						color="#131316"
						height="48px"
						borderRadius="100px"
						fontWeight={600}
						px={5}
						py={3}
						fontSize="md"
						lineHeight={1}>
						Export list
						<DownloadIcon size={"xs"} mb={1} /* w="12.67px" h={"12.96px"} */ />
					</Button>
				</HStack>
			</Flex>

			<VStack gap={5} mt={6}>
				{dummy.map((transaction, index) => (
					<Transaction key={index} transaction={transaction} />
				))}
			</VStack>
		</Box>
	);
}
