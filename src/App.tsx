import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header";
import { Box } from "@chakra-ui/react";
import Banner from "./components/revenue/banner";
import Transactions from "./components/revenue/transactions";

function App() {
	// const [count, setCount] = useState(0);

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
