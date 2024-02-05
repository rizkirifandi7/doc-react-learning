import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import * as olProj from "ol/proj";
import { Icon, Style } from "ol/style";
import "ol/ol.css";
import { useEffect, useRef, useState } from "react";

const MapComponent = () => {
	const mapTargetElement = useRef(null);
	const [map, setMap] = useState(null);
	const [center, setCenter] = useState(olProj.fromLonLat([13125273.0316, -237257.9905]));

	useEffect(() => {
		const olMap = new Map({
			target: mapTargetElement.current || "map",
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: center,
				zoom: 4,
			}),
		});

		setMap(olMap);
		return () => olMap.setTarget(undefined);
	}, []);

	return (
		<div className="p-4">
			<div ref={mapTargetElement} className="map w-full h-[500px] "></div>
			<div className="flex gap-4 pt-4 justify-end items-center">
				<input id="x" type="number" className="border border-black rounded h-9 p-2" placeholder="latitude..." />
				<input id="y" type="number" className="border border-black rounded h-9 p-2" placeholder="longitude..." />
				<button
					id="button"
					className="bg-blue-500 text-white px-6 h-9 rounded text-sm font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
				>
					Add point
				</button>
			</div>
		</div>
	);
};

export default MapComponent;
