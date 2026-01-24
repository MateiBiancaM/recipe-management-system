import { ref, computed, watch } from 'vue';

export function useRecipeSorter(recipesSource) {
  const sortBy = ref('default');
  const searchQuery = ref('');
  const searchBy = ref('title'); 
  const itemsPerPage = 12; 
  const displayedCount = ref(itemsPerPage);

  const getDifficultyScore = (text) => {
    if (!text) return 2;
    const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (cleanText.includes('uso') || cleanText.includes('easy') || cleanText.includes('low')) return 1;
    if (cleanText.includes('gre') || cleanText.includes('hard') || cleanText.includes('dif')) return 3;
    return 2;
  };
  
  const getTotalTime = (r) => (Number(r.details?.time?.prep || 0) + Number(r.details?.time?.cook || 0));

  const filteredAndSortedRecipes = computed(() => {
    const list = [...(recipesSource.value || recipesSource)]; 
    let result = list;
    
    if (searchQuery.value && searchQuery.value.trim() !== '') {
      const term = searchQuery.value.toLowerCase();

      result = result.filter(recipe => {
        
        if (searchBy.value === 'title') {
            return recipe.title.toLowerCase().includes(term);
        }
      
        if (searchBy.value === 'ingredient') {
            return recipe.ingredients?.some(ing => 
                ing.name && ing.name.toLowerCase().includes(term)
            );
        }
        return false;
      });
    }

    return result.sort((a, b) => {
      const scoreA = getDifficultyScore(a.details?.difficulty);
      const scoreB = getDifficultyScore(b.details?.difficulty);
      const timeA = getTotalTime(a);
      const timeB = getTotalTime(b);
      let comparison = 0;

      switch (sortBy.value) {
        case 'default':
            const titleDiff = a.title.localeCompare(b.title);
            if (titleDiff !== 0) return titleDiff;
            if (scoreA !== scoreB) return scoreA - scoreB;
            return timeA - timeB;
        
        case 'az': comparison = a.title.localeCompare(b.title); break;
        case 'za': comparison = b.title.localeCompare(a.title); break;
        
        case 'difficulty_easy': if (scoreA !== scoreB) return scoreA - scoreB; break;
        case 'difficulty_hard': if (scoreA !== scoreB) return scoreB - scoreA; break;
        
        case 'fastest': if (timeA !== timeB) return timeA - timeB; break;
        case 'slowest': if (timeA !== timeB) return timeB - timeA; break;
        
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        
        default: comparison = 0;
      }

      if (comparison === 0) return a.title.localeCompare(b.title);
      return comparison;
    });
  });

  const paginateRecipes = computed(() => {
    return filteredAndSortedRecipes.value.slice(0, displayedCount.value);
  });
  const loadMore = () => {
      if (displayedCount.value < filteredAndSortedRecipes.value.length) {
      displayedCount.value += itemsPerPage;
    }
  };
  const hasMore = computed(() => displayedCount.value < filteredAndSortedRecipes.value.length);
  watch([sortBy, searchQuery, searchBy], () => {
    displayedCount.value = itemsPerPage;
  });

  return {
    sortBy,
    searchQuery,
    searchBy, 
    paginateRecipes,
    loadMore,
    hasMore,
  };
}