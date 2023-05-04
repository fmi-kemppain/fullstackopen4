const totalLikes = (list) => {
    let totalLikes = 0;

    list.forEach((blog) => {
        totalLikes += blog.likes
    })

    return totalLikes
}

const favoriteBlog = (list) => {
    let topIndex = 0
    let mostLikes = 0

    list.forEach((blog, index) => {
        if (blog.likes > mostLikes) {
            topIndex = index
            mostLikes = blog.likes
        }
    })

    return list[topIndex]
}

const mostBlogs = (list) => {

    authorCounts = {}

    list.forEach((blog) => {
        if (authorCounts[blog.author] === undefined) {
            authorCounts[blog.author] = 0;
        }
        authorCounts[blog.author] += 1
    })

    topAuthorIndex = list[0].author;

    for (const [author, count] of Object.entries(authorCounts)) {
        if(count > authorCounts[topAuthorIndex]) {
            topAuthorIndex = author
        }
    }

    return {
        'author' : topAuthorIndex,
        'blogs' : authorCounts[topAuthorIndex]
    };
}

module.exports = { totalLikes, favoriteBlog, mostBlogs }