import Conversation from "./Conversation.jsx";
import useGetConversations from "../Hooks/useGetConversations.jsx";
import { getRandomEmoji } from "../../utils/emoji.js";

const Conversations=()=>{
    const {loading,conversations} = useGetConversations();
    console.log("CONVERSATIONS :",conversations)
    useGetConversations();
    return(
        <>
        <div className="py-2 flex flex-col overflow-auto">

            {conversations.map((conversation,idx)=>(
                <Conversation 
                key={conversation._id}
                conversation={conversation}
                emoji={getRandomEmoji()}
                lastIdx={idx === conversations.length - 1}/>
            ))}
        {loading ? <span className='loading loading-spinner '></span> : null}

        </div>
        </>
    )
}
export default Conversations;