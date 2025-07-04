"use client";
class Utils {
    getUserId() {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("userData");
            const parsedData = userData ? JSON.parse(userData) : null;
            const userId = parsedData ? parsedData.id : null;
            return userId ? userId : null;
        }
        return null;
    }
}

export default new Utils();
