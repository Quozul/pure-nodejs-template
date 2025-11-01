export class ConfigRepository {
	getAvailableModelNames(): string[] {
		return ["gpt-oss-120b", "mistral-small"];
	}

	getModelOwnerName(): string {
		return "bob";
	}
}
