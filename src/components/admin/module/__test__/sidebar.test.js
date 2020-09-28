/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AdminSidebar from "../admin-sidebar";

describe("Logo", () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AdminSidebar />, div);
    });

    it("Selects correct active item", () => {
        const activeItem = "Dentist";
        const { getByTestId } = render(
            <AdminSidebar activeItem={activeItem} />
        );
        expect(getByTestId("dentistButton")).toHaveClass("active");
    });
});
