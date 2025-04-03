import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/utils";
import AppSkeletonLoader from "./AppSkelentonLoader";

interface DataPoint {
	date: string;
	value: number;
}

interface LineChartProps {
	data: DataPoint[];
	loading: boolean;
	type?: "days" | "months";
	defaultValue?: DataPoint[];
}

function LineChartSkeleton() {
	return <AppSkeletonLoader height="100%" width="100%" />;
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		console.log(payload);
		return (
			<Box
				bg="white"
				p={3}
				borderRadius="md"
				boxShadow="md"
				fontSize="xs"
				color="gray.800">
				<Text fontWeight="medium">{label}</Text>
				<Box
					mt={1}
					display="flex"
					alignItems="center"
					justifyContent="space-between">
					<Box display="flex" alignItems="center" gap={2} color="#FF5403">
						<Box height={2} mr={2} width={2} borderRadius="full" bg="#FF5403" />
						{/* <Text></Text> */}
					</Box>
					<Text fontWeight="medium">
						{formatCurrency(payload[0]?.value ?? 0)}
					</Text>
				</Box>
			</Box>
		);
	}
	return null;
};

export function AppLineChart({
	data,
	defaultValue,
	type = "days",
	loading = false,
}: LineChartProps) {
	const isEmpty =
		!data ||
		data?.length < 1 ||
		data.every((item: DataPoint) => item.value < 1);
	if (loading) {
		return <LineChartSkeleton />;
	}

	const formattedData = isEmpty ? defaultValue : data;

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				data={formattedData}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				{/* <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DBDEE5" /> */}
				<XAxis
					dataKey="date"
					tick={{ fontSize: 12, fill: "#64748B" }}
					interval="preserveStartEnd"
					axisLine={{ stroke: "#DBDEE5" }}
					tickLine={false}
					ticks={[
						formattedData?.[0]?.date || "",
						formattedData?.[formattedData.length - 1]?.date || "",
					]} // Show only first and last date
				/>
				<YAxis hide />
				<Tooltip
					content={<CustomTooltip type={type} />}
					cursor={{
						stroke: "#DBDEE5",
						strokeWidth: 1,
					}}
				/>

				<Line
					type="monotone"
					dataKey="value"
					stroke="#FF5403"
					strokeWidth={1}
					dot={false} // Hide all dots by default
					activeDot={{
						r: 3,
						fill: "#FF5403",
						stroke: "#FF5403",
						strokeWidth: 2,
					}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export default AppLineChart;
