import type { ConfigRepository } from "#src/repositories/configRepository.ts";

export class Model {
	readonly #id: string;
	readonly #owner: string;

	constructor(id: string, owner: string) {
		this.#id = id;
		this.#owner = owner;
	}

	get id(): string {
		return this.#id;
	}

	get owner(): string {
		return this.#owner;
	}
}

export class ModelsService {
	readonly #configRepository: ConfigRepository;

	constructor(configRepository: ConfigRepository) {
		this.#configRepository = configRepository;
	}

	getModels(): Model[] {
		return this.#configRepository
			.getAvailableModelNames()
			.map((id) => new Model(id, this.#configRepository.getModelOwnerName()));
	}
}
