import { actionFetch } from "../actions/action-fetch";
import { Course } from "../types/course.type";
import { ENDPOINTS } from "@/constants/api.constant";

export const courseService = {
  getCourses: async (): Promise<Course[]> => {
    const response = await actionFetch(ENDPOINTS.COURSES);

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }

    return response.json() as Promise<Course[]>;
  },
};
