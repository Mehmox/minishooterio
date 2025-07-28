export default function Dev({ classname, dev }) {

    const display = [];

    if (dev) {
        for (const data in dev) {

            const div = <div key={data} className="flex">
                <div className="mx-5">
                    {data}Widht:{dev[data].Width}
                </div>
                <div className="mx-5">
                    {data}Height:{dev[data].Height}
                </div>
            </div>

            display.push(div);

        }
    }

    return <div className={classname}>
        {display}
    </div>
}