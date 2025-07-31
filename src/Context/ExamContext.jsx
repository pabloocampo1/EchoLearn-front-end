import { Children, createContext, useState } from "react";


export const TakeExamContext = createContext();

export const ExamContextProvider = ({ children }) => {
    const [examSelected, setExamSelected] = useState(null);
    const [subCategoryImageSelect, setSubCategoryImageSelect] = useState(null);


    return (
        <TakeExamContext.Provider value={{ examSelected, setExamSelected, subCategoryImageSelect, setSubCategoryImageSelect}}>
            {children}
        </TakeExamContext.Provider>
    )
}



