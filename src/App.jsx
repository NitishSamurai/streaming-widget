import { useState } from 'react'
import { motion } from "framer-motion";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  var messages ="";
  return (
    <>
    <h1 className="text-blue-700 font-bold  text-normal">
      Welcome to Tailwind CSS Installation Tutorial.
    </h1>
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
    <div className="flex justify-center pt-20">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg">
        <a href="https://tailwindcss.com/">
          <img
            className="rounded-t-lg w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOJKdBGCpTCfxJGAaZHhwqN5k0jD1jvHOzWE6kq84ksnVgQbpqF2G3IO7NLZrJL9lp2I&usqp=CAU"
            alt="tailwind image"
          />
        </a>
        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700">
            Rapidly build modern websites without ever leaving your HTML.
          </p>
          <a
            href="https://tailwindcss.com/"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                // strokewidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </>
        )
}

export default App
