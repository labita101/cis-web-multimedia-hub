// Week 3 melonJS asset preloader registry.
// Every visual, audio, font, and map asset used by the game
// should be registered here before gameplay starts.

const resources = [
       {
        name: "background",
        type: "image",
        src: "/data/img/background.png",
    },
    {
        name: "PressStart2P",
        type: "image",
        src: "/data/fnt/PressStart2P.png",
    },
    {
        name: "PressStart2P",
        type: "binary",
        src: "/data/fnt/PressStart2P.fnt",
    },
];

export default resources;