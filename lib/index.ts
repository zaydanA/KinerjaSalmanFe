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

  const formatYearMonthDate = (dateString: string, long?: boolean) => {
    const date = new Date(dateString);
    
    const month = date.toLocaleString('default', { month: long ? 'long' : 'short' });
    const year = String(date.getFullYear());
  
    return `${month} ${year}`;
  }

  const formatYearMonthDateURL = (period: string) => {
    const date = new Date(period);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
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

  const formatCurrency = (num: number) => {
    return num.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  }

  const generateMonthOptions = () => {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    return months.map((month, index) => ({
      label: month,
      value: index + 1
    }));
  }

  function getDateDifference(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2.getTime() - date1.getTime());

    // Convert milliseconds to days, months, and years
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(differenceMs / millisecondsInDay);
    const months = Math.floor(days / 30); // Approximate number of days in a month
    const years = Math.floor(months / 12); // Approximate number of months in a year

    // Calculate the remaining months and days
    const remainingMonths = months % 12;
    const remainingDays = days % 30; // Approximate number of days in a month

    // Construct the result string
    let result = '';
    if (years > 0) {
      result += years + ' year' + (years > 1 ? 's' : '');
    }
    if (remainingMonths > 0) {
      result += (result ? ' ' : '') + remainingMonths + ' month' + (remainingMonths > 1 ? 's' : '');
    }
    if (remainingDays > 0) {
      result += (result ? ' ' : '') + remainingDays + ' day' + (remainingDays > 1 ? 's' : '');
    }

    return result;
  }

  return {
    formatDate,
    formatDateInput,
    formatYearMonthDate,
    formatYearMonthDateURL,

    getDate,
    getTimeOfDay,
    toLabelCase,
    toHoursMinutes,
    fromHoursMinutes,
    formatCurrency,
    generateMonthOptions,

    getDateDifference
  }
}