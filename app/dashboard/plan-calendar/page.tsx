"use client";

import { useState } from "react";
import {
    Calendar,
    CheckCircle,
    Target,
    ChevronRight,
    Clock,
    TrendingDown,
    Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    useDeleteQuitPlan,
    useGetQuitPlanByUserId,
    useUpdateIsDone,
} from "@/queries/plan.query";
import { Button } from "@/components/ui/button";

export default function PlanCalendarPage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { data: plansData } = useGetQuitPlanByUserId();
    const { mutateAsync: updateIsDone } = useUpdateIsDone();
    const today = new Date();

    // Calculate progress for each plan
    const plansWithProgress = plansData?.map((plan: any) => {
        const startDate = new Date(plan.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 120);

        const milestonesWithDates = plan.milestones.map((milestone: any) => {
            const milestoneDate = new Date(startDate);
            milestoneDate.setDate(startDate.getDate() + milestone.dayOffset);

            return {
                ...milestone,
                date: milestoneDate,
                isPast: milestoneDate < today,
                isToday: milestoneDate.toDateString() === today.toDateString(),
                isFuture: milestoneDate > today,
            };
        });

        const completedMilestones = milestonesWithDates.filter(
            (m) => m.isPast
        ).length;
        const progress = (completedMilestones / plan.milestones.length) * 100;
        const currentMilestone =
            milestonesWithDates.find((m) => !m.isPast && !m.isToday) ||
            milestonesWithDates[milestonesWithDates.length - 1];

        return {
            ...plan,
            startDate,
            endDate,
            milestonesWithDates,
            completedMilestones,
            progress,
            currentMilestone,
            isActive: startDate <= today && today <= endDate,
            isUpcoming: startDate > today,
            isCompleted: today > endDate,
        };
    });

    // Find current plan (latest startDate)
    const currentPlan = plansWithProgress?.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )[0];

    // Format date to Vietnamese
    const formatDate = (date) => {
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getPlanStatusBadge = (plan) => {
        if (plan.done) {
            return (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                    Hoàn thành
                </span>
            );
        } else
            return (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    Đang thực hiện
                </span>
            );
    };

    const handleStopPlan = async (plan) => {
        const [err] = await updateIsDone(plan.planId);
        if (err) {
            console.error("Error updating plan status:", err);
            return;
        }
        setSelectedPlan(null);
    };
    const { mutateAsync: deleteQuitPlan } = useDeleteQuitPlan();

    const handleDeletePlan = async (planId) => {
        const [err] = await deleteQuitPlan(planId);
        if (err) {
            console.error("Error deleting plan:", err);
            return;
        }
        setSelectedPlan(null);
    };

    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-blue-600 w-6 h-6" />
                        <h1 className="text-2xl font-bold text-gray-800">
                            Lịch trình cai thuốc lá
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Quản lý các kế hoạch cai thuốc lá của bạn
                    </p>
                </div>

                {/* Plans List */}
                <div className="space-y-4">
                    {plansWithProgress?.map((plan) => (
                        <div
                            key={plan.planId}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            {/* Plan Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-800">
                                                Kế hoạch #{plan.planId}
                                            </h3>
                                            {getPlanStatusBadge(plan)}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {formatDate(plan.startDate)} -{" "}
                                            {formatDate(plan.endDate)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button
                                            className="bg-red-500 text-white"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirm(
                                                    "Bạn có chắc chắn muốn xóa kế hoạch này?"
                                                ) &&
                                                handleDeletePlan(plan.planId)
                                            }
                                        >
                                            Xóa kế hoạch
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Overview */}
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                                <div className="text-center p-3 bg-orange-50 rounded-lg">
                                    <div className="text-xl font-bold text-orange-600">
                                        {plan.currentMilestone
                                            ?.targetCigarettes || 0}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        Mục tiêu hiện tại
                                    </div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <div className="text-xl font-bold text-purple-600">
                                        {plan.milestones.length}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        Tổng mốc
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${plan.progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500 text-center">
                                    {plan.quitMonths} tháng •{" "}
                                    {plan.milestones.length} mốc • 120 ngày
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/plan-calendar/${plan.planId}`
                                        )
                                    }
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Xem chi tiết
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Modal */}
                {selectedPlan && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Xác nhận dừng kế hoạch cai thuốc của
                                            bạn?
                                        </h3>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {formatDate(selectedPlan.startDate)}{" "}
                                            - {formatDate(selectedPlan.endDate)}
                                        </div>
                                        <p className="text-2xl font-bold  mt-1">
                                            Quá trình này bạn đã hoàn thành
                                            được:
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPlan(null)}
                                        className="text-gray-400 hover:text-gray-600 text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {/* Plan Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {selectedPlan.completedMilestones}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Hoàn thành
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">
                                            {Math.round(selectedPlan.progress)}%
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Tiến độ
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${selectedPlan.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Milestones List */}
                            </div>

                            {/* Modal Footer */}
                            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
                                <div className="flex items-center justify-end gap-4">
                                    <div>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleStopPlan(selectedPlan)
                                            }
                                        >
                                            Dừng kế hoạch
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={() =>
                                                setSelectedPlan(null)
                                            }
                                        >
                                            Đóng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
