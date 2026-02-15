import { defineStore } from 'pinia'
import { type DataOfImage } from "~/types/DataOfImage";

interface ImageState {
    images: DataOfImage[];
}

export const useImageStore = defineStore('image', {
    state: (): ImageState => {
        return {
            images: []
        }
    },
    actions: {
        setImages(images: DataOfImage[]): void {
            this.images = images;
        },
        clearImages(): void {
            this.images = [];
        },
        addImage(image: DataOfImage): void {
            this.images.push(image);
        },
        updateImage(index: number, image: DataOfImage): void {
            if (index >= 0 && index < this.images.length) {
                this.images[index] = image;
            }
        },
        removeImage(index: number): void {
            if (index >= 0 && index < this.images.length) {
                this.images.splice(index, 1);
            }
        }
    },
})