export interface Serializer {
	serialize() : any;

	deserialize(_ : any);
}
