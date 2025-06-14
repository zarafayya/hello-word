import { Scene, Vector3 } from "three";
import { CardData } from "../data/CardData";
import { model } from "../utils/model";

export interface ICard {
    name: string;
    model: string;
    position: Vector3;
    rotation: Vector3;
}

export class Card {
    static cards: Card[] = [];
    name: string;
    model: string;
    position: Vector3;
    rotation: Vector3;
    isVisible: boolean;

    static init() {
        CardData.forEach(data => new Card(data));
    }
    static renderCard(scene: Scene, letter: string) {
        const name = "card" + letter;
        const card = Card.cards.find(data => data.name === name)
        if (card) {
            card.isVisible = true;
            model(scene, card.model, card.name, card.position, card.rotation);
        }
    }
    static removeCard(scene: Scene, letter: string) {
        const name = "card" + letter;
        const card = Card.cards.find(data => data.name === name)
        if (card) {
            card.isVisible = false;
            scene.remove(scene.getObjectByName(name));
        }
    }
    constructor(data: ICard) {
        this.name = data.name;
        this.model = data.model;
        this.position = data.position;
        this.rotation = data.rotation;
        this.isVisible = false;
        Card.cards.push(this);
    }
}

Card.init()
