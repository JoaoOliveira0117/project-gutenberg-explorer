import Text from "../dummies/Text";

type Props = {
  title: string;
}

const BookCardTitle: React.FC<Props> = ({ title }) => {
  return (
    <Text text={title} length={20} />
  );
}

export default BookCardTitle;