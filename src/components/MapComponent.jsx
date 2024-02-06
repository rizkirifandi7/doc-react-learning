import { useEffect, useRef, useState } from "react";
import proj4 from "proj4";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";
import "ol/ol.css";

const EPSG_4326 = "EPSG:4326";
const EPSG_3785 = "EPSG:3785";

const MapComponent = () => {
	const mapTargetElement = useRef(null);
	const mapRef = useRef(null);
	const xInputRef = useRef(null);
	const yInputRef = useRef(null);
	const popupRef = useRef(null);

	const [iconStyle] = useState(
		new Style({
			image: new Icon({
				anchor: [0.5, 32],
				anchorXUnits: "fraction",
				anchorYUnits: "pixels",
				src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/32px-Map_marker_font_awesome.svg.png",
			}),
		})
	);

	useEffect(() => {
		const initializeMap = () => {
			mapRef.current = new Map({
				target: mapTargetElement.current || "map",
				layers: [new TileLayer({ source: new OSM() })],
				view: new View({
					center: [13125273.0316, -237257.9905],
					zoom: 4,
				}),
				overlays: [
					new Overlay({
						element: popupRef.current,
						autoPan: true,
						autoPanAnimation: {
							duration: 250,
						},
					}),
				],
			});

			mapRef.current.on("click", handleMapClick);
		};

		// Handle map click
		const handleMapClick = (event) => {
			const location = event.coordinate;
			const [x, y] = convertCoords(location, EPSG_3785, EPSG_4326);

			const iconFeature = new Feature({
				geometry: new Point([x, y]),
			});

			iconFeature.setStyle(iconStyle);

			const vectorSource = new VectorSource({
				features: [iconFeature],
			});

			const vectorLayer = new VectorLayer({
				source: vectorSource,
			});

			mapRef.current.addLayer(vectorLayer);
			xInputRef.current.value = x;
			yInputRef.current.value = y;

			// Show popup
			popupRef.current.innerHTML = `Lat: ${x}, Lon: ${y}`;
			mapRef.current.getOverlays().item(0).setPosition(location);
		};

		initializeMap();

		return () => mapRef.current?.setTarget(undefined);
	}, [iconStyle]);

	// Add point
	const addPoint = () => {
		const x = parseFloat(xInputRef.current.value);
		const y = parseFloat(yInputRef.current.value);

		const [newX, newY] = convertCoords([x, y], EPSG_4326, EPSG_3785);

		const iconFeature = new Feature({
			geometry: new Point([newX, newY]),
		});

		iconFeature.setStyle(iconStyle);

		const vectorSource = new VectorSource({
			features: [iconFeature],
		});

		const vectorLayer = new VectorLayer({
			source: vectorSource,
		});

		mapRef.current.addLayer(vectorLayer);
		mapRef.current.getView().setCenter([newX, newY]);

		// Show popup
		popupRef.current.innerHTML = `Lat: ${newX}, Lon: ${newY}`;
		mapRef.current.getOverlays().item(0).setPosition([newX, newY]);
	};

	const convertCoords = (coords, source, dest) => {
		return proj4(proj4.defs(source), proj4.defs(dest), coords);
	};

	return (
		<div className="p-4">
			<div ref={mapTargetElement} className="map w-full h-[500px] "></div>
			<div className="flex gap-4 pt-4 justify-end items-center">
				<input
					ref={xInputRef}
					id="x"
					type="number"
					className="border border-black rounded h-9 p-2"
					placeholder="latitude..."
				/>
				<input
					ref={yInputRef}
					id="y"
					type="number"
					className="border border-black rounded h-9 p-2"
					placeholder="longitude..."
				/>
				<button
					onClick={addPoint}
					id="button"
					className="bg-blue-500 text-white px-6 h-9 rounded text-sm font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
				>
					Add point
				</button>
			</div>
			<div
				id="popup"
				ref={popupRef}
				className="ol-popup bg-white shadow-md rounded px-4 py-2 border border-gray-300"
			></div>
		</div>
	);
};

export default MapComponent;
