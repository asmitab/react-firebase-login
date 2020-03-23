import { MemoryRouter } from "react-router-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import Login from "../login";
import { authStates } from "../../components/auth";
import en from "../../utils/i18n";

test("login validates email/password inputs", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Login authState={authStates.LOGGED_OUT} />
      </MemoryRouter>
    );
  });

  const loginButton = document.querySelector("#login-button");
  act(() => {
    loginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const errorMsg = document.querySelector(".error");
  expect(errorMsg).toBeInTheDocument();
  expect(errorMsg.innerHTML).toBe(en.ERRORS.EMPTY_EMAIL);
});
