import {create} from "zustand";
import {
    CREATE_MODE,
    defaultAnchor,
    defaultWidth,
    generateSoftColors,
    uID, colors
} from "../utils";

const id = uID();
const color = generateSoftColors();

export const useStore = create((set) => ({
    mode: CREATE_MODE,
    setMode: (newMode) => set({mode: newMode}),

    width: defaultWidth,
    setWidth: (newWidth) => set({width: newWidth}),

    depth: defaultWidth,
    setDepth: (newDepth) => set({depth: newDepth}),

    anchorX: defaultAnchor,
    setAnchorX: (newAnchorPoint) => set({anchorX: newAnchorPoint}),

    anchorZ: defaultAnchor,
    setAnchorZ: (newAnchorPoint) => set({anchorZ: newAnchorPoint}),

    rotate: false,
    setRotate: (bool) => set({rotate: bool}),

    // color: color,
    // setColor: (newColor) => set({ color: newColor }),

    selectedBricks: [],
    setSelectedBricks: ({object, shift}) =>
        set((state) => {
            if (object === undefined) return {selectedBricks: []};
            else if (Array.isArray(object)) return {selectedBricks: object};
            else if (!shift)
                return state.selectedBricks[0] === object
                    ? {selectedBricks: []}
                    : {selectedBricks: [object]};
            else if (state.selectedBricks.includes(object))
                return {
                    selectedBricks: state.selectedBricks.filter((o) => o !== object),
                };
            else return {selectedBricks: [object, ...state.selectedBricks]};
        }),

    bricks: [],
    setBricks: (getBricks) =>
        set((state) => ({bricks: getBricks(state.bricks)})),
    clearBricks: () => set({bricks: []}),

    self: {id: id, color: color},
    setSelfName: (name) =>
        set((state) => ({self: {...state.self, name: name}})),

    cursorColors: {},
    setCursorColors: (newCursorColor) =>
        set((state) => ({
            cursorColors: {...state.cursorColors, ...newCursorColor},
        })),

    removeCursorColor: (id) =>
        set((state) => {
            delete state.cursorColors[id];
            return {cursorColors: {...state.cursorColors}};
        }),
}));
