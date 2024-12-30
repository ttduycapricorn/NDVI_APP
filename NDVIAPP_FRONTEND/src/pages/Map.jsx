import { Content, Sidebar } from '../layout';

function Map() {
    return (
        <div className="map ">
            <div className="wrapper relative flex w-screen h-screen">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
}

export default Map;
