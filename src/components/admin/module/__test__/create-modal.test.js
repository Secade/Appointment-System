/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AdminCreateModal from "../admin-create-modal";

describe("Logo", () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AdminCreateModal />, div);
    });

    it("Displays properly", () => {
        const activeModal = "admin-create";
        const { getByTestId } = render(
            <AdminCreateModal activeModal={activeModal} />
        );
        expect(getByTestId("create-modal")).toHaveClass("visible");
    });
});
