const getDataLayers = async (selectedRegion, selectedYear) => {
    const responseTQ = await fetch(
        `/minhkha/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=minhkha%3A${selectedRegion}_tq_${selectedYear}&outputFormat=application%2Fjson`,
    );
};

export default getDataLayers;
