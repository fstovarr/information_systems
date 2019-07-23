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
      inventory = Inventory.find(params[:id])
      raw_params = sell_params
      quantity = inventory.quantity.to_i - raw_params[:quantity].to_i
      client = ClientsInventory.create(sell_params)
      client.save
      if inventory.update_attributes(quantity: quantity)

        return render json: inventory, status: :ok
      end

      render json: 'material could not been edited', status: :unprocessable_entity
    end

    def get_sell
        render json: ClientsInventory.all
    end
    
    private
    def get_params
        params.require(:inventory).permit(:product_id, :quantity, :retailer_cost, :wholesale_cost)
    end  
    
    def sell_params
        params.require(:register).permit(:client_id, :inventory_id, :city, :address, :phone, :quantity)
    end
end