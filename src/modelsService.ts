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
	readonly #models: string[];
	readonly #owner: string;

	constructor(owner: string, ...models: string[]) {
		this.#models = models;
		this.#owner = owner;
	}

	getModels(): Model[] {
		return this.#models.map((id) => new Model(id, this.#owner));
	}
}
