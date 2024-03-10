export const lib = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day} / ${month} / ${year}`;
  }

  const getDate = () => {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' } as const;
    const date = today.toLocaleDateString('en-US', options);
    const [weekday, month, day] = date.split(' ');
    return `${weekday} ${day} ${month}`;
  }

  const getTimeOfDay = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return 'morning';
    } else if (currentTime >= 12 && currentTime < 17) {
      return 'afternoon';
    } else if (currentTime >= 17 && currentTime < 21) {
      return 'evening';
    } else {
      return 'night';
    }
  }

  return {
    formatDate,
    getDate,
    getTimeOfDay
  }
}