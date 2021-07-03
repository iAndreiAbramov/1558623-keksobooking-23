import { enableForms } from '../modules/init.js';
import { adDataToHTML } from './ad-data-to-html.js';
import { getData, showLoadFailMessage } from '../services/get-data.js';

const REQUEST_ADS_URL = 'https://23.javascript.pages.academy/keksobooking/data';

const FRAME_CENTER_COORDS = {
  lat: 35.67500,
  lng: 139.75000,
};
const MAIN_MARKER_SIZE = [52, 52];
const SECONDARY_MARKER_SIZE = [40, 40];

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');

const mainMarkerIcon = L.icon({
  iconUrl: './img/leaflet-img/marker-icon-2x.png',
  iconSize: MAIN_MARKER_SIZE,
  iconAnchor: [MAIN_MARKER_SIZE[0] / 2, MAIN_MARKER_SIZE[1]],
  shadowUrl: './img/leaflet-img/marker-shadow.png',
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

const secondaryMarkerIcon = L.icon({
  iconUrl: './img/leaflet-img/marker-icon.png',
  iconSize: SECONDARY_MARKER_SIZE,
  iconAnchor: [SECONDARY_MARKER_SIZE[0] / 2, SECONDARY_MARKER_SIZE[1]],
  shadowUrl: './img/leaflet-img/marker-shadow.png',
  shadowSize: [SECONDARY_MARKER_SIZE[0] * 2, SECONDARY_MARKER_SIZE[1] * 2],
  shadowAnchor: [SECONDARY_MARKER_SIZE[0] / 2, SECONDARY_MARKER_SIZE[1] * 2],
});

const generateSimilarAds = () => {
  const adsData = getData(REQUEST_ADS_URL, showLoadFailMessage);
  adsData.then((dataArray) => {
    dataArray.forEach((dataItem) => {
      const adHTML = adDataToHTML(dataItem);
      const secondaryMarkerCoords = dataItem.location;
      const newLayer = L.layerGroup().addTo(map);
      const secondaryMarker = L.marker(
        secondaryMarkerCoords,
        {
          icon: secondaryMarkerIcon,
        },
      );
      secondaryMarker.addTo(newLayer).bindPopup(adHTML);
    });
  });
};

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

  generateSimilarAds();
};

const resetMap = () => {
  map.setView(FRAME_CENTER_COORDS, 13);
  mainMarker.setLatLng(FRAME_CENTER_COORDS);
  addressInput.value = `${FRAME_CENTER_COORDS.lat.toFixed(5)}, ${FRAME_CENTER_COORDS.lng.toFixed(5)}`;
};

export { loadMap, resetMap };
