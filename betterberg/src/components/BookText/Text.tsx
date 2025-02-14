import { useEffect, useState } from "react";
import Text from "../dummies/Text";
import { CgSpinner } from "react-icons/cg";

type Props = {
  id: string;
  setTextLoaded: (v: boolean) => void;
}

const BookText: React.FC<Props> = ({ id, setTextLoaded }) => {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/books/${id}/text`)
      .then((res) => res.text())
      .then((text) => {
        setText(text.replace(/\\r/g, '\r').replace(/\\n/g, '\n'))
      })
      .catch((err) => {
        setError(true)
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
        setTextLoaded(true)
      })
  }, [id])

  if (isLoading) return (
    <div className="max-w-6xl mx-auto my-12">
      <CgSpinner size={64} className="animate-spin min-h-8 min-w-8 text-blue-600 m-auto" />
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl text-center text-red-600">An error occurred while fetching texts</h1>
    </div>
  )

  if (!text) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-lg text-center text-gray-400">Unable to display book text</h1>
    </div>
  )

  return (
    <Text as="pre" text={text} className="font-sans text-md py-16 p-8 text-justify w-fit whitespace-pre-wrap"/>
  );
}

export default BookText;