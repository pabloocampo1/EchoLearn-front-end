import axiosInstance from "./Api";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get("/api/category");
        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export const getAllAvailable = async () => {
    try {
        const response = axiosInstance.get("/api/category/getAllAvailable");
        return response;
    } catch (error) {
        console.error(error);
        
    }
}
export const getByName = async (name) => {
    try {
        const response = await axiosInstance.get("/api/category/findByName/"+name);
        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}
export const save = async (formData) => {
    try {
        const response = await axiosInstance.post("/api/category", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete("/api/category/delete/"+id);
        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}