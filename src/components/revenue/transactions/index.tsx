import { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Flex,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import Transaction, { TransactionSkeletonLoader } from "./transaction";
import { ArrowDownIcon, DownloadIcon } from "@/components/icons";
import FilterDrawer from "@/components/ui/FilterDrawer";
import { useTransactions } from "@/lib/hooks/useQueries";
import {
	calculateDuration,
	exportTransactionsToCSV,
	filterTransactions,
} from "@/utils";
import { DateRange } from "@/types";
type filterState = {
	startDate: string | undefined;
	endDate: string | undefined;
	transactionType: string[] | undefined;
	transactionStatus: string[] | undefined;
};

const getActiveFilterCount = (filters: filterState): number => {
	return Object.values(filters).filter(
		(value) => value !== undefined && value !== "" && value.length !== 0
	).length;
};

export default function Transactions() {
	const [open, setOpen] = useState<boolean>(false);
	const { data, isLoading } = useTransactions();
	const [filters, setFilters] = useState<filterState>({
		transactionType: undefined,
		transactionStatus: undefined,
		startDate: undefined,
		endDate: undefined,
	});

	const applyFilters = (val: {
		dateRange: DateRange;
		txType: string[];
		txStatus: string[];
	}) => {
		setFilters({
			transactionType: val.txType || undefined,
			transactionStatus: val.txStatus || undefined,
			startDate: val.dateRange.startDate?.toISOString() || undefined,
			endDate: val.dateRange.endDate?.toISOString() || undefined,
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const transactions = useMemo(() => {
		return filterTransactions(
			data || [],
			filters.startDate,
			filters.endDate,
			filters.transactionType,
			filters.transactionStatus
		);
	}, [data, filters]);

	const filterCount = useMemo(() => {
		return getActiveFilterCount(filters);
	}, [filters]);

	const handleReset = () => {
		setFilters({
			transactionType: undefined,
			transactionStatus: undefined,
			startDate: undefined,
			endDate: undefined,
		});
	};

	useEffect(() => {
		console.log(transactions, "tc");
	}, [transactions]);
	return (
		<Box py={10}>
			<FilterDrawer
				isOpen={open}
				handleClose={handleClose}
				handleFilterTx={applyFilters}
				filterCount={filterCount}
			/>
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
						{!isLoading && transactions?.length} Transactions
					</Text>
					<Text w="full" fontSize={"sm"}>
						Your transactions for the last{" "}
						{calculateDuration(filters.startDate, filters.endDate)}
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
						{filterCount > 0 && (
							<Box
								borderRadius={"50%"}
								color={"#fff"}
								h="20px"
								w="20px"
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
								fontSize={"xs"}
								fontWeight={500}
								bgColor={"#131316"}>
								{filterCount}
							</Box>
						)}
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
						lineHeight={1}
						onClick={() => exportTransactionsToCSV(transactions || [])}>
						Export list
						<DownloadIcon size={"xs"} mb={1} /* w="12.67px" h={"12.96px"} */ />
					</Button>
				</HStack>
			</Flex>

			<VStack gap={5} mt={6} pb={"5rem"}>
				{isLoading ? (
					Array.from({ length: 3 }).map((_, index) => (
						<TransactionSkeletonLoader key={index} />
					))
				) : transactions?.length < 1 ? (
					<VStack
						gap={6}
						width={"369px"}
						height={"286px"}
						mt={10}
						alignItems={"flex-start"}>
						<Image alt="No matching transaction" src="/assets/No-tx.svg" />
						<VStack gap={3} pr={3} pb={2}>
							<Text fontSize={"28px"} fontWeight={"bold"}>
								No matching transaction found for the selected filter
							</Text>

							<Text color={"#56616B"} fontWeight={500}>
								Change your filters to see more results, or add a new product.
							</Text>
						</VStack>

						<Button
							display="flex"
							bg="#EFF1F6"
							color="#131316"
							height="48px"
							borderRadius="100px"
							fontWeight={600}
							px={5}
							py={3}
							fontSize="md"
							lineHeight={1}
							onClick={handleReset}>
							Clear Filter
						</Button>
					</VStack>
				) : (
					transactions?.map((transaction, index) => (
						<Transaction
							key={index}
							transaction={transaction}
							isLoading={isLoading}
						/>
					))
				)}
			</VStack>
		</Box>
	);
}
