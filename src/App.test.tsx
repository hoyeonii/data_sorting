import React from "react";
import { render, screen } from "@testing-library/react";
import App, { countValidity } from "./App";

const initialData = [
  {
    id: 1,
    guid: "104b2ed7-969d-4e3a-972a-531afb186906",
    customer: "Kassulke & Sohn",
    asset_type: "Dump Truck",
    serial_number: "1919-0038-4721-0Xpr",
    service_contract: true,
    warranty: true,
  },
  {
    id: 2,
    guid: "0493663d-e4fd-40df-b241-23ac6797476a",
    customer: "Bayer-Bergnaum",
    asset_type: "Grader",
    serial_number: "3878-4754-6100-SNDQ",
    service_contract: true,
    warranty: true,
  },
  {
    id: 3,
    guid: "9cfd794c",
    customer: "Schinner Group",
    asset_type: "Grader",
    serial_number: "1164-1973-2286-7yYb",
    service_contract: true,
    warranty: false,
  },
  {
    id: 4,
    guid: "92abdbac-b97b-414b-9619-76bc64fbdcf5",
    customer: "Hintz & Sauer",
    asset_type: "Compactor",
    serial_number: "6025-4667-9892-RiMd",
    service_contract: false,
    warranty: true,
  },
  {
    id: 5,
    guid: "45f7ae74-64e8-42a9-a803-9b45fb1675f6",
    customer: "Harber Group",
    asset_type: "Compactor",
    serial_number: "9253-9986-6558-2Zw2",
    service_contract: false,
    warranty: false,
  },
  {
    id: 6,
    guid: "3bad5732-472f-439c-aae0-f94151ecfc0b",
    customer: "Hintz & Sauer",
    asset_type: "Bulldozer",
    serial_number: "3315-9006-9752-B8nW",
    service_contract: false,
    warranty: true,
  },
  {
    id: 7,
    guid: "dbaf60e9-c4c1-4bf4-a14a-fbde22abcd47",
    customer: "Altenwerth KG",
    asset_type: "Grader",
    serial_number: "4047-2889-7044-1CFb",
    service_contract: false,
    warranty: false,
  },
  {
    id: 8,
    guid: "8505ef8a-931e-4c05-95a5-9cebc58670a1",
    customer: "Hansen-Block AG",
    asset_type: "Excavator",
    serial_number: "0234-4581-1961-BhpA",
    service_contract: true,
    warranty: false,
  },
  {
    id: 9,
    guid: "74fc4090-4e71-4c4c-a3ce-c628844e9550",
    customer: "Hintz & Sauer",
    asset_type: "Compactor",
    serial_number: "5797-0194-0345-pvPM",
    service_contract: false,
    warranty: false,
  },
  {
    id: 10,
    guid: "2245632f-be7e-4db4-9796-24f2d147b133",
    customer: "Schinner Group",
    asset_type: "Bulldozer",
    serial_number: "2704-9666-0247-HgK0",
    service_contract: true,
    warranty: true,
  },
];

describe("./App.tsx", () => {
  const result = countValidity(initialData);

  test("should count validity of contract and warranties ", () => {
    expect(result).toEqual([3, 2, 2, 3]);
  });
});
