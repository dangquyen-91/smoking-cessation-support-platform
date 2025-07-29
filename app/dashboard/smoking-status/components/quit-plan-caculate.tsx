"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface QuitPlanProps {
    initialYearsSmoking: number;
    initialCigsPerDay: number;
}

export default function QuitPlan({
    initialYearsSmoking,
    initialCigsPerDay,
}: QuitPlanProps) {
    const [yearsSmoking, setYearsSmoking] = useState(
        initialYearsSmoking.toString()
    );
    const [cigsPerDay, setCigsPerDay] = useState(initialCigsPerDay.toString());
    const [recommendedMonths, setRecommendedMonths] = useState<number | null>(
        null
    );
    const [customQuitMonths, setCustomQuitMonths] = useState("");
    const [milestones, setMilestones] = useState<
        { dayOffset: number; target: number }[]
    >([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Hàm sinh milestones dựa trên số tháng bỏ thuốc
    const createMilestones = (quitMonths: number, N0: number) => {
        const totalDays = Math.round(quitMonths * 30);
        const S = N0;
        const D = totalDays / S;
        const ms: { dayOffset: number; target: number }[] = [];
        for (let k = 1; k <= S; k++) {
            const dayOffset = Math.ceil(k * D);
            const target = N0 - k;
            ms.push({ dayOffset, target });
        }
        setMilestones(ms);
    };

    // Tính recommendedMonths và chạy createMilestones
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

        const rec = Math.min(3 * T_smoke, 9); // tháng
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

    // Bắt đầu kế hoạch: gửi payload lên server (nếu cần)
    const handleStartPlan = async () => {
        setSubmitError("");
        setSubmitSuccess(false);
        setIsSubmitting(true);

        const payload = {
            yearsSmoking: parseFloat(yearsSmoking),
            cigsPerDay: parseInt(cigsPerDay, 10),
            quitMonths: parseFloat(customQuitMonths),
            milestones,
            createdAt: new Date().toISOString(),
        };
        console.log("Submitting payload:", payload);
        // TODO: gọi API lưu payload nếu cần

        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    // Nếu bạn muốn tự động tính khi props ban đầu thay đổi:
    useEffect(() => {
        if (initialYearsSmoking > 0 && initialCigsPerDay > 0) {
            handleGenerate();
        }
    }, [initialYearsSmoking, initialCigsPerDay]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Kế hoạch bỏ thuốc lá</h2>

            {/* Form sửa nếu muốn tinh chỉnh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    />
                </div>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex space-x-2 mb-6">
                <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Generate Plan
                </button>
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Cập nhật
                </button>
            </div>

            {milestones.length > 0 && (
                <>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-3 py-2 border">Bước</th>
                                    <th className="px-3 py-2 border">Ngày</th>
                                    <th className="px-3 py-2 border">
                                        Mục tiêu
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

                    <div className="flex justify-center">
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
                    {submitError && (
                        <p className="text-red-500 mt-2">{submitError}</p>
                    )}
                    {submitSuccess && (
                        <p className="text-green-600 mt-2">
                            Kế hoạch đã được lưu thành công!
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
