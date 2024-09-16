import toast from "react-hot-toast";
import StringToBoolean from "@/utils/stringToBoolean";
import { apiDeleteCourseById } from "@/services/ApiBasic";

const handleDelete = async (
  id: number | string | null,
  onReload?: () => void,
) => {
  try {
    // Start loading
    console.log("id in delete", id);

    // Call the API to delete the element
    await toast.promise(apiDeleteCourseById(id), {
      loading: "Deleting item...",
      success: <b>Course Item deleted successfully!</b>,
      error: (error) => (
        <b>{error.message || "An error occurred while deleting the item."}</b>
      ),
    });

    // Call the onReload function if provided
    if (onReload) {
      onReload();
    }
  } catch (error: any) {
    console.error("Error deleting item:", error.message);
    // You can handle additional error logging or state updates here
  }
};

export default handleDelete;
