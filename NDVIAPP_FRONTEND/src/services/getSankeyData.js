const GetSankeyData = async () => {
    try {
        const response = await fetch('/dummyData/sankey_data_ThuanHoa_2023.json');
        const sankeyData = await response.json();
        return sankeyData;
    } catch (error) {
        console.error('Error fetching the Sankey data:', error);
    }
};

export default GetSankeyData;
