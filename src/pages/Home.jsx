import React from 'react'
import {useEffect,useState} from 'react'
import {doc,getDoc} from 'firebase/firestore'
import {auth,db} from '../components/firebase'

function Home() {
    const [userDetails, setUserDetails] = useState(null)

    const fetchUserDetails = async()=>{
        auth.onAuthStateChanged(async(user)=>{
            console.log(user)
            const docRef = doc(db,"users",user.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
                // window.location.href="/"
            }else{
                // window.location.href="/signin"
                console.log("user is not logged in")
            }
        })
    }

    const handleLogout = async () =>{
        try {
            await auth.signOut()
            setUserDetails(null)
            console.log("user Logout successful!")
            window.location.href='/'
        } catch (error) {
            console.log("error in logging out:", error)
        }
    }

    useEffect(()=>{
        fetchUserDetails();
    },[])


return (
    <div>
        {userDetails ?
        (<div className='m-4 font-[karla]'>
            <div className='flex items-center mb-4'>
            <img src={userDetails.photoURL} className='rounded-full w-[50px] h-[50px]'/>
            <div className='p-2 font-[kumbh sans]'>
                <p className='text-[#ABABAB] text-[10px]'>Welcome back</p>
            <h1 className='font-sans font-[400] text-[15px]'>{userDetails.name}</h1>
            </div>
            <button className='flex justify-self-end' onClick={handleLogout}>Logout</button>
        </div>
        <h1 className='text-[24px] font-[800]'>Feeds</h1>
        </div>): (<h1 className='flex justify-center items-center h-[100vh]'>...Loading</h1>)}
    </div>
)
}

export default Home