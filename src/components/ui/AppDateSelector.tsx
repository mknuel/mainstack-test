/* "use client";
import { useState, useRef } from "react";
import {
	Box,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Text,
	Grid,
	GridItem,
	HStack,
	VStack,
	IconButton,
	useOutsideClick,
	Flex,
} from "@chakra-ui/react";
import {
	format,
	addMonths,
	subMonths,
	setDate,
	addDays,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isSameMonth,
	isSameDay,
} from "date-fns";

// Date selector interface
interface DateSelectorProps {
	selectedDate: Date;
	onChange: (date: Date) => void;
	placeholder?: string;
}

// Calendar header with month navigation
const CalendarHeader: React.FC<{
	currentMonth: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
}> = ({ currentMonth, onPrevMonth, onNextMonth }) => {
	return (
		<Flex justifyContent="space-between" alignItems="center" p={2}>
			<IconButton
				aria-label="Previous month"
				icon={<ChevronLeftIcon />}
				size="sm"
				onClick={onPrevMonth}
				variant="ghost"
			/>
			<Text fontWeight="medium">{format(currentMonth, "MMMM yyyy")}</Text>
			<IconButton
				aria-label="Next month"
				icon={<ChevronRightIcon />}
				size="sm"
				onClick={onNextMonth}
				variant="ghost"
			/>
		</Flex>
	);
};

// Day cell component
const DayCell: React.FC<{
	day: Date;
	selectedDate: Date;
	currentMonth: Date;
	onDateClick: (day: Date) => void;
}> = ({ day, selectedDate, currentMonth, onDateClick }) => {
	const isSelected = isSameDay(day, selectedDate);
	const isCurrentMonth = isSameMonth(day, currentMonth);

	return (
		<GridItem>
			<Button
				onClick={() => onDateClick(day)}
				size="sm"
				variant={isSelected ? "solid" : "ghost"}
				colorScheme={isSelected ? "blue" : undefined}
				opacity={isCurrentMonth ? 1 : 0.5}
				w="full"
				h="8"
				minW={0}
				p={0}>
				{format(day, "d")}
			</Button>
		</GridItem>
	);
};

// Calendar component
const Calendar: React.FC<{
	selectedDate: Date;
	onDateSelect: (day: Date) => void;
}> = ({ selectedDate, onDateSelect }) => {
	const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));

	const onPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
	const onNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

	// Generate calendar days
	const renderDays = () => {
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(currentMonth);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);

		const days = [];
		let day = startDate;

		// Day labels (Mon, Tue, etc.)
		const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

		// Add day labels
		days.push(
			<HStack key="day-labels" spacing={0} w="full" mb={2}>
				{dayLabels.map((label) => (
					<GridItem key={label} colSpan={1} textAlign="center" w="full">
						<Text fontSize="xs" fontWeight="medium" color="gray.500">
							{label}
						</Text>
					</GridItem>
				))}
			</HStack>
		);

		// Generate weeks
		while (day <= endDate) {
			const week = [];

			for (let i = 0; i < 7; i++) {
				week.push(
					<DayCell
						key={day.toString()}
						day={day}
						selectedDate={selectedDate}
						currentMonth={currentMonth}
						onDateClick={onDateSelect}
					/>
				);
				day = addDays(day, 1);
			}

			days.push(
				<Grid key={day.toString()} templateColumns="repeat(7, 1fr)" gap={1}>
					{week}
				</Grid>
			);
		}

		return days;
	};

	return (
		<VStack spacing={2} align="stretch">
			<CalendarHeader
				currentMonth={currentMonth}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
			/>
			<Box p={2}>{renderDays()}</Box>
		</VStack>
	);
};

// Date selector dropdown with calendar
const AppDateSelector: React.FC<AppDateSelectorProps> = ({
	selectedDate,
	onChange,
	placeholder = "Select date",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	useOutsideClick({
		ref: popoverRef,
		handler: () => setIsOpen(false),
	});

	const handleDateSelect = (date: Date) => {
		onChange(date);
		setIsOpen(false);
	};

	return (
		<Popover
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			placement="bottom-start"
			autoFocus={false}
			isLazy>
			<PopoverTrigger>
				<Button
					// rightIcon={<CalendarIcon />}
					onClick={() => setIsOpen(!isOpen)}
					variant="outline"
					w="full"
					justifyContent="space-between">
					{selectedDate ? format(selectedDate, "MMM dd, yyyy") : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent ref={popoverRef} width="auto" p={2}>
				<PopoverBody p={0}>
					<Calendar
						selectedDate={selectedDate}
						onDateSelect={handleDateSelect}
					/>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

// Simple icon components
const ChevronLeftIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15 18L9 12L15 6"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const ChevronRightIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9 18L15 12L9 6"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const CalendarIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<rect
			x="3"
			y="4"
			width="18"
			height="18"
			rx="2"
			stroke="currentColor"
			strokeWidth="2"
		/>
		<path
			d="M16 2V6"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path
			d="M8 2V6"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
	</svg>
);

// Usage example
const DateSelectorDemo: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	return (
		<Box p={4} maxW="sm">
			<Text mb={2} fontWeight="medium">
				Select Date
			</Text>
			<AppDateSelector
				selectedDate={selectedDate}
				onChange={setSelectedDate}
				placeholder="Choose a date"
			/>

			<Text mt={4}>
				Selected date:{" "}
				{selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "None"}
			</Text>
		</Box>
	);
};

export default AppDateSelector;
 */
