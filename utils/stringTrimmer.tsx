const stringTrimmer = (string: string, limit: number) => {
    if (string.length <= limit) return string;
    const trimmed = string.substring(0, limit);
    const lastSpace = trimmed.lastIndexOf(' ');
    return (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + '..';
};

export default stringTrimmer;