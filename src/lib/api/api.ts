const BASE_URL = "https://fe-task-api.mainstack.io";

export const fetcher = async (endpoint: string) => {
	const response = await fetch(`${BASE_URL}${endpoint}`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};
