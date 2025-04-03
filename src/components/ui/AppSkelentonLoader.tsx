import { Skeleton } from "@chakra-ui/react";

interface SkeletonLoaderProps {
	width?: string;
	height?: string;
	borderRadius?: string;
	showText?: boolean;
	textLines?: number;
	textSpacing?: number;
	skeletonHeight?: string;
	m?: string;
}

const AppSkeletonLoader: React.FC<SkeletonLoaderProps> = ({
	width = "300px",
	height = "150px",
	borderRadius = "md",
}) => {
	return <Skeleton width={width} height={height} borderRadius={borderRadius} />;
};

export default AppSkeletonLoader;
