'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { searchIsWish } from '../../utils/searchIsWish';
import { createWishlist } from '../../utils/createWishList';
import { deleteWishlist } from '../../utils/deleteWishlist';

interface WishlistProps {
  detectiveId: number;
  size: number;
}

const WishlistComponent: React.FC<WishlistProps> = ({ detectiveId, size }) => {
  const [isWish, setIsWish] = useState<number | null>(null);

  useEffect(() => {
    const handleSearchIsWish = async () => {
      const result = await searchIsWish(detectiveId);
      if (!result) return;

      setIsWish(result.id);
    };
    handleSearchIsWish();
  }, [detectiveId]);

  const handleCreateWish = async () => {
    const result = await createWishlist(detectiveId);
    if (!result) return;
    console.log();
    setIsWish(result.id);
  };

  return (
    <Heart
      size={size}
      color="gray"
      fill={isWish ? 'red' : 'grey'}
      onClick={() => {
        if (isWish) {
          deleteWishlist(isWish);
          setIsWish(null);
        } else {
          handleCreateWish();
        }
      }}
    />
  );
};

export default WishlistComponent;
