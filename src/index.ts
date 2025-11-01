import { ConfigRepository } from "#src/repositories/configRepository.ts";
import { Router } from "#src/server/router.ts";
import { Server } from "#src/server/server.ts";
import { ModelsService } from "#src/services/modelsService.ts";

if (import.meta.main) {
	const PORT = process.env.PORT || 3000;
	const configRepository = new ConfigRepository();
	const modelService = new ModelsService(configRepository);

	const router = new Router(modelService);
	new Server(router).run(PORT);
}
