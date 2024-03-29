/// <reference types="@types/google.maps" />

export interface Mappable {
	location: {
		lat: number;
		lng: number;
	};
	getInfo(): string;
}

export class CustomMap {
	private googleMap: google.maps.Map;

	constructor(elID: string) {
		this.googleMap = new google.maps.Map(document.getElementById(elID), {
			zoom: 1,
			center: {
				lat: 1,
				lng: 1,
			},
		});
	}

	addMarker(object: Mappable): void {
		const marker = new google.maps.Marker({
			map: this.googleMap,
			position: object.location,
		});

		if (object.getInfo()) {
			const infoWindow = new google.maps.InfoWindow({
				content: object.getInfo(),
			});

			marker.addListener("click", () => {
				infoWindow.open(this.googleMap, marker);
			});
		}
	}
}
