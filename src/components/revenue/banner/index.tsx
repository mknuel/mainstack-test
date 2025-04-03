import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import BalancePreview from "../../ui/BalancePreview";
import AppLineChart from "@/components/ui/AppLineChart";
import { useWallet } from "@/lib/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { ITransaction } from "@/types";
import moment from "moment";
import { formatCurrency } from "@/utils";

const transformTransactions = (transactions: ITransaction[]) => {
	return transactions
		.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()) // Sort oldest to newest
		.map((tx) => ({
			date: moment(tx.date).format("MMM D"), // Formats like "Jan 1"
			value: tx.amount,
		}));
};

export default function Banner() {
	const { data, isLoading } = useWallet();

	const queryClient = useQueryClient();
	const transactions = queryClient.getQueryData<ITransaction[]>([
		"transactions",
	]);

	const txData = transformTransactions(transactions || []);

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
								{formatCurrency(data?.balance || 0)}
							</Text>
						</Box>

						<Button
							borderRadius={"100px"}
							px={7}
							py={3.5}
							fontSize={"md"}
							h="52px"
							w="167px"
							disabled={isLoading}>
							Withdraw
						</Button>
					</Flex>

					<Box h="252px" w="full" mt={10}>
						<AppLineChart data={txData} loading={isLoading} />
					</Box>
				</Box>

				{/* Balances Overview */}
				<VStack gap={6} w={"271px"}>
					<BalancePreview
						label="Ledger Balance"
						amount={data?.ledger_balance}
						description="Ledger Balance"
					/>
					<BalancePreview
						label="Total Payout"
						amount={data?.total_payout}
						description="Total payout"
					/>
					<BalancePreview
						label="Total Revenue"
						amount={data?.total_revenue}
						description="Total revenue"
					/>
					<BalancePreview
						label="Pending Payout"
						description="Pending Payout"
						amount={data?.pending_payout}
					/>
				</VStack>
			</Flex>
		</Box>
	);
}
