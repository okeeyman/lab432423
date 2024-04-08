import React, { useState } from 'react';
import { Map, YMaps, Placemark } from 'react-yandex-maps';

const MapWithPlacemarks = () => {
const [placemarks, setPlacemarks] = useState([
{ id: 1, coordinates: [55.751574, 37.573856] },
{ id: 2, coordinates: [55.755814, 37.617635] },
]);

const addPlacemark = () => {
const newPlacemark = {
id: placemarks.length + 1,
coordinates: [Math.random() * 10 + 55, Math.random() * 10 + 37],
};

setPlacemarks([...placemarks, newPlacemark]);
};

return (
<div>
<button onClick={addPlacemark}>Add Placemark</button>
<YMaps>
<Map
defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
width="100%"
height="400px"
>
{placemarks.map((placemark) => (
<Placemark key={placemark.id} geometry={placemark.coordinates} />
))}
</Map>
</YMaps>
</div>
);
};

export default MapWithPlacemarks;