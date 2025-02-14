import { ArrowLeft } from "@mui/icons-material";
import { Book } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Tags from "./Tags";
import Text from "../dummies/Text";

type Props = {
  book: Book;
}

const BookTextHeader: React.FC<Props> = ({ book }) => {
  const router = useRouter()

  if (!book || !book.authors) {
    return null;
  }
  
  const handleBack = () => {
    router.push('/books')
  }

  const formattedAuthors = book.authors.map((author, index) => {
    return author
      .replace(/\s*\d{3,4}-\d{3,4}/g, "")
      .replace(/\s*\[Editor\]/g, "")
      .replace(/\?/g, "")
      .replace(/,\s*$/, "")
      .trim(); 
  })

  return (
    <section className="max-w-6xl my-6 mx-auto ">
      <Button variant={'ghost'} onClick={() => handleBack()}>
        <ArrowLeft />
        Back to books
      </Button>
      <div className=" max-w-2xl flex flex-col gap-2 items-center m-auto">
        <Text as="h1" text={book.title} className="text-4xl text-center"/>
        <Text as="h3" text={formattedAuthors.join(" & ")} />
        <div className="flex flex-wrap justify-center gap-1">
          <Tags subjects={book.subjects} tags={book.tags}/>
        </div>
      </div>
    </section>
  );
}

export default BookTextHeader;