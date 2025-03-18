import { X } from "phosphor-react";
import ExpandableGroup from "../../ExpandableGroup";
import categoriesEnum, { categoriesList } from "../../types/categoriesEnum";
import { CategoryVM } from "../../types/interface";

interface Props {
    categories: CategoryVM[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryVM[]>>
}

export default function CategorySelectionArea({ categories, setCategories }: Props) {
    return (
        <ExpandableGroup title="Categorias do seu Evento">
            <div className="w-full rounded-xl">
                <select name="categories" id="categories" 
                    defaultValue="0"
                    className="rounded-xl w-full h-10 outline-[#7F529F] bg-[#ddd] font-bold px-4 py-1 text-[#555] mb-4"
                    onChange={(e) => {
                        const key = e.target.value as keyof typeof categoriesEnum;
                        if(categories.filter(c => c._id === key).length === 0)
                            setCategories([ ...categories, {_id: key, titulo: categoriesEnum[key] } ]);
                        e.target.value = "0";
                    }}
                >
                    <option disabled value="0">Selecione uma categoria</option>
                    {
                        categoriesList.map(([key, value]) => <option key={key} value={key}>{value}</option>)
                    }
                </select>
            </div>
                
            <div className="flex flex-wrap w-full gap-3 px-4">
                {
                    categories.map(cat => (
                        <span
                            key={cat._id} 
                            onClick={() => setCategories(categories.filter(c => c._id !== cat._id))}
                            className="bg-[#ddd] rounded-2xl flex items-center py-2 px-4 cursor-pointer select-none"
                        >
                            <X className="mr-2" color="#555" />
                            <span className="font-bold text-[#555]">{cat.titulo}</span>
                        </span>
                    ))
                }
            </div>
        </ExpandableGroup>
    )
}