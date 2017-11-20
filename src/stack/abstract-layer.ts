import { AbstractPacket } from './abstract-packet';

export class AbstractLayer {
	constructor()
	{
	}

	private _upperLayer : AbstractLayer = null;
	public get upperLayer()
	{
		return this._upperLayer;
	}

	public set upperLayer(value)
	{
		this._upperLayer = value;
	}

	private _lowerLayer : AbstractLayer = null;
	public get lowerLayer()
	{
		return this._lowerLayer;
	}

	public set lowerLayer(value)
	{
		this._lowerLayer = value;
	}

	transmit()
	{
	}

}
