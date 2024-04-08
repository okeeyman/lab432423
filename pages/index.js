import { YMaps, Map, Clusterer, Placemark, ObjectManager,  } from '@pbe/react-yandex-maps';
import React, { useState, useEffect } from 'react';

export const getStaticProps = async () =>{
  const res = await fetch('http://localhost:5000/items');
  const data = await res.json();

  return{
    props: {stores: data}
  }
}
const uploadToServer = async (data) =>{
  const response = await fetch('http://localhost:5000/items', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const MapZoo = ({stores}) => {
  
  const [placemarks, setPlacemarks] = useState(stores);

  const addPlacemark = (e) => {
    const newPlacemark = {
      id: placemarks.length + 1,
      coordinates: e.get('coords'),
    };
    uploadToServer(newPlacemark);
    setPlacemarks([...placemarks, newPlacemark]);
  }

  return (
    <div>
      <h2>Информация о зоомагазинах</h2>
      <YMaps>
        <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10 }} style={{ width: '800px', height: '600px' }} onClick = {addPlacemark}>
          {placemarks.map((placemark) => (
            <Placemark key={placemark.id} geometry={placemark.coordinates} />
          ))}
        </Map>
      </YMaps>
    </div>
)
};

export default MapZoo;