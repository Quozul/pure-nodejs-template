import assert from "node:assert";
import type { IncomingMessage, ServerResponse } from "node:http";
import { mock, test } from "node:test";
import { handleRequest } from "../src/index.ts";

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

		// Act
		handleRequest(req, res);

		// Assert
		assert.strictEqual(endMock.mock.calls[0].arguments[0], "GET /\n");
	});
});
