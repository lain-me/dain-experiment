import { Serializer } from './serializer.interface';

export interface JsonSerializer extends Serializer {
	serialize() : object;

	deserialize(_ : object);
}
