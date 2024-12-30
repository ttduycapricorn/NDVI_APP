import 'leaflet-minimap';
import 'leaflet/dist/leaflet.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import MapLayers from './MapLayers';
import ResetCenterButton from './ResetCenterButton';
import CustomZoomControl from './CustomZoomControl';
import UpdateMapCenter from './UpdateMapCenter';
import MapResizeHandler from './MapResizeHandler';
import MapInfoDisplay from './MapInfoDisplay';
import LocationMarker from './LocationMarker';
import { selectMapType, selectMapTypeList, selectSidebarStatus } from '../../features/setting/settingSlice.jsx';

function MapShapeFile({ getJsonDataList }) {
    const { area } = useSelector((state) => state.inputPrediction);
    const mapType = useSelector(selectMapType);
    const mapTypeList = useSelector(selectMapTypeList);
    const isSidebarOpen = useSelector(selectSidebarStatus);

    const CountryStyleList = [
        { fillColor: 'pink', fillOpacity: '0.5', color: 'red', fontWeight: '200' },
        { fillColor: 'yellow', fillOpacity: '0.5', color: 'green', fontWeight: '200' },
        { fillColor: 'purple', fillOpacity: '0.5', color: 'blue', fontWeight: '200' },
        { fillColor: 'green', fillOpacity: '0.1', color: 'blue', fontWeight: '200' },
        { fillColor: 'grey', fillOpacity: '0.1', color: 'blue', fontWeight: '200' },
        { fillColor: 'purple', fillOpacity: '0.1', color: 'blue', fontWeight: '200' },
    ];

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    const defaultCenter = [9.675, 105.9043];
    const mapCenter = area ? [area.latitude, area.longitude] : defaultCenter;

    return (
        <MapContainer
            style={{ height: '100vh', width: '100%' }}
            center={mapCenter}
            zoom={14}
            attributionControl={false}
            zoomControl={false}
        >
            <CustomZoomControl />
            <UpdateMapCenter center={mapCenter} />
            <ResetCenterButton center={mapCenter} />
            <MapInfoDisplay />
            <MapResizeHandler isSidebarOpen={isSidebarOpen} />
            <TileLayer
                attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Map tiles by <a href="https://stamen.com">Stamen Design</a>'
                url={mapTypeList[mapType].url}
                time={currentDate}
            />
            <MapLayers getJsonDataList={getJsonDataList} styles={CountryStyleList} />
            <LocationMarker />
        </MapContainer>
    );
}

export default MapShapeFile;
