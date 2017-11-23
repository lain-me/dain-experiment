import { ProtocolPacket } from './protocol-packet';

export class ProtocolLayer {
	constructor()
	{
	}

	private _upperLayer : ProtocolLayer = null;
	public get upperLayer()
	{
		return this._upperLayer;
	}

	public set upperLayer(value)
	{
		this._upperLayer = value;
	}

	private _lowerLayer : ProtocolLayer = null;
	public get lowerLayer()
	{
		return this._lowerLayer;
	}

	public set lowerLayer(value)
	{
		this._lowerLayer = value;
	}

	transmit(packet : ProtocolPacket)
	{
		this.lowerLayer.transmit(packet);
	}

	receive(packet : ProtocolPacket)
	{
		this.upperLayer.receive(packet);
	}
}
