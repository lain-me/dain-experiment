import { ProtocolPacket } from './protocol-packet';
import { Observable } from 'rxjs/Observable';

export class ProtocolLayer<T extends ProtocolPacket> {
	constructor()
	{
	}

	init()
	{
	}

	private _upperLayer : ProtocolLayer<T> = null;
	public get upperLayer()
	{
		return this._upperLayer;
	}

	public set upperLayer(value)
	{
		this._upperLayer = value;
	}

	private _lowerLayer : ProtocolLayer<T> = null;
	public get lowerLayer()
	{
		return this._lowerLayer;
	}

	public set lowerLayer(value)
	{
		this._lowerLayer = value;
	}

	transmit(packet : T) : Observable<T>
	{
		return this.lowerLayer.transmit(packet);
	}

	receive(packet : ProtocolPacket)
	{
		this.upperLayer.receive(packet);
	}
}
