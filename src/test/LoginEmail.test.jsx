import axios from "axios";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginEmail from "../pages/LoginEmail/LoginEmail";

jest.mock("axios");

describe("이메일 로그인 화면", () => {
  test("이메일, 비밀번호 모두 조건을 만족하는 경우 버튼 색의 변화 체크", async () => {
    const userInfo = {
      email: "abcdefg@abcd.com",
      password: "123123!",
    };

    axios.get.mockImplementationOnce(() => {
      Promise.resolve({ data: {} });
    });
    // expect(1 + 1).toBe(2);
    // render(
    //   <MemoryRouter>
    //     <LoginEmail />
    //   </MemoryRouter>
    // );
    // const emailInputEl = screen.getByLabelText("이메일");
    // const passwordInputEl = screen.getByLabelText("비밀번호");
    // const BtnEl = screen.getByRole("button");
    // expect(BtnEl).toBeEnabled();
    // expect(BtnEl).toHaveStyle({
    //   backgroundColor: "#FCD690",
    // });
  });
});
