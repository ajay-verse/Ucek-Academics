import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent {

	/**
	 * location: Jntu Kakinada
	 * latitude: 16.9796435
	 * longitude: 82.2358632
	 */

	markers: any = [
		{
			lat: 16.9803664586061,
			lng: 82.24307694832217,
			popOn: 'Civil Department'
		},
		{
			lat: 16.98015485255267,
			lng: 82.24095726690031,
			popOn: 'EEE Department'
		},
		{
			lat: 16.97947680788081,
			lng: 82.24078365547687,
			popOn: 'Mech Department'
		},
		{
			lat: 16.977978933028254,
			lng: 82.24196982016487,
			popOn: 'ECE Department'
		},
		{
			lat: 16.977902688631755,
			lng: 82.24135569050699,
			popOn: 'CSE Department'
		},
		{
			lat: 16.979715102603592,
			lng: 82.24226216193097,
			popOn: 'CHE & PET Department'
		},
		{
			lat: 16.980277101101144,
			lng: 82.24202938112464,
			popOn: 'Principal\'s office'
		}
	]

	lat: number = 16.9796435
	lng: number = 82.2358632
	trueLocation: boolean = false
	private map: any
	private route: any

	private defaultIcon: L.Icon = L.icon({
		iconUrl: "assets/map-img/marker.png",
		iconSize: [38, 38],
		shadowSize: [38, 38],
		iconAnchor: [20, 40],
		shadowAnchor: [0, 0],
		popupAnchor: [0, -40]
	})
	private eduIcon: L.Icon = L.icon({
		iconUrl: "assets/map-img/university.png",
		iconSize: [38, 38],
		shadowSize: [38, 38],
		iconAnchor: [20, 40],
		shadowAnchor: [0, 0],
		popupAnchor: [0, -40]
	})
	private centroid: L.LatLngExpression = [16.980277101101144, 82.24202938112464]

	constructor() { }

	private generateMap(): void {
		L.Marker.prototype.options.icon = this.defaultIcon;
		this.map = L.map('map', { scrollWheelZoom: false }).setView(this.centroid, 17)
		const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
		})
		this.markers.forEach((x: any, i: number) => {
			L.marker([x.lat, x.lng] as L.LatLngExpression, {
				icon: this.eduIcon
			}).addTo(this.map).bindPopup(`${x.popOn}`)
		})
		tiles.addTo(this.map)
		this.map.on('click', function (event: any) {
			console.log(event.latlng)
		})
	}

	private setRoute(lat: number, lng: number) {
		if (this.route != null) {
			this.map.removeControl(this.route)
		}
		this.route = L.Routing.control({
			waypoints: [
				L.latLng(this.lat, this.lng),
				L.latLng(lat, lng)
			]
		}).addTo(this.map)
	}

	private getCurrentLocation() {
		if (!this.trueLocation) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					this.lat = position.coords.latitude
					this.lng = position.coords.longitude
				})
				localStorage.setItem('trueLocation', JSON.stringify({
					lat: this.lat,
					lng: this.lng
				}))
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		} else {
			const { lat, lng } = JSON.parse(localStorage.getItem('trueLocation') || '')
			this.lat = lat
			this.lng = lng
		}
	}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.generateMap()
		this.trueLocation = Boolean(localStorage.getItem('trueLocation'))
		this.getCurrentLocation()
	}

	navigate(index: number) {
		console.log(this.markers[index])
		this.setRoute(this.markers[index].lat, this.markers[index].lng)
		window.scroll({ top: 0, left: 0, behavior: 'smooth' })
		setInterval(() => {
			this.setLocation()
			this.route.waypoints[0] = [this.lat, this.lng] as L.LatLngExpression
			this.route.route()
		}, 1000)
	}

	setLocation() {
		this.trueLocation = false
		localStorage.removeItem('trueLocation')
		this.getCurrentLocation()
	}

	navBars() {
		window.scroll({ top: 800, left: 0, behavior: 'smooth' })
	}

}
