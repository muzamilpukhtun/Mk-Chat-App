import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading,setLoading]=useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        const getMessage=async()=>{
            setLoading(true)
            try {
                const res=await fetch(`/api/v1/message/${selectedConversation._id}`)
                const data=await res.json()
                console.log(data);
                if(!data){throw new Error(data.error)}
                setMessages(data)
            } catch (error) {
                toast.error(error.message);
            }finally{setLoading(false)}
        }
            if(selectedConversation?._id) getMessage()
            }, [selectedConversation?._id, setMessages]);
       return{messages,loading}
    }
export default useGetMessages