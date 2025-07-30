"use client";

import React, { useState, useMemo } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Cigarette,
    CheckCircle2,
    Circle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import {
    useGetQuitPlanById,
    useGetQuitPlanProgress,
    useUpdateProgress,
} from "@/queries/plan.query";
import { useToast } from "@/components/ui/use-toast";
import { useGetCurrentSmokingStatus } from "@/queries/smoking.query";
import { useGetAllAchievements } from "@/queries/achievements.query";

export default function PlanCalendarPage() {
    const { planId } = useParams();
    const { data: listAchievements } = useGetAllAchievements();
    const {
        data: planData,
        isLoading: isPlanLoading,
        isError: isPlanError,
    } = useGetQuitPlanById(planId as string);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6));

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;

    const {
        data: processData = [],
        isLoading: isProgressLoading,
        isError: isProgressError,
    } = useGetQuitPlanProgress(planId as string, year, month);

    const {
        data: currentSmokingStatus,
        isLoading: isStatusLoading,
        isError: isStatusError,
    } = useGetCurrentSmokingStatus();

    const { mutateAsync: updateProgress } = useUpdateProgress();
    const { toast } = useToast();

    // 2. Local state for calendar and modal
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [inputValue, setInputValue] = useState("");
    const [noteValue, setNoteValue] = useState("");

    // 3. Safe plan defaults
    const safePlan = planData ?? {
        startDate: new Date().toISOString(),
        milestones: [] as { dayOffset: number; targetCigarettes: number }[],
    };
    const safeStartDate = new Date(safePlan.startDate);
    safeStartDate.setHours(0, 0, 0, 0);
    const safeMilestones = safePlan.milestones;

    // 4. Map existing logs for quick lookup
    const processDataMap = useMemo(() => {
        const map = new Map<string, { smoked: number; note?: string }>();
        processData.forEach((item) => {
            map.set(item.logDate, { smoked: item.smoked, note: item.note });
        });
        return map;
    }, [processData]);
    const checkedDays = useMemo(
        () => new Set(processData.map((item) => item.logDate)),
        [processData]
    );

    // 5. Compute target cigarettes for each day offset
    const getTargetCigarettes = (dayOffset: number) => {
        // nếu chưa có milestone nào hoặc mảng milestones rỗng thì mặc định 0
        if (safeMilestones.length === 0) return 0;

        // lướt qua từng milestone,
        // ngàyOffset ≤ milestone.dayOffset thì lấy luôn target của milestone đó
        for (let i = 0; i < safeMilestones.length; i++) {
            const m = safeMilestones[i];
            if (dayOffset <= m.dayOffset) {
                return m.targetCigarettes;
            }
        }

        // sau mốc cuối cùng thì giữ mức cuối cùng
        return safeMilestones[safeMilestones.length - 1].targetCigarettes;
    };

    // 6. Build 42-day calendar grid for display
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstOfMonth = new Date(year, month, 1);
        const startCal = new Date(firstOfMonth);
        startCal.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

        const endDate = new Date(safeStartDate);
        endDate.setDate(endDate.getDate() + 120);

        const days: any[] = [];
        const cur = new Date(startCal);
        for (let i = 0; i < 42; i++) {
            const curDay = new Date(cur);
            curDay.setHours(0, 0, 0, 0);

            const offset = Math.floor(
                (curDay.getTime() - safeStartDate.getTime()) /
                    (1000 * 60 * 60 * 24)
            );
            const inPlan = curDay >= safeStartDate && curDay <= endDate;

            days.push({
                date: new Date(curDay),
                day: curDay.getDate(),
                isCurrentMonth: curDay.getMonth() === month,
                isInPlan: inPlan,
                dayOffset: offset,
                targetCigarettes: inPlan ? getTargetCigarettes(offset) : null,
                isToday: curDay.toDateString() === new Date().toDateString(),
            });

            cur.setDate(cur.getDate() + 1);
        }
        return days;
    }, [currentMonth, safeStartDate, safeMilestones]);

    // 7. Loading & error states
    if (isPlanLoading || isProgressLoading || isStatusLoading) {
        return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
    }
    if (isPlanError || isProgressError || isStatusError) {
        return (
            <div className="p-6 text-center text-red-600">
                Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.
            </div>
        );
    }

    // 8. === TÍNH TOÁN THỐNG KÊ TIẾT KIỆM DỰA TRÊN TARGET ===
    const pricePerPack = currentSmokingStatus!.cigarettePrice; // VND cho 1 bao 20 điếu
    const pricePerCig = pricePerPack / 20;
    const totalCigarettesAvoided = processData.reduce((sum, rec) => {
        const d = new Date(rec.logDate);
        d.setHours(0, 0, 0, 0);
        const offset = Math.floor(
            (d.getTime() - safeStartDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const target = getTargetCigarettes(offset) ?? 0;
        const reduced = target - rec.smoked;
        return sum + (reduced > 0 ? reduced : 0);
    }, 0);
    const moneySaved = totalCigarettesAvoided * pricePerCig;
    const timeSavedMinutes = totalCigarettesAvoided * 5;
    const timeSavedHours = Math.floor(timeSavedMinutes / 60);
    const timeSavedRemMin = timeSavedMinutes % 60;
    // ================================================

    // 9. Handlers for day click, submit, and month navigation
    const handleDayClick = (day: any) => {
        if (!day.isInPlan) return;
        const key = day.date.toISOString().split("T")[0];
        const rec = processDataMap.get(key);
        setSelectedDay(day);
        setInputValue(rec?.smoked.toString() || "");
        setNoteValue(rec?.note || "");
    };

    const handleInputSubmit = async () => {
        if (!selectedDay || inputValue === "") return;
        const numSmoked = Number(inputValue);

        if (isNaN(numSmoked) || numSmoked < 0 || numSmoked > 200) {
            alert("Số lượng thuốc lá phải là một số hợp lệ.");
            return;
        }
        const payload = {
            planId: planId as string,
            logDate: selectedDay.date.toISOString().split("T")[0],
            smoked: Number(inputValue),
            note: noteValue,
        };
        const [err] = await updateProgress(payload);
        if (err) {
            toast({
                title: "Lỗi",
                description: "Không thể lưu dữ liệu. Vui lòng thử lại.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Thành công",
                description: "Dữ liệu đã được lưu thành công.",
                variant: "success",
            });
            setSelectedDay(null);
            setInputValue("");
            setNoteValue("");
        }
    };

    const navigateMonth = (dir: number) =>
        setCurrentMonth((prev) => {
            const next = new Date(prev);
            next.setMonth(prev.getMonth() + dir);
            return next;
        });

    // 10. Month and day labels
    const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    // 11. Render
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Calendar Panel */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center justify-center mb-6">
                        <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Kế hoạch bỏ thuốc lá
                        </h1>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigateMonth(-1)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {monthNames[currentMonth.getMonth()]}{" "}
                            {currentMonth.getFullYear()}
                        </h2>
                        <button
                            onClick={() => navigateMonth(1)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {dayNames.map((d) => (
                            <div
                                key={d}
                                className="text-center font-medium text-gray-500 py-2"
                            >
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, idx) => {
                            const key = day.date.toISOString().split("T")[0];
                            const isChecked = checkedDays.has(key);
                            const record = processDataMap.get(key);

                            return (
                                <div
                                    key={idx}
                                    className={`
                    relative p-3 rounded-lg border-2 min-h-[100px] cursor-pointer transition-all
                    ${!day.isCurrentMonth ? "opacity-30" : ""}
                    ${
                        !day.isInPlan
                            ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                            : ""
                    }
                    ${
                        day.isInPlan && !isChecked
                            ? "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                            : ""
                    }
                    ${
                        day.isInPlan && isChecked
                            ? "bg-green-50 border-green-300"
                            : ""
                    }
                    ${day.isToday ? "ring-2 ring-blue-400" : ""}
                    ${
                        selectedDay?.date.toDateString() ===
                        day.date.toDateString()
                            ? "ring-2 ring-purple-400"
                            : ""
                    }
                  `}
                                    onClick={() => handleDayClick(day)}
                                >
                                    <div className="flex justify-between items-start">
                                        <span
                                            className={`
                        font-medium
                        ${
                            day.isCurrentMonth
                                ? "text-gray-900"
                                : "text-gray-400"
                        }
                        ${day.isToday ? "text-blue-600 font-bold" : ""}
                      `}
                                        >
                                            {day.day}
                                        </span>
                                        {day.isInPlan && (
                                            <div className="text-green-600">
                                                {isChecked ? (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                ) : (
                                                    <Circle className="w-5 h-5" />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {day.isInPlan && (
                                        <div className="mt-1">
                                            <div className="flex items-center text-xs text-gray-600 mb-1">
                                                <Cigarette className="w-3 h-3 mr-1" />
                                                <span>
                                                    Tối đa:{" "}
                                                    {day.targetCigarettes}
                                                </span>
                                            </div>

                                            {record && (
                                                <div className="space-y-1">
                                                    <div
                                                        className={`
                              text-xs font-medium px-2 py-1 rounded
                              ${
                                  record.smoked <= day.targetCigarettes
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                              }
                            `}
                                                    >
                                                        Thực tế: {record.smoked}
                                                    </div>
                                                    {record.note && (
                                                        <div className="text-xs text-gray-500 p-1 bg-gray-50 rounded truncate">
                                                            {record.note}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal nhập/chỉnh sửa */}
                {selectedDay && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                {processDataMap.has(
                                    selectedDay.date.toISOString().split("T")[0]
                                )
                                    ? "Chỉnh sửa thông tin"
                                    : "Nhập thông tin hôm nay"}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Ngày {selectedDay.date.getDate()}/
                                {selectedDay.date.getMonth() + 1}/
                                {selectedDay.date.getFullYear()}
                            </p>
                            <p className="text-sm text-blue-600 mb-4">
                                Khuyến nghị tối đa:{" "}
                                {selectedDay.targetCigarettes} điếu
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số lượng thuốc lá đã hút
                                    </label>
                                    <Input
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        placeholder="Số lượng thuốc lá hôm nay"
                                        min={0}
                                        autoFocus
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ghi chú (không bắt buộc)
                                    </label>
                                    <Textarea
                                        value={noteValue}
                                        onChange={(e) =>
                                            setNoteValue(e.target.value)
                                        }
                                        placeholder="Cảm nhận, khó khăn, hoặc ghi chú..."
                                        rows={3}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setSelectedDay(null);
                                        setInputValue("");
                                        setNoteValue("");
                                    }}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleInputSubmit}
                                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {processDataMap.has(
                                        selectedDay.date
                                            .toISOString()
                                            .split("T")[0]
                                    )
                                        ? "Cập nhật"
                                        : "Lưu"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tiến độ & Thống kê */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Tiến độ & Thống kê
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-medium text-blue-800 mb-2">
                                Ngày đã ghi nhận
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {processData.length}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-medium text-green-800 mb-2">
                                Ngày đạt mục tiêu
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {
                                    processData.filter((item) => {
                                        const d = new Date(item.logDate);
                                        d.setHours(0, 0, 0, 0);
                                        const offset = Math.floor(
                                            (d.getTime() -
                                                safeStartDate.getTime()) /
                                                (1000 * 60 * 60 * 24)
                                        );
                                        return (
                                            item.smoked <=
                                            getTargetCigarettes(offset)
                                        );
                                    }).length
                                }
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <h3 className="font-medium text-red-800 mb-2">
                                Trung bình/ngày
                            </h3>
                            <p className="text-2xl font-bold text-red-600">
                                {processData.length > 0
                                    ? Math.round(
                                          processData.reduce(
                                              (sum, i) => sum + i.smoked,
                                              0
                                          ) / processData.length
                                      )
                                    : 0}
                            </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-medium text-purple-800 mb-2">
                                Tổng kế hoạch
                            </h3>
                            <p className="text-2xl font-bold text-purple-600">
                                120 ngày
                            </p>
                        </div>
                    </div>

                    {/* Phần mới: Tiền tiết kiệm, Điếu không hút, Thời gian tiết kiệm */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <h3 className="font-medium text-yellow-800 mb-2">
                                Tiền tiết kiệm
                            </h3>
                            <p className="text-2xl font-bold text-yellow-600">
                                {moneySaved.toLocaleString()} VND
                            </p>
                        </div>
                        <div className="bg-pink-50 rounded-lg p-4">
                            <h3 className="font-medium text-pink-800 mb-2">
                                Điếu không hút
                            </h3>
                            <p className="text-2xl font-bold text-pink-600">
                                {totalCigarettesAvoided} điếu
                            </p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <h3 className="font-medium text-indigo-800 mb-2">
                                Thời gian tiết kiệm
                            </h3>
                            <p className="text-2xl font-bold text-indigo-600">
                                {timeSavedHours} giờ {timeSavedRemMin} phút
                            </p>
                        </div>
                    </div>

                    {processData.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Ghi nhận gần đây
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {processData
                                    .slice()
                                    .reverse()
                                    .slice(0, 5)
                                    .map((item, i) => {
                                        const d = new Date(item.logDate);
                                        d.setHours(0, 0, 0, 0);
                                        const offset = Math.floor(
                                            (d.getTime() -
                                                safeStartDate.getTime()) /
                                                (1000 * 60 * 60 * 24)
                                        );
                                        const target =
                                            getTargetCigarettes(offset);
                                        const success = item.smoked <= target;
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`w-3 h-3 rounded-full ${
                                                            success
                                                                ? "bg-green-500"
                                                                : "bg-red-500"
                                                        }`}
                                                    />
                                                    <span className="font-medium">
                                                        {d.getDate()}/
                                                        {d.getMonth() + 1}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        {item.smoked}/{target}{" "}
                                                        điếu
                                                    </span>
                                                </div>
                                                {item.note && (
                                                    <span className="text-xs text-gray-500 max-w-32 truncate">
                                                        {item.note}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
