import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {StabilityRestAPI} from "../../../src/ai/stability/StabilityRestAPI";
import {Engine, ErrorObject} from "../../../src/ai/stability/types";

describe("Mock StabilityRestAPI", () => {
  // Create a mock instance of axios
  const mockAxios = new MockAdapter(axios);

  const apiKey = "your_api_key";
  const api = new StabilityRestAPI(apiKey, {});

  afterEach(() => {
    mockAxios.reset();
  });

  it("should fetch the list of engines successfully", async () => {
    // Mock the successful response from the API
    const mockResponseData: Engine[] = [
      {
        id: "engine_id_1",
        name: "Engine 1",
        description: "Engine 1 Description",
        type: "text-davinci-002",
      },
      // Add more engines here if needed
    ];

    mockAxios.onGet("/v1/engines").reply(200, {data: mockResponseData});

    // Call the method and check the result
    const result = await api.listEngines();
    expect(result).toEqual(mockResponseData);
  });

  it("should handle API errors", async () => {
    // Mock an error response from the API
    const mockError: ErrorObject = {
      id: "error_id",
      name: "Error",
      message: "Something went wrong",
    };
    mockAxios.onGet("/v1/engines").reply(500, mockError);

    // Call the method and check that it rejects with the error object
    await api.listEngines().catch((error) => {
      expect(error.response.data).toEqual(mockError);
    });
  });
});


