import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginHome from "../pages/LoginHome/LoginHome";

describe("메인 로그인 화면", () => {
  test("로그인 화면 렌더링 체크", async () => {
    render(
      <MemoryRouter>
        <LoginHome />
      </MemoryRouter>
    );
    const loginHomeEl = screen.getByTestId("loginHome");
    expect(loginHomeEl).toBeInTheDocument();
  });
});
