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
    getLimitRemaining() {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("userData");
            const parsedData = userData ? JSON.parse(userData) : null;
            const limitRemaining = parsedData
                ? parsedData.limitRemaining
                : null;
            return limitRemaining ? limitRemaining : null;
        }
        return null;
    }

    setLimitRemaining(limit) {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("userData");
            const parsedData = userData ? JSON.parse(userData) : null;
            if (parsedData) {
                parsedData.limitRemaining = limit;
                localStorage.setItem("userData", JSON.stringify(parsedData));
            }
        }
    }
}

export default new Utils();
