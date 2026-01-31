import { useState } from 'react'
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { FaMicrophone, FaPlay } from 'react-icons/fa'
import {Pause} from 'lucide-react'
import Button from '@/components/Button'
function Voice() {
      const { data: currentUser } = useGetCurrentUserQuery(undefined);
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)


    return (
        <div className="absolute md:right-8 right-3 md:bottom-8 bottom-3 z-50 fixed ">
        <span
        onClick={()=>setIsRecording(true)}
        className={`${isRecording ? 'hidden' : ''} flex cursor-pointer items-center justify-center w-16 h-16 rounded-full bg-[var(--gold-color)] shadow text-[var(--primary)] text-4xl mb-2`}>
            <FaMicrophone />
        </span>
        {isRecording && (

        <div className="w-80 p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-6">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-50">
            <FaMicrophone size={48} className="text-red-500" />
        </div>

        <p className="text-sm text-gray-500 tracking-wide">
        Hi{" "}
        <span className="font-semibold text-gray-800">
            {currentUser ? currentUser.email.split("@")[0] : "Guest"}
        </span>
        , talk to us
        </p>


        <h2 className="text-3xl font-semibold text-gray-800 tracking-widest">
            00:05:20
        </h2>

        <div className="flex items-center gap-4 mt-2">
                {isPlaying ? (
                    <button
                        className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
                        onClick={() => setIsPlaying(false)}
                    >
                        <Pause className="text-white" size={26} />
                    </button>
                ) : (
                    <button
                        className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
                        onClick={() => setIsPlaying(true)}
                    >
                        <FaPlay className="text-white" size={26} />
                    </button>
                )}
        </div>
        <Button
            variant="danger"
            className={`w-full py-3 text-sm font-medium rounded-lg`}
            onClick={()=>setIsRecording(false)}
            disabled={!isPlaying}
        >
            Stop Recording
        </Button>
        </div>
        )}



        </div>
    )
}

export default Voice