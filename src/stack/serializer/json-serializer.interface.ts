import { Serializer } from './serializer.interface';

export interface JsonSerializer extends Serializer {
	serialize() : Object;

	deserialize(_ : Object);
}
