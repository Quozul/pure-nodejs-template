import {
	createServer,
	type IncomingMessage,
	type ServerResponse,
} from "node:http";
import { MethodNotAllowed, NotFound } from "#src/server/errors.ts";
import type { Router } from "#src/server/router.ts";
import { write } from "#src/server/utils.ts";

export class Server {
	readonly #router: Router;

	constructor(router: Router) {
		this.#router = router;
	}

	run(port: string | number) {
		const server = createServer(this.handle.bind(this));
		server.listen(port, () => {
			const address = `http://127.0.0.1:${port}`;
			console.log("🌐 Server listening on", address);
		});
	}

	handle(req: IncomingMessage, res: ServerResponse) {
		console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

		try {
			this.#router.handle(req, res);
		} catch (e) {
			console.error(`[${req.method}] ${req.url} - ${e.message}\`);`);
			if (e instanceof NotFound) {
				this.#notFound(res);
			} else if (e instanceof MethodNotAllowed) {
				this.#methodNotAllowed(res);
			} else {
				this.#internalServerError(res);
			}
		}
	}

	#notFound(res: ServerResponse) {
		write(res, 404, {
			notFound: true,
		});
	}

	#methodNotAllowed(res: ServerResponse) {
		write(res, 405, {
			text: "method not allowed",
		});
	}

	#internalServerError(res: ServerResponse) {
		write(res, 500, {
			text: "internal server error",
		});
	}
}
