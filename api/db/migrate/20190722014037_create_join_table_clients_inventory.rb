class CreateJoinTableClientsInventory < ActiveRecord::Migration[5.2]
  def change
    create_join_table :clients, :inventories do |t|
      t.index [:client_id, :inventory_id, :created_at], { name: "client_inventory_created_id" }
      t.index [:inventory_id, :client_id, :created_at], { name: "inventory_client_created_id" }
      t.datetime :created_at, null: false
      t.string :city
      t.string :address
      t.string :phone
      t.decimal :quantity, null: false
    end
  end
end
