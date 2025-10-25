import assert from "node:assert";
import { test } from "node:test";
import { add } from "../src/index.ts";

test("add", (t) => {
	t.test("should add two numbers", () => {
		assert.strictEqual(add(5, 2), 7);
	});
});
