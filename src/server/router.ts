import type { IncomingMessage, ServerResponse } from "node:http";
import { MethodNotAllowed, NotFound } from "#src/server/errors.ts";
import { write } from "#src/server/utils.ts";
import type { ModelsService } from "#src/services/modelsService.ts";

export class Router {
	readonly #modelService: ModelsService;

	constructor(modelService: ModelsService) {
		this.#modelService = modelService;
	}

	handle(req: IncomingMessage, res: ServerResponse) {
		switch (req.url) {
			case "/v1/models":
				this.#getModels(req, res);
				break;
			default:
				throw new NotFound(req.url);
		}
	}

	#getModels(req: IncomingMessage, res: ServerResponse): void {
		this.#assertGet(req);
		write(res, 200, {
			object: "list",
			data: this.#modelService.getModels().map((model) => ({
				object: "model",
				id: model.id,
				createdAt: Date.now(),
				owned_by: model.owner,
			})),
		});
	}

	#assertGet(req: IncomingMessage) {
		if (req.method !== "GET") {
			throw new MethodNotAllowed(req.method);
		}
	}
}
