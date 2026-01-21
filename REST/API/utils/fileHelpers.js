const getFileNameFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
};

module.exports = { getFileNameFromUrl };