class Mutations::DeleteBook < Mutations::BaseMutation
  null true

  argument :id, ID, required: true

  field :book, BookType, null: true
  field :errors, [String], null: false

  def resolve(id:)
    book = Book.find(id)

    if(book.destroy())
      {
        book: book,
        errors: []
      }
    else
      {
        book: nil,
        errors: book.errors.full_message
      }

    end
  end

end
