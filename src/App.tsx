import "./App.css";
import Header from "./components/header";
import { Box } from "@chakra-ui/react";
import Banner from "./components/revenue/banner";
import Transactions from "./components/revenue/transactions";
import { useTransactions } from "./lib/hooks/useQueries";

function App() {
	useTransactions();

	return (
		<>
			<Header />
			<Box width={"80%"} mx={"auto"}>
				<Banner />

				<Transactions />
			</Box>
		</>
	);
}

export default App;
