import React from "react";
import {render} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

describe("Testing styled checkbox", () => {
	test("Displays the right text", async () => {
		const expectedText = "I love climbing";
		const mockSetState = jest.fn();
		const mockState = jest.fn();

		const { getByText } = render(<Checkbox 
			setState={mockSetState()} 
			state={mockState()}
			text={expectedText}

		/>);

		expect(getByText(expectedText)).toBeTruthy();
	});
});

