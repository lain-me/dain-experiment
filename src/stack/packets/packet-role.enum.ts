export enum PacketRole {
	NONE,
	PUBLISH,
	REQUEST, // on time
	SUCCESS,
	FAILURE,
	SUBSCRIBE, // as long as possible
	UNSUBSCRIBE
}
