import { useState } from 'react'
import { FaMicrophone, FaStop } from 'react-icons/fa'
function Voice() {
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [transcript, setTranscript] = useState<string>('')
    const [recordingCompleted, setRecordingCompleted] = useState<boolean>(false)

    // Simulate recording for demo
    const startRecording = () => {
        setIsRecording(true)
        setTranscript('')
        setRecordingCompleted(false)
    }
    const stopRecording = () => {
        setIsRecording(false)
        setTranscript('This is a sample transcript of your speech.')
        setRecordingCompleted(true)
    }
    return (
        <div className="absolute right-8 bottom-8 z-50 fixed">
        <span className="flex cursor-pointer items-center justify-center w-16 h-16 rounded-full bg-[var(--gold-color)] shadow text-[var(--primary)] text-4xl mb-2">
            <FaMicrophone />
        </span>

        

        </div>
    )
}

export default Voice