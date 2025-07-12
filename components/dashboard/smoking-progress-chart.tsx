"use client";
import { useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface ProgressData {
    id: number;
    logDate: string;
    smoked: number;
    note: string;
}

interface SmokingProgressChartProps {
    data: ProgressData[];
}

export default function SmokingProgressChart({
    data,
}: SmokingProgressChartProps) {
    const chartRef = useRef<ChartJS<"line", number[], string>>(null);

    // Process and sort data by date
    const processedData = data
        .sort(
            (a, b) =>
                new Date(a.logDate).getTime() - new Date(b.logDate).getTime()
        )
        .map((item) => ({
            date: new Date(item.logDate).toLocaleDateString("vi-VN", {
                month: "numeric",
                day: "numeric",
            }),
            smoked: item.smoked,
        }));

    const chartData = {
        labels: processedData.map((item) => item.date),
        datasets: [
            {
                label: "Số điếu thuốc",
                data: processedData.map((item) => item.smoked),
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderWidth: 2,
                pointBackgroundColor: "#ef4444",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                borderColor: "#ef4444",
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    title: (context: any) => `Ngày ${context[0].label}`,
                    label: (context: any) => `${context.parsed.y} điếu thuốc`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                    stepSize: 2,
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index" as const,
        },
        elements: {
            point: {
                hoverBackgroundColor: "#ef4444",
                hoverBorderColor: "#ffffff",
            },
        },
    };

    return (
        <div className="w-full h-64">
            {data && data.length > 0 ? (
                <Line ref={chartRef} data={chartData} options={options} />
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                        <p className="text-sm">Chưa có dữ liệu tiến trình</p>
                        <p className="text-xs mt-1">
                            Hãy bắt đầu ghi lại hành trình cai thuốc của bạn
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
