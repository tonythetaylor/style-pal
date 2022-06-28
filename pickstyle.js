import pantsData from "./bottomData";

class Pants {
    constructor(pantsData) {
        this.style = pantsData.style
        this.color = stringToColor(pantsData.color);
        this.brand = pantsData.brand;
    }
}

const degree = 90

if (degree > 60 && pantsData.pantStyle == 'shorts') {
    console.log(pantsData)
}