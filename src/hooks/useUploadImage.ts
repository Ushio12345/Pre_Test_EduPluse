import { ResponseProps } from "@/lib/types/response.type";
import axios from "axios";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_UPSET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadFileToCloudanary = async (
    file: File | string | null,
    folderName: string,
): Promise<ResponseProps> => {
    try {
        if (!file) return { success: true, data: null };
        if (typeof file === "string") return { success: true, data: file };

        // Kiểm tra đúng đối tượng File của trình duyệt Web
        if (file instanceof File) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET as string);
            formData.append("folder", folderName);

            const response = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return { success: true, data: response.data.secure_url };
        }
        return { success: true, data: null };
    } catch (error: any) {
        console.error("error when upload file", error);
        return {
            success: false,
            msg: error?.response?.data?.error?.message || error.message || "Could not upload file",
        };
    }
};

