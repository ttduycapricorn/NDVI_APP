/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayerGeoJson } from '../app/action';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

function Test() {
    const dispatch = useDispatch();
    const { layer, compareLayer } = useSelector((state) => state.layer);

    useEffect(() => {
        dispatch(fetchLayerGeoJson());
    }, [dispatch]);

    const [NN, setNN] = useState(null);
    const [PNN, setPNN] = useState(null);
    const [TQ, setTQ] = useState(null);

    const onEachTypeLandUse = (TypeLandUse, layer) => {
        const typeLand = TypeLandUse.properties.kh2003;
        layer.bindPopup(typeLand, {
            maxWidth: 300,
            closeButton: true,
            autoClose: true,
            closeOnClick: true,
        });
        layer.on({
            click: (event) => {
                event.target.setStyle({
                    fillColor: 'green',
                    color: 'white',
                });
            },
            clickOutSide: (event) => {
                event.target.setStyle({
                    fillColor: 'red',
                    fillOpacity: '0.1',
                    color: '#3c2a20',
                    fontWeight: '200',
                });
            },
        });
    };

    return (
        <div>
            <MapContainer
                center={[9.680258, 105.905196]}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: '100vh', width: '100%', zIndex: '0' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {layer.features && (
                    <GeoJSON
                        key="my-geojson"
                        style={{
                            fillColor: '#95c9dc',
                            fillOpacity: '0.2',
                            color: '#95c9dc',
                            fontWeight: '100',
                        }}
                        onEachFeature={onEachTypeLandUse}
                        data={layer.features}
                    />
                )}
            </MapContainer>
        </div>
    );
}

export default Test;
