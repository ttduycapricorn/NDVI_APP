const GetNNMap = async () => {
    try {
        const responsePNN = await fetch(`api/layers/get_layers_geoJson/?layers=NN_changes`);
        const dataPNN = await responsePNN.json();
        return dataPNN;
    } catch (error) {
        console.error('Error fetching the Sankey data:', error);
    }
};

export default GetNNMap;
