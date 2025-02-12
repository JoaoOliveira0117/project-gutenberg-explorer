import Text from "../dummies/Text";

type Props = {
  subjects: string[],
  tags: string[]
}

const Tags: React.FC<Props> = ({ tags, subjects }) => {
  const totalTags = [...subjects,...tags];
  const totalTagsCount = totalTags.length;
  const hasRemainingTags = totalTagsCount > 4;
  return (
    <>
      {subjects.slice(0,2).map((subject) => (
        <Text
          as="span"
          key={subject}
          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
          text={subject}
          length={20}
        />
      ))}
      {tags.slice(0,2).map((tag) => (
        <Text
          as="span"
          key={tag}
          className="bg-red-100 red-blue-700 text-xs px-2 py-1 rounded-md"
          text={tag}
          length={20}
        />
      ))}
      {hasRemainingTags &&<Text
        as="span"
        key="more-tags"
        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
        text={`+${totalTagsCount - 4}`}
        />}
    </>
  );
}

export default Tags;