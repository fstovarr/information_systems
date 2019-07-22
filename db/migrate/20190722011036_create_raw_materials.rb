class CreateRawMaterials < ActiveRecord::Migration[5.2]
  def change
    create_table :raw_materials do |t|
      t.string :name, null: false
      t.integer :quantity, null: false
      t.string :description
    end
  end
end
