export default function Map({ className, color, mapRef, data }) {

    return <div className={className}>

        <div className="flex justify-center">
            <span ref={data.net} className="ml-1 mr-3" />
            <span ref={data.ping} />
        </div>

        <div className={`w-[300px] h-[300px] border-solid border-4`}
            style={{ borderColor: color }}>
            <canvas id="map" ref={mapRef} className="w-full h-full opacity-50" />
        </div>

    </div>

}