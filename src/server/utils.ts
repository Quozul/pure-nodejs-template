import type { ServerResponse } from "node:http";

export function write(res: ServerResponse, status: number, body: object) {
	const stringified = JSON.stringify(body);
	res.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Content-Length": Buffer.byteLength(stringified),
	});
	res.end(stringified);
}
