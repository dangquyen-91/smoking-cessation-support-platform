"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function QuitPlan() {
    const [yearsSmoking, setYearsSmoking] = useState("");
    const [cigsPerDay, setCigsPerDay] = useState("");
    const [recommendedMonths, setRecommendedMonths] = useState(null);
    const [customQuitMonths, setCustomQuitMonths] = useState("");
    const [milestones, setMilestones] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Hàm sinh milestones dựa trên số tháng bỏ thuốc
    const createMilestones = (quitMonths, N0) => {
        const totalDays = Math.round(quitMonths * 30);
        const S = N0; // giảm từ N0 về 0
        const D = totalDays / S;

        const ms = [];
        for (let k = 1; k <= S; k++) {
            const dayOffset = Math.ceil(k * D);
            const target = N0 - k;
            ms.push({ dayOffset, target });
        }
        setMilestones(ms);
    };

    // Lần đầu generate: tính recommendedMonths và chạy createMilestones
    const handleGenerate = () => {
        setError("");
        setSubmitError("");
        setSubmitSuccess(false);
        const T_smoke = parseFloat(yearsSmoking);
        const N0 = parseInt(cigsPerDay, 10);

        if (isNaN(T_smoke) || T_smoke <= 0) {
            setError("Vui lòng nhập “Thời gian hút” hợp lệ (> 0).");
            return;
        }
        if (isNaN(N0) || N0 <= 0) {
            setError("Vui lòng nhập “Số điếu/ngày” hợp lệ (> 0).");
            return;
        }

        const rec = Math.min(3 * T_smoke, 9); // đơn vị tháng
        setRecommendedMonths(rec);
        setCustomQuitMonths(rec.toFixed(1));
        createMilestones(rec, N0);
    };

    // Khi user chỉnh customQuitMonths và update
    const handleUpdate = () => {
        setError("");
        setSubmitError("");
        setSubmitSuccess(false);
        const quitM = parseFloat(customQuitMonths);
        const N0 = parseInt(cigsPerDay, 10);

        if (isNaN(quitM) || quitM <= 0) {
            setError("Vui lòng nhập “Thời gian bỏ” hợp lệ (> 0).");
            return;
        }
        createMilestones(quitM, N0);
    };

    // Bắt đầu kế hoạch: gửi payload lên server
    const handleStartPlan = async () => {
        setSubmitError("");
        setSubmitSuccess(false);
        setIsSubmitting(true);

        const payload = {
            yearsSmoking: parseFloat(yearsSmoking),
            cigsPerDay: parseInt(cigsPerDay, 10),
            quitMonths: parseFloat(customQuitMonths),
            milestones, // [{ dayOffset: number, target: number }, ...]
            createdAt: new Date().toISOString(),
        };
        console.log("Submitting payload:", payload);
        setIsSubmitting(false);

        // try {
        //     const res = await fetch("/api/quit-plans", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(payload),
        //     });
        //     if (!res.ok) throw new Error(`Status ${res.status}`);
        //     setSubmitSuccess(true);
        // } catch (e) {
        //     console.error(e);
        //     setSubmitError("Không thể lưu kế hoạch. Vui lòng thử lại.");
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4">
                    Kế hoạch bỏ thuốc lá
                </h1>

                {/* Form nhập liệu */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Thời gian hút thuốc (năm)
                        </label>
                        <Input
                            type="number"
                            step="0.1"
                            min="0"
                            value={yearsSmoking}
                            onChange={(e) => setYearsSmoking(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                            placeholder="Ví dụ: 1.5"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Trung bình số điếu/ngày
                        </label>
                        <Input
                            type="number"
                            min="1"
                            value={cigsPerDay}
                            onChange={(e) => setCigsPerDay(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                            placeholder="Ví dụ: 20"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={handleGenerate}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        Generate Plan
                    </button>
                </div>

                {/* Chỉnh thời gian tùy ý */}
                {recommendedMonths !== null && (
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-gray-800 mb-2">
                            Thời gian khuyến nghị:{" "}
                            <strong>
                                {recommendedMonths.toFixed(1)} tháng
                            </strong>{" "}
                            ({Math.round(recommendedMonths * 30)} ngày)
                        </p>
                        <label className="block text-gray-700 mb-1">
                            Chọn thời gian bỏ thuốc (tháng)
                        </label>
                        <div className="flex space-x-2">
                            <Input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={customQuitMonths}
                                onChange={(e) =>
                                    setCustomQuitMonths(e.target.value)
                                }
                                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                            />
                            <button
                                onClick={handleUpdate}
                                className="bg-green-600 text-white font-semibold px-4 rounded hover:bg-green-700 transition"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                )}

                {/* Giải thích công thức */}
                {milestones.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <h2 className="text-lg font-semibold mb-2">
                            Giải thích công thức “Stair-step”
                        </h2>
                        <p className="text-gray-800 mb-1">
                            <strong>Tên công thức:</strong> Stair-step (giảm 1
                            điếu mỗi khoảng).
                        </p>
                        <p className="text-gray-800 mb-1">
                            <strong>Ý nghĩa:</strong> Chia tổng thời gian thành
                            các khoảng đều nhau, mỗi khoảng giảm đúng 1 điếu.
                        </p>
                        <p className="text-gray-800">
                            Phương pháp này giúp bạn thấy rõ tiến độ từng bước
                            nhỏ, dễ theo dõi và duy trì động lực.
                        </p>
                    </div>
                )}

                {/* Bảng milestones */}
                {milestones.length > 0 && (
                    <>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-3 py-2 border">
                                            Bước
                                        </th>
                                        <th className="px-3 py-2 border">
                                            Ngày (từ start)
                                        </th>
                                        <th className="px-3 py-2 border">
                                            Mục tiêu (điếu/ngày)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {milestones.map((m, idx) => (
                                        <tr
                                            key={idx}
                                            className={
                                                idx % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            }
                                        >
                                            <td className="px-3 py-2 border text-center">
                                                {idx + 1}
                                            </td>
                                            <td className="px-3 py-2 border text-center">
                                                {m.dayOffset}
                                            </td>
                                            <td className="px-3 py-2 border text-center">
                                                {m.target}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Nút Start Plan */}
                        <div className="mt-6 flex flex-col items-center">
                            {submitError && (
                                <p className="text-red-500 mb-2">
                                    {submitError}
                                </p>
                            )}
                            {submitSuccess && (
                                <p className="text-green-600 mb-2">
                                    Kế hoạch đã được lưu thành công!
                                </p>
                            )}
                            <button
                                onClick={handleStartPlan}
                                disabled={isSubmitting || submitSuccess}
                                className={`px-6 py-2 rounded font-semibold transition
                  ${
                      isSubmitting || submitSuccess
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                            >
                                {isSubmitting
                                    ? "Đang lưu..."
                                    : submitSuccess
                                    ? "Đã lưu"
                                    : "Bắt đầu kế hoạch"}
                            </button>
                        </div>
                    </>
                )}

                {milestones.length === 0 && recommendedMonths !== null && (
                    <p className="mt-6 text-gray-600">
                        Vui lòng nhấn “Cập nhật” để tạo lại kế hoạch với thời
                        gian bạn chọn.
                    </p>
                )}
            </div>
        </div>
    );
}
