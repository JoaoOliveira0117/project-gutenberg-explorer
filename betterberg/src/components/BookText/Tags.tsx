import Text from "../dummies/Text";

type Props = {
  subjects: string[],
  tags: string[]
}

const Tags: React.FC<Props> = ({ tags, subjects }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Text
          as="span"
          key={subject}
          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
          text={subject}
        />
      ))}
      {tags.map((tag) => (
        <Text
          as="span"
          key={tag}
          className="bg-red-100 red-blue-700 text-xs px-2 py-1 rounded-md"
          text={tag}
        />
      ))}
    </>
  );
}

export default Tags;