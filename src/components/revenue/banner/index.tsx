import React from "react";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import BalancePreview from "../../ui/BalancePreview";
import AppLineChart from "@/components/ui/AppLineChart";
const dummyData = [
	{ date: "Jan 1", value: 45 },
	{ date: "Jan 2", value: 62 },
	{ date: "Jan 3", value: 78 },
	{ date: "Jan 4", value: 55 },
	{ date: "Jan 5", value: 82 },
	{ date: "Jan 6", value: 67 },
	{ date: "Jan 7", value: 91 },
	{ date: "Jan 8", value: 58 },
	{ date: "Jan 9", value: 73 },
	{ date: "Jan 10", value: 65 },
	{ date: "Jan 11", value: 79 },
	{ date: "Jan 12", value: 83 },
	{ date: "Jan 13", value: 72 },
	{ date: "Jan 14", value: 68 },
	{ date: "Jan 15", value: 76 },
	{ date: "Jan 16", value: 89 },
	{ date: "Jan 17", value: 94 },
	{ date: "Jan 18", value: 81 },
	{ date: "Jan 19", value: 77 },
	{ date: "Jan 20", value: 69 },
	{ date: "Jan 21", value: 64 },
	{ date: "Jan 22", value: 71 },
	{ date: "Jan 23", value: 85 },
	{ date: "Jan 24", value: 92 },
	{ date: "Jan 25", value: 88 },
	{ date: "Jan 26", value: 74 },
	{ date: "Jan 27", value: 63 },
	{ date: "Jan 28", value: 59 },
	{ date: "Jan 29", value: 66 },
	{ date: "Jan 30", value: 72 },
];

export default function Banner() {
	return (
		<Box w="full" py={16} color={"#56616B"}>
			{/* Chart Overview */}
			<Flex gap={"120px"} w={"full"} alignItems={"space-between"}>
				<Box flex={1}>
					<Flex gap={16} alignItems={"flex-end"}>
						<Box>
							<Text fontSize="md">Available Balance</Text>
							<Text
								fontSize="3xl"
								fontWeight={"bold"}
								color={"#131316"}
								lineHeight={1}
								mt={3}>
								USD 120,500.00
							</Text>
						</Box>

						<Button
							borderRadius={"100px"}
							px={7}
							py={3.5}
							fontSize={"md"}
							h="52px"
							w="167px">
							Withdraw
						</Button>
					</Flex>

					<Box h="252px" w="full" mt={10}>
						<AppLineChart data={dummyData} loading={false} />
					</Box>
				</Box>

				{/* Balances Overview */}
				<VStack gap={6} w={"271px"}>
					<BalancePreview />
					<BalancePreview />
					<BalancePreview />
					<BalancePreview />
				</VStack>
			</Flex>
		</Box>
	);
}
