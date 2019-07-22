class CreateJoinTableClientsProducts < ActiveRecord::Migration[5.2]
  def change
    create_join_table :clients, :products do |t|
      t.index [:client_id, :product_id, :created_at], { name: "client_product_date" }
      t.index [:product_id, :client_id, :created_at], { name: "product_client_date" }
      t.integer :quantity, null: false
      t.boolean :sent, null: false
      t.datetime :created_at, null: false
    end
  end
end
