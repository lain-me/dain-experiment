export enum PacketRole {
	NONE,
	PUBLISH,
	REQUEST, // on time
	SUBSCRIBE, // as long as possible
	UNSUBSCRIBE
}
