import { useState} from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { AiOutlineArrowUp } from 'react-icons/ai';
import ollama from 'ollama/browser';


// Function to split the response into chunks of words (for smoother animation)
function chunkString(str) {
  const words = str.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += 2) {
    const chunk = words.slice(i, i + 2);
    if (chunk.length === 2) {
      chunks.push(chunk.join(' ') + ' ');
    }
  }
  return chunks;
}

function App() {

  const [input, setInput]= useState('');
  const [isLoading, setIsLoading]= useState(false);
  const [messages, setMessages] = useState([]);
  const handleInputChange =(e) => {
    setInput(e.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const message = { role: 'user', content: input }
      const response = await ollama.chat({ model: 'llama3.1', messages: [message], stream: true })

      const x = [];
      for await (const part of response) {
        x.push(part.message);
        console.log("messages:"+messages.length);
        console.log(part.message)
      }
      setMessages([...x]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if last message is loading for animation
  const shouldAnimateLastMessage = isLoading && messages.length > 0 && messages[messages.length - 1].role !== 'user';
  const lastMessage = messages[messages.length - 1]; // Get the last message

  return (
    <>
   <div className="bg-zinc-900 h-[100svh] w-screen flex items-center justify-center font-sans">
        <div
          className="max-w-screen-md flex-1 flex flex-col h-[100svh] items-center p-5 sm:p-7 gap-5 sm:gap-7 overflow-hidden">
          <div className="flex-1 w-full overflow-auto">
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}>
              {
                messages.length <= 0 && (
                  <div className="w-full flex items-center justify-center font-thin text-lg text-neutral-400">
                    Ask GPT4 any question to get started
                  </div>
                )
              }
            </motion.div>
            {
              // If loading, do not show the last message statically
              (shouldAnimateLastMessage ? messages.slice(0, messages.length - 1) : messages).map(m => {
                if (m.role === "user") return (
                  <div key={m.id} className="font-bold text-xl">{m.content}</div>
                )
                return (
                  <div key={m.id} className="mb-2 text-neutral-400">{m.content}</div>
                )
              })
            }
            {isLoading && shouldAnimateLastMessage && (
              // When loading, animate chunks of the latest message
              <div>
                {chunkString(messages[messages.length - 1].content).map((chunk, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75 }}
                    className="mb-2 text-neutral-400"
                  >
                    {chunk}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.5 }} className="w-full">
            <form onSubmit={handleSubmit} className=" bg-white/5 p-1.5 text-lg rounded-full relative w-full">
              <input
                className="text-white w-full p-3 pl-5 pr-14 bg-transparent rounded-full border-[2px] border-white/5 hover:border-white/20 focus:border-blue-400 outline-0 transition-all duration-500"
                value={input}
                placeholder="Ask a question..."
                onChange={handleInputChange}
              />
              <div
                className={`absolute right-4 top-3.5 ${isLoading ? "bg-neutral-400" : "bg-blue-500 hover:bg-blue-400"} p-2 rounded-full transition-colors duration-500 cursor-pointer`}
                onClick={(e) => handleSubmit(e)}
              >
                <AiOutlineArrowUp size={25} />
              </div>
            </form>
            <div className="w-full flex items-center justify-center">
              <a className="text-neutral-400 text-xs mt-2 hover:scale-110 transition-all duration-500 cursor-pointer"
                 onClick={() => {
                   window.open("https://reworkd.ai/", "_blank");
                 }}>
                Made with ❤️ by Reworkd
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;