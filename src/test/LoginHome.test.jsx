import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginHome from "../pages/LoginHome/LoginHome";

describe("메인 로그인 화면", () => {
  test("이메일로 로그인 링크 url 체크", () => {
    render(
      <MemoryRouter>
        <LoginHome />
      </MemoryRouter>
    );
    const linkEl = screen.getByRole("login_link");
    expect(linkEl).toHaveAttribute("href", "/login/email");
  });

  test("회원가입 링크 url 체크", () => {
    render(
      <MemoryRouter>
        <LoginHome />
      </MemoryRouter>
    );
    const linkEl = screen.getByRole("signup_link");
    expect(linkEl).toHaveAttribute("href", "/signup");
  });
});
