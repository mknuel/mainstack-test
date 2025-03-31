import { extendTheme } from "@chakra-ui/theme-utils";

const theme = extendTheme({
	colors: {
		primary: "#131316", // Default active background
		secondary: "#56616B", // Default text color
		hoverBg: "gray.300", // Hover background color
	},
	// In Chakra UI 3.15, there are some enhancements to theming
	styles: {
		global: {
			body: {
				color: "secondary",
				bg: "white",
			},
		},
	},
	components: {
		Button: {
			baseStyle: {
				borderRadius: "100px",
				bg: "primary",
				color: "white",
				_hover: {
					bg: "hoverBg",
					color: "black",
				},
				_focus: {
					boxShadow: "outline",
				},
			},
			// Adding size variants for more flexibility
			sizes: {
				sm: {
					fontSize: "sm",
					px: 4,
					py: 2,
				},
				md: {
					fontSize: "md",
					px: 6,
					py: 3,
				},
				lg: {
					fontSize: "lg",
					px: 8,
					py: 4,
				},
			},
			// Adding a variant example
			variants: {
				outline: {
					border: "2px solid",
					borderColor: "primary",
					bg: "transparent",
					color: "primary",
					_hover: {
						bg: "primary",
						color: "white",
					},
				},
				ghost: {
					bg: "transparent",
					color: "primary",
					_hover: {
						bg: "rgba(19, 19, 22, 0.1)",
					},
				},
			},
			// Default values
			defaultProps: {
				size: "md",
				variant: "solid",
			},
		},
		Link: {
			baseStyle: {
				borderRadius: "100px",
				color: "secondary",
				textDecoration: "none",
				transition: "all 0.2s ease-in-out",
				_hover: {
					bg: "hoverBg",
					color: "black",
					textDecoration: "none",
				},
				_focus: {
					boxShadow: "outline",
				},
			},
		},
		// Adding some additional common components
		Heading: {
			baseStyle: {
				color: "primary",
				fontWeight: "bold",
			},
			sizes: {
				xl: { fontSize: "4xl" },
				lg: { fontSize: "2xl" },
				md: { fontSize: "xl" },
				sm: { fontSize: "md" },
			},
			defaultProps: {
				size: "md",
			},
		},
		Input: {
			baseStyle: {
				field: {
					borderRadius: "8px",
					_focus: {
						borderColor: "primary",
						boxShadow: "0 0 0 1px #131316",
					},
				},
			},
			variants: {
				outline: {
					field: {
						border: "1px solid",
						borderColor: "gray.200",
					},
				},
				filled: {
					field: {
						bg: "gray.100",
					},
				},
			},
			defaultProps: {
				variant: "outline",
			},
		},
	},
	// Adding some breakpoints for responsive design
	breakpoints: {
		sm: "30em",
		md: "48em",
		lg: "62em",
		xl: "80em",
		"2xl": "96em",
	},
	// Typography settings
	fonts: {
		body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
		heading:
			"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
	},
	fontSizes: {
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
		"5xl": "3rem",
		"6xl": "3.75rem",
	},
});

export default theme;
