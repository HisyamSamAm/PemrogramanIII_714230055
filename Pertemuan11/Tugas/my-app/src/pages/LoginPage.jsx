import { useState } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { TextFieldAtom } from "../components/atoms/TextFieldAtom";
import { ButtonAtom } from "../components/atoms/ButtonAtom";
import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { UserIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = await login(form.username, form.password);
            localStorage.setItem("token", data.token);
            
            await Swal.fire({
                icon: "success",
                title: "Login Berhasil!",
                text: "Selamat datang di dashboard",
                confirmButtonColor: "#22c55e",
                timer: 2000,
                timerProgressBar: true
            });
            
            navigate("/dashboard");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: "Username atau password salah",
                confirmButtonColor: "#ef4444"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader 
                    color="blue" 
                    className="relative h-20 flex items-center justify-center"
                >
                    <div className="flex items-center space-x-2">
                        <UserIcon className="h-8 w-8 text-white" />
                        <TypographyAtom variant="h4" color="white">
                            Masuk
                        </TypographyAtom>
                    </div>
                </CardHeader>
                
                <CardBody className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <TextFieldAtom
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            size="lg"
                        />

                        {/* Password Field */}
                        <div className="relative">
                            <TextFieldAtom
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                size="lg"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <ButtonAtom
                            type="submit"
                            color="blue"
                            className="w-full py-3 text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </ButtonAtom>

                        {/* Register Link */}
                        <div className="text-center pt-4">
                            <TypographyAtom variant="small" color="gray">
                                Belum punya akun?{" "}
                                <Link 
                                    to="/register" 
                                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                                >
                                    Daftar di sini
                                </Link>
                            </TypographyAtom>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}