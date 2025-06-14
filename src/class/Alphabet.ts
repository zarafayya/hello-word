import { Scene, Vector3 } from "three";
import { AlphabetData } from "../data/AlphabetData";
import { coloredModel } from "../utils/model";

export interface IAlphabet {
    name: string;
    model: string;
    color: string;
    position: Vector3;
    rotation: Vector3;
}

export class Alphabet {
    static alphabets: Alphabet[] = [];
    name: string;
    model: string;
    color: string;
    position: Vector3;
    rotation: Vector3;
    isVisible: boolean;

    static init() {
        AlphabetData.forEach(data => new Alphabet(data));
    }
    static renderAllAlphabets(scene: Scene) {
        Alphabet.alphabets.forEach((data) => {
            coloredModel(scene, data.model, data.name, data.position, data.rotation, data.color)
        })
    }
    static renderAlphabet(scene: Scene, name: string) {
        const alphabet = Alphabet.alphabets.find(data => data.name === name);
        if (alphabet) {
            alphabet.isVisible = true;
            coloredModel(scene, alphabet.model, alphabet.name, alphabet.position, alphabet.rotation, alphabet.color);
        }
    }
    static removeAlphabet(scene: Scene, name: string) {
        const alphabet = Alphabet.alphabets.find(data => data.name === name);
        if (alphabet) {
            alphabet.isVisible = false;
            scene.remove(scene.getObjectByName(name));
        }
    }
    constructor(data: IAlphabet) {
        this.name = data.name;
        this.model = data.model;
        this.color = data.color;
        this.position = data.position;
        this.rotation = data.rotation;
        this.isVisible = true;
        Alphabet.alphabets.push(this);
    }
    
}

Alphabet.init()
