# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_22_014216) do

  create_table "clients", force: :cascade do |t|
    t.string "name", null: false
    t.string "phone"
    t.string "address", null: false
    t.string "type", null: false
  end

  create_table "clients_inventories", id: false, force: :cascade do |t|
    t.integer "client_id", null: false
    t.integer "inventory_id", null: false
    t.datetime "created_at", null: false
    t.string "city"
    t.string "address"
    t.string "phone"
    t.index ["client_id", "inventory_id", "created_at"], name: "client_inventory_created_id"
    t.index ["inventory_id", "client_id", "created_at"], name: "inventory_client_created_id"
  end

  create_table "clients_products", id: false, force: :cascade do |t|
    t.integer "client_id", null: false
    t.integer "product_id", null: false
    t.integer "quantity", null: false
    t.boolean "sent", null: false
    t.datetime "created_at", null: false
    t.index ["client_id", "product_id", "created_at"], name: "client_product_date"
    t.index ["product_id", "client_id", "created_at"], name: "product_client_date"
  end

  create_table "clients_raw_materials", id: false, force: :cascade do |t|
    t.integer "client_id", null: false
    t.integer "raw_material_id", null: false
    t.datetime "arrived_at", null: false
    t.decimal "cost", null: false
    t.index ["client_id", nil, "arrived_at"], name: "client_raw_arrived_id"
    t.index [nil, nil, "arrived_at"], name: "raw_client_arrived_id"
  end

  create_table "inventories", force: :cascade do |t|
    t.integer "product_id"
    t.integer "quantity"
    t.decimal "retailer_cost"
    t.decimal "wholesale_cost"
    t.index ["product_id"], name: "index_inventories_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.string "color"
    t.string "size"
  end

  create_table "raw_materials", force: :cascade do |t|
    t.string "name", null: false
    t.integer "quantity", null: false
    t.string "description"
  end

end
