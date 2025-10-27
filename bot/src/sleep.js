export default async function sleep(ms) {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, ms < 0 ? 0 : ms)
    );
}