class InventoriesController < ApplicationController
    def index
        render json: Inventory.all
    end
    
    def create
        pms = get_params
        if params.key?("name")
            product = Product.create name: params["name"]
            pms = pms.merge({"product_id": product[:id]})
            Inventory.create(pms)
        else
            Inventory.create(get_params)
        end
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
    
    private
    def get_params
        params.require(:inventory).permit(:product_id, :name, :quantity, :retailer_cost, :wholesale_cost)
    end    
end