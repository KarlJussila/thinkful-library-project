function findAccountById(accounts, id) {
    //Find the account in the list with a matching id
    return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    //Sort accounts in alphabetical order by last name
    accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
    return accounts;
}

function getTotalNumberOfBorrows(account, books) {
    //Loop through the books
    return books.reduce((acc, book) => {
        //For each book, loop through its borrows and add one to the count
        //if the borrower id matches the input account
        return acc + book.borrows.some((borrow) => {
            return borrow.id === account.id;
        });
    }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
    //Get the books the account has borrowed
    const filteredBooks = books.filter((book) => {
        //Find the account in the borrow list
        return book.borrows.find((borrow) => {
            //Only return if the book has not been returned
            return borrow.id === account.id && !borrow.returned;
        });
    });

    //Add the authors to those books
    filteredBooks.forEach((book) => {
        book["author"] = authors.find((author) => author.id === book.authorId);
    });

    //Return the books
    return filteredBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
