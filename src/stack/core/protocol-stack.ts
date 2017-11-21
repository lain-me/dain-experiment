import { ProtocolLayer } from './protocol-layer';
import { ProtocolPacket } from './protocol-packet';

export enum Placement {
	TOP,
	ABOVE,
	BELOW
}

export class ProtocolStack {
	highestLayer : ProtocolLayer = null;
	lowestLayer : ProtocolLayer = null;

	constructor()
	{
	}

	handleTransmit(packet : ProtocolPacket)
	{
		if (this.highestLayer) this.highestLayer.transmit(packet);
	}

	handleReceive(packet : ProtocolPacket)
	{
		if (this.lowestLayer) this.lowestLayer.receive(packet);
	}

	addLayer(layer : ProtocolLayer, placement : Placement = Placement.TOP, existing_layer : ProtocolLayer)
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
				let upperLayer : ProtocolLayer = existing_layer.upperLayer;
				layer.upperLayer = upperLayer;
				layer.lowerLayer = existing_layer;
				existing_layer.upperLayer = layer;

				if (existing_layer == this.highestLayer) this.highestLayer = layer;
				else upperLayer.lowerLayer = layer;

				break;

			case Placement.BELOW:
				let lowerLayer : ProtocolLayer = existing_layer.lowerLayer;
				layer.upperLayer = existing_layer;
				layer.lowerLayer = lowerLayer;
				existing_layer.lowerLayer = layer;

				if (existing_layer == this.lowestLayer) this.lowestLayer = layer;
				else lowerLayer.upperLayer = layer;

				break;
		}
	}

	removeLayer(layer : ProtocolLayer)
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
