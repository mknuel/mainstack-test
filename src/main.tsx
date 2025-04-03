import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// import { ThemeProvider } from "next-themes";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./lib/providers/index.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryProvider>
			{/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
			<ChakraProvider value={defaultSystem}>
				<App />
			</ChakraProvider>
			{/* </ThemeProvider> */}
		</QueryProvider>
	</StrictMode>
);
/* 
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    
 */

