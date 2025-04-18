import { Star } from 'lucide-react';
import { useState } from 'react';

interface ReviewScoreProps {
  name: string;
  range: number;
  onChange?: (name: string, value: number) => void;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({ name, range, onChange }) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index + 1);
    if (onChange) onChange(name, index + 1);
  };

  return (
    <div>
      {Array.from({ length: range }).map((_, index) => (
        <Star
          key={index}
          color="gray"
          fill={index < selected ? 'gold' : 'none'}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default ReviewScore;
