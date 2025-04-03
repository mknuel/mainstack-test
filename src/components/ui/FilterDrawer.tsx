import { useEffect, useState } from "react";

import {
	Box,
	Button,
	CloseButton,
	Drawer,
	HStack,
	Portal,
	Tag,
	Text,
} from "@chakra-ui/react";
import AppMultiSelect from "./AppMultiSelect";
import DateRangePicker from "./DateRangePicker";
import { DateRange } from "@/types";

type DateSuggestion = {
	id: number;
	name: string;
	getValue: () => DateRange;
};

type FilterDrawerProps = {
	children?: React.ReactNode;
	isOpen: boolean;
	handleClose: () => void;
	handleFilterTx: (val: {
		dateRange: DateRange;
		txType: string[];
		txStatus: string[];
	}) => void;
	filterCount: number;
};

const FilterDrawer: React.FC<FilterDrawerProps> = ({
	isOpen,
	handleClose,
	handleFilterTx,
	filterCount,
}) => {
	const [dateRange, setDateRange] = useState<DateRange>({
		startDate: undefined,
		endDate: undefined,
	});
	const [txType, setTxType] = useState<string[]>([]);
	const [txStatus, setTxStatus] = useState<string[]>([]);
	const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);

	// Date suggestion presets
	const dateSuggestions: DateSuggestion[] = [
		{
			id: 1,
			name: "Today",
			getValue: () => {
				const today = new Date();
				return { startDate: today, endDate: new Date() };
			},
		},
		{
			id: 2,
			name: "This week",
			getValue: () => {
				const today = new Date();
				const startOfWeek = new Date(today);
				startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
				return { startDate: startOfWeek, endDate: new Date() };
			},
		},
		{
			id: 3,
			name: "This month",
			getValue: () => {
				const today = new Date();
				const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				return { startDate: startOfMonth, endDate: new Date() };
			},
		},
		{
			id: 4,
			name: "Last month",
			getValue: () => {
				const today = new Date();
				const firstDayLastMonth = new Date(
					today.getFullYear(),
					today.getMonth() - 1,
					1
				);
				const lastDayLastMonth = new Date(
					today.getFullYear(),
					today.getMonth(),
					0
				); // Last day of last month
				return { startDate: firstDayLastMonth, endDate: lastDayLastMonth };
			},
		},
	];

	const handleSuggestionClick = (suggestion: DateSuggestion) => {
		console.log("Before update:", activeSuggestion);

		if (suggestion) {
			const newDateRange = suggestion.getValue();
			if (newDateRange.startDate && newDateRange.endDate) {
				handleDateRangeChange(newDateRange.startDate, newDateRange.endDate);
			}
		}
		setActiveSuggestion((prev) => {
			console.log("Updating from:", prev, "to:", suggestion.id);
			return suggestion.id;
		});
	};

	const handleDateRangeChange = (
		startDate: Date | undefined,
		endDate: Date | undefined
	) => {
		// Reset active suggestion when manually selecting dates
		if (!startDate || !endDate) return;

		setDateRange({
			startDate: startDate,
			endDate: endDate,
		});

		// Clear active suggestion when manual date selection happens
		setActiveSuggestion(null);

		console.log("Date range changed:", startDate, endDate);
	};

	const handleTxTypeChange = (type: string[]) => {
		setTxType(type);
	};

	const handleTxStatusChange = (status: string[]) => {
		setTxStatus(status);
	};

	const handleFilterTransactions = () => {
		handleFilterTx({
			dateRange,
			txType,
			txStatus,
		});
		handleClose();
	};

	const handleReset = () => {
		handleFilterTx({
			dateRange: {
				startDate: undefined,
				endDate: undefined,
			},
			txType: [],
			txStatus: [],
		});

		setDateRange({
			startDate: undefined,
			endDate: undefined,
		});

		setTxStatus([]);
		setTxType([]);
		setActiveSuggestion(null);
	};

	useEffect(() => {
		if (filterCount < 1) {
			setDateRange({
				startDate: undefined,
				endDate: undefined,
			});

			setTxStatus([]);
			setTxType([]);
			setActiveSuggestion(null);
		}
	}, [filterCount]);

	return (
		<Drawer.Root open={isOpen} onOpenChange={handleClose} size={"sm"}>
			<Portal>
				<Drawer.Backdrop bg={"rgba(222, 222, 222, .7)"} />
				<Drawer.Positioner>
					<Drawer.Content
						height={"calc(100dvh - 24px)"}
						borderRadius={"20px"}
						boxShadow={""}
						width={"456px"}
						margin={"3"}
						bgColor={"#fff"}>
						<Drawer.Header>
							<Drawer.Title fontWeight={"bold"} fontSize={"24px"}>
								Filter
							</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body width="full" pr={6}>
							<HStack gap={2}>
								{dateSuggestions.map((ds) => (
									<Tag.Root
										key={ds.id}
										size={"md"}
										border={"1px solid #EFF1F6"}
										borderRadius={"100px"}
										py={2.5}
										px={4.5}
										bgColor={activeSuggestion === ds.id ? "#EFF1F6" : "#fff"}
										boxShadow={"none"}
										cursor={"pointer"}
										onClick={() => handleSuggestionClick(ds)}>
										<Tag.Label fontSize={"sm"} fontWeight={"semibold"}>
											{ds.name}
										</Tag.Label>
									</Tag.Root>
								))}
							</HStack>

							<Box my={8}>
								<Text fontWeight="600" fontSize={"md"} mb={1.5}>
									Date Range
								</Text>

								<DateRangePicker
									handleDateRangeChange={handleDateRangeChange}
									defaultRange={dateRange}
								/>
							</Box>

							<Box my={8} pos={"relative"}>
								<AppMultiSelect
									onChange={handleTxTypeChange}
									label="Transaction Type"
									defaultSelected={txType}
									items={[
										{
											title: "Store Transactions",
											value: "store transactions",
										},
										{
											title: "Get Tipped",
											value: "get tipped",
										},
										{
											title: "Withdrawals",
											value: "withdrawal",
										},
										{
											title: "Deposits",
											value: "deposit",
										},
										{
											title: "Chargebacks",
											value: "chargebacks",
										},
										{
											title: "Cashbacks",
											value: "cashbacks",
										},
										{
											title: "Refer & Earn",
											value: "refer & earn",
										},
										{
											title: "Pending",
											value: "pending",
										},
										{
											title: "Failed",
											value: "failed",
										},
									]}
								/>
							</Box>
							<Box my={8} pos={"relative"}>
								<AppMultiSelect
									onChange={handleTxStatusChange}
									label="Transaction Status"
									defaultSelected={txStatus}
									items={[
										{ title: "Successful", value: "successful" },
										{ title: "Pending", value: "pending" },
										{ title: "Failed", value: "failed" },
									]}
								/>
							</Box>
						</Drawer.Body>
						<Drawer.Footer>
							<Button
								borderRadius={"100px"}
								height={"48px"}
								onClick={handleReset}
								flex={1}
								variant="outline">
								Clear
							</Button>
							<Button
								borderRadius={"100px"}
								height={"48px"}
								flex={1}
								onClick={handleFilterTransactions}>
								Apply
							</Button>
						</Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<CloseButton onClick={handleClose} size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};

export default FilterDrawer;
