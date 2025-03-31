"use client";

import { Button, Menu, Portal, useCheckboxGroup, Box } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
// import { HiCog } from "react-icons/hi";

const items = [
	{ title: "Autosave", value: "autosave" },
	{ title: "Detect Language", value: "detect-language" },
	{ title: "Spellcheck", value: "spellcheck" },
];

const AppMenuSelector = () => {
	const group = useCheckboxGroup({ defaultValue: ["autosave"] });

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button variant="outline" size="sm">
					Features
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.ItemGroup>
							<Menu.ItemGroupLabel>Features</Menu.ItemGroupLabel>
							{items.map(({ title, value }) => (
								<Menu.Item key={value} px={3} py={2} value={value}>
									<Box onClick={() => group.toggleValue(value)}>
										<Checkbox
											isChecked={group.isChecked(value)}
											sx={{
												"& .chakra-checkbox__control": {
													borderRadius: "sm",
													backgroundColor: group.isChecked(value)
														? "#131316"
														: "transparent",
													borderColor: group.isChecked(value)
														? "#131316"
														: "gray.300",
													_checked: {
														backgroundColor: "#131316",
														borderColor: "#131316",
													},
												},
												"& .chakra-checkbox__icon": {
													color: "white",
												},
											}}>
											{title}
										</Checkbox>
									</Box>
								</Menu.Item>
							))}
						</Menu.ItemGroup>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};

export default AppMenuSelector;
