class AddNameToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :names, :string
  end
end