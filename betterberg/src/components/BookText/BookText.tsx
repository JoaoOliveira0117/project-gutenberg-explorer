import { useEffect, useState } from "react";
import Text from "../dummies/Text";

type Props = {
  id: string;
}

const BookText: React.FC<Props> = ({ id }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(`/api/books/${id}/text`)
      .then((res) => res.text())
      .then((text) => {
        setText(text.replace(/\\r/g, '\r').replace(/\\n/g, '\n'))
      })
  }, [id])

  return (
    <Text as="pre" text={text} className="font-sans text-md py-16 p-8 text-justify w-fit whitespace-pre-wrap"/>
  );
}

export default BookText;