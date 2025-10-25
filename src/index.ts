import {
	createServer,
	type IncomingMessage,
	type ServerResponse,
} from "node:http";

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

	const body = `${req.method} ${req.url}\n`;
	res.writeHead(200, {
		"Content-Type": "text/plain; charset=utf-8",
		"Content-Length": Buffer.byteLength(body),
	});
	res.end(body);
}

if (import.meta.main) {
	const PORT = process.env.PORT || 3000;

	const server = createServer(handleRequest);
	server.listen(PORT, () => {
		const address =
			typeof server.address() === "object"
				? `http://127.0.0.1:${PORT}`
				: server.address;
		console.log("🌐 Server listening on", address);
	});
}
