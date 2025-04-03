import { useState, useRef, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Box, PopoverContent, Flex, Text, PopoverRoot } from "@chakra-ui/react";
import { Calendar } from "./Calendar/Calendar";
import { ArrowDownIcon } from "../icons";

type DateRangePickerProps = {
	handleDateRangeChange: (
		startDate: Date | undefined,
		endDate: Date | undefined
	) => void;
	defaultRange?: {
		startDate: Date | undefined;
		endDate: Date | undefined;
	};
};

const DateRangePicker = ({
	handleDateRangeChange,
	defaultRange,
}: DateRangePickerProps) => {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleDateChange = (date: Date) => {
		console.log(date, "date change");
		if (activeInput === "start") {
			setStartDate(date);
			if (endDate && date > endDate) {
				setEndDate(undefined);
				handleDateRangeChange(date, undefined);
			} else {
				handleDateRangeChange(date, endDate);
			}
			// setActiveInput("end");
		} else if (activeInput === "end") {
			setEndDate(date);
			handleDateRangeChange(startDate, date);
			setActiveInput(null);
		}

		setIsOpen(false);
	};

	const openStartDatePicker = () => {
		if (activeInput === "start" && isOpen) {
			return handleClose();
		}
		setActiveInput("start");
		setIsOpen(true);
	};

	const openEndDatePicker = () => {
		if (activeInput === "end" && isOpen) {
			return handleClose();
		}
		setActiveInput("end");
		setIsOpen(true);
	};

	const formatDate = (date: Date | null) => {
		if (!date) return "";
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const handleClose = () => {
		setIsOpen(false);
		setActiveInput(null);
	};

	useEffect(() => {
		setStartDate(defaultRange?.startDate);
		setEndDate(defaultRange?.endDate);
	}, [defaultRange]);

	return (
		<Box
			ref={containerRef}
			position="relative"
			color={"#131316"}
			fontWeight={500}>
			<Flex gap={2} position="relative" mb={4}>
				<Box
					onClick={openStartDatePicker}
					bg={activeInput === "start" ? "#fff" : "#EFF1F6"}
					px="16px"
					py="10px"
					borderRadius="xl"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					cursor="pointer"
					minWidth="180px"
					height={"fit-content"}
					flex={1}
					border={
						activeInput === "start"
							? "3px solid #131316"
							: "3px solid transparent"
					}
					transition="all 0.2s ease-in-out">
					<Text>{startDate ? formatDate(startDate) : "Start Date"}</Text>
					<Box
						as="span"
						ml={2}
						color={activeInput === "start" ? "#131316" : "inherit"}>
						<ArrowDownIcon
							style={{
								transform:
									activeInput === "start" && isOpen
										? "rotate(180deg)"
										: "rotate(0deg)",
								transition: "transform 0.3s ease",
							}}
						/>
					</Box>
				</Box>

				<Box
					onClick={openEndDatePicker}
					bg={activeInput === "end" ? "#fff" : "#EFF1F6"}
					px="16px"
					py="10px"
					borderRadius="xl"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					cursor="pointer"
					minWidth="180px"
					flex={1}
					height={"fit-content"}
					border={
						activeInput === "end"
							? "3px solid #131316"
							: "3px solid transparent"
					}
					transition="all 0.2s ease-in-out">
					<Text>{endDate ? formatDate(endDate) : "End Date"}</Text>
					<Box
						as="span"
						ml={2}
						color={activeInput === "end" ? "#131316" : "inherit"}>
						<ArrowDownIcon
							style={{
								transform:
									activeInput === "end" && isOpen
										? "rotate(180deg)"
										: "rotate(0deg)",
								transition: "transform 0.3s ease",
							}}
						/>
					</Box>
				</Box>
			</Flex>

			<PopoverRoot
				open={isOpen}
				onOpenChange={handleClose}
				positioning={{ sameWidth: true }}
				// returnFocusOnClose={false}
			>
				<PopoverContent
					borderRadius="12"
					bg="white"
					width="auto"
					animation="0.3s cubic-bezier(0.23, 1, 0.32, 1) 0s 1 normal none running popover-scale"
					marginTop="-.5rem"
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					position="absolute"
					zIndex="dropdown"
					w={"full"}
					p={0}
					boxShadow={"0px 6px 12px 0px #5C738314,  0px 4px 8px 0px #5C738314"}>
					<Box p={4} m={0}>
						<Calendar
							mode="single"
							selected={activeInput === "start" ? startDate : endDate}
							month={activeInput === "start" ? startDate : endDate}
							onSelect={handleDateChange}
							required
						/>
					</Box>
				</PopoverContent>
			</PopoverRoot>
		</Box>
	);
};

export default DateRangePicker;
