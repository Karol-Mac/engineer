import axios from "axios";

export const ImagesFunctions = () => {
    const getImageByName = async({imageName: imageName})=>{
        let errorMessage;
        try {
            if(imageName === ""){
                errorMessage = "imageName was not given";
                return{ success: false, message: errorMessage};
            }

            // console.log("imageName= " +imageName);
            let getImageByNameUrl= "http://localhost:8080/api/images/"+imageName;

            const response = await axios.get(getImageByNameUrl, { responseType: 'blob' });
            const image = response.data;

            if(image == null){
                errorMessage = "No image name with given ID found";
                return{ success: false, message: errorMessage};
            }

            const imageURL = URL.createObjectURL(image);

            return{ success: true, image: imageURL};
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                errorMessage = error.response.data.message || "Unknown error";
            }else if(error.response){
                errorMessage = error.response;
            }

            return{ success: false, message: errorMessage};
        }
    };

    return {
        getImageByName,
    };
};

