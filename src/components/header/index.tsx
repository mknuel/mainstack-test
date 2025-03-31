import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	HStack,
	IconButton,
	Image,
	Link,
	Text,
} from "@chakra-ui/react";
import { Menu, Portal } from "@chakra-ui/react";
import {
	AnalyticsIcon,
	AppsIcon,
	ArrowDownIcon,
	CrmIcon,
	HomeIcon,
	MessageIcon,
	NotificationIcon,
	RevenueIcon,
} from "../icons";

const menuLinks = [
	{ id: "home", label: "Home", icon: <HomeIcon /> },
	{ id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
	{ id: "revenue", label: "Revenue", icon: <RevenueIcon /> },
	{ id: "crm", label: "CRM", icon: <CrmIcon /> },
	{ id: "apps", label: "Apps", icon: <AppsIcon /> },
];

const AppsMenu = () => {
	const [menu, showMenu] = useState(false);
	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button
					size="sm"
					key={"apps"}
					px={4}
					py={2}
					borderRadius="100px"
					display="flex"
					alignItems="center"
					gap={1}
					fontSize={"md"}
					bg={menu ? "#131316" : "transparent"}
					color={menu ? "white" : "#56616B"}
					_hover={{
						bg: !menu ? "gray.300" : "",
						color: !menu ? "black" : "",
					}}
					onClick={() => showMenu(true)}>
					<AppsIcon />
					Apps
					<Text ml={5}>
						Link in Bio <ArrowDownIcon />
					</Text>
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="rename">Rename</Menu.Item>
						<Menu.Item value="export">Export</Menu.Item>
						<Menu.Item
							value="delete"
							color="fg.error"
							_hover={{ bg: "bg.error", color: "fg.error" }}>
							Delete...
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};

export default function Header() {
	const [active, setActive] = useState("home");

	return (
		<Box pos="sticky" top={0} left={0} bg="white" p={4} pb={0} zIndex={10}>
			<Flex
				boxShadow="0px 2px 4px rgba(45, 59, 67, 0.05), 0px 2px 6px rgba(45, 59, 67, 0.06)"
				p={4}
				pl={6}
				borderRadius="100px"
				justify="space-between"
				color="#56616B">
				<Image src="/assets/mainstack-logo.svg" />

				<HStack gap={5}>
					{menuLinks.map(({ id, label, icon }) => (
						<Link
							key={id}
							px={4}
							py={2}
							borderRadius="100px"
							display="flex"
							alignItems="center"
							gap={1}
							fontSize={"md"}
							bg={active === id ? "#131316" : "transparent"}
							color={active === id ? "white" : "#56616B"}
							_hover={{
								bg: active !== id ? "gray.300" : "",
								color: active !== id ? "black" : "",
							}}
							onClick={() => setActive(id)}>
							{icon}
							{label}
						</Link>
					))}
					{/* <AppsMenu /> */}
				</HStack>

				<HStack>
					<IconButton bg={"transparent"} color={"#56616B"}>
						<NotificationIcon />
					</IconButton>
					<IconButton bg={"transparent"} color={"#56616B"}>
						<MessageIcon />
					</IconButton>
					<Button>Logout</Button>
				</HStack>
			</Flex>
		</Box>
	);
}
