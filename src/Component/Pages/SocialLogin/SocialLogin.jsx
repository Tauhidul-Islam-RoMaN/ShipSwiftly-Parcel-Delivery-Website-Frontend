import useAuth from "../../Hook/useAuth";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const { googleLogin } = useAuth()

    const handleGoogleLogin = () => {
        googleLogin()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                name: res.user?.displayName || '',
                email: res.user?.email || '',
                photo: res.user?.photoURL || '',
                role: "user"
            }
            console.log(userInfo);
        })

    }
    return (
        <div>
            <div className="flex items-center justify-center mt-5 mb-10">
                <button onClick={handleGoogleLogin} className="btn w-4/5">
                    <FaGoogle className="mr-4"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;