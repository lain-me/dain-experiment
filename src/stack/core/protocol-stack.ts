import { ProtocolLayer } from './protocol-layer';
import { ProtocolPacket } from './protocol-packet';

export enum Placement {
	TOP,
	ABOVE,
	BELOW
}

export class ProtocolStack<T extends ProtocolPacket> {
	highestLayer : ProtocolLayer<T> = null;
	lowestLayer : ProtocolLayer<T> = null;

	constructor()
	{
	}

	init()
	{
		let layer = this.lowestLayer;
		while (layer) {
			layer.init();
			layer = layer.upperLayer;
		}
	}

	handleTransmit(packet : T)
	{
		if (this.highestLayer) this.highestLayer.transmit(packet);
	}

	handleReceive(packet : T)
	{
		if (this.lowestLayer) this.lowestLayer.receive(packet);
	}

	addLayer(layer : ProtocolLayer<T>, placement : Placement = Placement.TOP, existing_layer : ProtocolLayer<T> = null)
	{
		layer.lowerLayer = null;
		layer.upperLayer = null;

		if (!this.highestLayer) {
			this.highestLayer = layer;
			this.lowestLayer = layer;

			return;
		}

		switch (placement) {
			case Placement.TOP:
				this.highestLayer.upperLayer = layer;
				layer.lowerLayer = this.highestLayer;
				this.highestLayer = layer;

				break;

			case Placement.ABOVE:
				let upperLayer : ProtocolLayer<T> = existing_layer.upperLayer;
				layer.upperLayer = upperLayer;
				layer.lowerLayer = existing_layer;
				existing_layer.upperLayer = layer;

				if (existing_layer == this.highestLayer) this.highestLayer = layer;
				else upperLayer.lowerLayer = layer;

				break;

			case Placement.BELOW:
				let lowerLayer : ProtocolLayer<T> = existing_layer.lowerLayer;
				layer.upperLayer = existing_layer;
				layer.lowerLayer = lowerLayer;
				existing_layer.lowerLayer = layer;

				if (existing_layer == this.lowestLayer) this.lowestLayer = layer;
				else lowerLayer.upperLayer = layer;

				break;
		}
	}

	removeLayer(layer : ProtocolLayer<T>)
	{
		if (layer == this.highestLayer) {
			this.highestLayer = layer.lowerLayer;
			if (this.highestLayer) this.highestLayer.upperLayer = null;
		}
		else {
			layer.upperLayer.lowerLayer = layer.lowerLayer;
		}

		layer.lowerLayer = null;
		if (layer == this.lowestLayer) {
			this.lowestLayer = layer.upperLayer;
			if (this.lowestLayer) this.lowestLayer.lowerLayer = null;
		}
		else {
			layer.lowerLayer.upperLayer = layer.upperLayer;
		}
		layer.upperLayer = null;
	}
}
