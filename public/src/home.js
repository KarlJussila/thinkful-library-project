function getAuthorById(authors, id) {
    //Find the author matching the id in the authors list
    return authors.find((author) => author.id === id);
}

function getTotalBooksCount(books) {
    //Count the books in the list
    return books.reduce((acc, book) => acc + 1, 0);
}

function getTotalAccountsCount(accounts) {
    //Count the accounts in the list
    return accounts.reduce((acc, account) => acc + 1, 0);
}

function getBooksBorrowedCount(books) {
    //Loop through the books
    return books.reduce((acc, book) => {
        //Only add one to the count if the returned value is false
        return book.borrows[0].returned ? acc : acc + 1;
    }, 0);
}

function getMostCommonGenres(books) {
    //Establish the list of genre counts and loop through the books
    const genreCounts = books.reduce((genreCounts, book) => {
        //Try to find the object for the genre in the list
        const genre = genreCounts.find((genre, index) => {
            return genre.name === book.genre;
        });
        //If it's there, add to its count
        if (genre) {
            genre.count += 1;
        //Otherwise, create it with count 1
        } else {
            genreCounts.push({ name: book.genre, count: 1 });
        }
        return genreCounts;
    }, []);
    //Sort the list by count
    genreCounts.sort((genreA, genreB) => {
        return genreA.count < genreB.count ? 1 : -1;
    });

    //Trim the list if necessary
    return genreCounts.slice(0, 5);

}

function getMostPopularBooks(books) {
    //Establish the list of borrow counts and loop through the books
    const borrowCounts = books.reduce((borrowCounts, book) => {
        //Add the book with a count of the length of the borrow list
        borrowCounts.push({ name: book.title, count: book.borrows.length });
        return borrowCounts;
    }, []);

    //Sort the list by count
    borrowCounts.sort((bookA, bookB) => {
        return bookA.count < bookB.count ? 1 : -1;
    });

    //Trim the list if necessary
    return borrowCounts.slice(0, 5);

}

function getMostPopularAuthors(books, authors) {
    //Establish the list of author counts and loop through the books
    const authorCounts = books.reduce((authorCounts, book) => {
        //Get the author
        { name } = getAuthorById(authors, book.authorId);
        const authorName = name.first + " " + name.last;

        //Try to find the author in the list
        const author = authorCounts.find((author, index) => {
            return author.name == authorName;
        });

        //If found, add the book's borrow count to the author's count
        if (author) {
            author.count += book.borrows.length;
        //Otherwise, create the author count object with the book's borrow count
        } else {
            authorCounts.push({ name: authorName, count: book.borrows.length });
        }
        return authorCounts;
    }, []);

    //Sort the list by count
    authorCounts.sort((authorA, authorB) => {
        return authorA.count < authorB.count ? 1 : -1;
    });

    //Trim the list if necessary
    return authorCounts.slice(0, 5);

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
