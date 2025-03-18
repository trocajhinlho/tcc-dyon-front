enum categoriesEnum {
    animais = "Animais",
    educacao = "Educação",
    esportes = "Esportes",
    infantil = "Infantil",
    lazer = "Lazer",
    negocios = "Negócios",
    palestra = "Palestra",
    shows = "Shows",
    tecnologia = "Tecnologia"
}

export const categoriesSlugs = Object.keys(categoriesEnum);
export const categoriesList = Object.entries(categoriesEnum);

export default categoriesEnum;