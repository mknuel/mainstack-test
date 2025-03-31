"use client";

import {
	Box,
	Button,
	CloseButton,
	Drawer,
	HStack,
	Portal,
	Select,
	Tag,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import AppMenuSelector from "./AppMenuSelector";
type FilterDrawerProps = {
	children?: React.ReactNode;
	isOpen: boolean;
	handleClose: () => void;
};

const dateSuggestion = [
	{
		id: 1,
		name: "Today",
	},
	{
		id: 2,
		name: "This week",
	},
	{
		id: 3,
		name: "This month",
	},
	{
		id: 4,
		name: "This year",
	},
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, handleClose }) => {
	return (
		<Drawer.Root open={isOpen} onOpenChange={handleClose} size={"sm"}>
			<Portal>
				<Drawer.Backdrop bg={"rgba(222, 222, 222, .7)"} />
				<Drawer.Positioner>
					<Drawer.Content
						height={"calc(100dvh - 24px)"}
						borderRadius={"20px"}
						boxShadow={""}
						margin={"3"}
						bgColor={"#fff"}>
						<Drawer.Header>
							<Drawer.Title fontWeight={"bold"} fontSize={"24px"}>
								Filter
							</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<HStack gap={2}>
								{dateSuggestion?.map((ds) => (
									<Tag.Root
										size={"md"}
										border={"1px solid #EFF1F6"}
										borderRadius={"100px"}
										py={2.5}
										px={4.5}
										bgColor={"#fff"}
										boxShadow={"none"}
										cursor={"pointer"}>
										<Tag.Label fontSize={"sm"} fontWeight={"semibold"}>
											{ds.name}
										</Tag.Label>
									</Tag.Root>
								))}
							</HStack>

							<Box my={8}>
								<Text fontWeight="600" fontSize={"md"}>
									Date Range
								</Text>

								<AppMenuSelector />
							</Box>
						</Drawer.Body>
						<Drawer.Footer>
							<Button variant="outline">Cancel</Button>
							<Button>Save</Button>
						</Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};

export default FilterDrawer;
