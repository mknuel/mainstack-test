import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../api/api";
import { ITransaction, Wallet } from "@/types";

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => fetcher("/user"),
	});
};

export const useWallet = () => {
	return useQuery<Wallet>({
		queryKey: ["wallet"],
		queryFn: () => fetcher("/wallet"),
	});
};

export const useTransactions = () => {
	return useQuery<ITransaction[]>({
		queryKey: ["transactions"],
		queryFn: () => fetcher("/transactions"),
	});
};
