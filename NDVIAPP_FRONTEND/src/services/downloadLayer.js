const downloadLayerAsShapefile = async (layer) => {
    const url = `api/layers/export/${layer}`;

    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = `${layer}.zip`;
            link.click();
        })
        .catch((error) => {
            console.error('Error downloading the layer:', error);
        });
};

export default downloadLayerAsShapefile;
