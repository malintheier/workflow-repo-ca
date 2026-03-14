import { describe, expect, it } from "vitest";
import { isActivePath } from "../js/utils/userInterface.js";

describe("isActivePath", () => {
  it("returns true when href is / and current path is /", () => {
    expect(isActivePath("/", "/")).toBe(true);
  });

  it("returns true when href is / and current path is /index.html", () => {
    expect(isActivePath("/", "/index.html")).toBe(true);
  });

  it("returns false when href is / and current path is another page", () => {
    expect(isActivePath("/", "/venue/index.html")).toBe(false);
  });

  it("returns true when current path includes href for non-root href", () => {
    expect(isActivePath("/venue", "/venue/index.html")).toBe(true);
  });

  it("returns false when current path does not include href for non-root href", () => {
    expect(isActivePath("/register", "/login/index.html")).toBe(false);
  });
});
