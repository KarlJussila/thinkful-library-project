function findAuthorById(authors, id) {
    //Find the author matching the given id in the authors list
    return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
    //Find the book matching the given id in the books list
    return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    //Filter out books that haven't been returned
    const returnedBooks = books.filter((book) => {
        return book.borrows[0].returned;
    });

    //Filter out the books that have been returned
    const borrowedBooks = books.filter((book) => {
        return !book.borrows[0].returned;
    })

    //Put both filtered lists into another list
    return [borrowedBooks, returnedBooks]
}

function getBorrowersForBook(book, accounts) {
    //Map the book's borrows to a list of borrowers
    const borrowers = book.borrows.map((borrow) => {
        //Find the account matching the borrower id
        const borrower = accounts.find((account) => {
            return account.id === borrow.id;
        });
        //Add returned field and return the borrower
        borrower["returned"] = borrow.returned;
        return borrower;
    });

    //Trim the list if necessary
    return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
