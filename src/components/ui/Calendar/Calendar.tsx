import { DayPicker, DayPickerProps } from "react-day-picker";
import styles from "./Calendar.module.css";
import defaultStyles from "react-day-picker/dist/style.module.css";

type CalendarProps = DayPickerProps & {
	className?: string;
	classNames?: Record<string, string>;
	showOutsideDays?: boolean;
};

export function Calendar(props: CalendarProps) {
	const {
		className = "",
		classNames = {},
		showOutsideDays = false,
		...restProps
	} = props; // Ensure props are correctly destructured

	const customClassNames = {
		...defaultStyles,
		...styles,
		...classNames,
		root: `${defaultStyles.root} ${styles.root} ${className}`.trim(),
		nav: `${defaultStyles.nav} ${styles.nav}`,
		caption_label: `${defaultStyles.caption_label} ${styles.caption_label}`,
		today: `${defaultStyles.today} ${styles.today}`,
		day: `${defaultStyles.day} ${styles.day}`,
	};

	return (
		<DayPicker
			classNames={customClassNames}
			showOutsideDays={showOutsideDays}
			animate
			{...restProps}
		/>
	);
}
