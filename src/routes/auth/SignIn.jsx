import {useNavigate} from "react-router";
import {useState} from "react";
import {auth, FirestoreDB} from "../../../firebase-config.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc, addDoc, collection} from "firebase/firestore";


export default function SignIn() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("incorrect password");
            return 0;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const userData =
                    {
                        userData: {
                            userName: userName,
                            userEmail: email,
                            password: password,
                        }
                    };

                await setDoc(doc(FirestoreDB, 'user', user.uid), userData);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        navigate('/');
    }


    return (
        <div className='w-full h-full bg-deep_bg_color flex items-center'>
            <div className='w-full max-h-fit flex flex-col items-center '>
                <div className='w-1/2'>
                    <h1 className='text-3xl text-white mb-6'>Sign in</h1>
                </div>

                <form className='w-1/2' id='userInput' onSubmit={handleSubmit}>
                    <input type="text"
                           name="userName"
                           value={userName || ""}
                           onChange={(e) => setUserName(e.target.value)}
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
                           placeholder="user name"
                           required
                    />
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
                           placeholder="password"
                           required
                    />
                    <input type="password"
                           name="passwordCheck"
                           value={repeatPassword || ""}
                           onChange={(e) => setRepeatPassword(e.target.value)}
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
                           placeholder="repeat password"
                           required
                    />

                    <div className='w-full text-lg text-form_gray_color'>
                        <a className='hover:cursor-pointer'
                           onClick={() => navigate('/')}>do you already have account?</a>
                    </div>

                    <div className='w-full'>
                        <button type='submit' className='text-white w-full'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}