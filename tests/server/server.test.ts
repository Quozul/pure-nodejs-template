import assert from "node:assert";
import type { IncomingMessage, ServerResponse } from "node:http";
import { mock, test } from "node:test";
import { Router } from "#src/server/router.ts";
import { Server } from "#src/server/server.ts";
import { Model, type ModelsService } from "#src/services/modelsService.ts";

function mockRouter(owner: string = "", ...models: string[]) {
	const modelService = {
		getModels: mock.fn(() => models.map((id) => new Model(id, owner))),
	};
	const router = new Router(modelService as unknown as ModelsService);
	return { router, modelService };
}

test("handleRequest", (t) => {
	t.test("should handle root path", () => {
		// Arrange
		const req = {
			method: "GET",
			url: "/",
		} as IncomingMessage;
		const endMock = mock.fn();
		const res = {
			writeHead: mock.fn(),
			end: endMock,
		} as unknown as ServerResponse;
		const { router } = mockRouter();
		const server = new Server(router);

		// Act
		server.handle(req, res);

		// Assert
		assert.strictEqual(endMock.mock.calls[0].arguments[0], '{"notFound":true}');
	});
});

test("GET /v1/models", (t) => {
	t.test("should return model list", () => {
		// Arrange
		const req = {
			method: "GET",
			url: "/v1/models",
		} as IncomingMessage;
		const endMock = mock.fn();
		const res = {
			writeHead: mock.fn(),
			end: endMock,
		} as unknown as ServerResponse;
		const givenOwner = "bob";
		const givenModels = ["model-a", "model-b"];
		const { router, modelService } = mockRouter(givenOwner, ...givenModels);
		const server = new Server(router);
		const expectedResponse = {
			object: "list",
			data: [
				{
					id: "model-a",
					object: "model",
					owned_by: "bob",
				},
				{
					id: "model-b",
					object: "model",
					owned_by: "bob",
				},
			],
		};

		// Act
		server.handle(req, res);

		// Assert
		assert.strictEqual(
			modelService.getModels.mock.callCount(),
			1,
			"service should be called once",
		);
		assert.partialDeepStrictEqual(
			JSON.parse(endMock.mock.calls[0].arguments[0]),
			expectedResponse,
			"response does not include expected fields",
		);
	});

	t.test("should return method not allowed when post request", () => {
		// Arrange
		const req = {
			method: "POST",
			url: "/v1/models",
		} as IncomingMessage;
		const endMock = mock.fn();
		const res = {
			writeHead: mock.fn(),
			end: endMock,
		} as unknown as ServerResponse;
		const { router, modelService } = mockRouter();
		const server = new Server(router);
		const expectedResponse = {
			text: "method not allowed",
		};

		// Act
		server.handle(req, res);

		// Assert
		assert.strictEqual(
			modelService.getModels.mock.callCount(),
			0,
			"service should not be called",
		);
		assert.partialDeepStrictEqual(
			JSON.parse(endMock.mock.calls[0].arguments[0]),
			expectedResponse,
			"response does not include expected fields",
		);
	});
});
