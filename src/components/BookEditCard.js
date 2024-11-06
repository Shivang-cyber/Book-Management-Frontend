import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BookCard from './BookCard';
import EditBookCard from './EditBookCard';
const BookEditCard = ({ book }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  return (
    <div className="flex justify-center items-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        
        <div onClick={handleFlip}>
          <BookCard book={book} onEdit={handleFlip} />
        </div>

        <EditBookCard book={book} setIsFlipped={setIsFlipped} handleFlip={handleFlip} />

      </ReactCardFlip>
    </div>
  );
};

export default BookEditCard;
