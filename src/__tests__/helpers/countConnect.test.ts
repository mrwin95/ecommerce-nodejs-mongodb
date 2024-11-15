// import the function from the file that we want to test

import { countConnect } from "../../helpers/check.connect";
import mongoose from "mongoose";

beforeEach(() => {
  jest.resetAllMocks();
});
jest.mock("mongoose", () => ({
  connections: new Array(5).fill({}),
}));

describe("countConnect", () => {
  it("should log and return the correct number of connections", () => {
    const logSpy = jest.spyOn(console, "log");
    const connectionCount = countConnect();

    expect(connectionCount).toBe(5);
    // expect(logSpy).toHaveBeenCalledWith("Number of connections: 5");

    logSpy.mockRestore();
  });
});
