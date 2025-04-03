import moment from "moment";
import { ITransaction } from "@/types";

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		currencyDisplay: "code",
	}).format(amount);
};

export const exportTransactionsToCSV = (transactions: ITransaction[]) => {
	if (!transactions?.length) {
		alert("No transactions to export.");
		return;
	}

	// Define CSV headers
	const headers = [
		"Date",
		"Name",
		"Email",
		"Product",
		"Amount (USD)",
		"Type",
		"Status",
		"Payment Reference",
	];

	// Convert transactions to CSV format
	const rows = transactions.map((tx) => [
		moment(tx.date).format("YYYY-MM-DD HH:mm:ss"), // Format date
		tx.metadata?.name ?? "", // Ensure metadata exists
		tx.metadata?.email ?? "",
		tx.metadata?.product_name ?? "",
		tx.amount ?? "", // Use default value if undefined
		tx.type ?? "",
		tx.status ?? "",
		tx.payment_reference ?? "",
	]);

	// Combine headers and rows into CSV format
	const csvContent = [
		headers.join(","), // Add headers
		...rows.map((row) => row.join(",")), // Add rows
	].join("\n");

	// Create a Blob and trigger download
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	// Create a temporary <a> element to trigger download
	const a = document.createElement("a");
	a.href = url;
	a.download = "transactions.csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	// Clean up URL object
	URL.revokeObjectURL(url);
};

export const filterTransactions = (
	transactions: ITransaction[],
	startDate?: string,
	endDate?: string,
	transactionType?: string[],
	transactionStatus?: string[]
): ITransaction[] => {
	console.log(
		"filteres function",
		transactionStatus,
		startDate,
		endDate,
		transactionType,
		transactionStatus
	);
	return transactions.filter((transaction) => {
		const transactionDate = moment(transaction.date);

		// Date filter: Only check if startDate or endDate is provided
		const isWithinDateRange =
			(!startDate || transactionDate.isSameOrAfter(moment(startDate), "day")) &&
			(!endDate || transactionDate.isSameOrBefore(moment(endDate), "day"));

		// Type filter: Only check if transactionType is provided and not empty
		const isMatchingType =
			!transactionType ||
			transactionType.length === 0 ||
			transactionType.includes(transaction.type);

		// Status filter: Only check if transactionStatus is provided and not empty
		const isMatchingStatus =
			!transactionStatus ||
			transactionStatus.length === 0 ||
			transactionStatus.includes(transaction.status);

		// Only return transactions that pass all active filters
		return isWithinDateRange && isMatchingType && isMatchingStatus;
	});
};

export const calculateDuration = (
	startDate?: string,
	endDate?: string
): string => {
	// Default to 7 days if start or end date is missing
	if (!startDate || !endDate) {
		return "7 days";
	}

	const start = moment(startDate);
	const end = moment(endDate);
	const diffInDays = end.diff(start, "days");

	if (diffInDays < 7) {
		return `${diffInDays} day${diffInDays === 1 ? "" : "s"}`;
	} else if (diffInDays < 30) {
		const diffInWeeks = Math.floor(diffInDays / 7);
		return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"}`;
	} else if (diffInDays < 365) {
		const diffInMonths = Math.floor(diffInDays / 30);
		return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"}`;
	} else {
		const diffInYears = Math.floor(diffInDays / 365);
		return `${diffInYears} year${diffInYears === 1 ? "" : "s"}`;
	}
};
