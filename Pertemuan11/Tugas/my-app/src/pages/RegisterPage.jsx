import { useState } from "react";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { TextFieldAtom } from "../components/atoms/TextFieldAtom";
import { ButtonAtom } from "../components/atoms/ButtonAtom";
import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { UserPlusIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function RegisterPage() {
    const [form, setForm] = useState({ 
        username: "", 
        password: "", 
        confirmPassword: "",
        role: "user" 
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        
        // Clear error saat user mengetik
        if (errors[name]) {
            setErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!form.username) {
            newErrors.username = "Username wajib diisi";
        } else if (form.username.length < 3) {
            newErrors.username = "Username minimal 3 karakter";
        }
        
        if (!form.password) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password.length < 6) {
            newErrors.password = "Password minimal 6 karakter";
        }
        
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Konfirmasi password wajib diisi";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Password tidak cocok";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setLoading(true);
        
        try {
            await register(form.username, form.password, form.role);
            
            await Swal.fire({
                icon: "success",
                title: "Registrasi Berhasil!",
                text: "Akun telah dibuat. Silakan login dengan akun baru Anda.",
                confirmButtonColor: "#22c55e",
                timer: 3000,
                timerProgressBar: true
            });
            
            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: errorMessage,
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
                        <UserPlusIcon className="h-8 w-8 text-white" />
                        <TypographyAtom variant="h4" color="white">
                            Daftar Akun
                        </TypographyAtom>
                    </div>
                </CardHeader>
                
                <CardBody className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <TextFieldAtom
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username || " "}
                                size="lg"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <TextFieldAtom
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password || " "}
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

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <TextFieldAtom
                                label="Konfirmasi Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword || " "}
                                size="lg"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
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
                            {loading ? "Mendaftar..." : "Daftar"}
                        </ButtonAtom>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <TypographyAtom variant="small" color="gray">
                                Sudah punya akun?{" "}
                                <Link 
                                    to="/" 
                                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                                >
                                    Masuk di sini
                                </Link>
                            </TypographyAtom>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}