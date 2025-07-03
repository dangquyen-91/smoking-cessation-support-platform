"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Search,
    MoreHorizontal,
    UserPlus,
    Users,
    Eye,
    Edit,
    Lock,
    Unlock,
    MessageSquare,
    User,
    GraduationCap,
} from "lucide-react";
import {
    useGetUserByRole,
    useRegisterUser,
    useUpdateStatusUser,
} from "@/queries/user.query";
import { useToast } from "../ui/use-toast";

interface UserRole {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    gender: string;
    age: number;
    profileImage: string | null;
    status: string;
    roles: UserRole[];
    membershipPackage: any;
    membershipExpiry: any;
    createdAt: string;
    updatedAt: string;
}

interface RegisterUserPayload {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    age: number;
}

export function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState("all");
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState<RegisterUserPayload>({
        username: "",
        email: "",
        password: "",
        fullName: "",
        phone: "",
        gender: "MALE",
        age: 18,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { data: userData } = useGetUserByRole(role);
    const { mutateAsync: registerUser } = useRegisterUser();
    const { toast } = useToast();

    const filteredUsers = useMemo(() => {
        if (!userData) return [];

        return userData.filter((user: User) => {
            const matchesSearch =
                user.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm);
            return matchesSearch;
        });
    }, [userData, searchTerm]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!newUser.username.trim()) {
            newErrors.username = "Tên đăng nhập là bắt buộc";
        } else if (newUser.username.length < 3) {
            newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
        }

        if (!newUser.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!newUser.password.trim()) {
            newErrors.password = "Mật khẩu là bắt buộc";
        } else if (newUser.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!newUser.fullName.trim()) {
            newErrors.fullName = "Họ và tên là bắt buộc";
        }

        if (!newUser.phone.trim()) {
            newErrors.phone = "Số điện thoại là bắt buộc";
        } else if (!/^[0-9]{10,11}$/.test(newUser.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (newUser.age < 16 || newUser.age > 100) {
            newErrors.age = "Tuổi phải từ 16 đến 100";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterUser = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const [err] = await registerUser(newUser);

            toast({
                title: "Thành công",
                description: "Đăng ký người dùng thành công",
            });

            // Reset form
            setNewUser({
                username: "",
                email: "",
                password: "",
                fullName: "",
                phone: "",
                gender: "MALE",
                age: 18,
            });
            setErrors({});
            setIsRegisterDialogOpen(false);
        } catch (error) {
            console.error("Error registering user:", error);
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi đăng ký người dùng",
                variant: "destructive",
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case "ACTIVE":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Hoạt động
                    </Badge>
                );
            case "INACTIVE":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                        Không hoạt động
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Chờ xử lý
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getRoleBadge = (roles: UserRole[]) => {
        if (!roles || roles.length === 0) return null;

        const role = roles[0]; // Assuming user has one primary role
        switch (role.name) {
            case "COACH":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Huấn luyện viên
                    </Badge>
                );
            case "MEMBER":
                return (
                    <Badge className="bg-purple-100 text-purple-800">
                        <User className="h-3 w-3 mr-1" />
                        Thành viên
                    </Badge>
                );
            case "ADMIN":
                return (
                    <Badge className="bg-orange-100 text-orange-800">
                        <Users className="h-3 w-3 mr-1" />
                        Quản trị viên
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline">
                        {role.description || role.name}
                    </Badge>
                );
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const { mutateAsync: updateStatusUser } = useUpdateStatusUser();

    const handleLockUser = async (userId: number) => {
        try {
            const payload = {
                id: userId,
                status: "INACTIVE", // Assuming locking means setting status to INACTIVE
            };
            await updateStatusUser(payload);
            console.log("Locking user:", userId);
        } catch (error) {
            console.error("Error locking user:", error);
        }
    };

    const handleUnlockUser = async (userId: number) => {
        try {
            const payload = {
                id: userId,
                status: "ACTIVE", // Assuming unlocking means setting status to ACTIVE
            };
            await updateStatusUser(payload);
            console.log("Unlocking user:", userId);
        } catch (error) {
            console.error("Error unlocking user:", error);
        }
    };

    const coachCount =
        userData?.filter((user: User) =>
            user.roles.some((role) => role.name === "COACH")
        ).length || 0;

    const memberCount =
        userData?.filter((user: User) =>
            user.roles.some((role) => role.name === "MEMBER")
        ).length || 0;

    const activeUsersCount =
        userData?.filter((user: User) => user.status === "ACTIVE").length || 0;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý người dùng
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý thông tin và quyền của người dùng trong hệ thống
                    </p>
                </div>

                <Dialog
                    open={isRegisterDialogOpen}
                    onOpenChange={setIsRegisterDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Đăng ký người dùng
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Đăng ký người dùng mới</DialogTitle>
                            <DialogDescription>
                                Điền thông tin để đăng ký người dùng mới vào hệ
                                thống
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">
                                        Tên đăng nhập *
                                    </Label>
                                    <Input
                                        id="username"
                                        value={newUser.username}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                username: e.target.value,
                                            })
                                        }
                                        placeholder="Nhập tên đăng nhập"
                                        className={
                                            errors.username
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.username && (
                                        <span className="text-sm text-red-500">
                                            {errors.username}
                                        </span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Nhập email"
                                        className={
                                            errors.email ? "border-red-500" : ""
                                        }
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-500">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Mật khẩu *</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập mật khẩu"
                                    className={
                                        errors.password ? "border-red-500" : ""
                                    }
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Họ và tên *</Label>
                                <Input
                                    id="fullName"
                                    value={newUser.fullName}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            fullName: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập họ và tên"
                                    className={
                                        errors.fullName ? "border-red-500" : ""
                                    }
                                />
                                {errors.fullName && (
                                    <span className="text-sm text-red-500">
                                        {errors.fullName}
                                    </span>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Số điện thoại *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={newUser.phone}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            phone: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập số điện thoại"
                                    className={
                                        errors.phone ? "border-red-500" : ""
                                    }
                                />
                                {errors.phone && (
                                    <span className="text-sm text-red-500">
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Giới tính *</Label>
                                    <Select
                                        value={newUser.gender}
                                        onValueChange={(
                                            value: "MALE" | "FEMALE" | "OTHER"
                                        ) =>
                                            setNewUser({
                                                ...newUser,
                                                gender: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn giới tính" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">
                                                Nam
                                            </SelectItem>
                                            <SelectItem value="FEMALE">
                                                Nữ
                                            </SelectItem>
                                            <SelectItem value="OTHER">
                                                Khác
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="age">Tuổi *</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        min="16"
                                        max="100"
                                        value={newUser.age}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                age:
                                                    parseInt(e.target.value) ||
                                                    18,
                                            })
                                        }
                                        className={
                                            errors.age ? "border-red-500" : ""
                                        }
                                    />
                                    {errors.age && (
                                        <span className="text-sm text-red-500">
                                            {errors.age}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsRegisterDialogOpen(false);
                                    setErrors({});
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleRegisterUser}
                                disabled={
                                    !newUser.username ||
                                    !newUser.email ||
                                    !newUser.password ||
                                    !newUser.fullName ||
                                    !newUser.phone
                                }
                            >
                                Đăng ký người dùng
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {userData?.length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng người dùng
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {coachCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Huấn luyện viên
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {memberCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Thành viên
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Eye className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {activeUsersCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Đang hoạt động
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên, email, username, số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between w-full items-center gap-2">
                                <span>Danh sách người dùng</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    className={`${
                                        role === "all"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setRole("all")}
                                >
                                    Tất cả
                                </Badge>
                                <Badge
                                    className={`${
                                        role === "COACH"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setRole("COACH")}
                                >
                                    Huấn luyện viên
                                </Badge>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Thông tin
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Liên hệ
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Vai trò
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Thông tin cá nhân
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Ngày tạo
                                    </TableHead>
                                    <TableHead className="font-semibold text-right">
                                        Hành động
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user: User) => (
                                        <TableRow
                                            key={user.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <div
                                                        className="font-medium"
                                                        title={user.fullName}
                                                    >
                                                        {user.fullName}
                                                    </div>
                                                    <div
                                                        className="text-sm text-gray-500"
                                                        title={user.username}
                                                    >
                                                        @{user.username}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <div
                                                        className="text-sm"
                                                        title={user.email}
                                                    >
                                                        {user.email}
                                                    </div>
                                                    <div
                                                        className="text-sm text-gray-500"
                                                        title={user.phone}
                                                    >
                                                        {user.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getRoleBadge(user.roles)}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(user.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>
                                                        Giới tính:{" "}
                                                        {user.gender === "MALE"
                                                            ? "Nam"
                                                            : user.gender ===
                                                              "FEMALE"
                                                            ? "Nữ"
                                                            : "Khác"}
                                                    </div>
                                                    <div>Tuổi: {user.age}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {formatDate(user.createdAt)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48"
                                                    >
                                                        {/* <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Xem chi tiết
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Chỉnh sửa
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <MessageSquare className="mr-2 h-4 w-4" />
                                                            Gửi thông báo
                                                        </DropdownMenuItem> */}

                                                        {user.status ===
                                                        "ACTIVE" ? (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <Lock className="mr-2 h-4 w-4" />
                                                                        Khóa tài
                                                                        khoản
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Xác
                                                                            nhận
                                                                            khóa
                                                                            tài
                                                                            khoản
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn
                                                                            muốn
                                                                            khóa
                                                                            tài
                                                                            khoản
                                                                            của
                                                                            "
                                                                            {
                                                                                user.fullName
                                                                            }
                                                                            "?
                                                                            Người
                                                                            dùng
                                                                            sẽ
                                                                            không
                                                                            thể
                                                                            đăng
                                                                            nhập
                                                                            vào
                                                                            hệ
                                                                            thống.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Hủy
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                handleLockUser(
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Khóa
                                                                            tài
                                                                            khoản
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        ) : (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        className="text-green-600 focus:text-green-600"
                                                                    >
                                                                        <Unlock className="mr-2 h-4 w-4" />
                                                                        Mở khóa
                                                                        tài
                                                                        khoản
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Xác
                                                                            nhận
                                                                            mở
                                                                            khóa
                                                                            tài
                                                                            khoản
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn
                                                                            muốn
                                                                            mở
                                                                            khóa
                                                                            tài
                                                                            khoản
                                                                            của
                                                                            "
                                                                            {
                                                                                user.fullName
                                                                            }
                                                                            "?
                                                                            Người
                                                                            dùng
                                                                            sẽ
                                                                            có
                                                                            thể
                                                                            đăng
                                                                            nhập
                                                                            vào
                                                                            hệ
                                                                            thống.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Hủy
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                handleUnlockUser(
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="bg-green-600 hover:bg-green-700"
                                                                        >
                                                                            Mở
                                                                            khóa
                                                                            tài
                                                                            khoản
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm
                                                        ? "Không tìm thấy người dùng nào"
                                                        : "Chưa có người dùng nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
