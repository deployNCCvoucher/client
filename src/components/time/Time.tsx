import React, { useState, useEffect } from 'react';

function Time({time}: any) {
  const [isoTime, setIsoTime] = useState(time);
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const date = new Date(isoTime);
    const formattedTime = formatDate(date);
    setFormattedTime(formattedTime);
  }, [isoTime]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return <div>{formattedTime}</div>;
}

export default Time;