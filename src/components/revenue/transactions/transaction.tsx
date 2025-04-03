import React from "react";
import {
	Box,
	Flex,
	HStack,
	Icon,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ITransaction } from "@/types";
import moment from "moment";

interface TransactionProps {
	transaction: ITransaction;
	isLoading?: boolean;
}

const statusColors = {
	pending: "#A77A07",
	success: "#0EA163",
	failed: "#D9534F", // Red for failed transactions
	default: "#131316",
};

export const TransactionSkeletonLoader = () => {
	return (
		<Flex justifyContent={"space-between"} w="full">
			<HStack gap={3} w="full">
				{/* Icon Skeleton */}
				<Skeleton width="49px" height="49px" borderRadius="full" />

				{/* Text Content Skeleton */}
				<VStack
					justifyContent={"space-between"}
					w="full"
					alignItems="flex-start">
					<Skeleton height="16px" width="150px" />
					<Skeleton height="14px" width="80px" />
				</VStack>
			</HStack>

			{/* Right side amount and date */}
			<Box>
				<Skeleton height="16px" width="100px" mb={2} />
				<Skeleton height="14px" width="80px" />
			</Box>
		</Flex>
	);
};

const CreditIcon = () => {
	return (
		<Icon data-testid="credit-icon">
			<svg
				width="49"
				height="49"
				viewBox="0 0 49 49"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="24.5" cy="24.5" r="24" fill="#E3FCF2" />
				<mask
					id="mask0_12009_243"
					style={{ maskType: "alpha" }}
					maskUnits="userSpaceOnUse"
					x="14"
					y="14"
					width="21"
					height="21">
					<rect x="14.5" y="14.5" width="20" height="20" fill="#C4C4C4" />
				</mask>
				<g mask="url(#mask0_12009_243)">
					<path
						d="M19.25 29.75V22.25H20.0833V28.3333L30.1667 18.25L30.75 18.8333L20.6667 28.9167H26.75V29.75H19.25Z"
						fill="#075132"
					/>
				</g>
			</svg>
		</Icon>
	);
};

const DebitIcon = () => {
	return (
		<Icon data-testid="debit-icon">
			<svg
				width="49"
				height="49"
				viewBox="0 0 49 49"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="24.5" cy="24.5" r="24" fill="#F9E3E0" />
				<mask
					id="mask0_12009_258"
					style={{ maskType: "alpha" }}
					maskUnits="userSpaceOnUse"
					x="14"
					y="14"
					width="25"
					height="25">
					<rect x="14.5" y="14.5" width="24" height="24" fill="#C4C4C4" />
				</mask>
				<g mask="url(#mask0_12009_258)">
					<path
						d="M19.9002 33.8L19.2002 33.1L31.3002 21H24.0002V20H33.0002V29H32.0002V21.7L19.9002 33.8Z"
						fill="#961100"
					/>
				</g>
			</svg>
		</Icon>
	);
};

const Transaction: React.FC<TransactionProps> = ({
	transaction,
	isLoading = false,
}) => {
	if (isLoading) {
		return <TransactionSkeletonLoader />;
	}

	return (
		<Flex
			color={"#131316"}
			fontWeight={"medium"}
			justifyContent={"space-between"}
			w="full">
			<HStack gap={3}>
				{transaction.type === "deposit" ? <CreditIcon /> : <DebitIcon />}
				<VStack
					justifyContent={"space-between"}
					w="full"
					alignItems="flex-start">
					<Text>{transaction?.metadata?.product_name || "_"}</Text>
					<Text
						fontSize={"sm"}
						color={
							transaction?.status === "pending"
								? statusColors.pending
								: transaction?.status === "success"
								? statusColors.success
								: transaction?.status === "failed"
								? statusColors.failed
								: statusColors.default
						}
						w="full">
						{transaction?.status}
					</Text>
				</VStack>
			</HStack>

			<Box>
				<Text textAlign={"right"} fontWeight={"bold"}>
					USD {transaction?.amount}
				</Text>
				<Text fontSize={"sm"} textAlign={"right"} color="#56616B">
					{moment(transaction?.date).format("MMM DD, YYYY")}
				</Text>
			</Box>
		</Flex>
	);
};
export default Transaction;
