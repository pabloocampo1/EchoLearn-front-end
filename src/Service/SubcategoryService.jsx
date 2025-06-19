import axiosInstance from "./Api";


export const getAll = async (page) => {
    try {
        const response = axiosInstance.get(`/api/subcategory/getAll?page=${page}`  );
        if (response.stutus == 401 || response.data == 403) {
            return "Inauthorized"
        }

        return response;

    } catch (error) {
        console.error(error);

    }
}

export const save = async (formData) => {
    try {
         const response = await axiosInstance.post("/api/subcategory/save", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
                return response.status;
    } catch (error) {
        console.error(error);
        
    }
}
export const updateSubcategory = async (formData) => {
    try {
         const response = await axiosInstance.post("/api/subcategory/update", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
                return response.status;
    } catch (error) {
        console.error(error);
        
    }
}

export const deleteSubcategory  = async (id) => {
    try {
        const response = axiosInstance.delete( `/api/subcategory/delete/${id}`);
        return response.status;
    } catch (error) {
        console.error(error);

    }

}