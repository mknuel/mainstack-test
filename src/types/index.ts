export interface ITransaction {
	type: "credit" | "debit";
	title: string;
	subtitle: string;
	amount: number;
	date: string;
	status: "pending" | "success" | "failed";
}
