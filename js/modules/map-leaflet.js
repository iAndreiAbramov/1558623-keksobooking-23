import { enableForms } from '../modules/init.js';
import { generateAdsHTML } from './generate-ads-html.js';

const FRAME_CENTER_COORDS = {
  lat: 35.67500,
  lng: 139.75000,
};
const MAIN_MARKER_SIZE = [52, 52];
const SECONDARY_MARKER_SIZE = [40, 40];

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');

const mainMarkerIcon = L.icon({
  iconUrl: '../../img/leaflet-img/marker-icon-2x.png',
  iconSize: MAIN_MARKER_SIZE,
  iconAnchor: [MAIN_MARKER_SIZE[0] / 2, MAIN_MARKER_SIZE[1]],
  shadowUrl: '../../img/leaflet-img/marker-shadow.png',
  shadowSize: [MAIN_MARKER_SIZE[0] * 2, MAIN_MARKER_SIZE[1] * 2],
  shadowAnchor: [MAIN_MARKER_SIZE[0] / 2, MAIN_MARKER_SIZE[1] * 2],
});
const mainMarker = L.marker(
  FRAME_CENTER_COORDS,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const loadMap = () => {
  map.on('load', enableForms)
    .setView(FRAME_CENTER_COORDS, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  addressInput.value = `
  ${FRAME_CENTER_COORDS.lat.toFixed(5)}, ${FRAME_CENTER_COORDS.lng.toFixed(5)}
  `;

  mainMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    const latitude = latLng.lat.toFixed(5);
    const longitude = latLng.lng.toFixed(5);
    addressInput.value = `${latitude}, ${longitude}`;
  });
};

// const resetMap = () => {
//   map.setView(FRAME_CENTER_COORDS, 11);
//   mainMarker.setLatLng(FRAME_CENTER_COORDS);
// };

const secondaryMarkerIcon = L.icon({
  iconUrl: '../../img/leaflet-img/marker-icon.png',
  iconSize: SECONDARY_MARKER_SIZE,
  iconAnchor: [SECONDARY_MARKER_SIZE[0] / 2, SECONDARY_MARKER_SIZE[1]],
  shadowUrl: '../../img/leaflet-img/marker-shadow.png',
  shadowSize: [SECONDARY_MARKER_SIZE[0] * 2, SECONDARY_MARKER_SIZE[1] * 2],
  shadowAnchor: [SECONDARY_MARKER_SIZE[0] / 2, SECONDARY_MARKER_SIZE[1] * 2],
});

const generateSimilarAds = (numberOfAds) => {
  for (let i = 0; i < numberOfAds; i++) {
    const popupHTML = generateAdsHTML(1);
    const secondaryMarkerCoords = popupHTML.querySelector('.popup__text--address').textContent.split(',');
    const newLayer = L.layerGroup().addTo(map);
    const secondaryMarker = L.marker(
      secondaryMarkerCoords,
      {
        icon: secondaryMarkerIcon,
      },
    );
    secondaryMarker.addTo(newLayer).bindPopup(popupHTML);
  }
};

export { loadMap, generateSimilarAds };
