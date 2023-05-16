import {auth} from "../../firebase-config.js";
import {GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Login() {
    const navigate = useNavigate();

    //todo fix google authentication to redirect
    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider)
            .then((date) => {
                const user = date.user;
                console.log(user);
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });

        // if (auth.currentUser != null) {
        //     sessionStorage.setItem('isAuthenticated', 'true');
        //     navigate('/');
        // } else {
        //     navigate('/login');
        // }
    }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sessionStorage.setItem('userName', user.displayName);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userUid', user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

        if (auth.currentUser != null) {
            sessionStorage.setItem('isAuthenticated', 'true');
            navigate('/');
        } else {
            navigate('/login');
        }

    }


    return (
        <div className='w-full h-full bg-deep_bg_color flex items-center'>
            <div className='w-full max-h-fit flex flex-col items-center '>
                <div className='w-1/2'>
                    <h1 className='text-3xl text-white mb-6'>Log in</h1>
                </div>

                <form className='w-1/2' id='userInput' onSubmit={handleSubmit}>
                    <input type="email"
                           name="email"
                           value={email || ""}
                           onChange={(e) => setEmail(e.target.value)}
                           className="
                           my-2
                           bg-form_gray_color
                           text-base
                           rounded
                           text-white
                           w-full
                           h-16
                           placeholder:text-white
                           placeholder:text-opacity-50
                           focus:
                           block
                           p-2.5"
                           placeholder="plz write your email"
                           required
                    />
                    <input type="password"
                           name="password"
                           value={password || ""}
                           onChange={(e) => setPassword(e.target.value)}
                           className="
                           my-2
                           bg-form_gray_color
                           text-base
                           rounded
                           text-white
                           w-full
                           h-16
                           placeholder:text-white
                           placeholder:text-opacity-50
                           focus:
                           block
                           p-2.5"
                           placeholder="plz write your password"
                           required
                    />

                    <div className='w-full text-lg text-form_gray_color'>
                        <a className='hover:cursor-pointer'
                            onClick={() => navigate('/signIn')}>create account</a>
                    </div>

                    <div className='w-full'>
                        <button type='submit' className='text-white w-full'>
                            login
                        </button>
                    </div>
                </form>

                <button
                    onClick={() => {
                        handleGoogleLogin();
                        sessionStorage.setItem('isAuthenticated', 'true');
                        navigate('/');
                    }}
                    className='text-white'
                >Sign In with google
                </button>

            </div>

        </div>
    );
}