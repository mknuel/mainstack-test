"use client";

import { Button, Menu, Box, Text, Icon } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { ArrowDownIcon } from "../icons";

const DefItems = [
	{ title: "Autosave", value: "autosave" },
	{ title: "Detect Language", value: "detect-language" },
	{ title: "Spellcheck", value: "spellcheck" },
];

type AppMenuProps = {
	label?: string;
	onChange?: (values: string[]) => void;
	items?: { title: string; value: string }[];
	defaultSelected?: string[];
};

const AppMultiSelect: React.FC<AppMenuProps> = ({
	label,
	items = DefItems,
	onChange,
	defaultSelected = ["autosave"],
}) => {
	const [selectedValues, setSelectedValues] =
		useState<string[]>(defaultSelected);

	const toggleValue = (value: string) => {
		const newValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];
		setSelectedValues(newValues);
		onChange?.(newValues);
	};

	useEffect(() => {
		if (defaultSelected) {
			setSelectedValues(defaultSelected);
		}
	}, [defaultSelected]);

	const selectedTitles = useMemo(() => {
		return (
			items
				.filter((item) => selectedValues.includes(item.value))
				.map((item) => item.title)
				.join(", ") || "Select features..."
		);
	}, [items, selectedValues]);

	return (
		<Menu.Root>
			{label && (
				<Text fontSize="md" fontWeight={600} mb={3}>
					{label}
				</Text>
			)}
			<Menu.Trigger asChild>
				<Button
					width="full"
					justifyContent="space-between"
					px={4}
					py={3.5}
					height="fit-content"
					borderRadius={12}
					border="none"
					bg="#EFF1F6"
					color="#131316"
					_hover={{ bg: "#EFF1F6" }}
					_expanded={{ bg: "#EFF1F6" }}>
					<Text truncate>{selectedTitles}</Text>
					<Box as="span" ml={2}>
						<Icon size="xs">
							<ArrowDownIcon />
						</Icon>
					</Box>
				</Button>
			</Menu.Trigger>

			<Menu.Content
				minWidth="200px"
				width={"full"}
				boxShadow="0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314"
				borderRadius={12}
				position="absolute"
				zIndex="dropdown"
				bg="white">
				{items.map(({ title, value }) => (
					<Menu.Item
						key={value}
						value={value}
						closeOnSelect={false}
						_hover={{ bg: "#EFF1F6" }}
						_focus={{ bg: "#EFF1F6" }}>
						<Box
							display="flex"
							alignItems="center"
							p={2}
							onClick={(e) => {
								e.preventDefault();
								toggleValue(value);
							}}>
							<Checkbox.Root checked={selectedValues.includes(value)} size="sm">
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label ml={2} cursor="pointer">
									<Text fontSize="md">{title}</Text>
								</Checkbox.Label>
							</Checkbox.Root>
						</Box>
					</Menu.Item>
				))}
			</Menu.Content>
		</Menu.Root>
	);
};

export default AppMultiSelect;
