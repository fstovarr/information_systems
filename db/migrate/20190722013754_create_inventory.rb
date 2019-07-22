class CreateInventory < ActiveRecord::Migration[5.2]
  def change
    create_table :inventories do |t|
      t.references :product, foreign_key: true
      t.integer :quantity
      t.decimal :retailer_cost
      t.decimal :wholesale_cost
    end
  end
end
