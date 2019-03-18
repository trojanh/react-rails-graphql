class Mutations::CreateBook < Mutations::BaseMutation
  null true

  argument :author_id, ID, required: true
  argument :title, String, required: true
  argument :genre, String, required: false

  field :book, BookType, null: true
  field :errors, [String], null: false

  def resolve(author_id:, title:, genre:)
    book = Book.new(author_id: author_id, title: title, genre: genre)
    if(book.save)
      {
        book: book,
        errors: []
      }
    else
      {
        book: nil,
        errors: book.errors.full_messages
      }
    end
  end
end
