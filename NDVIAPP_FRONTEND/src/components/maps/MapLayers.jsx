import { useState } from 'react';
import { GeoJSON } from 'react-leaflet';

export default function MapLayers({ getJsonDataList, styles }) {
    const COLOR_MAP = {
        BHK: '#fff0b4',
        CLN: '#ffd2a0',
        DGD: '#ffaaa0',
        DGT: '#ffaa32',
        DNL: '#ffaaa0',
        DRA: '#cdaacd',
        DSH: '#ffaaa0',
        DTL: '#aaffff',
        DTS: '#faaaa0',
        DYT: '#ffaaa0',
        LUC: '#fffc8c',
        NKH: '#f5ffb4',
        NTD: '#d2d2d2',
        NTS: '#aaffff',
        ONT: '#ffd0ff',
        SKC: '#faaaa0',
        SKX: '#cdaacd',
        SON: '#a0fffe',
        TMD: '#faaaa0',
        TON: '#ff9faa',
        TSC: '#ffaa9f',
    };

    const [selectedFeature, setSelectedFeature] = useState(null);

    const getStyle = (feature) => {
        const tenchu = feature.properties.tenchu;
        const fillColor = COLOR_MAP[tenchu] || 'yellow';

        // Nếu feature hiện tại là feature được chọn, tô màu khác
        if (selectedFeature && selectedFeature === feature.properties.id) {
            return {
                fillColor: 'green', // Màu khi được chọn
                weight: 2,
                opacity: 1,
                color: 'blue',
                fillOpacity: 0.9,
            };
        }

        // Màu mặc định
        return {
            fillColor: fillColor,
            weight: 1,
            opacity: 1,
            color: 'black',
            fillOpacity: 0.7,
        };
    };

    const onEachTypeLandUse = (TypeLandUse, layer) => {
        const properties = TypeLandUse.properties;

        const popupContent = Object.entries(properties)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br>');

        layer.bindPopup(popupContent, {
            maxWidth: 300,
            closeButton: true,
            autoClose: true,
            closeOnClick: true,
        });

        layer.on({
            click: () => {
                setSelectedFeature(TypeLandUse.properties.id); // Cập nhật feature được chọn
            },
        });
    };

    // Đặt ID cho từng feature để nhận dạng
    const processedDataList = getJsonDataList.map((item) => {
        if (item) {
            return {
                ...item,
                features: item.features.map((feature, index) => ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        id: `${feature.properties.tenchu}-${index}`, // Đặt ID duy nhất cho từng feature
                    },
                })),
            };
        }
        return null;
    });

    return (
        <>
            {processedDataList.map((item, index) =>
                item ? (
                    <GeoJSON
                        style={(feature) => getStyle(feature)} // Áp dụng style động
                        data={item.features}
                        onEachFeature={onEachTypeLandUse}
                        key={index}
                    />
                ) : null,
            )}
        </>
    );
}
