class InventoriesController < ApplicationController
    def index
        render json: Inventory.all
    end
    
    def create
        Inventory.create(get_params)
    end
    
    def show
        @inventory = Inventory.find(params[:id])
        render json: @inventory
    end
    
    def update
        @inventory = Inventory.find params[:id]
        @inventory.update get_params
    end 
    
    def destroy
        @inventory = Inventory.find(params[:id])
        @inventory.destroy
    end
    
    def sell
      raw_params = sell_params

      inventory = Inventory.find(raw_params[:inventory_id])
      quantity = inventory.quantity.to_i - raw_params[:quantity].to_i
      client = ClientsInventory.create(sell_params)
      client.save
      if inventory.update_attributes(quantity: quantity)

        return render json: inventory, status: :ok
      end

      render json: 'material could not been edited', status: :unprocessable_entity
    end

    def get_sell

        history = Client.find_by_sql("
          SELECT clients.name AS cname, products.name, clients_inventories.quantity, clients_inventories.city FROM
          clients
          INNER JOIN clients_inventories ON clients.id = clients_inventories.client_id
          INNER JOIN inventories ON inventories.id = clients_inventories.inventory_id
          INNER JOIN products ON inventories.product_id = products.id
        ")

        render json: history
    end

    def get_full
      history = Client.find_by_sql("
          SELECT inventories.id AS id, products.name AS name FROM
          inventories
          INNER JOIN products ON inventories.product_id = products.id
        ")

        render json: history
    end

    private
    def get_params
        params.require(:inventory).permit(:product_id, :quantity, :retailer_cost, :wholesale_cost)
    end  
    
    def sell_params
        params.require(:register).permit(:client_id, :inventory_id, :city, :address, :phone, :quantity)
    end
end