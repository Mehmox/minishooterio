export default function Map({ className, borderColor, mapRef, uiRefs }) {

    return <div className={className}>

        <div className="flex justify-center">
            <span ref={uiRefs.bytes} className="ml-1 mr-3" />
            <span ref={uiRefs.ping} className="ml-1 mr-3" />
            <span ref={uiRefs.playerCount} />
        </div>

        <div className={`w-[300px] h-[300px] border-solid border-4`}
            style={{ borderColor }}>
            <canvas id="map" ref={mapRef} className="w-full h-full opacity-50" />
        </div>

    </div>

}