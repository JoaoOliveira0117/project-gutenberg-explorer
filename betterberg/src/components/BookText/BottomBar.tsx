"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineBulb, AiOutlineFileText, AiOutlineGlobal, AiOutlineSmile, AiOutlineUser } from "react-icons/ai";
import { useBook } from "@/hooks/useBook";
import TypingEffect from "./TypingTextEffect";

export default function BottomBar() {
  const { book } = useBook()
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const AiButtons = [
    {
      "label": "Summarize Text",
      "icon": <AiOutlineFileText size={28}/>,
      "apiEndpoint": "summarize"
    },
    {
      "label": "Get Key Characters",
      "icon": <AiOutlineUser size={28}/>,
      "apiEndpoint": "key-characters"
    },
    {
      "label": "Semantic Analysis",
      "icon": <AiOutlineBulb size={28}/>,
      "apiEndpoint": "semantic-analysis"
    },
    {
      "label": "Detect Language",
      "icon": <AiOutlineGlobal size={28}/>,
      "apiEndpoint": "language-detection"
    },
    {
      "label": "Sentiment Analysis",
      "icon": <AiOutlineSmile size={28}/>,
      "apiEndpoint": "sentiment-analysis"
    }
  ]

  async function handleClick(index: number) {
    setOpenModal(index);
    setLoading(true);
    setError(false);
    setResponse("");

    try {
      const res = await fetch(`/api/books/${book?.book_id}/${AiButtons[index].apiEndpoint}`);
      const data = await res.json();
      setResponse(data.result.content);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg flex justify-around px-4 py-2 shadow-lg w-full max-w-4xl">
        {AiButtons.map(({label, icon}, index) => (
          <Button key={index} onClick={() => handleClick(index)} className="w-1/5 text-black font-bold flex flex-col h-fit hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
            {icon}{label}
          </Button>
        ))}
      </div>

      {AiButtons.map(({label, icon}, index) => (
        <Dialog key={index} open={openModal === index} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{label} Response</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {loading ? (
                <p className="text-gray-500">Thinking...</p>
              ) : error ? (
                <p className="text-red-500">Error fetching response.</p>
              ) : (
                <TypingEffect text={response}/>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
