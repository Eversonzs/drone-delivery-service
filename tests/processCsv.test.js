import processCsv from "../src/app/helpers/processCsv";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const inputString =
  '[["[DroneA]"," [200]"," [DroneB]"," [250]"," [DroneC]"," [100]"],["[LocationA]"," [200]"],["[LocationB]"," [150]"],["[LocationC]"," [50]"],["[LocationD]"," [150]"],["[LocationE]"," [100]"],["[LocationF]"," [200]"],["[LocationG]"," [50]"],["[LocationH]"," [80]"],["[LocationI]"," [70]"],["[LocationJ]"," [50]"],["[LocationK]"," [30]"],["[LocationL]"," [20]"],["[LocationM]"," [50]"],["[LocationN]"," [30]"],["[LocationO]"," [20]"],["[LocationP]"," [90]"]]';
const invalidInputString = "[[],[],[]]";

describe("proccessCsv success", () => {
  it("It will test the calculated trips make by drones", () => {
    const result = processCsv(JSON.parse(inputString));
    expect(result).toBeDefined();
    expect(result['DroneA']).toBeDefined();
    expect(result['DroneB']).toBeDefined();
    expect(result['DroneC']).toBeDefined();
  });
});

describe("proccessCsv failed", () => {
  it("It will failed based in a incorrect input file", () => {
    const result = processCsv(JSON.parse(invalidInputString));
    expect(result).toBeNull();
  });
});
