const GetPNNMap = async () => {
    try {
        const responsePNN = await fetch(`api/layers/get_layers_geoJson/?layers=PNN_changes`);
        const dataPNN = await responsePNN.json();
        return dataPNN;
    } catch (error) {
        console.error('Error fetching the Sankey data:', error);
    }
};

export default GetPNNMap;
