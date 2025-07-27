export default async function Ses() {
    //   "/assets/sounds/rifle2.mp3"


    const audioCtx = new AudioContext();

    // Ses dosyasını al
    const response = await fetch("/assets/sounds/rifle2.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    // const audio = new Audio("/assets/sounds / rifle2.mp3");

    // Gain node
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.0001; // %3 ses


    // Panner node
    const panner = audioCtx.createPanner();
    panner.panningModel = 'HRTF'; // 3D ses modelleme


    // Listener yönü: ileri baksın (varsayılan ama garantiye alıyoruz)
    audioCtx.listener.forwardX.value = 0;
    audioCtx.listener.forwardY.value = 0;
    audioCtx.listener.forwardZ.value = -1; // Listener ileriye bakacak

    let i = 0;
    setInterval(() => {
        // Sesin yönünü değiştirecek olan değer
        panner.positionZ.value = Math.sin(i);  // Bu şekilde y ekseninde hareket ediyor
        panner.positionX.value = Math.cos(i);  // X ekseninde de yön değiştirebiliriz

        // Yeni bir AudioBufferSourceNode oluşturuluyor her çalma için
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;

        // Zincir: source → gain → panner → destination
        source.connect(gainNode).connect(panner).connect(audioCtx.destination);

        source.start();

        i += 0.1;  // Y ekseninde dönmeye devam etsin
    }, 10);  // Her saniyede bir ses çalsın

}