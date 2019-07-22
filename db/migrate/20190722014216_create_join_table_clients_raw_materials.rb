class CreateJoinTableClientsRawMaterials < ActiveRecord::Migration[5.2]
  def change
    create_join_table :clients, :raw_materials do |t|
      t.index [:client_id, :raw_materials_id, :arrived_at], { name: "client_raw_arrived_id" }
      t.index [:inventory_id, :raw_materials_id, :arrived_at], { name: "raw_client_arrived_id" }
      t.datetime :arrived_at, null: false
      t.decimal :cost, null: false
    end
  end
end
