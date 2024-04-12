export const lib = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

  const formatDateInput = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${year}-${month}-${day}`;
  }

  const getDate = (today: Date, withYear = false) => {
    let options;

    if (withYear) {
      options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' } as const;
    } else {
      options = { weekday: 'long', day: 'numeric', month: 'long' } as const;
    }
    const date = today.toLocaleDateString('en-US', options);

    if (withYear) {
      const [weekday, month, day, year] = date.split(' ');
      return `${weekday} ${day.replace(',', '')} ${month} ${year}`;
    } else {
      const [weekday, month, day] = date.split(' ');
      return `${weekday} ${day} ${month}`;
    }
  }

  const getTimeOfDay = (today: Date) => {
    const currentTime = today.getHours();

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

  const toLabelCase = (str: string, capital: boolean): string => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + (capital ? word.slice(1).toUpperCase() : word.slice(1).toLowerCase()))
      .join(' ');
  }

  const toHoursMinutes = (date: Date | string | null): string | null => {    
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!date) {
      return null;
    }

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  const fromHoursMinutes = (timeString: string): string | null => {
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return null; // Invalid time format
    }

    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);

    return String(date);
  }

  return {
    formatDate,
    formatDateInput,
    getDate,
    getTimeOfDay,
    toLabelCase,
    toHoursMinutes,
    fromHoursMinutes
  }
}