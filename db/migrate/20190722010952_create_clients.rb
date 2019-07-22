class CreateClients < ActiveRecord::Migration[5.2]
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :phone
      t.string :address, null: false
      t.string :type, null: false
    end
  end
end
