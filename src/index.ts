import { ModelsService } from "./modelsService.ts";
import { Router } from "./server/router.ts";
import { Server } from "./server/server.ts";

if (import.meta.main) {
	const PORT = process.env.PORT || 3000;
	const modelService = new ModelsService("gpt-oss-120b", "mistral-small");

	const router = new Router(modelService);
	new Server(router).run(PORT);
}
