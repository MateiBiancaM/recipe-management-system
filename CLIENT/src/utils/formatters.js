
export const formatTotalTime = (prep = 0, cook = 0) => {
  const totalMinutes = (prep || 0) + (cook || 0);
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const oreText = hours === 1 ? 'oră' : 'ore';
  if (minutes === 0) {
    return `${hours} ${oreText}`;
  }
  return `${hours} ${oreText} ${minutes} min`;
};

export const getDifficultyColor = (difficulty) => {
  if (difficulty === 'Ușor') return 'green';
  if (difficulty === 'Mediu') return 'orange';
  if (difficulty === 'Greu') return 'red';
  return 'grey'; 
};