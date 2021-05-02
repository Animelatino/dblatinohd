
export const slugAnime = (slug) => {
    return `${process.env.URL}anime/${slug}`;
}

export const slugEpisode = (slug, number) => {
    return `${process.env.URL}ver/${slug}/${number}`;
}

export const getImage = (width, path) => {
    return `${process.env.IMGPATH}${width}${path}`;
}