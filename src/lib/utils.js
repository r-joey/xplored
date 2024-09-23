import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const generateUsername = (name) => {
    const id = Math.floor(Math.random() * 10000)
    return `${name.slice(0, 5)}${id}`
}


export const formatDate = (date) => {
    const givenDate = new Date(date);
    const today = new Date();
    
    // Calculate the time difference in milliseconds
    const timeDiff = today - givenDate;
    
    // Calculate the difference in days
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    // Handle cases
    if (dayDiff === 0) {
      return "today";
    } else if (dayDiff > 0 && dayDiff <= 30) {
      return `${dayDiff} days ago`;
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return givenDate.toLocaleDateString('en-US', options);
    }
  }
 
export const isValidISODate = (date) => {
    // console.log('checking if valid date')
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD
    if (!isoDateRegex.test(date)) return false;
    
    // Check if the date is valid
    const parsedDate = new Date(date);
    const isValidDate = !isNaN(parsedDate.getTime());
    
    // Ensure it matches the original string (e.g. no partial dates)
    return isValidDate && parsedDate.toISOString().slice(0, 10) === date;
}

export const getAddress = async (lat, lon) => {
    try { 
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json(); 
      return data;
    } catch (err) {
      console.log(err)
    }
  }

  export const getImageURL = (collectionId, recordId, fileName, size = '0x400') => {
    return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}