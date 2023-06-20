import React, { useState, useEffect } from 'react';

function Time({time}: any) {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const date = new Date(time);
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
    };
    const formattedTime = formatDate(date);

    setFormattedTime(formattedTime);
  }, [time]);

  

  return <div>{formattedTime}</div>;
}

export default Time;