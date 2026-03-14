import { beforeEach, describe, expect, it } from "vitest";
import { getUsername, saveUser } from "../js/utils/storage.js";

describe("getUsername", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no user is stored", () => {
    expect(getUsername()).toBeNull();
  });

  it("returns the user name when a user is stored", () => {
    saveUser({ name: "Test User" });
    expect(getUsername()).toBe("Test User");
  });

  it("returns undefined when stored user exists without name", () => {
    saveUser({});
    expect(getUsername()).toBeUndefined();
  });
});
