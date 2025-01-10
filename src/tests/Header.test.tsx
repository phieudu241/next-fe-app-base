import { render } from "@testing-library/react";

import Header from "components/Common/Header";

/**
 * @jest-environment jsdom
 */
describe("Header component", () => {
  test("should render header", () => {
    render(<Header/>);
  });
});
