/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Logo from "../logo";

describe("Logo", () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Logo></Logo>, div);
    });

    it("Renders properly", () => {
        const { getByTestId } = render(<Logo></Logo>);
        expect(getByTestId("image")).toHaveClass("massive");
    });
});
