import "@testing-library/jest-dom";
import "structured-clone";

// jest.setup.ts
if (typeof globalThis.structuredClone === "undefined") {
	globalThis.structuredClone = function structuredClone(obj: any) {
		return JSON.parse(JSON.stringify(obj));
	};
}
