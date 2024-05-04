import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginValidation} from "../../api/apiFunctions";

const loginHandler = (email: string, password: string, action: () => void) => {
    loginValidation(email, password).then((data) => {
        console.log(data);
        if(data.status === 401){
            alert("Invalid credentials. Please try again or contact us.");
        }
        if (data.status === 200) {
            action();
        }
    });
    //action();
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <input
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="text"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="mt-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center text-center">
                    <div className="text-sm text-center">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                    </div>
                </div>
                <div>
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="submit"
                        onClick={() => loginHandler(email, password, () => navigate("/mainPage"))}
                    >
                        Sign in
                    </button>
                </div>
                <div className="text-sm text-center">
                    <p className="font-medium text-indigo-600 hover:text-indigo-500">
                        Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500">Register</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
