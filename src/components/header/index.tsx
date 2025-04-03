import React, { useState } from "react";
import {
	Settings,
	History,
	Gift,
	Link as LinkIcon,
	Bug,
	Users,
	LogOut,
} from "lucide-react";

import {
	Box,
	Button,
	Circle,
	Flex,
	HStack,
	IconButton,
	Image,
	Link,
	Text,
} from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import {
	AnalyticsIcon,
	AppsIcon,
	CrmIcon,
	HomeIcon,
	MenuIcon,
	MessageIcon,
	NotificationIcon,
	RevenueIcon,
} from "../icons";
import { useUser } from "@/lib/hooks/useQueries";

const menuLinks = [
	{ id: "home", label: "Home", icon: <HomeIcon /> },
	{ id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
	{ id: "revenue", label: "Revenue", icon: <RevenueIcon /> },
	{ id: "crm", label: "CRM", icon: <CrmIcon /> },
	{ id: "apps", label: "Apps", icon: <AppsIcon /> },
];

const menuItems = [
	{ id: "settings", label: "Settings", icon: <Settings size={16} /> },
	{
		id: "purchase-history",
		label: "Purchase History",
		icon: <History size={16} />,
	},
	{ id: "refer-earn", label: "Refer and Earn", icon: <Gift size={16} /> },
	{ id: "integrations", label: "Integrations", icon: <LinkIcon size={16} /> },
	{ id: "report-bug", label: "Report Bug", icon: <Bug size={16} /> },
	{ id: "switch-account", label: "Switch Account", icon: <Users size={16} /> },
	{ id: "sign-out", label: "Sign Out", icon: <LogOut size={16} /> },
];
type UserMenuProps = {
	user: {
		first_name: string;

		last_name: string;

		email: string;
	};
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button
					bgColor={"#eff1f6"}
					color={"#56616B"}
					fontSize="sm"
					borderRadius={"100px"}
					justifyContent={"space-between"}
					display={"flex"}
					p={1.5}
					h={"fit"}
					pr={4}
					gap={3}
					width={"fit-content"}>
					<Circle
						background={
							"linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)"
						}
						color={"#fff"}
						w={8}
						h={8}>
						{user?.first_name?.charAt(0) || "O"}
						{user?.last_name?.charAt(0) || "J"}
					</Circle>

					<MenuIcon />
				</Button>
			</Menu.Trigger>

			<Menu.Content
				width="362px"
				boxShadow="0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314"
				borderRadius={12}
				position="absolute"
				zIndex="dropdown"
				color={"#131316"}
				bg="white"
				top={"4.2rem"}
				right={0}>
				<Flex p={4} alignItems={"center"} gap={3}>
					<Circle
						background={
							"linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)"
						}
						color={"#fff"}
						w={10}
						h={10}
						fontSize={20}>
						{user?.first_name?.charAt(0) || ""}
						{user?.last_name?.charAt(0) || ""}
					</Circle>

					<Box>
						<Text fontSize={22} fontWeight={600}>
							{user?.first_name || ""} {user?.last_name || ""}
						</Text>
						<Text fontSize={14} color={"#56616B"}>
							{user?.email || ""}
						</Text>
					</Box>
				</Flex>
				{menuItems.map(({ icon, label }) => (
					<Menu.Item
						key={label}
						value={label}
						closeOnSelect={false}
						color={"#131316"}
						fontWeight={600}
						my={2}
						fontSize={"16px"}
						_hover={{ bg: "#EFF1F6" }}
						_focus={{ bg: "#EFF1F6" }}>
						<Flex alignItems="center" p={2} gap={3}>
							{icon}

							{label}
						</Flex>
					</Menu.Item>
				))}
			</Menu.Content>
		</Menu.Root>
	);
};

export default function Header() {
	const [active, setActive] = useState("revenue");
	const { data } = useUser();

	return (
		<Box
			pos="sticky"
			top={0}
			left={0}
			bg="white"
			p={4}
			pb={0}
			zIndex={10}
			className="">
			<Flex
				boxShadow="0px 2px 4px rgba(45, 59, 67, 0.05), 0px 2px 6px rgba(45, 59, 67, 0.06)"
				p={4}
				pl={6}
				borderRadius="100px"
				justify="space-between"
				color="#56616B">
				<Image src="/assets/mainstack-logo.svg" />

				{/* <span className="font-bold text-[45px]">Welcoe</span> */}
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
							color={active === id ? "#fff" : "#56616B"}
							_hover={{
								bg: active !== id ? "#EFF1F6" : "",
								color: active !== id ? "#131316" : "",
							}}
							textDecor={"none"}
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

					<Box pos={"relative"}>
						<UserMenu user={data} />
					</Box>
				</HStack>
			</Flex>
		</Box>
	);
}
