import { Serializer } from './serializer.interface';

export interface JsonSerializer extends Serializer {
	serialize() : string;

	deserialize(_ : string);
}
